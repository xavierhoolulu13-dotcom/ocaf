const CACHE_NAME = "example-os-v1";

const ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/branding/logo.svg",

  // Factory
  "/factory/index.html",
  "/factory/factory-ui.js",
  "/factory/factory.css",
  "/factory/agent-generator.js",
  "/factory/self-builder.js",

  // Deploy
  "/deploy/gh-pages-deploy.js",
  "/deploy/zip-export.js",

  // Templates
  "/templates/dfy-basic-agent.json",
  "/templates/dfy-content-agent.json",
  "/templates/dfy-repo-builder.json",
  "/templates/dfy-tax-revenue-facilitator.json",

  // Template root
  "/template/list.json",

  // Root
  "/README.md"
];

// Install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return (
        cached ||
        fetch(event.request).catch(() =>
          caches.match("/index.html")
        )
      );
    })
  );
});
