# Keyboard, Mouse, Hover & Drag-Drop in Playwright

Reference notes for the `page.keyboard` and `page.mouse` APIs, plus hover and drag-and-drop patterns.

## `page.keyboard`

| Method | Description |
| --- | --- |
| `keyboard.press(key)` | Presses a key (down + up) in one call. Accepts single keys or combinations joined with `+`. |
| `keyboard.down(key)` | Presses a key down and holds it — key stays pressed until `up()` is called. Used for modifier combos or manual key-hold timing. |
| `keyboard.up(key)` | Releases a key previously pressed with `down()`. |
| `keyboard.type(text)` | Types text character by character by sending individual key events (slower, simulates real typing, fires `keydown`/`keypress`/`keyup`). Deprecated in favor of `locator.pressSequentially()`. |
| `keyboard.insertText(text)` | Inserts text directly into the focused element without dispatching key events — faster, but bypasses `keydown` listeners/validation. |
| `locator.pressSequentially(text, options)` | Modern replacement for `keyboard.type()` — types into a specific locator, one key event per character. |

### Common key names

Use these with `press()`, `down()`, and `up()`:

- Letters/digits: `'A'`, `'a'`, `'1'` (case-sensitive — `'A'` fires with Shift semantics for some layouts)
- Whitespace/navigation: `Enter`, `Tab`, `Space`, `Backspace`, `Delete`, `Escape`
- Arrows: `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`
- Paging: `Home`, `End`, `PageUp`, `PageDown`
- Modifiers: `Shift`, `Control`, `Alt`, `Meta` (⌘ on Mac / Win key on Windows)
- Function keys: `F1`–`F12`

### Key combinations

Join keys with `+` to hold modifiers while pressing a key:

```ts
await page.keyboard.press('Control+A');   // select all
await page.keyboard.press('Control+C');   // copy
await page.keyboard.press('Control+V');   // paste
await page.keyboard.press('Shift+Tab');   // reverse tab
await page.keyboard.press('Meta+Z');      // undo (Mac)
```

### Manual key-hold (down/up)

```ts
await page.keyboard.down('Shift');
await page.keyboard.press('ArrowRight');  // extends selection while Shift is held
await page.keyboard.press('ArrowRight');
await page.keyboard.up('Shift');
```

### Typing text

```ts
await page.keyboard.type('Hello World');            // deprecated, fires real key events
await page.locator('#search').pressSequentially('Hello World', { delay: 100 }); // preferred
await page.keyboard.insertText('Hello World');       // fast, skips key events
```

## `page.mouse`

Low-level mouse control — operates on page coordinates, not locators. Useful for drag-and-drop, custom gestures, or canvas interactions where a plain `.click()` isn't enough.

| Method | Description |
| --- | --- |
| `mouse.move(x, y, options?)` | Moves the mouse to absolute page coordinates. `steps` option interpolates intermediate positions (simulates a real drag path). |
| `mouse.down(options?)` | Presses a mouse button down at the current position and holds it. `button` option: `'left'` (default), `'right'`, `'middle'`. |
| `mouse.up(options?)` | Releases the held mouse button. |
| `mouse.click(x, y, options?)` | Moves to coordinates, then does down + up (a full click) in one call. Supports `clickCount` for double/triple click. |
| `mouse.dblclick(x, y, options?)` | Moves to coordinates and double-clicks. |
| `mouse.wheel(deltaX, deltaY)` | Scrolls the page/element by pixel deltas. |

### Manual drag-and-drop with mouse down/move/up

```ts
const source = page.locator('#drag-me');
const target = page.locator('#drop-zone');

const sourceBox = await source.boundingBox();
const targetBox = await target.boundingBox();

await page.mouse.move(
  sourceBox!.x + sourceBox!.width / 2,
  sourceBox!.y + sourceBox!.height / 2
);
await page.mouse.down();
await page.mouse.move(
  targetBox!.x + targetBox!.width / 2,
  targetBox!.y + targetBox!.height / 2,
  { steps: 10 } // move in small increments so drag listeners fire correctly
);
await page.mouse.up();
```

### Locator-based drag-and-drop (simpler, when available)

```ts
await source.dragTo(target); // Playwright handles hover/down/move/up internally
```

## Hover

```ts
await page.locator('#menu-item').hover();       // moves mouse over the element, triggers CSS :hover / hover-revealed menus
await page.mouse.move(x, y);                     // low-level equivalent when you need exact coordinates
```

## Notes / gotchas

- `page.keyboard` and `page.mouse` act on whatever is currently focused/at those coordinates — they don't target a locator directly. Click or focus an element first if a key/mouse action needs to apply to it.
- Always pair `down()` with `up()` — an unreleased key or mouse button can cause flaky, order-dependent test failures across subsequent tests.
- For drag-and-drop, prefer `locator.dragTo()` first; fall back to manual `mouse.move/down/up` only when the target library ignores native HTML5 drag events (e.g., canvas-based or custom pointer-event widgets) and needs interpolated `steps` to register intermediate `mousemove` events.
