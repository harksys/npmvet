import * as path from 'path';
import * as semver from 'semver';
import { get } from 'lodash';

import { fileExists } from './filesys';

/**
 * @param  {string} packageJsonPath
 * @returns IDependencyMap
 */
export function createDependencyMap(packageFile: any): IDependencyMap
{
  let deps    = get(packageFile, `dependencies`, {});
  let devDeps = get(packageFile, `devDependencies`, {});

  let dependencyMap: IDependencyMap = {
    deps    : toDependencies(deps),
    devDeps : toDependencies(devDeps)
  };

  return dependencyMap;
};

/**
 * @param  {{}} object
 * @returns IDependency
 */
export function toDependencies(object: {}): IDependency[]
{
  return Object.keys(object)
               .map(packageName => ({
                 name    : packageName,
                 version : object[packageName]
               }));
};

/**
 * @param  {string} version
 * @returns string
 */
export function parseVersion(version: string): string
{
  // Tests for whether the version starts with ~ (tilde) or ^ (caret)
  if (/^[~^]/.test(version)) {
    return version.substring(1);
  }

  return extractVersionFromUrl(version);
};

/**
 * @param  {string} version
 * @returns string
 */
export function extractVersionFromUrl(version: string) : string
{
  // Regex for checking whether this version references a git ssh url
  const regex = /(?:git|ssh|https?|git@[-\w.]+):(\/\/)?(.*?)(\.git)(\/?|\#[-\d\w._]+?)$/
  if (regex.test(version)) {
    // If a version number is present, then return that version number, else return 'Unknown'

    // get the last group which is the #versionspec at the end
    let lastGroup = version.match(regex)[4];
    if(!lastGroup) {
      return "Unknown"; //no #versionspec
    }
    let versionTag = lastGroup.replace('#', ''); //strip off the '#'
    if (versionTag.indexOf('v') == 0) {
      return versionTag.substring(1); //strip off the leading 'v' if present
    } else {
      return versionTag;
    }
  }
  return version;
}

/**
 * @param  {IDependency} dep
 * @returns IPackageDescriptor
 */
export function dependencyToPackageDescriptor(dep: IDependency): IPackageDescriptor
{
  let packageDescriptor: IPackageDescriptor = {
    name                 : dep.name,
    definedVersion       : extractVersionFromUrl(dep.version),
    parsedDefinedVersion : parseVersion(dep.version),
    installedVersion     : null,
    installed            : false,
    locked               : semver.clean(extractVersionFromUrl(dep.version)) !== null
  };

  return packageDescriptor;
};

/**
 * @param  {IDependencyMap} depMap
 * @returns IPackageDescriptorMap
 */
export function dependencyMapToPackageDescriptorMap(depMap: IDependencyMap): IPackageDescriptorMap
{
  let { deps, devDeps } = depMap;

  let map: IPackageDescriptorMap = {
    deps    : deps.map(dependencyToPackageDescriptor),
    devDeps : devDeps.map(dependencyToPackageDescriptor)
  };

  return map;
};

/**
 * @param  {IPackageDescriptor} descriptor
 * @param  {string} modulesPath
 * @returns IPackageDescriptor
 */
export function packageDescriptorCheckInstall(descriptor: IPackageDescriptor,
                                              modulesPath: string): IPackageDescriptor
{
  const packagePath = path.resolve(modulesPath, descriptor.name, 'package.json');
  const installed   = fileExists(packagePath);

  if (!installed) {
    return descriptor;
  }

  const pkg = require(packagePath);
  descriptor.installed        = true;
  descriptor.installedVersion = pkg.version;

  return descriptor;
};

/**
 * @param  {IPackageDescriptorMap} map
 * @param  {string} modulesPath
 * @returns IPackageDescriptorMap
 */
export function packageDescriptorMapCheckInstall(map: IPackageDescriptorMap,
                                                 modulesPath: string): IPackageDescriptorMap
{
  let { deps, devDeps } = map;

  let newMap: IPackageDescriptorMap = {
    deps    : deps.map(m => packageDescriptorCheckInstall(m, modulesPath)),
    devDeps : devDeps.map(m => packageDescriptorCheckInstall(m, modulesPath)),
  };

  return newMap;
};

/**
 * @param  {string} version
 * @param  {string} expected
 * @returns boolean
 */
export function isMatchingVersion(version: string, expected: string): boolean
{
  return version === expected;
};
