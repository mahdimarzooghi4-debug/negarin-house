# Offline presentation package

Build with `python scripts/demo/build-offline.py --output /absolute/output/directory`.
The result is `Negarin-Offline-Windows.zip`, approximately 34 MB.

Unzip completely on Windows 10/11, then double-click Start-Negarin.bat.
Windows PowerShell serves the exported files on 127.0.0.1:8765 and opens the browser.
Keep the command window open during the presentation. No Node/Python installation is required.

The source snapshot is isolated from the online application. Its export includes
460 reference screens/states, nine catalogs, the presentation entry, local fonts,
images, CSS, JavaScript and React navigation payloads. Demo data is not backed by
live payments, authentication, fulfillment or settlements.

Validation:
- Static production export passed, including TypeScript.
- 460 reference screen paths verified in the package.
- ZIP integrity passed.
- All 36 presentation entry links loaded with decoded images.
- Internal Artist and Customer navigation passed.
- External browser requests blocked; zero external requests observed.
- Tests used a local static HTTP server on Linux. The Windows PowerShell launcher
  has not been executed in this environment and must be checked on the presentation laptop.
