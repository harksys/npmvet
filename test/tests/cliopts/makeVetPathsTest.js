jest.dontMock('fs');
jest.dontMock('path');

describe('cliopts.makeVetPaths', () => {
  it('Should create resolved paths with empty CLI opts', () => {
    var path = require('path');
    var cliopts = require('../../../src/cliopts');

    var cliOpts = {
      package: '',
      modules: ''
    };

    var expectedPaths = {
      packagePath: path.resolve(process.cwd(), 'package.json'),
      modulesPath: path.resolve(process.cwd(), 'node_modules')
    };

   var results = cliopts.makeVetPaths(cliOpts);

    expect(results.packagePath).toBe(expectedPaths.packagePath);
    expect(results.modulesPath).toBe(expectedPaths.modulesPath);
  });

  it('Should create resolved paths with passed CLI opts', () => {
    var path = require('path');
    var cliopts = require('../../../src/cliopts');

    var cliOpts = {
      package: 'test',
      modules: 'test'
    };

    var expectedPaths = {
      packagePath: path.resolve(process.cwd(), cliOpts.package, 'package.json'),
      modulesPath: path.resolve(process.cwd(), cliOpts.modules, 'node_modules')
    };

    var results = cliopts.makeVetPaths(cliOpts);

    expect(results.packagePath).toBe(expectedPaths.packagePath);
    expect(results.modulesPath).toBe(expectedPaths.modulesPath);
  });
});
