---
id: stack-secrets-diff
title: stack secrets diff
description: Diff stack secrets
keywords:
  - Takomo
  - CLI
---

import CommonCliOptionsTable from '@site/src/components/CommonCliOptionsTable';
import CliOptionsTable from '@site/src/components/CliOptionsTable';
import CliOption from '@site/src/components/CliOption';

Show differences between the secrets found from local configuration and what is persisted in
AWS Systems Manager Parameter Store from stacks within the given command path.

## Usage

```
tkm stacks secrets diff [command-path]
```

## Positional arguments

<CliOptionsTable>
    <CliOption name='command-path' required={false}>
        Diff stack secrets within the given command path. Defaults to the root stack group path ("/").
    </CliOption>
</CliOptionsTable>

## Options

This command has no command-specific options.

## Common Options

This command supports the following common options.

<CommonCliOptionsTable />

## Examples

Diff all secrets:

```
tkm stacks secrets diff
```

Diff secrets within the given command path:

```
tkm stacks secrets diff /prod
```
