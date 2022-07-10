describe('deps.extractVersionFromUrlTest', () => {
  it('Should extract version correctly from Url', () => {
    var deps = require('../../../src/deps');

    expect(deps.extractVersionFromUrl('git+ssh://git@git.testing.abc:test-group/testmodule.git#1.3.2')).toBe('1.3.2');
    expect(deps.extractVersionFromUrl('git+ssh://git@git.testing.abc:test-group/testmodule.git#v1.3.2')).toBe('1.3.2');
    expect(deps.extractVersionFromUrl('git+ssh://git@git.testing.abc:test-group/testmodule.git')).toBe('Unknown');
    expect(deps.extractVersionFromUrl('anythingelse')).toBe('anythingelse');
  });
  it('Should extract NPM aliases correctly', () => {
    var deps = require('../../../src/deps');

    expect(deps.extractVersionFromUrl('npm:packagename@0.1.1')).toBe('0.1.1');
  });
});
