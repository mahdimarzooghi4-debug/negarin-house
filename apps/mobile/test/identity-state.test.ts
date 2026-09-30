import { describe, expect, it, vi } from 'vitest';
import type { AuthorizationContext } from '@negarin/authz';
import {
  MissingMobileSessionError,
  type SelectableIdentityGrants,
} from '../src/identity-client';
import { readMobileIdentityState } from '../src/identity-state';

const artistGrant = {
  id: 'artist-grant',
  role: 'artist',
  organizationId: null,
  exportPartnerId: null,
} as const;

function client(listSelectableGrants: () => Promise<SelectableIdentityGrants>, readActiveContext = vi.fn()) {
  return { listSelectableGrants, readActiveContext };
}

describe('Android identity state', () => {
  it('reports signed out without creating or requesting a session', async () => {
    const readContext = vi.fn();
    const api = client(() => Promise.reject(new MissingMobileSessionError()), readContext);

    await expect(readMobileIdentityState(api)).resolves.toEqual({ kind: 'signed-out' });
    expect(readContext).not.toHaveBeenCalled();
  });

  it('preserves the empty-grants state without assigning a default role', async () => {
    const readContext = vi.fn();
    const api = client(async () => ({ activeGrantId: null, grants: [] }), readContext);

    await expect(readMobileIdentityState(api)).resolves.toEqual({ kind: 'no-grants', grants: [] });
    expect(readContext).not.toHaveBeenCalled();
  });

  it('asks for server-authorized grant selection when no active grant exists', async () => {
    const readContext = vi.fn();
    const api = client(async () => ({ activeGrantId: null, grants: [artistGrant] }), readContext);

    await expect(readMobileIdentityState(api)).resolves.toEqual({
      kind: 'grant-selection-required',
      grants: [artistGrant],
    });
    expect(readContext).not.toHaveBeenCalled();
  });

  it('returns active state only when the server context matches its selected grant', async () => {
    const context: AuthorizationContext = { userId: 'user-1', activeRole: 'artist' };
    const api = client(
      async () => ({ activeGrantId: artistGrant.id, grants: [artistGrant] }),
      vi.fn(async () => context),
    );

    await expect(readMobileIdentityState(api)).resolves.toEqual({
      kind: 'active',
      grants: [artistGrant],
      activeGrantId: artistGrant.id,
      context,
    });
  });

  it('rejects role or organization context that disagrees with the selected grant', async () => {
    const grant = { ...artistGrant, role: 'corporate_buyer', organizationId: 'buyer-org' } as const;
    const api = client(
      async () => ({ activeGrantId: grant.id, grants: [grant] }),
      vi.fn(async () => ({ userId: 'user-1', activeRole: 'artist' as const })),
    );

    await expect(readMobileIdentityState(api)).rejects.toThrow('does not match the active grant');
  });
});
