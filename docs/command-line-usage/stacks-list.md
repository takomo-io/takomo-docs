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

## Examples

List all stacks:

```
tkm stacks list
```

List stacks within the given command path:

```
tkm stacks list /prod
```
