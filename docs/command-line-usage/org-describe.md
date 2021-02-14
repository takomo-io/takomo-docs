---
id: org-describe
title: org describe
description: Describe organization
keywords:
  - Takomo
  - CLI
---

import CommonCliOptionsTable from '@site/src/components/CommonCliOptionsTable';
import CliOptionsTable from '@site/src/components/CliOptionsTable';
import CliOption from '@site/src/components/CliOption';

Describe organization.

### Usage

```
tkm org describe
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
      - organizations:DescribeOrganization
      - organizations:DescribeAccount
      - organizations:ListAWSServiceAccessForOrganization
    Resource: "*"
```