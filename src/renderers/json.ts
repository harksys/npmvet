export const render: IRenderer = (depMap) =>
{
  /*
   * Merge dependencies and dev dependencies
   */
  const allPackages = depMap.deps.concat(depMap.devDeps);

  /*
   * Print the JSON
   */
  console.log(JSON.stringify(createMatchInfos(allPackages), undefined, 2));
};

/**
 * @param  {IPackageDescriptor[]} pkgDescriptor
 * @returns {IPackageMatchInfo[]}
 */
let createMatchInfos = (pkgDescriptor: IPackageDescriptor[]): IPackageMatchInfo[] =>
  pkgDescriptor.map(pkg => ({    
    name: pkg.name,
    packageVersion: pkg.parsedDefinedVersion,
    installedVersion: pkg.installedVersion,
    matches: pkg.parsedDefinedVersion !== pkg.installedVersion,
    locked: pkg.locked
  }));
  