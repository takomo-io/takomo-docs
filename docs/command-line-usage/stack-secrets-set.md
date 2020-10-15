---
id: stack-secrets-set
title: stack secrets set
description: Set stack secret
keywords:
  - Takomo
  - CLI
---

import CommonCliOptionsTable from '@site/src/components/CommonCliOptionsTable';
import CliOptionsTable from '@site/src/components/CliOptionsTable';
import CliOption from '@site/src/components/CliOption';

Set value for a stack secret.

## Usage

```
tkm stacks secrets set <stack-path> <secret-name>
```

## Positional arguments

<CliOptionsTable>
    <CliOption name='stack-path' required={true}>
        Path of the stack that defines the secret.
    </CliOption>
    <CliOption name='secret-name' required={true}>
        Name of the secret.
    </CliOption>
</CliOptionsTable>

## Options

This command has no command-specific options.

## Common Options

This command supports the following common options.

<CommonCliOptionsTable notSupported={['yes']} />

## Examples

Set value of secret **password** configured in stack with path **/dev/rds.yml**:

```
tkm stacks secrets set /dev/rds.yml password
```
