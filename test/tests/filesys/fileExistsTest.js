jest.dontMock('fs');
jest.dontMock('path');

describe('filesys.fileExists', () => {
  it('Should return true for a file that does exist', () => {
    var path = require('path');
    var filesys = require('../../../src/filesys');

    var filePath = path.resolve(__dirname, 'fileExistsTest.js');

    expect(filesys.fileExists(filePath)).toBe(true);
  });

  it('Should return false for a file that does not exist', () => {
    var path = require('path');
    var filesys = require('../../../src/filesys');

    var filePath = path.resolve(__dirname, 'fakeFileExistsTests.js');

    expect(filesys.fileExists(filePath)).toBe(false);
  });
});
