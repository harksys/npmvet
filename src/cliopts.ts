import * as path from 'path';
import * as program from 'commander';

/**
 * @param  {program.ICommand} prog
 * @returns ICLIOpts
 */
export function getCLIOptions(prog: program.ICommand): ICLIOpts
{
  let opts: ICLIOpts = {
    package : prog['package'],
    modules : prog['modules']
  };

  return opts;
};

/**
 * @param  {ICLIOpts} opts
 * @returns IVetPaths
 */
export function makeVetPaths(opts: ICLIOpts): IVetPaths
{
  let paths: IVetPaths = {
    packagePath : path.resolve(process.cwd(), opts.package, 'package.json'),
    modulesPath : path.resolve(process.cwd(), opts.modules, 'node_modules')
  };

  return paths;
};