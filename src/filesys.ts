import * as fs from 'fs';

/**
 * @param  {string} path
 * @returns boolean
 */
export const fileExists = (path: string): boolean =>
  fs.existsSync(path);

/**
 * @param  {string} path
 * @returns boolean
 */
export const folderExists = (path: string): boolean => {
  try {
    return fs
      .lstatSync(path)
      .isDirectory();
  } catch(e) {
    return false;
  }
};
