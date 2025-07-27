import { DARK_COLORS_SCHEME as colors } from './dark-colors-scheme';

export const markdownDarkTheme = {
  body: {
    color: colors.onBackground,
  },
  heading1: {
    color: colors.primary,
    fontSize: 24,
    marginBottom: 8,
  },
  heading2: {
    color: colors.primary,
    fontSize: 20,
    marginBottom: 6,
  },
  heading3: {
    color: colors.primary,
    fontSize: 18,
    marginBottom: 4,
  },
  strong: {
    color: colors.onBackground,
    fontWeight: '700' as const,
  },
  em: {
    color: colors.onBackground,
    fontStyle: 'italic' as const,
  },
  link: {
    color: colors.tertiary,
    textDecorationLine: 'underline' as const,
  },
  blockquote: {
    backgroundColor: colors.surfaceVariant,
    borderLeftColor: colors.primary,
    borderLeftWidth: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: colors.onSurfaceVariant,
  },
  code_inline: {
    backgroundColor: colors.surfaceVariant,
    color: colors.onSurfaceVariant,
    padding: 4,
    borderRadius: 4,
    fontFamily: 'monospace',
  },
  fence: {
    backgroundColor: colors.surface,
    color: colors.onSurfaceVariant,
    padding: 8,
    borderRadius: 6,
    fontFamily: 'monospace',
  },
  list_item: {
    color: colors.onBackground,
  },
};
