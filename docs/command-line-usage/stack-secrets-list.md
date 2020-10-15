---
id: stack-secrets-list
title: stack secrets list
description: List stack secrets
keywords:
  - Takomo
  - CLI
---

import CommonCliOptionsTable from '@site/src/components/CommonCliOptionsTable';
import CliOptionsTable from '@site/src/components/CliOptionsTable';
import CliOption from '@site/src/components/CliOption';

List secrets within the given command path.

## Usage

```
tkm stacks secrets list [command-path]
```

## Positional arguments

<CliOptionsTable>
    <CliOption name='command-path' required={false}>
        List stack secrets within the given command path. Defaults to the root stack group path ("/").
    </CliOption>
</CliOptionsTable>

## Options

This command has no command-specific options.

## Common Options

This command supports the following common options.

<CommonCliOptionsTable />

## Examples

List all secrets:

```
tkm stacks secrets list
```

List secrets within the given command path:

```
tkm stacks secrets list /dev/eu-west-1
```
