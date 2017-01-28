#!/usr/bin/env node
///<reference path="../typings/index.d.ts" />

import * as program from 'commander';

import {
  fileExists,
  folderExists
} from './filesys';
import {
  makeVetPaths,
  getCLIOptions
} from './cliopts';

import vet from './vet';
import { render as blessedRenderer } from './renderers/blessed';

/*
 * Setup the CLI args
 */
program
  .version('1.0.0')
  .option('-p, --package <package>', 'package.json file location', '')
  .option('-m, --modules <modules>', 'node_modules folder location', '');

/*
 * Setup the paths using the CLI options and
 * validate that the package.json file and
 * node_modules folder exists
 */
const opts  = getCLIOptions(program.parse(process.argv));
const paths = makeVetPaths(opts);

if (!fileExists(paths.packagePath)) {
  throw new Error(`Cannot find package.json file at ${paths.packagePath}`);
}

if (!folderExists(paths.modulesPath)) {
  throw new Error(`Cannot find node_modules file at ${paths.packagePath}`);
}

/*
 * Require the package.json file
 */
const packageFile = require(paths.packagePath);

/*
 * Create the package descriptor map and render
 */
let map = vet(packageFile, paths.modulesPath);
blessedRenderer(map);