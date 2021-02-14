---
id: project
title: Project
description: Configuration reference for project
keywords:
  - Takomo
  - configuration
---

import ProjectConfigReferenceTable from '@site/src/components/ProjectConfigReferenceTable';

Project configuration file **takomo.yml** is placed in the project root directory and contains general configuration for the project.

Here are the available properties:

- [organization](#organization)
- [requiredVersion](#requiredversion)

## organization

An object containing organization management related configuration.

<ProjectConfigReferenceTable
  since='v3.1.0'
  required={false}
  types={[<a href='#organization-configuration-object'>Organization Configuration Object</a>]}
  defaultValue='undefined'
  />

### Organization Configuration Object

Organization configuration is an object with following keys:

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| accountRepository | no | [Account Repository](#account-repository) | Account repository object |

### Account Repository

Account repository is used to persist and load account information from an external storage such as filesystem. You give account repository configuration  in an object with following keys:

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| type | yes | string | Account repository type |

In addition to the standard properties documented above, different account repositories can have properties of their own.

#### Examples

Use filesystem account repository to store account information: 

```yaml
organization:
  accountRepository:
    type: filesystem
    dir: organization/accounts
```

## requiredVersion

Required Takomo version range. Executing commands with Takomo version that does not satisfy the version requirement will fail. 

<ProjectConfigReferenceTable
  required={false}
  types='string'
  defaultValue='undefined'
  requirements='Must be a valid semantic version range'
  />

#### Examples

Require at least version `2.2.0`:

```yaml
requiredVersion: ">=2.2.0"
```
