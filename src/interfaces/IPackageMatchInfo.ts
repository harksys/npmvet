
interface IPackageMatchInfo
{
  name: string;

  packageVersion: string;

  installedVersion: string;

  matches: boolean;

  locked: boolean;
};