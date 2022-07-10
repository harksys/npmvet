import { table } from 'table';
import * as chalk from 'chalk';
import { concat } from 'lodash';

import { isMatchingVersion } from '../deps';

export const render: IRenderer = (depMap) => {
  /*
   * Define the table headers
   */
  let rows = [[
    chalk.bold('Name'),
    chalk.bold('Package Version'),
    chalk.bold('Installed Version'),
    chalk.bold('Status'),
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
    (!isMatchingVersion(pkg.parsedDefinedVersion, pkg.installedVersion)
      ? chalk.bold.bgRed(' Mismatch ')
      : chalk.bold.bgGreen(' Matching ')),
    (pkg.locked
      ? chalk.bold.bgGreen('  Locked  ')
      : chalk.bold.bgRed(' Unlocked '))
  ]));
