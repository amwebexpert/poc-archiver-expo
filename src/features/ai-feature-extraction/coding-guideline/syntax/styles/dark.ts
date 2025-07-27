import { DARK_COLORS_SCHEME } from '~/theme/dark-colors-scheme';

const {
  surface,
  onSurface,
  primary,
  tertiary,
  onSurfaceVariant
} = DARK_COLORS_SCHEME;

export default {
  "hljs": {
    "display": "block",
    "overflowX": "auto",
    "padding": "0.5em",
    "background": surface,
    "color": onSurface
  },
  "hljs-keyword": {
    "color": primary,
    "fontWeight": "bold"
  },
  "hljs-selector-tag": {
    "color": primary,
    "fontWeight": "bold"
  },
  "hljs-literal": {
    "color": primary,
    "fontWeight": "bold"
  },
  "hljs-section": {
    "color": primary,
    "fontWeight": "bold"
  },
  "hljs-link": {
    "color": primary
  },
  "hljs-subst": {
    "color": onSurface
  },
  "hljs-string": {
    "color": tertiary
  },
  "hljs-title": {
    "color": tertiary,
    "fontWeight": "bold"
  },
  "hljs-name": {
    "color": tertiary,
    "fontWeight": "bold"
  },
  "hljs-type": {
    "color": tertiary,
    "fontWeight": "bold"
  },
  "hljs-attribute": {
    "color": tertiary
  },
  "hljs-symbol": {
    "color": tertiary
  },
  "hljs-bullet": {
    "color": tertiary
  },
  "hljs-built_in": {
    "color": tertiary
  },
  "hljs-addition": {
    "color": tertiary
  },
  "hljs-variable": {
    "color": tertiary
  },
  "hljs-template-tag": {
    "color": tertiary
  },
  "hljs-template-variable": {
    "color": tertiary
  },
  "hljs-comment": {
    "color": onSurfaceVariant
  },
  "hljs-quote": {
    "color": onSurfaceVariant
  },
  "hljs-deletion": {
    "color": onSurfaceVariant
  },
  "hljs-meta": {
    "color": onSurfaceVariant
  },
  "hljs-doctag": {
    "fontWeight": "bold"
  },
  "hljs-strong": {
    "fontWeight": "bold"
  },
  "hljs-emphasis": {
    "fontStyle": "italic"
  }
};