---
id: org-create
title: org create
description: Create organization
keywords:
  - Takomo
  - CLI
---

import CommonCliOptionsTable from '@site/src/components/CommonCliOptionsTable';
import CliOptionsTable from '@site/src/components/CliOptionsTable';
import CliOption from '@site/src/components/CliOption';

Create a new organization and initialize a minimum organization configuration file in **organization/organization.yml**.

### Usage

```
tkm org create [--feature-set <FEATURE_SET>]
```

## Positional arguments

This command has no positional arguments.

## Options

This command supports the following options.

<CliOptionsTable>
    <CliOption name='--feature-set' required={false}>
        Specifies the feature set supported by the new organization.
        <br/><br/>
        Allowed values are:
        <ul>
            <li>ALL = Enable all features (default)</li>
            <li>CONSOLIDATED_BILLING = All member accounts have their bills consolidated to and paid by the master account</li>
        </ul>
        
    </CliOption>
</CliOptionsTable>

## Common Options

This command supports the following common options.

<CommonCliOptionsTable />

## IAM Permissions

These are the minimum IAM permissions required to run this command.

```yaml
Statement:
  - Effect: Allow
    Action:
      - iam:CreateServiceLinkedRole
      - organizations:CreateOrganization
    Resource: "*"
```

## Examples

Create a new organization with default feature set, which is **ALL**.

```
tkm org create
```

Create a new organization with **ALL** feature set.

```
tkm org create --feature-set ALL
```

Create a new organization with **CONSOLIDATED_BILLING** feature set.

```
tkm org create --feature-set CONSOLIDATED_BILLING
```
