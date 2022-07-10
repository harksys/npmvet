var ts       = require('typescript');
var filename = require('./filename');

/**
 * Test PreProcessor
 *
 * Run our code through here to
 */
module.exports = {
  process: function(src, path) {
    /*
     * If the file is not of extension TS,
     * or we're a definition file, return the
     * unpreprocessed file.
     */
    if (!path.match(/\.(ts)$/)
      || path.match(/\.d\.ts$/)) {
      return {
        code: src
      };
    }

    /*
     * Transpile TS files with JSX support
     * in to common JS modules and for ES5.
     */
    return {
      code: ts.transpile(src, {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES5
      }, filename(path))
    }
  }
};
