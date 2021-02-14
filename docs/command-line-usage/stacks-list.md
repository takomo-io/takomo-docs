---
id: stacks-list
title: stacks list
description: List stacks
keywords:
  - Takomo
  - CLI
---

import CommonCliOptionsTable from '@site/src/components/CommonCliOptionsTable';
import CliOptionsTable from '@site/src/components/CliOptionsTable';
import CliOption from '@site/src/components/CliOption';

List stacks within the given command path.

## Usage

```
tkm stacks list [command-path]
```

## Positional arguments

<CliOptionsTable>
    <CliOption name='command-path' required={false}>
        List stacks within the given command path. Defaults to the root stack group path ("/").
    </CliOption>
</CliOptionsTable>

## Options

This command has no command-specific options.

## Common Options

<CommonCliOptionsTable />

## IAM Permissions

These are the minimum IAM permissions required to run this command.

```yaml
Statement: 
  - Sid: Stacks
    Effect: Allow
    Action:
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

List all stacks:

```
tkm stacks list
```

List stacks within the given command path:

```
tkm stacks list /prod
```
