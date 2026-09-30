import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createMobileLogout, MobileLogoutError } from '../src/logout';

describe('mobile bearer-session logout boundary', () => {
  const sessionStore = {
    readSessionToken: vi.fn<() => Promise<string | null>>(),
    clearSessionToken: vi.fn<() => Promise<void>>(),
  };
  const request = vi.fn<(input: string, init: RequestInit) => Promise<Pick<Response, 'status'>>>();

  beforeEach(() => {
    vi.resetAllMocks();
    sessionStore.readSessionToken.mockResolvedValue('opaque-session');
    sessionStore.clearSessionToken.mockResolvedValue(undefined);
    request.mockResolvedValue(new Response(null, { status: 204 }));
  });

  it('revokes the bearer session before clearing secure storage', async () => {
    const logout = createMobileLogout(sessionStore, 'https://api.example.test/', request);

    await expect(logout()).resolves.toBe('signed-out');
    expect(request).toHaveBeenCalledWith('https://api.example.test/api/v1/identity/logout', {
      method: 'POST',
      headers: { authorization: 'Bearer opaque-session' },
    });
    expect(request.mock.invocationCallOrder[0]).toBeLessThan(sessionStore.clearSessionToken.mock.invocationCallOrder[0]!);
    expect(sessionStore.clearSessionToken).toHaveBeenCalledOnce();
  });

  it('clears the local token when the server already considers the session invalid', async () => {
    request.mockResolvedValueOnce(new Response(null, { status: 401 }));
    const logout = createMobileLogout(sessionStore, 'https://api.example.test', request);

    await expect(logout()).resolves.toBe('signed-out');
    expect(sessionStore.clearSessionToken).toHaveBeenCalledOnce();
  });

  it('keeps the token when the server cannot revoke the session', async () => {
    request.mockResolvedValueOnce(new Response(null, { status: 503 }));
    const logout = createMobileLogout(sessionStore, 'https://api.example.test', request);

    await expect(logout()).rejects.toEqual(expect.objectContaining({
      name: 'MobileLogoutError',
      status: 503,
    } satisfies Partial<MobileLogoutError>));
    expect(sessionStore.clearSessionToken).not.toHaveBeenCalled();
  });

  it('leaves no-session calls offline and removes a corrupt empty token', async () => {
    sessionStore.readSessionToken.mockResolvedValueOnce(null).mockResolvedValueOnce('   ');
    const logout = createMobileLogout(sessionStore, 'https://api.example.test', request);

    await expect(logout()).resolves.toBe('already-signed-out');
    await expect(logout()).resolves.toBe('already-signed-out');
    expect(request).not.toHaveBeenCalled();
    expect(sessionStore.clearSessionToken).toHaveBeenCalledOnce();
  });

  it('preserves the token when the network request fails', async () => {
    request.mockRejectedValueOnce(new Error('network unavailable'));
    const logout = createMobileLogout(sessionStore, 'https://api.example.test', request);

    await expect(logout()).rejects.toThrow('network unavailable');
    expect(sessionStore.clearSessionToken).not.toHaveBeenCalled();
  });
});
