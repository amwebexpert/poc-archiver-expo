import 'react-native-url-polyfill/auto';
import { Buffer } from 'buffer';
import 'react-native-skia-offscreencanvas/polyfill';
import 'text-encoding-polyfill'; // support TextEncoder
import XRegExp from 'xregexp';

global.Buffer = Buffer;

// replace default RegExp to support Unicode
const nativeRegExp = global.RegExp;
const newRegExp = (...args: [string, string?]) => {
  global.RegExp = nativeRegExp;
  const result = XRegExp(...(args as [string, string?]));
  global.RegExp = newRegExp as RegExpConstructor;
  return result;
};
global.RegExp = newRegExp as RegExpConstructor;

console.info('===> polyfills setup completed');
