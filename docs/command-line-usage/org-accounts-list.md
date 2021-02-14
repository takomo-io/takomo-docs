---
id: org-accounts-list
title: org accounts list
description: List organization accounts
keywords:
  - Takomo
  - CLI
---

import CommonCliOptionsTable from '@site/src/components/CommonCliOptionsTable';
import CliOptionsTable from '@site/src/components/CliOptionsTable';
import CliOption from '@site/src/components/CliOption';

List accounts that belong to the organization.

## Usage

```
tkm org accounts list
```

## Options

This command has no command-specific options.

## Positional arguments

This command has no positional arguments.

## Common Options

<CommonCliOptionsTable />

## IAM Permissions

This command must be run using credentials of the organization master account
with the following permissions.

```yaml
Statement:
  - Effect: Allow
    Action:
      - organizations:DescribeOrganization
      - organizations:ListAccounts
    Resource: "*"
```

## Examples

List all accounts.

```
tkm org accounts list
```
