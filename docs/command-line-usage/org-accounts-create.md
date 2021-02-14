---
id: org-accounts-create
title: org accounts create
description: Create organization account
keywords:
  - Takomo
  - CLI
---

import CommonCliOptionsTable from '@site/src/components/CommonCliOptionsTable';
import CliOptionsTable from '@site/src/components/CliOptionsTable';
import CliOption from '@site/src/components/CliOption';

Create a new account into the organization.

## Usage

```
tkm org accounts create \
  --name <account name> \
  --email <account email> \
  [--iam-user-access-to-billing <IAM user access to billing>] \
  [--role-name <account admin role> ] \
  [--alias <account alias>] \
  [--ou <organizational unit>] \
  [--config-file <path to account config file>]
```

## Positional arguments

This command has no positional arguments.

## Options

<CliOptionsTable>
    <CliOption name='--name' required={true}>
        The friendly name of the member account.
    </CliOption>
    <CliOption name='--email' required={true}>
        The email address of the owner to assign to the new member account. This email address
        must not already be associated with another AWS account. You must use a valid email 
        address to complete account creation. You can't access the root user of the account 
        or remove an account that was created with an invalid email address.
    </CliOption>
    <CliOption name='--iam-user-access-to-billing' required={false}>
        If set to true, the new account enables IAM users to access account billing information
        if they have the required permissions. Otherwise, only the root user of the new account 
        can access account billing information. Defaults to true.
    </CliOption>
    <CliOption name='--role-name' required={false}>
        The name of an IAM role that AWS Organizations automatically preconfigures in the new 
        member account. This role trusts the master account, allowing users in the master account
        to assume the role, as permitted by the master account administrator. The role has 
        administrator permissions in the new member account.
        <br/><br/>
        If you don't specify this parameter, the role name defaults to OrganizationAccountAccessRole.
    </CliOption>
    <CliOption name='--alias' required={false}>
        The account alias to create.
    </CliOption>
    <CliOption name='--ou' required={false}>
        Path to the organizational unit where the account should be added. Defaults to Root.
    </CliOption>
    <CliOption name='--config-file' required={false}>
        Path to a file containing account specific configuration.
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
      - organizations:DescribeOrganization
      - organizations:CreateAccount
      - organizations:DescribeCreateAccountStatus
      - organizations:ListRoots
      - organizations:ListTargetsForPolicy
      - organizations:ListAWSServiceAccessForOrganization
      - organizations:DescribePolicy
      - organizations:ListPolicies
      - organizations:ListAccountsForParent
      - organizations:ListAccounts
      - organizations:DescribeOrganization
      - organizations:ListOrganizationalUnitsForParent
      - organizations:MoveAccount
    Resource: "*"
```

## Examples

Create a new account with email **hello@example.com** and name **example**.

```
tkm org accounts create --email hello@example.com --name example
```

Create a new account to organiational unit Root/Examples.

```
tkm org accounts create \
  --email hello@example.com \
  --name example \
  --ou Root/Examples
```
