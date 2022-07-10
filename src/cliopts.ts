import * as path from 'path';
import { Command } from 'commander';

/**
 * @param  {Command} prog
 * @returns ICLIOpts
 */
export const getCLIOptions = (prog: Command): ICLIOpts =>
  ({
    package: prog['package'] ?? '',
    modules: prog['modules'] ?? '',
    renderer: prog['renderer'] ?? 'inlinetable',
    strict: typeof prog['strict'] === 'boolean'
      ? prog['strict']
      : false
  });

/**
 * @param  {ICLIOpts} opts
 * @returns IVetPaths
 */
export const makeVetPaths = (opts: ICLIOpts): IVetPaths =>
  ({
    packagePath: path.resolve(process.cwd(), opts.package ?? '', 'package.json'),
    modulesPath: path.resolve(process.cwd(), opts.modules ?? '', 'node_modules')
  });
