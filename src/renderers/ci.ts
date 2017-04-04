import * as chalk from 'chalk';
import * as pluralize from 'pluralize';
import { render as inlineTableRenderer } from './inlinetable';

import { isMatchingVersion } from '../deps';

export const render: IRenderer = (depMap, cliOpts) =>
{
  /*
   * Filter packages to only the ones where versions mismatch
   */
  const filteredMatching: IPackageDescriptorMap = {
    deps    : filterMatchingDependencies(depMap.deps),
    devDeps : filterMatchingDependencies(depMap.devDeps)
  };

  const filteredUnlocked: IPackageDescriptorMap = {
    deps : filterLockedDependencies(depMap.deps),
    devDeps : filterLockedDependencies(depMap.devDeps)
  };


  /*
   * Do we have any mismatches or unlocked?
   */
  const hasMismatches = filteredMatching.deps.length > 0
                          || filteredMatching.devDeps.length > 0;

  const hasUnlocked = filteredUnlocked.deps.length > 0
                        || filteredUnlocked.devDeps.length > 0;

  /*
   * We have no mismatching packages, so lets
   * render the table and a nice message
   */
  if (!cliOpts.strict && !hasMismatches) {
    sendSuccessResponse(depMap, ' NPM Vet: No mismatched package versions ');
  }

  /*
   * If we're in strict mode, and nothing is unlocked,
   * then render the table and a nice message.
   */
  if (cliOpts.strict && !hasUnlocked) {
    sendSuccessResponse(depMap, ' NPM Vet: No unlocked packages or mismatched package versions ');
  }

  /*
   * Whenever we get here, we either have no
   * some mismatches or some unlocked packages
   * in strict mode.
   */
  const mismatchingLength = filteredMatching.deps.length + filteredMatching.devDeps.length;
  const unlockedLength    = filteredUnlocked.deps.length + filteredUnlocked.devDeps.length;

  const phrase = mismatchingLength > 1
                  ? pluralize('package')
                  : 'package';

  /*
   * Render an error message and a table with only
   * the mismatching verisons shown if any mismatches
   * are there.
   */
  if (mismatchingLength > 0) {
    sendErrorResponse(filteredMatching, ` NPM Vet: You have ${mismatchingLength} ${phrase} `
                                        + `with mismatched versions `);
  }

  /*
   * We must be in strict mode with some unlocked
   * packages, lets fail.
   */
  sendErrorResponse(filteredUnlocked, ` NPM Vet: You have ${unlockedLength} ${phrase} `
                                        + `that are currently unlocked versions `);
};

/**
 * @param  {IPackageDescriptorMap} depMap
 * @param  {string} message
 */
let sendSuccessResponse = (depMap: IPackageDescriptorMap, message: string) =>
{
  console.log(chalk.bold.bgGreen(message));

  inlineTableRenderer(depMap);
  process.exit(0);
};

/**
 * @param  {IPackageDescriptorMap} filteredMatching
 * @param  {string} message
 */
let sendErrorResponse = (filteredMatching: IPackageDescriptorMap, message: string) =>
{
  console.log(chalk.bold.bgRed(message));

  inlineTableRenderer(filteredMatching);
  process.exit(1);
};

/**
 * @param  {IPackageDescriptor[]} deps
 * @returns IPackageDescriptor
 */
let filterMatchingDependencies = (deps: IPackageDescriptor[]): IPackageDescriptor[] =>
  deps.filter(d => !isMatchingVersion(d.parsedDefinedVersion, d.installedVersion));

/**
 * @param  {IPackageDescriptor[]} deps
 * @returns IPackageDescriptor
 */
let filterLockedDependencies = (deps: IPackageDescriptor[]): IPackageDescriptor[] =>
  deps.filter(d => !d.locked);