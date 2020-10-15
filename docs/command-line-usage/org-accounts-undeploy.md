---
id: org-accounts-undeploy
title: org accounts undeploy
description: Undeploy organization accounts
keywords:
  - Takomo
  - CLI
---

import CommonCliOptionsTable from '@site/src/components/CommonCliOptionsTable';
import CliOptionsTable from '@site/src/components/CliOptionsTable';
import CliOption from '@site/src/components/CliOption';

Undeploy infrastructure from organization accounts. The infrastructure to undeploy is configured with config sets.

Under the hood, the [undeploy stacks command](stacks-undeploy)
is used.

The local organization configuration must be in sync with the actual organization state before this command can be run.

## Usage

```
tkm org accounts undeploy [org-unit-path...] [--account <account_id>]...
```

## Positional arguments

<CliOptionsTable>
    <CliOption name='org-unit-path' required={false}>
        You can pass one or more organizational unit paths to undeploy only 
        the accounts that belong to organizational units located under the 
        given paths in the organization hierarchy.
    </CliOption>
</CliOptionsTable>

## Options

<CliOptionsTable>
    <CliOption name='--account' required={false}>
        Choose accounts to undeploy. You can use this option mutliple times to specify more accounts.
    </CliOption>
</CliOptionsTable>

## Common Options

<CommonCliOptionsTable />

## Examples

Undeploy all accounts in the organization.

```
tkm org accounts undeploy
```

Undeploy only accounts that belong to the organizational unit **Root/Sandbox** or to any organizational units
under it.

```
tkm org accounts undeploy Root/Sandbox
```

Undeploy only accounts that belong to the organizational unit **Root/Apps/Dev** or **Root/Apps/Test**,
or to any organizational units under them.

```
tkm org accounts undeploy Root/Apps/Dev Root/Apps/Test
```

Undeploy only account **123456789012**.

```
tkm org accounts undeploy --account 123456789012
```

Undeploy only account **123456789012** and **777777777777**.

```
tkm org accounts undeploy --account 123456789012 --account 777777777777
```
