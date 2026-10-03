# Negarin presentation demo

- Public entry: https://negarin-live.onrender.com/
- Dedicated branch: `demo/presentation`
- Render workspace: `tea-dak4o4afngtc73boo0gg`
- Render service: `srv-db0je3dg1s2s73ebre9g`
- Plan: free; region: Frankfurt; automatic deployment disabled.
- Application source commit: `84cd949264e303d2b64a16b5fba2a9abd576842f`
- Deployment `dep-db0je3tg1s2s73ebrgc0` reached live.

## Presentation entry

Nine cards cover seven roles and the customer/artist mobile variants.
Each card links to three selected native screens and its full screen catalog.
Selected screens open in a new tab, preserving the entry page.
Data is demonstrative; payment, shipping, authentication and settlement are not live operations.

## Deployment

Environment: NODE_VERSION=22.18.0, NEGARIN_UI_PREVIEW=1, NEXT_TELEMETRY_DISABLED=1.

Build:
```sh
npm install --prefix .render-tools --no-save pnpm@12.7.0
.render-tools/node_modules/.bin/pnpm install --frozen-lockfile
.render-tools/node_modules/.bin/pnpm exec turbo run build --filter=@negarin/web...
```

Start:
```sh
.render-tools/node_modules/.bin/pnpm --filter @negarin/web start --hostname 0.0.0.0 --port $PORT
```

The older Corepack bundled with Node 22 cannot launch the repository's pnpm release
because it assumes the former bin/pnpm.cjs path. The demo installs pnpm directly.
The first failed service, negarin-demo (srv-db0jd20u01pc73akslag), has no live deployment;
the presentation uses negarin-live.

## Verification

- Web lint, TypeScript and production build passed.
- All 36 entry-page links loaded locally with decoded images and no broken image.
- Public entry and rendered representative screen for each of the nine cards inspected in browser.
- Representative public images had zero broken images.
- No Render error logs during public browser verification.
