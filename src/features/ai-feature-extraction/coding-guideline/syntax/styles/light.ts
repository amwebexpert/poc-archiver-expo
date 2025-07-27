import { LIGHT_COLORS_SCHEME } from '~/theme/light-colors-scheme';

const {
  onSurface,
  surface,
  onSurfaceVariant,
  primary,
  tertiary,
  secondary,
  error,
  errorContainer,
  primaryContainer
} = LIGHT_COLORS_SCHEME;

export default {
  "hljs": {
    "display": "block",
    "overflowX": "auto",
    "padding": "0.5em",
    "color": onSurface,
    "background": surface
  },
  "hljs-comment": {
    "color": onSurfaceVariant,
    "fontStyle": "italic"
  },
  "hljs-quote": {
    "color": onSurfaceVariant,
    "fontStyle": "italic"
  },
  "hljs-keyword": {
    "color": primary
  },
  "hljs-selector-tag": {
    "color": primary
  },
  "hljs-literal": {
    "color": primary
  },
  "hljs-subst": {
    "color": primary
  },
  "hljs-number": {
    "color": tertiary
  },
  "hljs-string": {
    "color": secondary
  },
  "hljs-doctag": {
    "color": secondary
  },
  "hljs-selector-id": {
    "color": primary
  },
  "hljs-selector-class": {
    "color": primary
  },
  "hljs-section": {
    "color": primary
  },
  "hljs-type": {
    "color": primary
  },
  "hljs-params": {
    "color": primary
  },
  "hljs-title": {
    "color": onSurface,
    "fontWeight": "bold"
  },
  "hljs-tag": {
    "color": primary,
    "fontWeight": "normal"
  },
  "hljs-name": {
    "color": primary,
    "fontWeight": "normal"
  },
  "hljs-attribute": {
    "color": primary,
    "fontWeight": "normal"
  },
  "hljs-variable": {
    "color": tertiary
  },
  "hljs-template-variable": {
    "color": tertiary
  },
  "hljs-regexp": {
    "color": secondary
  },
  "hljs-link": {
    "color": secondary
  },
  "hljs-symbol": {
    "color": error
  },
  "hljs-bullet": {
    "color": error
  },
  "hljs-built_in": {
    "color": tertiary
  },
  "hljs-builtin-name": {
    "color": tertiary
  },
  "hljs-meta": {
    "color": onSurfaceVariant,
    "fontWeight": "bold"
  },
  "hljs-deletion": {
    "background": errorContainer
  },
  "hljs-addition": {
    "background": primaryContainer
  },
  "hljs-emphasis": {
    "fontStyle": "italic"
  },
  "hljs-strong": {
    "fontWeight": "bold"
  }
};