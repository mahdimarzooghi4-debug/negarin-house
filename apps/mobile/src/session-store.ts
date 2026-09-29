export interface SecureKeyValueStore {
  getItemAsync(key: string): Promise<string | null>;
  setItemAsync(key: string, value: string): Promise<void>;
  deleteItemAsync(key: string): Promise<void>;
}

export const SESSION_TOKEN_KEY = 'negarin.session.token.v1';

export function createSessionStore(storage: SecureKeyValueStore) {
  return {
    readSessionToken(): Promise<string | null> {
      return storage.getItemAsync(SESSION_TOKEN_KEY);
    },

    writeSessionToken(token: string): Promise<void> {
      if (token.trim().length === 0) {
        throw new TypeError('Session token must not be empty');
      }

      return storage.setItemAsync(SESSION_TOKEN_KEY, token);
    },

    clearSessionToken(): Promise<void> {
      return storage.deleteItemAsync(SESSION_TOKEN_KEY);
    },
  };
}
