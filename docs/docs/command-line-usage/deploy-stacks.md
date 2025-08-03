# Deploy Stacks

Deploy stacks within the given command path.

Takomo also deploys stacks the stacks within the command path depend on, even if they are outside the given command path. Takomo arranges the stacks in deployment order by stack dependencies, ensuring that it deploys the stacks in the correct order and in parallel when possible.

Takomo deletes stacks whose creation have failed earlier and then recreates them. Such failed stacks can't be updated, and deleting them is the only possible operation.

## Usage

```shell
tkm stacks deploy [command-path] \
  [--ignore-dependencies] \
  [--interactive|-i] \
  [--expect-no-changes] \
  [--output <format>]
```

## Positional arguments

- `command-path`
  - Command path to select which stacks to deploy.
  - Optional, by default, Takomo deploys all stacks.

## Options

In addition to the [common options](./common-options), this command has the following options.

- `--ignore-dependencies`
  - Ignore stack dependencies. By default, when a stack is deployed, its dependencies are deployed first, and then the stack itself. In some exceptional cases, you might want to deploy just one stack and skip its dependencies.
  - Bear in mind that this option is supported only when exactly one stack is deployed. Ignoring dependencies may lead into unexpected results, so you should use this option only in exceptional circumstances.
- `--interactive, -i`
  - Choose the command path using autocompleting search.
- `--expect-no-changes`
  - Fail the deployment if at least one stack has changes.
- `--output <format>`
  - Print the command result using this format
  - Supported values: `text`, `json`, `yaml`

## IAM permissions

These are the minimum IAM permissions required to run this command.

```yaml
# Minimum permissions. Additional permissions are needed to actually 
# modify resources defined in the CloudFormation templates.
Statement: 
  - Sid: CloudFormation
    Effect: Allow
    Action:
      - cloudformation:CancelUpdateStack
      - cloudformation:DescribeStackEvents
      - cloudformation:CreateStack
      - cloudformation:GetTemplate
      - cloudformation:DeleteStack
      - cloudformation:UpdateStack
      - cloudformation:CreateChangeSet
      - cloudformation:DescribeChangeSet
      - cloudformation:DeleteChangeSet
      - cloudformation:ValidateTemplate
      - cloudformation:DescribeStacks
      - cloudformation:GetTemplateSummary
      - cloudformation:UpdateTerminationProtection
    Resource: "*"
  
  # S3 permissions needed only if a template bucket is used.
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

Deploy all stacks:

```shell
tkm stacks deploy
```

Deploy stacks within the given command path:

```shell
tkm stacks deploy /prod
```

Deploy only /dev/vpc.yml stack and its dependencies:

```shell
tkm stacks deploy /dev/vpc.yml
```

The region part must be specified if the stack has more than one region and you want to deploy it to only one region.

```shell
tkm stacks deploy /dev/vpc.yml/eu-west-1
```

Deploy exactly one stack and skip its dependencies:

```shell
tkm stacks deploy /cloudtrail.yml --ignore-dependencies
```