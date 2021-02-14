---
id: org-accounts-tear-down
title: org accounts tear-down
description: Tear down organization accounts
keywords:
  - Takomo
  - CLI
---

import CommonCliOptionsTable from '@site/src/components/CommonCliOptionsTable';
import CliOptionsTable from '@site/src/components/CliOptionsTable';
import CliOption from '@site/src/components/CliOption';

Tear down organization accounts. The infrastructure to tear down is configured with bootstrap config sets.

Under the hood, the [undeploy stacks command](stacks-undeploy)
is used.

The local organization configuration must be in sync with the actual organization state
before this command can be run.

## Usage

```
tkm org accounts tear-down [org-unit-path...] [--account <account_id>]...
```

## Positional arguments

<CliOptionsTable>
    <CliOption name='org-unit-path' required={false}>
        You can pass one or more organizational unit paths to tear down only 
        the accounts that belong to organizational units located under the 
        given paths in the organization hierarchy.
    </CliOption>
</CliOptionsTable>

## Options

<CliOptionsTable>
    <CliOption name='--account' required={false}>
        Choose accounts to tear down. You can use this option mutliple times to specify more accounts.
    </CliOption>
</CliOptionsTable>

## Common Options

<CommonCliOptionsTable />

## IAM Permissions

This command must be run using credentials of the organization master account
with the following permissions.

```yaml
Statement:
  - Effect: Allow
    Action:
      - organizations:ListRoots
      - organizations:ListTargetsForPolicy
      - organizations:ListAWSServiceAccessForOrganization
      - organizations:DescribePolicy
      - organizations:ListPolicies
      - organizations:ListAccountsForParent
      - organizations:ListAccounts
      - organizations:DescribeOrganization
      - organizations:ListOrganizationalUnitsForParent
    Resource: "*"

  # IAM permissions needed to assume role from the target accounts.
  # Specify resource to restrict access to specific roles.  
  - Sid: IAM
    Effect: Allow
    Action:
      - sts:AssumeRole
    Resource: "*"
```

## Examples

Tear down all accounts in the organization.

```
tkm org accounts tear-down
```

Tear down only accounts that belong to the organizational unit **Root/Sandbox** or to any organizational units
under it.

```
tkm org accounts tear-down Root/Sandbox
```
