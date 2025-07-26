// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
// eslint-disable-next-line no-undef
const config = getDefaultConfig(__dirname);

const EXTRA_EXTENTSIONS = ["js_", "html", "csv", "md"];

config.resolver.assetExts.push(...EXTRA_EXTENTSIONS);
config.resolver.sourceExts = config.resolver.sourceExts.filter(
  (ext) => !EXTRA_EXTENTSIONS.includes(ext)
);

module.exports = config;
