![](./.github/banner.png?raw=true)

NPM Vet is a simple CLI tool to help vet your npm package versions.

## Installation

    npm install npmvet -g

## Usage

    Usage: npmvet [options]

    Options:

      -h, --help                 output usage information
      -V, --version              output the version number
      -p, --package <package>    package.json file location (Default: .)
      -m, --modules <modules>    node_modules folder location (Default: .)
      -r, --renderer <renderer>  Renderer to use (Default: blessed)

## Renderers

Renderers are used to dictate how to output the data NPM Vet collects. The default is "blessed".

### Blessed

    npmvet -r blessed

![](./.github/npmvet.png?raw=true)

## Contributing

For information regarding contributing to this project, please read the [Contributing](./CONTRIBUTING.md) document.

## License

[MIT License](./LICENSE.md)
