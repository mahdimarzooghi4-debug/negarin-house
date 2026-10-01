import * as SecureStore from 'expo-secure-store';
import { createSessionStore } from './session-store';

export const sessionStore = createSessionStore(SecureStore);
