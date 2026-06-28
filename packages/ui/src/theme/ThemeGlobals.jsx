import { createGlobalStyle } from "styled-components";
import { darken, transparentize } from "polished";
import { themeTokens, lightThemeTokens } from "./tokens";

const getTokens = (props) => props.tokens || themeTokens;
const getLightTokens = (props) => props.lightTokens || lightThemeTokens;

export const ThemeGlobals = createGlobalStyle`
  :root {
    --font-sans: ${(props) => getTokens(props).fonts.sans};
    --font-mono: ${(props) => getTokens(props).fonts.mono};
    --color-bg: ${(props) => getTokens(props).colors.bg};
    --color-surface: ${(props) => getTokens(props).colors.surface};
    --color-card: ${(props) => getTokens(props).colors.card};
    --color-panel: ${(props) => getTokens(props).colors.panel};
    --color-panel-strong: ${(props) => getTokens(props).colors.panelStrong};
    --color-text: ${(props) => getTokens(props).colors.text};
    --color-text-muted: ${(props) => getTokens(props).colors.textMuted};
    --color-border: ${(props) => getTokens(props).colors.border};
    --color-accent: ${(props) => getTokens(props).colors.accent};
    --color-accent-strong: ${(props) => getTokens(props).colors.accentStrong};
    --color-success: ${(props) => getTokens(props).colors.success};
    --color-info: ${(props) => getTokens(props).colors.info};
    --color-warning: ${(props) => getTokens(props).colors.warning};
    --color-danger: ${(props) => getTokens(props).colors.danger};
    --radius-sm: ${(props) => getTokens(props).radii.sm};
    --radius-md: ${(props) => getTokens(props).radii.md};
    --radius-lg: ${(props) => getTokens(props).radii.lg};
    --radius-pill: ${(props) => getTokens(props).radii.pill};
    --radius-scale: 1;
    --radius-sm-scaled: calc(var(--radius-sm) * var(--radius-scale));
    --radius-md-scaled: calc(var(--radius-md) * var(--radius-scale));
    --radius-lg-scaled: calc(var(--radius-lg) * var(--radius-scale));
    --radius-pill-scaled: calc(var(--radius-pill) * var(--radius-scale));
    --space-xs: ${(props) => getTokens(props).spacing.xs};
    --space-sm: ${(props) => getTokens(props).spacing.sm};
    --space-md: ${(props) => getTokens(props).spacing.md};
    --space-lg: ${(props) => getTokens(props).spacing.lg};
    --size-base: ${(props) => getTokens(props).sizes.base};
    --size-lg: ${(props) => getTokens(props).sizes.lg};
    --shadow-soft: ${(props) => getTokens(props).shadows.soft};
    --shadow-strong: ${(props) => getTokens(props).shadows.strong};
    --color-backdrop: ${(props) => transparentize(0.4, "#000")};
    --color-success-bg: ${(props) => transparentize(0.82, getTokens(props).colors.success)};
    --color-info-bg: ${(props) => transparentize(0.82, getTokens(props).colors.info)};
    --color-warning-bg: ${(props) => transparentize(0.82, getTokens(props).colors.warning)};
    --color-danger-bg: ${(props) => transparentize(0.82, getTokens(props).colors.danger)};
    --color-grid-line: ${(props) => transparentize(0.8, getTokens(props).colors.border)};

    /* Alphafoam compatibility */
    --accent-color: ${(props) => getTokens(props).colors.accent};
    --accent-hover-color: ${(props) => darken(0.08, getTokens(props).colors.accent)};
    --background-color: ${(props) => getTokens(props).colors.bg};
    --secondary-color: ${(props) => getTokens(props).colors.surface};
    --text-color: ${(props) => getTokens(props).colors.text};
  }

  :root[data-theme="light"] {
    --color-bg: ${(props) => getLightTokens(props).colors.bg};
    --color-surface: ${(props) => getLightTokens(props).colors.surface};
    --color-card: ${(props) => getLightTokens(props).colors.card};
    --color-panel: ${(props) => getLightTokens(props).colors.panel};
    --color-panel-strong: ${(props) => getLightTokens(props).colors.panelStrong};
    --color-text: ${(props) => getLightTokens(props).colors.text};
    --color-text-muted: ${(props) => getLightTokens(props).colors.textMuted};
    --color-border: ${(props) => getLightTokens(props).colors.border};
    --color-accent: ${(props) => getLightTokens(props).colors.accent};
    --color-accent-strong: ${(props) => getLightTokens(props).colors.accentStrong};
    --color-success: ${(props) => getLightTokens(props).colors.success};
    --color-info: ${(props) => getLightTokens(props).colors.info};
    --color-warning: ${(props) => getLightTokens(props).colors.warning};
    --color-danger: ${(props) => getLightTokens(props).colors.danger};
    --shadow-soft: ${(props) => getLightTokens(props).shadows.soft};
    --shadow-strong: ${(props) => getLightTokens(props).shadows.strong};
    --color-backdrop: ${(props) => transparentize(0.6, "#000")};
    --color-success-bg: ${(props) => transparentize(0.86, getLightTokens(props).colors.success)};
    --color-info-bg: ${(props) => transparentize(0.86, getLightTokens(props).colors.info)};
    --color-warning-bg: ${(props) => transparentize(0.86, getLightTokens(props).colors.warning)};
    --color-danger-bg: ${(props) => transparentize(0.86, getLightTokens(props).colors.danger)};
    --color-grid-line: ${(props) => transparentize(0.85, getLightTokens(props).colors.border)};

    /* Alphafoam compatibility */
    --accent-color: ${(props) => getLightTokens(props).colors.accent};
    --accent-hover-color: ${(props) => darken(0.08, getLightTokens(props).colors.accent)};
    --background-color: ${(props) => getLightTokens(props).colors.bg};
    --secondary-color: ${(props) => getLightTokens(props).colors.surface};
    --text-color: ${(props) => getLightTokens(props).colors.text};
  }

  @media (prefers-color-scheme: light) {
    :root:not([data-theme]) {
      --color-bg: ${(props) => getLightTokens(props).colors.bg};
      --color-surface: ${(props) => getLightTokens(props).colors.surface};
      --color-card: ${(props) => getLightTokens(props).colors.card};
      --color-panel: ${(props) => getLightTokens(props).colors.panel};
      --color-panel-strong: ${(props) => getLightTokens(props).colors.panelStrong};
      --color-text: ${(props) => getLightTokens(props).colors.text};
      --color-text-muted: ${(props) => getLightTokens(props).colors.textMuted};
      --color-border: ${(props) => getLightTokens(props).colors.border};
      --color-accent: ${(props) => getLightTokens(props).colors.accent};
      --color-accent-strong: ${(props) => getLightTokens(props).colors.accentStrong};
      --color-success: ${(props) => getLightTokens(props).colors.success};
      --color-info: ${(props) => getLightTokens(props).colors.info};
      --color-warning: ${(props) => getLightTokens(props).colors.warning};
      --color-danger: ${(props) => getLightTokens(props).colors.danger};
      --shadow-soft: ${(props) => getLightTokens(props).shadows.soft};
      --shadow-strong: ${(props) => getLightTokens(props).shadows.strong};
      --color-backdrop: ${(props) => transparentize(0.6, "#000")};
      --color-success-bg: ${(props) => transparentize(0.86, getLightTokens(props).colors.success)};
      --color-info-bg: ${(props) => transparentize(0.86, getLightTokens(props).colors.info)};
      --color-warning-bg: ${(props) => transparentize(0.86, getLightTokens(props).colors.warning)};
      --color-danger-bg: ${(props) => transparentize(0.86, getLightTokens(props).colors.danger)};
      --color-grid-line: ${(props) => transparentize(0.85, getLightTokens(props).colors.border)};

      /* Alphafoam compatibility */
      --accent-color: ${(props) => getLightTokens(props).colors.accent};
      --accent-hover-color: ${(props) => darken(0.08, getLightTokens(props).colors.accent)};
      --background-color: ${(props) => getLightTokens(props).colors.bg};
      --secondary-color: ${(props) => getLightTokens(props).colors.surface};
      --text-color: ${(props) => getLightTokens(props).colors.text};
    }
  }

  * {
    box-sizing: border-box;
  }

  body {
    background: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-sans);
    font-size: var(--size-base);
    margin: 0;
  }
`;
