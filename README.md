![](./.github/banner.png?raw=true)

NPM Vet is a simple CLI tool to help vet your npm package versions. NPM Vet can be used in development, or as a CI tool to prevent builds passing with mismatching package versions.

## Installation

    npm install npmvet -g

## Usage

    Usage: npmvet [options]

    Options:

      -h, --help                 output usage information
      -V, --version              output the version number
      -p, --package <package>    package.json file location (Default: .)
      -m, --modules <modules>    node_modules folder location (Default: .)
      -r, --renderer <renderer>  Renderer to use (Default: inlinetable)

## Renderers

Renderers are used to dictate how to output the data NPM Vet collects. The default is "inlinetable".

### Inline Table

    npmvet -r inlinetable

The default renderer, `inlinetable` will print a table inline with your current process. You can use this locally to visualise package differences.

![](./.github/inlinetable.png?raw=true)

### CI

    npmvet -r ci

If you plan on using NPM Vet with a CI build, to ensure that builds on pass if package verisons match, then use this option.
It will fail a build if any mismatches are found:

![](./.github/ci-error.png?raw=true)

Or if there are no mismatches, your build will continue:

![](./.github/ci-success.png?raw=true)

### Blessed

The `blessed` renderer will render a table inside a screen, that has be exited by the user to escape.

    npmvet -r blessed

![](./.github/npmvet.png?raw=true)

## Contributing

For information regarding contributing to this project, please read the [Contributing](./CONTRIBUTING.md) document.

## License

[MIT License](./LICENSE.md)
