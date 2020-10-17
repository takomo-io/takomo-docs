---
id: org-accounts-delete-alias
title: org accounts delete-alias
description: Delete account alias
keywords:
  - Takomo
  - CLI
---

import CommonCliOptionsTable from '@site/src/components/CommonCliOptionsTable';
import CliOptionsTable from '@site/src/components/CliOptionsTable';
import CliOption from '@site/src/components/CliOption';

Delete account alias.

## Usage

```
tkm org accounts delete-alias --account-id <account-id>
```

## Options

<CliOptionsTable>
    <CliOption name='--account-id' required={true}>
        Account id.
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
# used to delete the account alias.
Statement:
  - Effect: Allow
    Action: sts:AssumeRole
    Resource: "*"
```

The role in the target account must have the following permissions.

```yaml
Statement:
  - Effect: Allow
    Action:
      - iam:DeleteAccountAlias
      - iam:ListAccountAliases
    Resource: "*"
```

## Examples

List all accounts.

```
tkm org accounts list
```
