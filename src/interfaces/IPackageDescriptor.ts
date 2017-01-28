
interface IPackageDescriptor
{
  name: string;

  definedVersion: string;

  parsedDefinedVersion: string;

  installedVersion: string;

  installed: boolean;

  locked: boolean;
};