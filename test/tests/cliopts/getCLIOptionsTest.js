jest.dontMock('fs');
jest.dontMock('path');

describe('cliopts.getCLIOptions', () => {
  it('Should get the correct CLI options from the passed object', () => {
    var cliopts = require('../../../src/cliopts');

    var input = {
      package: 'Cady',
      modules: 'Regina',
      renderer: 'Gretchen',
      otherOpt: 'Janis'
    };

    var expected = {
      package: 'Cady',
      modules: 'Regina',
      renderer: 'Gretchen',
      strict: false
    };

    expect(cliopts.getCLIOptions(input)).toEqual(expected);
  });
});
