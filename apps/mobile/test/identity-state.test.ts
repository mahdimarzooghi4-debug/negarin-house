import { describe, expect, it, vi } from 'vitest';
import type { AuthorizationContext } from '@negarin/authz';
import {
  MissingMobileSessionError,
  type SelectableIdentityGrants,
} from '../src/identity-client';
import { readMobileIdentityState, selectMobileIdentityGrant } from '../src/identity-state';

const artistGrant = {
  id: 'artist-grant',
  role: 'artist',
  organizationId: null,
  exportPartnerId: null,
} as const;

function client(
  listSelectableGrants: () => Promise<SelectableIdentityGrants>,
  readActiveContext = vi.fn(),
  selectGrant = vi.fn(),
) {
  return { listSelectableGrants, readActiveContext, selectGrant };
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

  it('selects only an explicitly requested server-listed grant and verifies its returned context', async () => {
    const buyerGrant = {
      id: 'buyer-grant',
      role: 'corporate_buyer',
      organizationId: 'buyer-org',
      exportPartnerId: null,
    } as const;
    const context: AuthorizationContext = {
      userId: 'user-1',
      activeRole: 'corporate-buyer',
      organizationId: 'buyer-org',
    };
    const selectGrant = vi.fn(async () => context);
    const api = client(
      async () => ({ activeGrantId: null, grants: [artistGrant, buyerGrant] }),
      vi.fn(),
      selectGrant,
    );

    await expect(selectMobileIdentityGrant(api, buyerGrant.id)).resolves.toEqual({
      kind: 'active',
      grants: [artistGrant, buyerGrant],
      activeGrantId: buyerGrant.id,
      context,
    });
    expect(selectGrant).toHaveBeenCalledOnce();
    expect(selectGrant).toHaveBeenCalledWith(buyerGrant.id);
  });

  it('does not ask the server to select a grant absent from the selectable list', async () => {
    const selectGrant = vi.fn();
    const api = client(
      async () => ({ activeGrantId: null, grants: [artistGrant] }),
      vi.fn(),
      selectGrant,
    );

    await expect(selectMobileIdentityGrant(api, 'other-users-grant')).rejects.toThrow('not available');
    expect(selectGrant).not.toHaveBeenCalled();
  });

  it('does not produce an active state when the server returns a different role or organization', async () => {
    const buyerGrant = {
      id: 'buyer-grant',
      role: 'corporate_buyer',
      organizationId: 'buyer-org',
      exportPartnerId: null,
    } as const;
    const api = client(
      async () => ({ activeGrantId: null, grants: [buyerGrant] }),
      vi.fn(),
      vi.fn(async () => ({ userId: 'user-1', activeRole: 'artist' as const })),
    );

    await expect(selectMobileIdentityGrant(api, buyerGrant.id)).rejects.toThrow('does not match the selected grant');
  });

  it('does not accept a matching role with a different organization scope', async () => {
    const buyerGrant = {
      id: 'buyer-grant',
      role: 'corporate_buyer',
      organizationId: 'buyer-org',
      exportPartnerId: null,
    } as const;
    const api = client(
      async () => ({ activeGrantId: null, grants: [buyerGrant] }),
      vi.fn(),
      vi.fn(async () => ({
        userId: 'user-1',
        activeRole: 'corporate-buyer' as const,
        organizationId: 'another-org',
      })),
    );

    await expect(selectMobileIdentityGrant(api, buyerGrant.id)).rejects.toThrow('does not match the selected grant');
  });

  it('rejects an empty grant ID and returns no-grants without selecting anything', async () => {
    const selectGrant = vi.fn();
    const api = client(async () => ({ activeGrantId: null, grants: [] }), vi.fn(), selectGrant);

    await expect(selectMobileIdentityGrant(api, '  ')).rejects.toThrow('must not be empty');
    await expect(selectMobileIdentityGrant(api, 'artist-grant')).resolves.toEqual({ kind: 'no-grants', grants: [] });
    expect(selectGrant).not.toHaveBeenCalled();
  });
});
