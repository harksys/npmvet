jest.dontMock(SRC_DIRECTORY + '/deps');

describe('deps.extractVersionFromUrlTest', () =>
{

  it('Should extract version correctly from Url', () =>
  {
    var deps = require(SRC_DIRECTORY + '/deps');

    expect(deps.extractVersionFromUrl('git+ssh://git@git.testing.abc:test-group/testmodule.git#1.3.2')).toBe('1.3.2');
    expect(deps.extractVersionFromUrl('git+ssh://git@git.testing.abc:test-group/testmodule.git#v1.3.2')).toBe('1.3.2');
    expect(deps.extractVersionFromUrl('git+ssh://git@git.testing.abc:test-group/testmodule.git')).toBe('Unknown');
    expect(deps.extractVersionFromUrl('anythingelse')).toBe('anythingelse');
  });

});
