const serviceWorker = `
/* Negarin Customer PWA: network-only. Do not cache customer or account data. */
self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(fetch(event.request));
});
`;

export function GET() {
  return new Response(serviceWorker, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Service-Worker-Allowed": "/preview/customer-mobile/",
      "X-Content-Type-Options": "nosniff"
    }
  });
}
