# Inspect Stack Configuration

Show stack configuration within the given command path.

## Usage

```shell
tkm stacks inspect configuration [command-path] \
  [--interactive|-i] \
  [--output <format>]
```

## Positional arguments

- `command-path`
  - Command path to select which stacks to include.
  - Optional, by default, Takomo lists all stacks.

## Options

In addition to the [common options](./common-options), this command has the following options.

- `--interactive`, `-i`
  - Choose the command path using autocompleting search.
- `--output <format>`
  - Print the result from the command using this format
  - Supported values: `text`, `json`, `yaml`

## Examples

Show configuration of all stacks:

```shell
tkm stacks inspect configuration
```

Show configuration of stacks within the given command path:

```shell
tkm stacks inspect configuration /prod
```