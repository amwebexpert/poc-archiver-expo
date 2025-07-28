declare module 'parse-svg-path' {
  function pathParser(path: string): [string, number, number][];
  export default pathParser;
} 