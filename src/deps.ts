import * as path from 'path';
import * as semver from 'semver';

import { fileExists } from './filesys';

// Regex for checking whether this version references a git ssh url
const urlRegex = /(?:git|ssh|https?|git@[-\w.]+):(\/\/)?(.*?)(\.git)(\/?|\#[-\d\w._]+?)$/
// Regex for checking whether this version references an alias
const npmAliasRegex = /npm:.*@([\^\~]?[0-9]+(\.?[0-9]?)+)/

/**
 * @param  {string} packageJsonPath
 * @returns IDependencyMap
 */
export const createDependencyMap = (packageFile: any): IDependencyMap => {
  let deps = packageFile?.dependencies ?? {};
  let devDeps = packageFile?.devDependencies ?? {};

  return {
    deps: toDependencies(deps),
    devDeps: toDependencies(devDeps)
  };
};

/**
 * @param  {{}} object
 * @returns IDependency
 */
export const toDependencies = (object: {}): IDependency[] =>
  Object
    .keys(object)
    .map(packageName =>
      ({
        name: packageName,
        version: object[packageName]
      }));

/**
 * @param  {string} version
 * @returns string
 */
export const parseVersion = (version: string): string => {
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
export const extractVersionFromUrl = (version: string): string => {
  const npmAliasVersion = extractNpmAliasVersion(version);
  if (npmAliasVersion !== null) {
    return npmAliasVersion;
  }

  if (!urlRegex.test(version)) {
    return version.indexOf('workspace:') === 0
      ? version.replace('workspace:', '')
      : version;
  }

  // Gett the last group which is the #versionspec at the end
  let lastGroup = version.match(urlRegex)[4];
  if (!lastGroup) {
    return 'Unknown';
  }

  let versionTag = lastGroup.replace('#', ''); //strip off the '#'
  return versionTag.indexOf('v') === 0
    ? versionTag.substring(1) //strip off the leading 'v' if present
    : versionTag;
}

/**
 * @param  {IDependency} dep
 * @returns IPackageDescriptor
 */
export const dependencyToPackageDescriptor = (dep: IDependency): IPackageDescriptor => {
  const b = ({
    name: dep.name,
    definedVersion: extractVersionFromUrl(dep.version),
    parsedDefinedVersion: parseVersion(dep.version),
    installedVersion: null,
    installed: false,
    locked: semver.clean(extractVersionFromUrl(dep.version)) !== null
  });

  return b;
}

/**
 * @param  {IDependencyMap} depMap
 * @returns IPackageDescriptorMap
 */
export const dependencyMapToPackageDescriptorMap = (depMap: IDependencyMap): IPackageDescriptorMap => {
  let { deps, devDeps } = depMap;

  return {
    deps: deps.map(dependencyToPackageDescriptor),
    devDeps: devDeps.map(dependencyToPackageDescriptor)
  };
};

/**
 * @param  {IPackageDescriptor} descriptor
 * @param  {string} modulesPath
 * @returns IPackageDescriptor
 */
export const packageDescriptorCheckInstall = (
  descriptor: IPackageDescriptor,
  modulesPath: string
): IPackageDescriptor => {
  const packagePath = path.resolve(modulesPath, descriptor.name, 'package.json');
  const installed = fileExists(packagePath);

  if (!installed) {
    return descriptor;
  }

  const pkg = require(packagePath);
  descriptor.installed = true;
  descriptor.installedVersion = pkg.version;

  return descriptor;
};

/**
 * @param  {IPackageDescriptorMap} map
 * @param  {string} modulesPath
 * @returns IPackageDescriptorMap
 */
export const packageDescriptorMapCheckInstall = (
  map: IPackageDescriptorMap,
  modulesPath: string
): IPackageDescriptorMap =>  {
  let { deps, devDeps } = map;

  return {
    deps: deps.map(m => packageDescriptorCheckInstall(m, modulesPath)),
    devDeps: devDeps.map(m => packageDescriptorCheckInstall(m, modulesPath)),
  };
};

/**
 * @param  {string} version
 * @param  {string} expected
 * @returns boolean
 */
export const isMatchingVersion = (version: string, expected: string): boolean =>
  version === expected;

/**
 * @param  {string} version
 * @returns string
 */
const extractNpmAliasVersion = (version: string): string => {
  if (!npmAliasRegex.test(version)) {
    return null;
  }

  const i = /^.*[~^].*$/.test(version)
    ? version.indexOf('~') > 0 ? version.indexOf('~') : version.indexOf('^')
    : version.lastIndexOf('@');

  return version.substring(i + 1);
}
