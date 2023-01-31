#!/usr/bin/env node

import { program } from 'commander';

import {
  fileExists,
  folderExists
} from './filesys';
import {
  makeVetPaths,
  getCLIOptions
} from './cliopts';

import vet from './vet';
import { getRenderer } from './renderers/index';

const vetPkgFile = require('../package.json');

/*
 * Setup the CLI args
 */
program
  .option('-p, --package <package>', 'package.json file location')
  .option('-m, --modules <modules>', 'node_modules folder location')
  .option('-r, --renderer <renderer>', 'Renderer to use')
  .option('-s, --strict', 'Using the CI renderer, fail build if any packages unlocked')
  .version(vetPkgFile.version);

/*
 * Setup the paths using the CLI options and
 * validate that the package.json file and
 * node_modules folder exists.
 */
const opts = getCLIOptions(program.parse().opts());
const paths = makeVetPaths(opts);

if (!fileExists(paths.packagePath)) {
  throw new Error(`Cannot find package.json file at ${paths.packagePath}`);
}

if (!folderExists(paths.modulesPath)) {
  throw new Error(`Cannot find node_modules file at ${paths.packagePath}`);
}

/*
 * Get the renderer we'll use
 */
let renderer = getRenderer(opts.renderer);

/*
 * Require the package.json file
 */
const packageFile = require(paths.packagePath);

/*
 * Create the package descriptor map and render
 */
let map = vet(packageFile, paths.modulesPath);
renderer(map, opts);
