export type MobileLogoutResult = 'already-signed-out' | 'signed-out';

type MobileSessionStore = {
  readSessionToken(): Promise<string | null>;
  clearSessionToken(): Promise<void>;
};

type LogoutRequest = (input: string, init: RequestInit) => Promise<Pick<Response, 'status'>>;

export class MobileLogoutError extends Error {
  constructor(readonly status: number) {
    super(`Mobile logout failed with HTTP ${status}`);
    this.name = 'MobileLogoutError';
  }
}

/**
 * Revokes the current bearer session before clearing its local copy.
 * Failed requests leave the token in secure storage so logout can be retried.
 */
export function createMobileLogout(
  sessionStore: MobileSessionStore,
  apiBaseUrl: string,
  request: LogoutRequest = fetch,
) {
  const endpoint = `${apiBaseUrl.replace(/\/+$/, '')}/api/v1/identity/logout`;

  return async function logout(): Promise<MobileLogoutResult> {
    const token = await sessionStore.readSessionToken();
    if (!token || token.trim().length === 0) {
      if (token !== null) await sessionStore.clearSessionToken();
      return 'already-signed-out';
    }

    const response = await request(endpoint, {
      method: 'POST',
      headers: { authorization: `Bearer ${token}` },
    });

    // 401 means the server already considers this session invalid or revoked.
    if (response.status !== 204 && response.status !== 401) {
      throw new MobileLogoutError(response.status);
    }

    await sessionStore.clearSessionToken();
    return 'signed-out';
  };
}
