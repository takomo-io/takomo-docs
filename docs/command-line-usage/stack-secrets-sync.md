---
id: stack-secrets-sync
title: stack secrets sync
description: Sync stack secrets
keywords:
  - Takomo
  - CLI
---

import CommonCliOptionsTable from '@site/src/components/CommonCliOptionsTable';
import CliOptionsTable from '@site/src/components/CliOptionsTable';
import CliOption from '@site/src/components/CliOption';

Synchronize secrets between the local configuration and what is persisted in
AWS Systems Manager Parameter Store from stacks within the given command path.

Sync will ask values for secrets missing from Parameter Store and remove secrets
from Parameter Store that are not found from the local stack config.

## Usage

```
tkm stacks secrets sync [command-path]
```

## Positional arguments

<CliOptionsTable>
    <CliOption name='command-path' required={false}>
        Sync stack secrets within the given command path. Defaults to the root stack group path ("/").
    </CliOption>
</CliOptionsTable>

## Options

This command has no command-specific options.

## Common Options

This command supports the following common options.

<CommonCliOptionsTable notSupported={['yes']}/>

## Examples

Sync all secrets:

```
tkm stacks secrets sync
```

Sync secrets within the given command path:

```
tkm stacks secrets sync /prod
```
