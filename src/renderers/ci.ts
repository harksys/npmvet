import * as chalk from 'chalk';
import * as pluralize from 'pluralize';
import { render as inlineTableRenderer } from './inlinetable';

export const render: IRenderer = (depMap) =>
{
  /*
   * Filter packages to only the ones where versions mismatch
   */
  const filtered: IPackageDescriptorMap = {
    deps    : filterMatchingDependencies(depMap.deps),
    devDeps : filterMatchingDependencies(depMap.devDeps)
  };

  /*
   * Do we have any mismatches?
   */
  const hasMismatches = filtered.deps.length > 0
                          || filtered.devDeps.length > 0;

  /*
   * We have no mismatching packages, so lets
   * render the table and a nice message
   */
  if (!hasMismatches) {
    console.log(chalk.bold.bgGreen(' NPM Vet: No mismatching package versions \n'));

    inlineTableRenderer(depMap);
    process.exit(0);
  }

  /*
   * Render an error message and a table with only
   *  the mismatching verisons shown
   */
  const mismatchingLength = filtered.deps.length + filtered.devDeps.length;
  const phrase            = mismatchingLength > 1
                              ? pluralize('package')
                              : 'package';

  console.log(chalk.bold.bgRed(` NPM Vet: You have ${mismatchingLength} ${phrase} `
                               + `with mismatching versions \n`));

  inlineTableRenderer(filtered);
  process.exit(1);
};

/**
 * @param  {IPackageDescriptor[]} deps
 * @returns IPackageDescriptor
 */
let filterMatchingDependencies = (deps: IPackageDescriptor[]): IPackageDescriptor[] =>
  deps.filter(d => d.parsedDefinedVersion !== d.installedVersion);