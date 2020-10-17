---
id: org-accounts-create-alias
title: org accounts create-alias
description: Create account alias
keywords:
  - Takomo
  - CLI
---

import CommonCliOptionsTable from '@site/src/components/CommonCliOptionsTable';
import CliOptionsTable from '@site/src/components/CliOptionsTable';
import CliOption from '@site/src/components/CliOption';

Create account alias.

## Usage

```
tkm org accounts create-alias \
  --account-id <account-id> \
  --alias <alias>
```

## Options

<CliOptionsTable>
    <CliOption name='--account-id' required={true}>
        Account id.
    </CliOption>
    <CliOption name='--alias' required={true}>
        Account alias to create.
    </CliOption>
</CliOptionsTable>

## Positional arguments

This command has no positional arguments.

## Common Options

<CommonCliOptionsTable />

## IAM Permissions

This command must be run using credentials of the organization master account 
with the following permissions.

```yaml
# Permission needed to assume a role from the target account
# used to create the account alias.
Statement:
  - Effect: Allow
    Action: sts:AssumeRole
    Resource: "*"
```

The role in the target account must have the following permissions.

```yaml
Statement:
  - Effect: Allow
    Action: iam:CreateAccountAlias
    Resource: "*"
```

## Examples

Create account alias.

```
tkm org accounts create-alias \
  --account-id 123456789012 \
  --alias my-account-alias
```
