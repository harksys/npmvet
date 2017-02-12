import { isMatchingVersion } from '../deps';

export const render: IRenderer = (depMap) =>
{
  /*
   * Merge dependencies and dev dependencies
   */
  const allPackages = depMap.deps.concat(depMap.devDeps);

  /*
   * Generate match info for each package
   */
  const packageMatchInfos = createMatchInfos(allPackages);

  /*
   * Generate indented JSON string
   */
  const output = JSON.stringify(packageMatchInfos, undefined, 2)

  /*
   * Print the JSON string
   */
  console.log(output);
};

/**
 * @param  {IPackageDescriptor[]} pkgDescriptor
 * @returns {IPackageMatchInfo[]}
 */
let createMatchInfos = (pkgDescriptor: IPackageDescriptor[]): IPackageMatchInfo[] =>
  pkgDescriptor.map(pkg => ({
    name             : pkg.name,
    packageVersion   : pkg.parsedDefinedVersion,
    installedVersion : pkg.installedVersion,
    matches          : isMatchingVersion(pkg.parsedDefinedVersion, pkg.installedVersion),
    locked           : pkg.locked
  }));
