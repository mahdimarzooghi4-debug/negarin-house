import { roles, type AuthorizationContext, type Role } from '@negarin/authz';

const grantRoles = [
  'customer',
  'artist',
  'staff',
  'service_partner',
  'supporting_organization',
  'corporate_buyer',
  'export_partner',
] as const;

export type IdentityGrantRole = (typeof grantRoles)[number];

export type SelectableIdentityGrant = {
  id: string;
  role: IdentityGrantRole;
  organizationId: string | null;
  exportPartnerId: string | null;
};

export type SelectableIdentityGrants = {
  activeGrantId: string | null;
  grants: SelectableIdentityGrant[];
};

export class MobileIdentityApiError extends Error {
  constructor(readonly status: number, readonly code: string, message: string) {
    super(message);
    this.name = 'MobileIdentityApiError';
  }
}

export class MissingMobileSessionError extends Error {
  constructor() {
    super('A stored session is required for identity requests');
    this.name = 'MissingMobileSessionError';
  }
}

type MobileSessionStore = {
  readSessionToken(): Promise<string | null>;
};

type IdentityRequest = (input: string, init: RequestInit) => Promise<Pick<Response, 'ok' | 'status' | 'json'>>;

function record(value: unknown): Record<string, unknown> | null {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function parseGrant(value: unknown): SelectableIdentityGrant {
  const grant = record(value);
  if (
    !grant ||
    typeof grant.id !== 'string' || grant.id.length === 0 ||
    typeof grant.role !== 'string' || !grantRoles.includes(grant.role as IdentityGrantRole) ||
    !(typeof grant.organizationId === 'string' || grant.organizationId === null) ||
    !(typeof grant.exportPartnerId === 'string' || grant.exportPartnerId === null)
  ) {
    throw new TypeError('Identity API returned an invalid grant');
  }

  return {
    id: grant.id,
    role: grant.role as IdentityGrantRole,
    organizationId: grant.organizationId,
    exportPartnerId: grant.exportPartnerId,
  };
}

function parseGrantList(value: unknown): SelectableIdentityGrants {
  const result = record(value);
  if (!result || !(typeof result.activeGrantId === 'string' || result.activeGrantId === null) || !Array.isArray(result.grants)) {
    throw new TypeError('Identity API returned an invalid grant list');
  }

  const grants = result.grants.map(parseGrant);
  if (typeof result.activeGrantId === 'string' && !grants.some(({ id }) => id === result.activeGrantId)) {
    throw new TypeError('Identity API returned an unknown active grant');
  }

  return { activeGrantId: result.activeGrantId, grants };
}

function parseContext(value: unknown): AuthorizationContext {
  const context = record(value);
  const permissionDomains = context?.staffPermissionDomains;
  if (
    !context || typeof context.userId !== 'string' || context.userId.length === 0 ||
    typeof context.activeRole !== 'string' || !roles.includes(context.activeRole as Role) ||
    (context.organizationId !== undefined && typeof context.organizationId !== 'string') ||
    (context.exportPartnerId !== undefined && typeof context.exportPartnerId !== 'string') ||
    (permissionDomains !== undefined && (!Array.isArray(permissionDomains) || permissionDomains.some((domain) => typeof domain !== 'string')))
  ) {
    throw new TypeError('Identity API returned an invalid authorization context');
  }

  return context as AuthorizationContext;
}

async function errorDetails(response: Pick<Response, 'json'>): Promise<{ code: string; message: string }> {
  try {
    const envelope = record(await response.json());
    const error = record(envelope?.error);
    return {
      code: typeof error?.code === 'string' ? error.code : 'HTTP_ERROR',
      message: typeof error?.message === 'string' ? error.message : 'Identity request failed',
    };
  } catch {
    return { code: 'HTTP_ERROR', message: 'Identity request failed' };
  }
}

/** Thin Android client for server-owned grant discovery and active-context selection. */
export function createMobileIdentityClient(
  sessionStore: MobileSessionStore,
  apiBaseUrl: string,
  request: IdentityRequest = fetch,
) {
  const baseUrl = apiBaseUrl.replace(/\/+$/, '');

  async function requestJson(path: string, method: 'GET' | 'POST', body?: unknown): Promise<unknown> {
    const token = await sessionStore.readSessionToken();
    if (!token || token.trim().length === 0) throw new MissingMobileSessionError();

    const response = await request(`${baseUrl}${path}`, {
      method,
      cache: 'no-store',
      headers: {
        authorization: `Bearer ${token}`,
        accept: 'application/json',
        ...(body === undefined ? {} : { 'content-type': 'application/json' }),
      },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });

    if (!response.ok) {
      const error = await errorDetails(response);
      throw new MobileIdentityApiError(response.status, error.code, error.message);
    }
    return response.json();
  }

  return {
    async listSelectableGrants(): Promise<SelectableIdentityGrants> {
      return parseGrantList(await requestJson('/api/v1/identity/grants', 'GET'));
    },

    async readActiveContext(): Promise<AuthorizationContext> {
      return parseContext(await requestJson('/api/v1/identity/context', 'GET'));
    },

    async selectGrant(grantId: string): Promise<AuthorizationContext> {
      if (grantId.trim().length === 0) throw new TypeError('Grant ID must not be empty');
      return parseContext(await requestJson('/api/v1/identity/context/select', 'POST', { grantId }));
    },
  };
}
