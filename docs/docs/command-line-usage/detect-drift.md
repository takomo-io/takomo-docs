# Detect Drift

Detect drift of stacks within the given command path.

## Usage

```shell
tkm stacks detect-drift [command-path]
```

## Positional arguments

- `command-path`
  - Command path to select from which stacks to detect drift.
  - Optional, by default, Takomo detects drift from all stacks.

## Options

In addition to the [common options](./common-options), this command has no command-specific options.

## IAM permissions

These are the minimum IAM permissions required to run this command.

```yaml
Statement: 
  - Sid: Stacks
    Effect: Allow
    Action:
      - cloudformation:DescribeStacks
      - cloudformation:DetectStackDrift
      - cloudformation:DescribeStackDriftDetectionStatus
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

Detect drift from all stacks:

```shell
tkm stacks detect-drift
```

Detect drift from stacks within the given command path:

```shell
tkm stacks detect-drift /prod
```