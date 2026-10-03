#!/usr/bin/env python3
"""Create a Windows offline presentation from an isolated source snapshot."""
import argparse, json, os, pathlib, re, shutil, subprocess, tarfile, tempfile, zipfile

ROOT = pathlib.Path(__file__).resolve().parents[2]
SERVER = r'''
$ErrorActionPreference = "Stop"
$root = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot "site"))
$listener = New-Object Net.Sockets.TcpListener([Net.IPAddress]::Loopback, 8765)
try { $listener.Start() } catch {
  Write-Host "Port 8765 is already in use. Close the previous Negarin window and try again."
  Read-Host "Press Enter"; exit 1
}
$mime = @{".html"="text/html; charset=utf-8";".js"="application/javascript";".css"="text/css";".json"="application/json";".txt"="text/x-component";".rsc"="text/x-component";".png"="image/png";".jpg"="image/jpeg";".jpeg"="image/jpeg";".webp"="image/webp";".svg"="image/svg+xml";".woff2"="font/woff2";".woff"="font/woff";".ico"="image/x-icon"}
Write-Host "Negarin is ready: http://127.0.0.1:8765/"
Write-Host "Keep this window open during your presentation. Ctrl+C stops the demo."
Start-Process "http://127.0.0.1:8765/"
try {
 while ($true) {
  $client = $listener.AcceptTcpClient()
  try {
   $client.ReceiveTimeout = 2000
   $client.SendTimeout = 10000
   $stream = $client.GetStream()
   $reader = New-Object IO.StreamReader($stream, [Text.Encoding]::ASCII, $false, 1024, $true)
   $line = $reader.ReadLine()
   if (-not $line) { continue }
   while (($header = $reader.ReadLine()) -ne "" -and $null -ne $header) {}
   $parts = $line.Split(" ")
   $method = $parts[0]
   $target = $parts[1].Split("?")[0]
   $relative = [Uri]::UnescapeDataString($target).TrimStart("/")
   $path = [IO.Path]::GetFullPath((Join-Path $root $relative))
   $status = "200 OK"; $type = "text/plain; charset=utf-8"; $body = [byte[]]@()
   if (-not ($path -eq $root -or $path.StartsWith($root + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase))) {
    $status = "403 Forbidden"
   } elseif ($method -ne "GET" -and $method -ne "HEAD") {
    $status = "405 Method Not Allowed"
   } else {
    if ([IO.Directory]::Exists($path)) { $path = Join-Path $path "index.html" }
    if (-not [IO.File]::Exists($path)) { $status = "404 Not Found"; $body = [Text.Encoding]::UTF8.GetBytes("Page not found") }
    else {
     $body = [IO.File]::ReadAllBytes($path)
     $extension = [IO.Path]::GetExtension($path).ToLowerInvariant()
     $type = $mime[$extension]
     if (-not $type) { $type = "application/octet-stream" }
    }
   }
   $response = "HTTP/1.1 $status" + "`r`nContent-Type: $type" + "`r`nContent-Length: " + $body.Length + "`r`nConnection: close`r`nX-Content-Type-Options: nosniff`r`n`r`n"
   $bytes = [Text.Encoding]::ASCII.GetBytes($response)
   $stream.Write($bytes, 0, $bytes.Length)
   if ($method -ne "HEAD" -and $body.Length -gt 0) { $stream.Write($body, 0, $body.Length) }
   $stream.Flush()
  } catch { Write-Host ("Request failed: " + $_.Exception.Message) }
  finally { $client.Close() }
 }
} finally { $listener.Stop() }
'''
BAT = '@echo off\r\ncd /d "%~dp0"\r\npowershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0Start-Negarin.ps1"\r\npause\r\n'
README = """نگارین - نسخهٔ نمایشی بدون اینترنت برای ویندوز

۱. روی فایل ZIP راست‌کلیک کن و Extract All را بزن.
۲. داخل پوشهٔ استخراج‌شده فایل Start-Negarin.bat را دوبار کلیک کن.
۳. مرورگر خودکار باز می‌شود. اگر باز نشد این آدرس را وارد کن:
http://127.0.0.1:8765/
۴. پنجرهٔ فرمان را تا پایان ارائه باز نگه دار.
۵. برای پایان، پنجرهٔ فرمان را ببند یا Ctrl+C بزن.

نیازی به VPN، اینترنت، Node.js، Python یا نصب بسته‌ها نیست.
فایل‌ها باید از ZIP استخراج شده باشند؛ مستقیماً از داخل ZIP اجرا نکن.
این اجرا برای Windows 10/11 و Windows PowerShell موجود روی ویندوز طراحی شده است.
اگر SmartScreen یا سیاست سازمانی اجرا را متوقف کرد، آن را دور نزن؛ از دمو آنلاین استفاده کن یا پیام خطا را بفرست.
صفحات و داده‌ها نمایشی هستند؛ پرداخت، پیامک، ثبت سفارش و تسویه واقعی انجام نمی‌شود.
نسخه‌های موبایل نیز در مرورگر نمایش داده می‌شوند و اپ نصب‌شدنی نیستند.
"""

