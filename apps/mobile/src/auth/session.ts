import * as SecureStore from "expo-secure-store";

const SESSION_KEY = "negarin.artist.session.v1";
const SESSION_TOKEN = /^[A-Za-z0-9_-]{43}$/;

export async function readSessionToken(): Promise<string | null> {
  const token = await SecureStore.getItemAsync(SESSION_KEY);
  if (token === null) return null;
  if (!SESSION_TOKEN.test(token)) {
    await SecureStore.deleteItemAsync(SESSION_KEY);
    return null;
  }
  return token;
}

export async function storeSessionToken(token: string): Promise<void> {
  if (!SESSION_TOKEN.test(token)) throw new Error("نشست دریافتی معتبر نیست.");
  await SecureStore.setItemAsync(SESSION_KEY, token);
}

export async function clearSessionToken(): Promise<void> {
  await SecureStore.deleteItemAsync(SESSION_KEY);
}
