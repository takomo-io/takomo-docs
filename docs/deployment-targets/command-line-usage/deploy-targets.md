# Deploy targets

Deploy infrastructure configured with config sets to the specified deployment groups and targets.

## Usage

```shell
tkm targets deploy [group-path...] \
  [--target <target>]... \
  [--exclude-target <target>]... \
  [--label <label>]... \
  [--exclude-label <label>]... \
  [--concurrent-targets <count>] \
  [--config-set <config-set>] \
  [--command-path <command-path>] \
  [--expect-no-changes] \
  [--reset-cache]
```

## Positional arguments

- `group-path`
  - Provide one or more deployment group paths to deploy only the targets that belong to the deployment groups located under the given deployment group paths in the deployment groups hierarchy.
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
  - Deployment targets to deploy. You can use this option multiple times to specify more targets. You can use % character as a wildcard at the beginning and/or end of the target name to more than one target. 
  - Optional
- `--exclude-target <target>`
  - Exclude deployment targets. You can use this option multiple times to specify more targets. You can use % character as a wildcard at the beginning and/or end of the target name to more than one target. 
  - Optional
- `--concurrent-targets <number>`
  - Number of deployment targets to deploy concurrently. Defaults to 1. If you choose to review changes to each target, this is set to 1.
  - Optional
- `--config-set <config-set>`
  - Deploy only this config set.
  - Optional
- `--command-path <command-path>`
  - Deploy only stacks under this command path.
  - To use this option, also the `--config-set` option must be given. 
- `--expect-no-changes`
  - Fail the deployment if at least one stack has changes.
- `--reset-cache`
  - Reset cached files under **.takomo-cache** dir

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

Deploy all deployment targets

```shell
tkm targets deploy
```

Deploy only targets that belong to a deployment group MyGroup or to any other deployment group under it

```shell
tkm targets deploy MyGroup
```

Deploy only the deployment target named my-target

```shell
tkm targets deploy --target my-target
```

Deploy all deployment targets whose name ends with -test

```shell
tkm targets deploy --target %-test
```

Deploy all targets that have label test or dev

```shell
tkm targets deploy --label test --label dev
```
