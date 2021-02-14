---
id: targets-undeploy
title: targets undeploy
description: Undeploy targets
keywords:
  - Takomo
  - CLI
---

import CommonCliOptionsTable from '@site/src/components/CommonCliOptionsTable';
import CliOptionsTable from '@site/src/components/CliOptionsTable';
import CliOption from '@site/src/components/CliOption';

Undeploy infrastructure configured with config sets from the specified deployment targets.

## Usage

```
tkm targets undeploy [group-path...] \
  [--config-file <config-file-name>] \
  [--target <target>]...
```

## Positional arguments

<CliOptionsTable>
    <CliOption name='group-path' required={false}>
        You can pass one or more deployment group paths to undeploy only 
        the targets that belong to deployment groups located under the 
        given paths in the deployment groups hierarchy.
    </CliOption>
</CliOptionsTable>

## Options

<CliOptionsTable>
    <CliOption name='--target' required={false}>
        Choose targets to undeploy. You can use this option multiple times to specify more targets.
    </CliOption>
    <CliOption name='--config-file' required={false}>
        Load deployment configuration from this file.
    </CliOption>
</CliOptionsTable>

## Common Options

<CommonCliOptionsTable />

## IAM Permissions

These are the minimum IAM permissions required to run this command.

```yaml
# Minimum permissions. Additional permissions are needed to actually 
# modify resources defined in CloudFormation templates.
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

Undeploy all deployment targets:

```
tkm targets undeploy
```

Undeploy only targets that belong to a deployment group **MyGroup** or to any other deployment group under it:

```
tkm targets undeploy MyGroup
```

Undeploy only the deployment target named **my-target**:

```
tkm targets undeploy --target my-target
```
