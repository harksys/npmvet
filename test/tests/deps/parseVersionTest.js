describe('deps.parseVersion', () => {
  it('Should parse versions correctly', () => {
    var deps = require('../../../src/deps');

    expect(deps.parseVersion('1.0.0')).toBe('1.0.0');
    expect(deps.parseVersion('~1.0.0')).toBe('1.0.0');
    expect(deps.parseVersion('^1.0.0')).toBe('1.0.0');
    expect(deps.parseVersion('git+ssh://git@git.testing.abc:test-group/testmodule.git#v1.0.0')).toBe('1.0.0');
    expect(deps.parseVersion('git+ssh://git@git.testing.abc:test-group/testmodule.git')).toBe('Unknown');
  });
  it('Should parse workspace prefixes correctly', () => {
    var deps = require('../../../src/deps');
    expect(deps.parseVersion('workspace:1.0.0')).toBe('1.0.0');
  })
});
