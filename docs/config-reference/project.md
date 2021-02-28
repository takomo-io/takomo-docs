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
- [regions](#regions)
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

## regions

List of supported AWS regions to verify that regions you specify in Takomo configuration files are valid.

By default, the supported regions are hardcoded in Takomo's codebase, and a new Takomo version is released whenever AWS launches new regions. In case you need to use an older Takomo version that does not include some regions launched after its release, you may specify the missing regions yourself using this property.

You can also use this property to list only the regions you intend to use to prevent deploys to any other region.

<ProjectConfigReferenceTable
  since='v3.3.0'
  required={false}
  types='string[]'
  defaultValue='All regions supported by the current Takomo version'
  />

#### Examples

List four regions.

```yaml
regions:
  - us-east-1
  - eu-west-1
  - eu-central-1
  - eu-north-1 
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
