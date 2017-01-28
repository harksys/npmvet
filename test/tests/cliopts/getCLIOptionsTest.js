jest.dontMock('fs');
jest.dontMock('path');
jest.dontMock(SRC_DIRECTORY + '/cliopts');

describe('cliopts.getCLIOptions', () =>
{

  it('Should get the correct CLI options from the passed object', () =>
  {
    var cliopts = require(SRC_DIRECTORY + '/cliopts');

    var input = {
      package  : 'Cady',
      modules  : 'Regina',
      renderer : 'Gretchen',
      otherOpt : 'Janis'
    };

    var expected = {
      package  : 'Cady',
      modules  : 'Regina',
      renderer : 'Gretchen'
    };

    expect(cliopts.getCLIOptions(input)).toEqual(expected);
  });

});
