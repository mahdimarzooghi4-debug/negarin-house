import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const config = JSON.parse(readFileSync(new URL('../app.json', import.meta.url), 'utf8')).expo;
const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

test('mobile app targets Android only and uses Negarin branding', () => {
  assert.deepEqual(config.platforms, ['android']);
  assert.equal(config.ios, undefined);
  assert.equal(config.name, 'خانه نگارین');
  assert.equal(config.icon, '../web/public/brand/negarin-logo.png');
  assert.equal(config.android.package, undefined);
  assert.deepEqual(config.plugins, [['expo-secure-store', { configureAndroidBackup: true }]]);
  assert.equal(packageJson.scripts.ios, undefined);
  assert.equal(packageJson.scripts.android, 'expo run:android');
  assert.equal(packageJson.dependencies['expo-secure-store'], '~57.0.4');
});
