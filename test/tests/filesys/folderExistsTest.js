jest.dontMock('fs');
jest.dontMock('path');

describe('filesys.folderExists', () => {
  it('Should return true for a folder that does exist', () => {
    var filesys = require('../../../src/filesys');
    expect(filesys.folderExists(__dirname)).toBe(true);
  });

  it('Should return false for a folder that does not exist', () => {
    var path = require('path');
    var filesys = require('../../../src/filesys');
    var filePath = path.resolve(__dirname, '../fakeFolder');

    expect(filesys.folderExists(filePath)).toBe(false);
  });
});
