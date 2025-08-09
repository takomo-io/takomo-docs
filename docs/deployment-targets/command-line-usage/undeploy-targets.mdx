# Undeploy targets

Remove (undeploy) infrastructure configured with config sets from the specified deployment groups and targets.

## Usage

```shell
tkm targets undeploy [group-path...] \
  [--target <target>]... \
  [--exclude-target <target>]... \
  [--label <label>]... \
  [--exclude-label <label>]... \
  [--concurrent-targets <count>] \
  [--config-set <config-set>] \
  [--command-path <command-path>] \
  [--reset-cache]
```

## Positional arguments

- `group-path`
  - Provide one or more deployment group paths to remove only the targets that belong to the deployment groups located under the given deployment group paths in the deployment groups hierarchy.
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
  - Deployment targets to remove. You can use this option multiple times to specify more targets. You can use % character as a wildcard at the beginning and/or end of the target name to more than one target.
  - Optional
- `--exclude-target <target>`
  - Exclude deployment targets. You can use this option multiple times to specify more targets. You can use % character as a wildcard at the beginning and/or end of the target name to more than one target.
  - Optional
- `--concurrent-targets <number>`
  - Number of deployment targets to remove concurrently. Defaults to 1. If you choose to review changes to each target, this is set to 1.
  - Optional
- `--config-set <config-set>`
  - Undeploy only this config set.
  - Optional
- `--command-path <command-path>`
  - Undeploy only stacks under this command path.
  - To use this option, also the `--config-set` option must be given.
- `--reset-cache`
  - Reset cached files under **.takomo-cache** dir

## IAM permissions

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

Undeploy all deployment targets

```shell
tkm targets undeploy
```

Undeploy only targets that belong to a deployment group MyGroup or to any other deployment group under it

```shell
tkm targets undeploy MyGroup
```

Undeploy only the deployment target named my-target

```shell
tkm targets undeploy --target my-target
```

Undeploy all deployment targets whose name ends with -test

```shell
tkm targets undeploy --target %-test
```

Undeploy all targets that have label application

```shell
tkm targets undeploy --label application
```
