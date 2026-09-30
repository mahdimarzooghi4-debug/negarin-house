import type { AuthorizationContext, Role } from '@negarin/authz';
import {
  MissingMobileSessionError,
  type SelectableIdentityGrant,
  type SelectableIdentityGrants,
} from './identity-client';

export type MobileIdentityState =
  | { kind: 'signed-out' }
  | { kind: 'no-grants'; grants: [] }
  | { kind: 'grant-selection-required'; grants: SelectableIdentityGrant[] }
  | {
      kind: 'active';
      grants: SelectableIdentityGrant[];
      activeGrantId: string;
      context: AuthorizationContext;
    };

type MobileIdentityClient = {
  listSelectableGrants(): Promise<SelectableIdentityGrants>;
  readActiveContext(): Promise<AuthorizationContext>;
};

type MobileIdentityGrantSelectionClient = MobileIdentityClient & {
  selectGrant(grantId: string): Promise<AuthorizationContext>;
};

const contextRoles: Record<SelectableIdentityGrant['role'], Role> = {
  customer: 'customer',
  artist: 'artist',
  staff: 'staff',
  service_partner: 'service-partner',
  supporting_organization: 'supporting-organization',
  corporate_buyer: 'corporate-buyer',
  export_partner: 'export-partner',
};

function matchesGrant(context: AuthorizationContext, grant: SelectableIdentityGrant): boolean {
  return context.activeRole === contextRoles[grant.role] &&
    (grant.organizationId === null ? context.organizationId === undefined : context.organizationId === grant.organizationId) &&
    (grant.exportPartnerId === null ? context.exportPartnerId === undefined : context.exportPartnerId === grant.exportPartnerId);
}

/**
 * Resolve the mobile shell state from server-owned grants and context. This
 * helper does not select a role, create a session, or clear stored credentials.
 */
export async function readMobileIdentityState(client: MobileIdentityClient): Promise<MobileIdentityState> {
  let selectable: SelectableIdentityGrants;
  try {
    selectable = await client.listSelectableGrants();
  } catch (error) {
    if (error instanceof MissingMobileSessionError) return { kind: 'signed-out' };
    throw error;
  }

  if (selectable.grants.length === 0) return { kind: 'no-grants', grants: [] };
  if (selectable.activeGrantId === null) {
    return { kind: 'grant-selection-required', grants: selectable.grants };
  }

  const activeGrant = selectable.grants.find(({ id }) => id === selectable.activeGrantId);
  if (!activeGrant) throw new TypeError('Identity API returned an unknown active grant');

  const context = await client.readActiveContext();
  if (!matchesGrant(context, activeGrant)) {
    throw new TypeError('Identity API returned a context that does not match the active grant');
  }

  return {
    kind: 'active',
    grants: selectable.grants,
    activeGrantId: activeGrant.id,
    context,
  };
}

/**
 * Select an explicitly supplied grant using the server and verify that the
 * returned context belongs to it. The helper never chooses a default role.
 */
export async function selectMobileIdentityGrant(
  client: MobileIdentityGrantSelectionClient,
  grantId: string,
): Promise<MobileIdentityState> {
  if (grantId.trim().length === 0) throw new TypeError('Grant ID must not be empty');

  const selectable = await client.listSelectableGrants();
  if (selectable.grants.length === 0) return { kind: 'no-grants', grants: [] };

  const grant = selectable.grants.find(({ id }) => id === grantId);
  if (!grant) throw new TypeError('Selected grant is not available to this session');

  const context = await client.selectGrant(grantId);
  if (!matchesGrant(context, grant)) {
    throw new TypeError('Identity API returned a context that does not match the selected grant');
  }

  return {
    kind: 'active',
    grants: selectable.grants,
    activeGrantId: grant.id,
    context,
  };
}
