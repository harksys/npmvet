import {
  createDependencyMap,
  packageDescriptorMapCheckInstall,
  dependencyMapToPackageDescriptorMap,
} from './deps';

/**
 * @param  {{}} packageFile
 * @param  {string} modulesPath
 * @returns IPackageDescriptorMap
 */
export default function vet(packageFile: {}, modulesPath: string): IPackageDescriptorMap
{
  let dependencyMap        = createDependencyMap(packageFile);
  let packageDescriptorMap = dependencyMapToPackageDescriptorMap(dependencyMap);

  return packageDescriptorMapCheckInstall(packageDescriptorMap, modulesPath);
};