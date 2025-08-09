# Undeploy Stacks

Undeploy (remove) stacks within the given command path. 

Takomo also removes stacks depending on the stacks within the command path, even if they are outside the given command path. Takomo arranges the stacks in removal order by stack dependencies, ensuring that it removes the stacks in the correct order and in parallel when possible.

## Usage

```shell
tkm stacks undeploy [command-path] \
  [--ignore-dependencies] \
  [--interactive|-i] \
  [--output <format>]
```

## Positional arguments

- `command-path`
  - Command path to select which stacks to undeploy.
  - Optional, by default, Takomo undeploys all stacks.

## Options

In addition to the [common options](./common-options), this command has the following options.

- `--ignore-dependencies`
  - Ignore stack dependencies. By default, when a stack is removed, its dependants are removed first, and then the stack itself. In some exceptional cases, you might want to remove just one stack and skip its dependants.
  - Bear in mind that this option is supported only when exactly one stack is removed. Ignoring dependants may lead into unexpected results, so you should use this option only in exceptional circumstances.
- `--interactive`, `-i`
  - Choose the command path using autocompleting search.
- `--output <format>`
  - Print the command result using this format
  -Supported values: `text`, `json`, `yaml`

## IAM permissions

These are the minimum IAM permissions required to run this command.

```yaml
# Minimum permissions. Additional permissions are needed to actually 
# remove the resources defined in CloudFormation templates.
Statement: 
  - Sid: Stacks
    Effect: Allow
    Action:
      - cloudformation:DescribeStackEvents
      - cloudformation:DeleteStack
      - cloudformation:DescribeStacks
    Resource: "*"

  # IAM permissions needed only if command roles are used  
  # Specify resource to restrict access to specific roles.  
  - Sid: IAM
    Effect: Allow
    Action:
      - sts:AssumeRole
    Resource: "*" 
```

## Examples

Undeploy all stacks:

```shell
tkm stacks undeploy
```

Undeploy stacks within the given command path:

```shell
tkm stacks undeploy /dev
```

Undeploy only **/dev/vpc.yml** stack and its dependants:

```shell
tkm stacks undeploy /dev/vpc.yml
```

The region part must be specified if the stack has more than one region and you want to undeploy it from only one region.

```shell
tkm stacks undeploy /dev/vpc.yml/eu-west-1
```

Undeploy exactly one stack and skip its dependants:

```shell
tkm stacks undeploy /cloudtrail.yml --ignore-dependencies
```
