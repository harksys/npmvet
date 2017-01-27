import * as get from 'lodash/get';

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