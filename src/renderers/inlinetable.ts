import { table } from 'table';
import * as chalk from 'chalk';
import * as concat from 'lodash/concat';

export const render: IRenderer = (depMap) =>
{
  /*
   * Define the table headers
   */
  let rows = [[
    chalk.bold('Name'),
    chalk.bold('Defined Version'),
    chalk.bold('Installed Version'),
    chalk.bold('Matching'),
    chalk.bold('Locked')
  ]];

  /*
   * Generate the rest of the table rows with our data
   */
  rows = concat(rows, createRows(depMap.deps), createRows(depMap.devDeps));

  /*
   * Print the table
   */
  console.log(table(rows));
};

/**
 * @param  {IPackageDescriptor[]} pkgDescriptor
 * @returns string
 */
let createRows = (pkgDescriptor: IPackageDescriptor[]): string[][] =>
  pkgDescriptor.map(pkg => ([
    pkg.name,
    pkg.parsedDefinedVersion,
    pkg.installedVersion,
    (pkg.parsedDefinedVersion !== pkg.installedVersion
      ? chalk.bold.bgRed(' Mismatch ')
      : chalk.bold.bgGreen(' Matching ')),
    (pkg.locked
      ? chalk.bold.bgGreen('  Locked  ')
      : chalk.bold.bgRed(' Unlocked '))
  ]));