# Emit Stack Templates

Emit stack templates within the given command path to stdout or to files.

This operation is like [deploy](deploy-stacks) but doesn't perform actual deploy for stacks. Instead, stack templates are written to stdout or to a specified dir. Stack parameters are resolved and hooks are executed just like in deploy operation. In some cases, especially when stacks have dependencies, this will cause problems as resolvers might try to get values for parameters from stacks that do not exist yet. If you face these issues, you can use `--skip-parameters` and `--skip-hooks` options to skip parameter resolving and executing hooks, respectively. Bear in mind though that using these options might break something in your templates if you are using dynamic templating. 

## Usage

```shell
tkm stacks emit [command-path] \
  [--ignore-dependencies] \
  [--interactive|-i] \
  [--out-dir <path to dir where templates are emitted>]
  [--skip-parameters] \
  [--skip-hooks]
```

## Positional arguments

- `command-path`
  - Command path to select which stacks to include in the operation.
  - Optional, all stacks are included by default.

## Options

In addition to the [common options](./common-options), this command has the following options.

- `--ignore-dependencies`
  - Ignore stack dependencies.
- `--interactive, -i`
  - Choose the command path using autocompleting search.
- `--out-dir <path to dir where templates are emitted>`
  - Path to directory where template files are written.
  - If this options is omitted, templates are written only to stdout.
- `--skip-parameters`
  - Skip resolving values for parameters using parameter resolvers and set stack parameters as an empty array.
  - Skip validating parameter values.
- `--skip-hooks`
  - Skip executing hooks.
  
## IAM permissions

These are the minimum IAM permissions required to run this command.

```yaml
# Minimum permissions. Additional permissions might be needed if hooks or 
# parameter resolvers are used. 
Statement: 
  - Sid: CloudFormation
    Effect: Allow
    Action:
      - cloudformation:GetTemplate
      - cloudformation:ValidateTemplate
      - cloudformation:DescribeStacks
      - cloudformation:GetTemplateSummary
    Resource: "*"
  
  # S3 permissions needed only if template bucket is used.
  # Specify resource to restrict access to specific buckets.  
  - Sid: S3
    Effect: Allow
    Action:
      - s3:PutObject
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

Emit templates for all stacks:

```shell
tkm stacks emit
```

Emit templates to /tmp dir:

```shell
tkm stacks emit --out-dir /tmp
```

Omit all logging expect the templates themselves:

```shell
tkm stacks emit -q
```

Emit templates for stacks within the given command path:

```shell
tkm stacks emit /prod
```

Emit template only for stack /dev/vpc.yml stack and its dependencies:

```shell
tkm stacks emit /dev/vpc.yml
```

The region part must be specified if the stack has more than one region and you want to choose only one region.

```shell
tkm stacks emit /dev/vpc.yml/eu-west-1
```

Emit template of exactly one stack and skip its dependencies:

```shell
tkm stacks emit /cloudtrail.yml --ignore-dependencies
```