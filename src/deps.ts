import * as path from 'path';
import * as semver from 'semver';
import * as get from 'lodash/get';

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
 * @param  {IDependency} dep
 * @returns IPackageDescriptor
 */
export function dependencyToPackageDescriptor(dep: IDependency): IPackageDescriptor
{
  let packageDescriptor: IPackageDescriptor = {
    name                 : dep.name,
    definedVersion       : dep.version,
    parsedDefinedVersion : '',
    installedVersion     : null,
    installed            : false,
    locked               : semver.clean(dep.version) !== null
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