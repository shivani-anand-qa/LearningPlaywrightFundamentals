# Chrome / Chromium Command-Line Argument List

Full reference of Chrome launch args (`--flag` or `--flag=value`), grouped by use case. Pass via Playwright:

```ts
const browser = await chromium.launch({
  args: ['--start-maximized', '--disable-extensions'],
});
```

or in `playwright.config.ts`:

```ts
use: {
  launchOptions: {
    args: ['--disable-gpu', '--no-sandbox'],
  },
}
```

---

## 1. Window / Display

| Arg | What it does |
|---|---|
| `--start-maximized` | Launch with maximized window (ignored if `--window-size` set). |
| `--start-fullscreen` | Launch in fullscreen (kiosk-like, no window chrome). |
| `--window-size=W,H` | Set initial window size in pixels. |
| `--window-position=X,Y` | Set initial window position. |
| `--kiosk` | Fullscreen kiosk mode — no address bar, no UI. |
| `--app=URL` | Open URL as a standalone "app" window (no tabs/toolbar). |
| `--headless=new` | Run in new headless mode (Playwright manages this itself normally). |
| `--force-device-scale-factor=1` | Force a specific DPI scale factor. |

## 2. Security / Sandbox (common in CI / Docker)

| Arg | What it does |
|---|---|
| `--no-sandbox` | Disables Chrome's OS sandbox. Needed in many Docker/CI containers running as root. |
| `--disable-setuid-sandbox` | Disables the setuid sandbox (Linux). |
| `--disable-web-security` | Disables same-origin policy — useful for CORS testing, never for prod. |
| `--allow-running-insecure-content` | Allows HTTP content on HTTPS pages. |
| `--ignore-certificate-errors` | Ignore all SSL cert errors (self-signed certs in test envs). |
| `--ignore-certificate-errors-spki-list` | Ignore cert errors for specific pinned certs only. |
| `--disable-site-isolation-trials` | Disables site isolation (reduces process count). |
| `--unsafely-treat-insecure-origin-as-secure=URL` | Treat a given HTTP origin as secure. |

## 3. GPU / Rendering (common for CI stability)

| Arg | What it does |
|---|---|
| `--disable-gpu` | Disables GPU hardware acceleration — often needed in headless CI. |
| `--disable-gpu-sandbox` | Disables the GPU process sandbox. |
| `--disable-software-rasterizer` | Disables software fallback rasterizer. |
| `--disable-dev-shm-usage` | Uses `/tmp` instead of `/dev/shm` — fixes crashes in low-memory Docker containers. |
| `--use-gl=swiftshader` | Force software OpenGL rendering. |
| `--enable-unsafe-swiftshader` | Allow SwiftShader GL fallback (newer Chrome requires this explicitly). |

## 4. Extensions / Plugins

| Arg | What it does |
|---|---|
| `--disable-extensions` | Disables all installed extensions. |
| `--disable-plugins` | Disables plugins (legacy, mostly obsolete). |
| `--load-extension=PATH` | Load an unpacked extension from a directory. |
| `--disable-extensions-except=PATH` | Disable all extensions except the one specified. |

## 5. Notifications / Popups / Automation Flags

| Arg | What it does |
|---|---|
| `--disable-notifications` | Suppresses web push notification prompts. |
| `--disable-popup-blocking` | Allows popups (useful when testing popup flows). |
| `--disable-infobars` | Removes "Chrome is being controlled by automated software" bar (deprecated in modern Chrome). |
| `--disable-blink-features=AutomationControlled` | Hides the `navigator.webdriver` automation flag from page JS. |
| `--no-first-run` | Skips the first-run setup wizard. |
| `--no-default-browser-check` | Skips the "set as default browser" prompt. |
| `--disable-default-apps` | Prevents default apps (Docs, Drive, etc.) from installing. |
| `--disable-translate` | Disables the built-in translate popup. |
| `--disable-save-password-bubble` | Suppresses "save password?" prompt. |
| `--disable-password-generation` | Disables Chrome's autofill password generation. |

## 6. Profile / User Data

| Arg | What it does |
|---|---|
| `--user-data-dir=PATH` | Use a custom profile directory (persist cookies/storage across runs). |
| `--profile-directory=NAME` | Select a named profile within the user-data-dir. |
| `--incognito` | Launch in incognito mode. |
| `--guest` | Launch as a guest session. |
| `--disable-sync` | Disables Chrome account sync. |

## 7. Networking / Proxy

| Arg | What it does |
|---|---|
| `--proxy-server=HOST:PORT` | Route all traffic through a proxy. |
| `--proxy-bypass-list=LIST` | Comma-separated hosts to bypass the proxy. |
| `--host-resolver-rules=MAP` | Override DNS resolution (e.g. force a domain to an IP). |
| `--disable-background-networking` | Stops background network requests (update checks, telemetry). |
| `--dns-prefetch-disable` | Disables DNS prefetching. |

## 8. Logging / Debugging

| Arg | What it does |
|---|---|
| `--remote-debugging-port=9222` | Opens Chrome DevTools Protocol port (Playwright uses this internally). |
| `--enable-logging` | Enables verbose logging to stderr. |
| `--v=1` | Verbosity level for `--enable-logging`. |
| `--log-level=0` | Set log severity (0=INFO … 3=FATAL). |
| `--auto-open-devtools-for-tabs` | Opens DevTools automatically for every new tab. |
| `--js-flags=--expose-gc` | Pass raw V8 flags. |

## 9. Performance / Resource Throttling

| Arg | What it does |
|---|---|
| `--single-process` | Runs everything in one process (unstable, mainly for constrained environments). |
| `--disable-background-timer-throttling` | Prevents timers from being throttled in background tabs — important for consistent test timing. |
| `--disable-backgrounding-occluded-windows` | Keeps occluded/minimized windows running at full speed. |
| `--disable-renderer-backgrounding` | Prevents renderer process de-prioritization for background tabs. |
| `--disable-features=IsolateOrigins,site-per-process` | Disables site isolation features — reduces process/memory overhead. |
| `--memory-pressure-off` | Disables memory pressure signals (avoids Chrome auto-throttling under low memory). |

## 10. Locale / Language / Timezone

| Arg | What it does |
|---|---|
| `--lang=en-US` | Set UI/browser language. |
| `--force-color-profile=srgb` | Force a specific color profile for consistent screenshots. |
| `--timezone=America/New_York` | (Non-standard; prefer Playwright's `timezoneId` context option instead.) |

---

## Playwright-Specific Notes

- Playwright already sets many stability/CI-friendly flags internally (e.g. `--no-first-run`, `--disable-background-networking`). You rarely need to duplicate them.
- For headless CI containers, the most commonly needed combo is:
  ```ts
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
  ```
- Prefer Playwright's typed context options (`viewport`, `locale`, `timezoneId`, `permissions`, `proxy`) over raw Chrome args when an equivalent exists — they're cross-browser (Firefox/WebKit) and validated, while `args` only works for Chromium.
- Full canonical source: [peter.sh/experiments/chromium-command-line-switches](https://peter.sh/experiments/chromium-command-line-switches/) (community-maintained, most complete list).

---

## Quick Interview Answer

> "Chrome command-line switches (`--flag`) configure the browser at launch — sandboxing, GPU, extensions, proxy, logging, etc. In Playwright they're passed via `launchOptions.args`, and only apply to Chromium-based browsers. Common CI flags: `--no-sandbox`, `--disable-dev-shm-usage`, `--disable-gpu`. But for anything Playwright already exposes as a typed option (viewport, locale, proxy), use that instead — it's cross-browser and safer than raw flags."
