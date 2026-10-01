import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  createMobileIdentityClient,
  MissingMobileSessionError,
  MobileIdentityApiError,
} from '../src/identity-client';

describe('Android identity API client', () => {
  const sessionStore = { readSessionToken: vi.fn<() => Promise<string | null>>() };
  const request = vi.fn<(input: string, init: RequestInit) => Promise<Response>>();

  beforeEach(() => {
    vi.resetAllMocks();
    sessionStore.readSessionToken.mockResolvedValue('opaque-session');
  });

  it('lists only the server-provided selectable grants with the stored bearer token', async () => {
    const payload = {
      activeGrantId: 'artist-grant',
      grants: [
        { id: 'artist-grant', role: 'artist', organizationId: null, exportPartnerId: null },
        { id: 'buyer-grant', role: 'corporate_buyer', organizationId: 'buyer-org', exportPartnerId: null },
      ],
    };
    request.mockResolvedValueOnce(Response.json(payload));
    const client = createMobileIdentityClient(sessionStore, 'https://api.example.test/', request);

    await expect(client.listSelectableGrants()).resolves.toEqual(payload);
    expect(request).toHaveBeenCalledWith('https://api.example.test/api/v1/identity/grants', {
      method: 'GET',
      cache: 'no-store',
      headers: { authorization: 'Bearer opaque-session', accept: 'application/json' },
    });
  });

  it('selects a server-issued grant and returns the server-derived context', async () => {
    const context = { userId: 'user-1', activeRole: 'corporate-buyer', organizationId: 'buyer-org' };
    request.mockResolvedValueOnce(Response.json(context));
    const client = createMobileIdentityClient(sessionStore, 'https://api.example.test', request);

    await expect(client.selectGrant('buyer-grant')).resolves.toEqual(context);
    expect(request).toHaveBeenCalledWith('https://api.example.test/api/v1/identity/context/select', {
      method: 'POST',
      cache: 'no-store',
      headers: {
        authorization: 'Bearer opaque-session',
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ grantId: 'buyer-grant' }),
    });
  });

  it('reads the active context without trusting a role stored on the device', async () => {
    const context = { userId: 'user-1', activeRole: 'artist' };
    request.mockResolvedValueOnce(Response.json(context));
    const client = createMobileIdentityClient(sessionStore, 'https://api.example.test', request);

    await expect(client.readActiveContext()).resolves.toEqual(context);
    expect(request).toHaveBeenCalledWith('https://api.example.test/api/v1/identity/context', expect.any(Object));
  });

  it('does not make a request without a stored session token', async () => {
    sessionStore.readSessionToken.mockResolvedValueOnce(null);
    const client = createMobileIdentityClient(sessionStore, 'https://api.example.test', request);

    await expect(client.listSelectableGrants()).rejects.toBeInstanceOf(MissingMobileSessionError);
    expect(request).not.toHaveBeenCalled();
  });

  it('preserves API status and error code without clearing the session', async () => {
    request.mockResolvedValueOnce(Response.json({
      error: { code: 'HTTP_ERROR', message: 'Unauthorized', requestId: 'request-1' },
    }, { status: 401 }));
    const client = createMobileIdentityClient(sessionStore, 'https://api.example.test', request);

    await expect(client.readActiveContext()).rejects.toMatchObject({
      name: 'MobileIdentityApiError',
      status: 401,
      code: 'HTTP_ERROR',
    } satisfies Partial<MobileIdentityApiError>);
    expect(sessionStore.readSessionToken).toHaveBeenCalledOnce();
  });

  it('rejects malformed grant payloads instead of inventing role state', async () => {
    request.mockResolvedValueOnce(Response.json({ activeGrantId: 'missing', grants: [] }));
    const client = createMobileIdentityClient(sessionStore, 'https://api.example.test', request);

    await expect(client.listSelectableGrants()).rejects.toThrow('unknown active grant');
  });
});
