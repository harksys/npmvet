![](./.github/banner.png?raw=true)

[![Build status](https://ci.appveyor.com/api/projects/status/e6e1rgx0i853jg8b/branch/master?svg=true)](https://ci.appveyor.com/project/andrewhathaway/npmvet/branch/master)


NPM Vet is a simple CLI tool to help vet your npm package versions. NPM Vet can be used locally, or as a CI build-step to prevent builds passing with mismatched package versions. To read more about NPM Vet, visit the [Hark website](https://harksys.com/labs/npm-vet-a-simple-cli-tool-for-checking-npm-package-versions).

## Installation

    $ npm install npmvet -g

## Usage

    Usage: npmvet [options]

    Options:

      -h, --help                 output usage information
      -V, --version              output the version number
      -p, --package <package>    package.json file location (Default: .)
      -m, --modules <modules>    node_modules folder location (Default: .)
      -r, --renderer <renderer>  Renderer to use (Default: inlinetable)
      -s, --strict               Using the CI renderer, fail build if any packages unlocked (Default: false, flag)

## Strict Mode

If you're using the CI renderer (see below) the `-s` flag will enable strict mode. In which builds will fail if versions are unlocked, not just unmatching.

## Renderers

Renderers are used to dictate how to output the data NPM Vet collects. The default is `inlinetable`.

### Inline Table

    $ npmvet -r inlinetable

The default renderer, `inlinetable` will print a table inline with your current process. You can use this locally to visualise package differences.

![](./.github/inlinetable.png?raw=true)

### CI

    $ npmvet -r ci

To prevent your CI builds passing with mismatched package versions, use the CI renderer. If any package version mismatches are found, the build will fail:

![](./.github/ci-error.png?raw=true)

Or if there are no mismatching package versions, your build will continue (and hopefully pass!):

![](./.github/ci-success.png?raw=true)

### Blessed

The `blessed` renderer will render a table inside a screen, that has be exited by the user to escape.

    $ npmvet -r blessed

![](./.github/blessed.png?raw=true)

### JSON
The `JSON` renderer will print a JSON array with match information for each package.

    $ npmvet -r json

```json
[
  {
    "name": "blessed",
    "packageVersion": "0.1.81",
    "installedVersion": "0.1.81",
    "matches": true,
    "locked": false
  },
  {
    "name": "chalk",
    "packageVersion": "1.1.3",
    "installedVersion": "1.1.3",
    "matches": true,
    "locked": false
  },
  {
    "name": "jest",
    "packageVersion": "18.1.0",
    "installedVersion": "18.1.0",
    "matches": true,
    "locked": false
  }
]
```

## Contributing

For information regarding contributing to this project, please read the [Contributing](./CONTRIBUTING.md) document.

## License

[MIT License](./LICENSE.md)
