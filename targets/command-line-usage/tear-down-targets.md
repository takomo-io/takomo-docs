---
sidebar_position: 4
---

# Tear down targets

Tear down infrastructure configured with bootstrap config sets to the specified deployment groups and targets.

## Usage

```shell
tkm targets tear-down [group-path...] \
  [--target <target>]... \
  [--exclude-target <target>]... \
  [--label <label>]... \
  [--exclude-label <label>]... \
  [--concurrent-targets <count>] \
  [--config-set <config-set>] \
  [--command-path <command-path>]
```

## Positional arguments

- `group-path`
  - Provide one or more deployment group paths to tear down only the targets that belong to the deployment groups located under the given deployment group paths in the deployment groups hierarchy.
  - Optional.

## Options

In addition to the [common options](../../docs/command-line-usage/common-options), this command has the following options.

- `--label <label>`
  - Choose deployment targets by label. You can use this option multiple times to specify more labels.
  - Optional
- `--exclude-label <label>`
  - Exclude deployment targets by label. You can use this option multiple times to specify more labels.
  - Optional
- `--target <target>`
  - Deployment targets to tear down. You can use this option multiple times to specify more targets. You can use % character as a wildcard at the beginning and/or end of the target name to more than one target.
  - Optional
- `--exclude-target <target>`
  - Exclude deployment targets. You can use this option multiple times to specify more targets. You can use % character as a wildcard at the beginning and/or end of the target name to more than one target.
  - Optional
- `--concurrent-targets <number>`
  - Number of deployment targets to deploy concurrently. Defaults to 1. If you choose to review changes to each target, this is set to 1.
  - Optional
- `--config-set <config-set>`
  - Tear down only this config set.
  - Optional
- `--command-path <command-path>`
  - Tear down only stacks under this command path.
  - To use this option, also the `--config-set` option must be given.

## IAM permissions

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

Tear down all deployment targets

```shell
tkm targets bootstrap
```

Tear down only targets that belong to a deployment group MyGroup or to any other deployment group under it

```shell
tkm targets tear-down MyGroup
```

Tear down only the deployment target named my-target

```shell
tkm targets tear-down --target my-target
```

Tear down all deployment targets whose name ends with -test

```shell
tkm targets tear-down --target %-test
```

Tear down all targets that have label test or dev

```shell
tkm targets tear-down --label test --label dev
```
