---
id: org-deploy
title: org deploy
description: Deploy organization
keywords:
  - Takomo
  - CLI
---

import CommonCliOptionsTable from '@site/src/components/CommonCliOptionsTable';
import CliOptionsTable from '@site/src/components/CliOptionsTable';
import CliOption from '@site/src/components/CliOption';

Deploy the organization configuration including trusted AWS services, service control policies,
tag policies, organizational units and accounts.

This command does not deploy infrastructure defined with config sets for the accounts. For that,
use [Deploy accounts command](org-accounts-deploy).

### Usage

```
tkm org deploy
```

## Positional arguments

This command has no positional arguments.

## Options

This command has no command-specific options.

## Common Options

This command supports the following common options.

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
      - organizations:DisableAWSServiceAccess
      - organizations:DeletePolicy
      - organizations:DeleteOrganizationalUnit
      - organizations:DisablePolicyType
      - organizations:ListAWSServiceAccessForOrganization
      - organizations:DescribePolicy
      - organizations:ListPolicies
      - organizations:ListAccountsForParent
      - organizations:ListAccounts
      - organizations:EnableAWSServiceAccess
      - organizations:UpdateOrganizationalUnit
      - organizations:DescribeOrganization
      - organizations:UpdatePolicy
      - organizations:EnablePolicyType
      - organizations:AttachPolicy
      - organizations:ListOrganizationalUnitsForParent
      - organizations:CreateOrganizationalUnit
      - organizations:MoveAccount
      - organizations:CreatePolicy
    Resource: "*"
```