def main():
 p = argparse.ArgumentParser()
 p.add_argument("--output", required=True)
 args = p.parse_args()
 output = pathlib.Path(args.output).resolve()
 output.mkdir(parents=True, exist_ok=True)
 build = output / "_build"
 if build.exists(): shutil.rmtree(build)
 build.mkdir()
 archive = subprocess.check_output(["git", "archive", "HEAD"], cwd=ROOT)
 import io
 with tarfile.open(fileobj=io.BytesIO(archive)) as tar: tar.extractall(build, filter="data")
 for source in [ROOT/"node_modules", *ROOT.glob("apps/*/node_modules"), *ROOT.glob("packages/*/node_modules")]:
  dest = build / source.relative_to(ROOT)
  if source.is_dir(): shutil.copytree(source, dest, symlinks=True, copy_function=os.link)
 for source in ROOT.glob("packages/*/dist"):
  shutil.copytree(source, build/source.relative_to(ROOT), dirs_exist_ok=True)
 web = build/"apps/web"
 for source in (web/"src").rglob("*.tsx"):
  text = source.read_text()
  source.write_text(re.sub(r'<Link(?=\s|>)', '<Link prefetch={false}', text))
 shutil.rmtree(web/"src/app/[portal]")
 (web/"next.config.ts").write_text('import type {NextConfig} from "next";\nconst config:NextConfig={output:"export",trailingSlash:true,reactStrictMode:true,transpilePackages:["@negarin/i18n"],images:{unoptimized:true}};\nexport default config;\n')
 for layout in (web/"src/app/preview").glob("*/layout.tsx"):
  text = layout.read_text()
  text = re.sub(r'export const dynamic\s*=\s*"force-dynamic";', '', text)
  layout.write_text(text)
 for page in (web/"src/app/preview").glob("*/[[]screen]/page.tsx"):
  text = page.read_text()
  text = text.replace("{params,searchParams}", "{params}").replace('const {canvas}=await searchParams;', 'const canvas="1";')
  registry = web/"src/features"/page.parent.parent.name/"screen-registry.ts"
  slugs = re.findall(r'"slug":\s*"([^"]+)"', registry.read_text().split("] as const")[0])
  assert slugs, page
  text += "\nexport function generateStaticParams(){return " + json.dumps([{"screen":s} for s in slugs]) + ";}\n"
  page.write_text(text)
 env = dict(os.environ, NEGARIN_UI_PREVIEW="1", NEXT_TELEMETRY_DISABLED="1")
 subprocess.run(["pnpm", "--filter", "@negarin/web", "build"], cwd=build, env=env, check=True)
 package = output/"Negarin-Offline"
 package.mkdir(exist_ok=True)
 shutil.copytree(web/"out", package/"site", dirs_exist_ok=True)
 (package/"Start-Negarin.ps1").write_text(SERVER, encoding="utf-8-sig")
 (package/"Start-Negarin.bat").write_bytes(BAT.encode("ascii"))
 (package/"READ-ME.txt").write_text(README, encoding="utf-8-sig")
 manifest = json.loads((ROOT/"docs/implementation/panel-coverage.json").read_text())
 count = sum(len(list((package/"site/preview"/r["portal"]).glob("*/index.html"))) for r in manifest["portals"])
 assert count == 460, count
 archive_path = output/"Negarin-Offline-Windows.zip"
 with zipfile.ZipFile(archive_path,"w",zipfile.ZIP_DEFLATED,compresslevel=6) as z:
  for file in package.rglob("*"):
   if file.is_file(): z.write(file,file.relative_to(output))
 print(json.dumps({"zip":str(archive_path),"bytes":archive_path.stat().st_size,"screens":count}))
if __name__ == "__main__": main()
