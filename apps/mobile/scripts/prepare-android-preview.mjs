// This runs only against the disposable Android project generated in CI.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {applyAndroidIcons} from './prepare-android-icons.mjs';
const directory = path.dirname(fileURLToPath(import.meta.url));
const role = process.env.EXPO_PUBLIC_APP_ROLE || 'artist';
if (!['artist', 'customer'].includes(role)) throw new Error('Unsupported app role');
if (process.env.NEGARIN_ANDROID_PREVIEW_BUILD !== '1' || process.env.NEGARIN_ANDROID_APPLICATION_ID !== `ir.negarin.${role}.preview`) {
  throw new Error('Preview signing is allowed only for the isolated preview application ID.');
}
const file = path.resolve(directory, '../android/app/build.gradle');
if (!fs.existsSync(file)) throw new Error('Generate the Android project before configuring preview signing.');
fs.appendFileSync(file, '\n// Internal preview only: embed JS while signing with the disposable debug certificate.\nandroid { buildTypes { release { signingConfig signingConfigs.debug; debuggable false } } }\n');

applyAndroidIcons(path.resolve(directory, '../android/app/src/main/res'), role);
