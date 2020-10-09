---
id: organization-accounts
title: Organization Accounts
description: CLI commands to manage AWS organization member accounts
keywords:
  - Takomo
  - CLI
---

import CliOptionsTable from '@site/src/components/CliOptionsTable';
import CliOption from '@site/src/components/CliOption';

Commands to manage organization member accounts:

- [List Accounts](#list-accounts)
- [Create Account](#create-account)
- [Deploy Accounts](#deploy-accounts)
- [Undeploy Accounts](#undeploy-accounts)
- [Bootstrap Accounts](#bootstrap-accounts)
- [Tear Down Accounts](#tear-down-accounts)

## List Accounts

List accounts that belong to the organization.

### Usage

```
tkm org accounts list
```

### Examples

List all accounts.

```
tkm org accounts list
```

## Create Account

Create a new account into the organization.

### Usage

You must provide the account name and email.

```
tkm org accounts create \
  --name <account name> \
  --email <account email> \
  [--iam-user-access-to-billing <IAM user access to billing>] \
  [--role-name <account admin role> ] \
  [--alias <account alias>]
```

### Options

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
        The account alias to create. Added in Takomo v.2.9.0.
    </CliOption>
</CliOptionsTable>

### IAM Permissions

This command must be run using credentials pointing to the organization master account.

```yaml
Statement:
  - Effect: Allow
    Action:
      - organizations:DescribeOrganization
      - organizations:CreateAccount
      - organizations:DescribeCreateAccountStatus
      - iam:CreateAccountAlias
    Resource: "*"
```

### Examples

Create a new account with email **hello@example.com** and name **example**.

```
tkm org accounts create --email hello@example.com --name example
```

## Deploy Accounts

Deploy infrastructure for organization accounts. The infrastructure to deploy is
configured with config sets.

Under the hood, the [deploy stacks command](stacks.md#deploy-stacks)
is used.

The local organization configuration must be in sync with the actual organization state
before this command can be run.

### Usage

You can pass one or more organizational unit paths to deploy only the accounts
that belong to organizational units located under the given paths in the organization
hierarchy. Alternatively, you can choose to deploy only specific accounts using `--account` option.

```
tkm org accounts deploy [ORGANIZATIONAL_UNIT_PATH...] [--account <account_id>]...
```

### Examples

Deploy all accounts in the organization.

```
tkm org accounts deploy
```

Deploy only accounts that belong to the organizational unit **Root/Sandbox** or to any organizational units
under it.

```
tkm org accounts deploy Root/Sandbox
```

Deploy only accounts that belong to the organizational unit **Root/Apps/Dev** or **Root/Apps/Test**,
or to any organizational units under them.

```
tkm org accounts deploy Root/Apps/Dev Root/Apps/Test
```

Deploy only account **123456789012**.

```
tkm org accounts deploy --account 123456789012
```

Deploy only account **123456789012** and **777777777777**.

```
tkm org accounts deploy --account 123456789012 --account 777777777777
```

## Undeploy Accounts

Undeploy infrastructure from organization accounts. The infrastructure to undeploy is configured with config sets.

Under the hood, the [undeploy stacks command](stacks.md#undeploy-stacks)
is used.

The local organization configuration must be in sync with the actual organization state before this command can be run.

### Usage

You can pass one or more organizational unit paths to undeploy only the accounts that belong to organizational units located under the given paths in the organization hierarchy. Alternatively, you can choose to undeploy only specific accounts using `--account` option.

```
tkm org accounts undeploy [ORGANIZATIONAL_UNIT_PATH...] [--account <account_id>]...
```

### Examples

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

## Bootstrap Accounts

Bootstrap organization accounts. The infrastructure to deploy is configured with bootstrap config sets.

Under the hood, the [deploy stacks command](stacks.md#deploy-stacks)
is used.

The local organization configuration must be in sync with the actual organization state
before this command can be run.

### Usage

You can pass one or more organizational unit paths to bootstrap only the accounts that belong to organizational units located under the given paths in the organization hierarchy. Alternatively, you can choose to bootstrap only specific accounts using `--account` option.

```
tkm org accounts bootstrap [ORGANIZATIONAL_UNIT_PATH...] [--account <account_id>]...
```

### Examples

Bootstrap all accounts in the organization.

```
tkm org accounts bootstrap
```

Bootstrap only accounts that belong to the organizational unit **Root/Sandbox** or to any organizational units
under it.

```
tkm org accounts bootstrap Root/Sandbox
```

## Tear Down Accounts

Tear down organization accounts. The infrastructure to tear down is configured with bootstrap config sets.

Under the hood, the [undeploy stacks command](stacks.md#undeploy-stacks)
is used.

The local organization configuration must be in sync with the actual organization state
before this command can be run.

### Usage

You can pass one or more organizational unit paths to tear down only the accounts that belong to organizational units located under the given paths in the organization hierarchy. Alternatively, you can choose to tear down only specific accounts using `--account` option.

```
tkm org accounts tear-down [ORGANIZATIONAL_UNIT_PATH...] [--account <account_id>]...
```

### Examples

Tear down all accounts in the organization.

```
tkm org accounts tear-down
```

Tear down only accounts that belong to the organizational unit **Root/Sandbox** or to any organizational units
under it.

```
tkm org accounts tear-down Root/Sandbox
```
