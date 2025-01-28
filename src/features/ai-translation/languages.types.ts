// The full list of languages in FLORES-200 is available here:

import { SelectOption } from '~/components/drop-down-selector/drop-down-selector';

// @see https://github.com/facebookresearch/flores/blob/main/flores200/README.md#languages-in-flores-200
const LANGUAGES = {
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  zh: 'Chinese',
  ar: 'Arabic',
  ru: 'Russian',
  ja: 'Japanese',
  pt: 'Portuguese',
  it: 'Italian',
  ko: 'Korean',
  hi: 'Hindi',
  bn: 'Bengali',
  tr: 'Turkish',
  vi: 'Vietnamese',
  pl: 'Polish',
  nl: 'Dutch',
  sv: 'Swedish',
  fi: 'Finnish',
  no: 'Norwegian',
  da: 'Danish',
  he: 'Hebrew',
  id: 'Indonesian',
  th: 'Thai',
  cs: 'Czech',
  el: 'Greek',
  hu: 'Hungarian',
  ro: 'Romanian',
  uk: 'Ukrainian',
  sk: 'Slovak',
  sl: 'Slovenian',
};

export const LANGUAGE_OPTIONS: SelectOption[] = Object.entries(LANGUAGES)
  .map(([value, label]) => ({ label, value }))
  .sort((a, b) => a.label.localeCompare(b.label));
