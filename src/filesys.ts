import * as fs from 'fs';

/**
 * @param  {string} path
 * @returns boolean
 */
export function fileExists(path: string): boolean
{
  return fs.existsSync(path);
};

/**
 * @param  {string} path
 * @returns boolean
 */
export function folderExists(path: string): boolean
{
  return fs.lstatSync(path).isDirectory();
};