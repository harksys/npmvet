jest.dontMock('fs');
jest.dontMock('path');
jest.dontMock(SRC_DIRECTORY + '/filesys');

describe('filesys.folderExists', () =>
{

  it('Should return true for a folder that does exist', () =>
  {
    var filesys = require(SRC_DIRECTORY + '/filesys');

    expect(filesys.folderExists(__dirname)).toBe(true);
  });

  it('Should return false for a folder that does not exist', () =>
  {
    var path    = require('path');
    var filesys = require(SRC_DIRECTORY + '/filesys');

    var filePath = path.resolve(__dirname, '../fakeFolder');

    expect(filesys.folderExists(filePath)).toBe(false);
  });

});