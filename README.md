# alpha-ui

Shared UI kit and theme system for AlphaNav and Alphafoam.

## Structure
- `packages/ui`: component library + theme system
- `apps/demo`: demo app with component gallery and theme editor

## Quick start
1. Install dependencies
   - `npm install`
2. Run demo
   - `npm run dev`
3. Run tests
   - `npm test`
4. Build library
   - `npm run build`

## Versioning / updates (easy mode)
Use git tags + GitHub repo dependency.
- In consumer repo `package.json`:
  - `"@alpha/ui": "git+ssh://git@github.com:<org>/alpha-ui.git#v0.1.0"`
- Bump by tagging a new version and updating the hash.

## Usage (consumer apps)
```js
import { ThemeGlobals, StandardButton } from "@alpha/ui";
```

```jsx
function App() {
  return (
    <>
      <ThemeGlobals />
      <StandardButton>Click</StandardButton>
    </>
  );
}
```

## Notes
- The theme exposes AlphaNav tokens (`--color-*`, `--radius-*`) and Alphafoam tokens (`--accent-color`, `--background-color`, etc.).
- The WidgetGrid / BaseWidget are included for apps that use grid-based widgets.
