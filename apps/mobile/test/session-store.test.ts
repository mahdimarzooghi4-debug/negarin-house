import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createSessionStore, SESSION_TOKEN_KEY } from '../src/session-store';

describe('mobile secure session store', () => {
  const storage = {
    getItemAsync: vi.fn<(key: string) => Promise<string | null>>(),
    setItemAsync: vi.fn<(key: string, value: string) => Promise<void>>(),
    deleteItemAsync: vi.fn<(key: string) => Promise<void>>(),
  };

  beforeEach(() => {
    vi.resetAllMocks();
    storage.getItemAsync.mockResolvedValue(null);
    storage.setItemAsync.mockResolvedValue(undefined);
    storage.deleteItemAsync.mockResolvedValue(undefined);
  });

  it('persists and reads an opaque session token under the app-owned key', async () => {
    const sessionStore = createSessionStore(storage);
    storage.getItemAsync.mockResolvedValueOnce('opaque-token');

    await sessionStore.writeSessionToken('opaque-token');
    await expect(sessionStore.readSessionToken()).resolves.toBe('opaque-token');

    expect(storage.setItemAsync).toHaveBeenCalledWith(SESSION_TOKEN_KEY, 'opaque-token');
    expect(storage.getItemAsync).toHaveBeenCalledWith(SESSION_TOKEN_KEY);
  });

  it('clears only the session token key', async () => {
    const sessionStore = createSessionStore(storage);

    await sessionStore.clearSessionToken();

    expect(storage.deleteItemAsync).toHaveBeenCalledOnce();
    expect(storage.deleteItemAsync).toHaveBeenCalledWith(SESSION_TOKEN_KEY);
  });

  it('rejects empty tokens without writing them', async () => {
    const sessionStore = createSessionStore(storage);

    expect(() => sessionStore.writeSessionToken('  ')).toThrow(TypeError);
    expect(storage.setItemAsync).not.toHaveBeenCalled();
  });

  it('propagates secure storage failures to the caller', async () => {
    const sessionStore = createSessionStore(storage);
    storage.getItemAsync.mockRejectedValueOnce(new Error('secure storage unavailable'));

    await expect(sessionStore.readSessionToken()).rejects.toThrow('secure storage unavailable');
  });
});
