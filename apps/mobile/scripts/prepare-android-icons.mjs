import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const mobile = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const branding = JSON.parse(fs.readFileSync(path.join(mobile, 'branding/app-icons.json'), 'utf8'));

// Preserve the official raster logo unchanged. Android XML supplies the background and safe-zone padding.
export function applyAndroidIcons(resourceDirectory, role = 'artist') {
  if (!['artist', 'customer'].includes(role)) throw new Error('Unsupported app icon role');
  const color = branding[role].backgroundColor;
  if (!/^#[0-9A-F]{6}$/.test(color) || branding.badgeColor !== '#FFFFFF') throw new Error('Invalid icon palette');
  const write = (name, content) => {
    const target = path.join(resourceDirectory, name);
    fs.mkdirSync(path.dirname(target), {recursive: true});
    fs.writeFileSync(target, content);
  };
  const logo = path.join(resourceDirectory, 'drawable-nodpi/negarin_logo.png');
  fs.mkdirSync(path.dirname(logo), {recursive: true});
  fs.copyFileSync(path.join(mobile, branding.logo), logo);
  write('drawable/negarin_icon_foreground.xml', `<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
  <item><inset android:insetLeft="20%" android:insetTop="20%" android:insetRight="20%" android:insetBottom="20%"><shape android:shape="oval"><solid android:color="#FFFFFF" /></shape></inset></item>
  <item><inset android:insetLeft="24%" android:insetTop="24%" android:insetRight="24%" android:insetBottom="24%"><bitmap android:src="@drawable/negarin_logo" android:gravity="fill" android:filter="true" /></inset></item>
</layer-list>\n`);
  const adaptive = `<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android"><background android:drawable="${color}" /><foreground android:drawable="@drawable/negarin_icon_foreground" /></adaptive-icon>\n`;
  const legacy = `<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
  <item><shape android:shape="rectangle"><solid android:color="${color}" /><corners android:radius="10dp" /><size android:width="48dp" android:height="48dp" /></shape></item>
  <item android:left="6dp" android:top="6dp" android:right="6dp" android:bottom="6dp"><shape android:shape="oval"><solid android:color="#FFFFFF" /></shape></item>
  <item android:left="10dp" android:top="10dp" android:right="10dp" android:bottom="10dp"><bitmap android:src="@drawable/negarin_logo" android:gravity="fill" android:filter="true" /></item>
</layer-list>\n`;
  // Remove only generated launcher rasters. This never edits the authoritative source logo.
  for (const directory of fs.readdirSync(resourceDirectory)) {
    if (!directory.startsWith('mipmap-')) continue;
    const location = path.join(resourceDirectory, directory);
    if (!fs.statSync(location).isDirectory()) continue;
    for (const name of fs.readdirSync(location)) {
      if (/^ic_launcher(?:_round|_foreground|_background)?\.(?:png|webp)$/.test(name)) fs.unlinkSync(path.join(location, name));
    }
  }
  for (const name of ['ic_launcher', 'ic_launcher_round']) {
    write(`mipmap-anydpi-v26/${name}.xml`, adaptive);
    write(`mipmap-anydpi/${name}.xml`, legacy);
  }
}
