---
id: organization
title: Organization
description: Configuration reference for organization
keywords:
  - Takomo
  - configuration
---

import OrgConfigReferenceTable from '@site/src/components/OrgConfigReferenceTable';
import { awsServicePrincipals } from '@site/src/components/Constants';

This page describes properties available in an organization configuration file.

- [accountAdminRoleName](#accountadminrolename)
- [accountBootstrapRoleName](#accountbootstraprolename)
- [accountCreation](#accountcreation)
- [aiServicesOptOutPolicies](#aiservicesoptoutpolicies)
- [backupPolicies](#backuppolicies)
- [configSets](#configsets)
- [masterAccountId](#masteraccountid)
- [organizationAdminRoleName](#organizationadminrolename)
- [organizationalUnits](#organizationalunits)
- [serviceControlPolicies](#servicecontrolpolicies)
- [tagPolicies](#tagpolicies)
- [trustedAwsServices](#trustedawsservices)
- [vars](#vars)

## accountAdminRoleName

The default IAM role name to be used to [deploy](../command-line-usage/org-accounts-deploy) and [undeploy](../command-line-usage/org-accounts-undeploy) accounts. Organizational units and individual accounts can override this value.

<OrgConfigReferenceTable 
    required={false} 
    types='string'
    defaultValue='computed (see below)' 
    requirements='Must be a valid role name'
/>

### Default value

If no value is given, value from [accountCreation.defaults.roleName](#accountcreation-defaults-rolename) is used, and if that is not defined, `OrganizationAccountAccessRole` is used.

### Examples

Use role name `MyDeployerRole`.

```yaml
accountAdminRoleName: MyDeployerRole
```

## accountBootstrapRoleName

The default IAM role name to be used to [bootstrap](../command-line-usage/org-accounts-bootstrap) and [tear down](../command-line-usage/org-accounts-tear-down) accounts. Organizational units and individual accounts can override this value.

<OrgConfigReferenceTable 
    required={false} 
    types='string'
    defaultValue='computed (see below)' 
    requirements='Must be a valid role name'
/>

### Default value

If no value is given, value from [accountCreation.defaults.roleName](#accountcreation-defaults-rolename) is used, and if that is not defined, `OrganizationAccountAccessRole` is used.

### Examples

Use role name `MyBootstrapRole`.

```yaml
accountBootstrapRoleName: MyBootstrapRole
```

## accountCreation

Constraints and default values used with account creation. 
 
<OrgConfigReferenceTable 
    required={false} 
    types={<a href='#account-creation-object'>Account Creation Object</a>}
    defaultValue='computed (see below)' 
/> 

### Account Creation Object

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| defaults    | no | [Account Creation Defaults Object](#account-creation-defaults-object) | Default settings for account creation, used when creating new accounts. |
| constraints | no | [Account Creation Constraints Object](#account-creation-constraints-object) | Account creation constraints used to validate input values given when a new account is being created. |
 
### Account Creation Defaults Object

Default settings for account creation, used when creating new accounts.

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| iamUserAccessToBilling | no | boolean | Boolean defining if IAM user access account billing information should be enabled. Defaults to **true**. |
| roleName | no | string | Name of the IAM role used to manage the new accounts. Defaults to **OrganizationAccountAccessRole** |

### Account Creation Constraints Object

Account creation constraints used to validate input values given when a new account is being created.

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| namePattern | no | string | A regex pattern to validate name of the new account being created. |
| emailPattern | no | string | A regex pattern to validate email of the new account being created. |

### Examples

Account creation configuration with default values and constraints:

```yaml
accountCreation:
  defaults: 
    iamUserAccessToBilling: false
    roleName: "MyAdminRole"
  constraints:
    namePattern: ^[a-z]+$
    emailPattern: ^.*@acme.com$
```

## aiServicesOptOutPolicies

AI Services Opt-Out policies.

<OrgConfigReferenceTable 
    since='v2.5.0'
    required={false}
    types={<a href='#ai-services-opt-out-policies-object'>AI Services Opt-Out Policies Object</a>}
    defaultValue='undefined'
/>    

### AI Services Opt-Out Policies Object

AI services opt-out policies configuration is an object where keys are names for the AI services opt-out policies and values are configuration objects for the corresponding policy. The AI services opt-out policy name is used to find the actual policy file from the `organization/ai-services-opt-out-policies` directory.

Requirements for AI services opt-out policy names:

- minimum minimum length is 1
- maximum length is 128
- must match pattern `/^[a-zA-Z0-9_-]+$/`
- must be unique among AI services opt-out policies

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| {ai&nbsp;services&nbsp;opt-outpolicy&nbsp;name} | yes | [AI Services Opt-out Policy Object](#ai-services-opt-out-policy-object) | Configuration for the AI services opt-out policy. |

### AI Services Opt-out Policy Object

Configuration for a single AI services opt-out policy.

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| description | yes | string | Mandatory description for the AI services opt-out policy. |
| awsManaged | no | string | Optional boolean defining if the policy is managed by AWS. Defaults to **false**. |

### Examples

Two AI services opt-out policies:

```yaml
aiServicesOptOutPolicies:
  FooPolicy:
    description: Some policy 
  BarPolicy:
    description: Another policy
```

## backupPolicies

Organization backup policies.

<OrgConfigReferenceTable 
    since='v2.5.0'
    required={false}
    types={<a href='#backup-policies-object'>Backup Policies Object</a>}
    defaultValue='undefined'
/>    

### Backup Policies Object

Backup policies configuration is an object where keys are names for the backup policies and values are configuration objects for the corresponding policy. The backup policy name is used to find the actual policy file from the `organization/backup-policies` directory.

Requirements for backup policy names:

- minimum minimum length is 1
- maximum length is 128
- must match pattern `/^[a-zA-Z0-9_-]+$/`
- must be unique among backup policies

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| {backup&nbsp;policy&nbsp;name} | yes | [Backup Policy Object](#backup-policy-object) | Configuration for the backup policy. |

### Backup Policy Object

Configuration for a single backup policy.

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| description | yes | string | Mandatory description for the backup policy. |
| awsManaged | no | string | Optional boolean defining if the policy is managed by AWS. Defaults to **false**. |

### Examples

Two backup policies:

```yaml
backupPolicies:
  myBackupPolicy:
    description: My backup policy 
  anotherBackupPolicy:
    description: Some backup policy
```

## configSets

Configuration for config sets.

<OrgConfigReferenceTable 
    required={false} 
    types={<a href='#config-sets-object'>Config Sets Object</a>}
    defaultValue='undefined' 
/> 

### Config Sets Object

Config sets configuration is an object where keys are names for the config sets and values are configuration objects for the corresponding config set. Config set names are used to refer to the config set from organizational units and accounts. 

Requirements for config set names:

- minimun length is 1
- maximum length is 60
- must match pattern `/^[a-zA-Z_]+[a-zA-Z0-9-_]*$/`
- must be unique among config sets

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| {config&nbsp;set&nbsp;name} | yes | [Config Set Object](#config-set-object) | Configuration for the config set. |

### Config Set Object

Configuration for a config set.

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| description | yes | string | Mandatory description for the config set. |
| commandPaths | yes | string[] | A list of command paths that are executed when the config set is deployed/undeployed or bootstrapped/teared down. |

### Examples

Two config sets named **basic** and **cloudtrail**:

```yaml
configSets:
  basic:
    description: Basic configuration
    commandPaths:
      - /basic
  cloudtrail:
    description: CloudTrail configuration
    commandPaths:
      - /audit/cloudtrail.yml/eu-west-1
      - /audit/cloudtrail.yml/eu-central-1
```

## masterAccountId

Organization master account id. Used to ensure that organization management operations target the correct AWS organization.
  
<OrgConfigReferenceTable 
    required={true}
    types='string'
    defaultValue='undefined' 
    requirements='Must be a valid AWS account id'
/>  

### Examples

Master account id **111111111111**.

```yaml
masterAccountId: "111111111111"
```
  
## organizationAdminRoleName

Name of the IAM role used to perform organization management operations against the organization. If no value is given, the current AWS credentials in terminal session are used.
                                                                                                    
<OrgConfigReferenceTable 
    required={false}
    types='string'
    defaultValue='undefined' 
    requirements='Must be a valid role name'
/>    


### Examples

Use role name `MyOrganizationAdminRole`.

```yaml
organizationAdminRoleName: MyOrganizationAdminRole
```

## organizationalUnits

Organizational units.

<OrgConfigReferenceTable 
    required={true} 
    types={<a href='#organizational-units-object'>Organizational Units Object</a>}
    defaultValue='undefined' 
    requirements='At least the "Root" organizational unit must be defined'
/> 

### Organizational Units Object

Configuration is an object where keys are paths for the organizational units and values are configuration objects for the corresponding organizational units.

Requirements for organizational unit paths:

- Must match regex `/^Root(\/[a-zA-Z0-9-_/ ]+)?$/`
- Max depth for organization hierarchy is 5
  
| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| {organizational&nbsp;unit&nbsp;path} | yes | [Organizational Unit Object](#organizational-unit-object) | Configuration for the organizational unit. |

### Organizational Unit Object

Configuration for a single organizational unit.

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| accountAdminRoleName | no | string | The IAM role name to be used to manage accounts belonging to the organizational unit. If no value is given, then value from the top-level [accountAdminRoleName](#accountadminrolename) is used. |
| accountBootstrapRoleName | no | string | The IAM role name to be used to bootstrap accounts belonging to the organizational unit. If no value is given, then value from the top-level [accountBootstrapRoleName](#accountbootstraprolename) is used. |
| accounts | no | mixed list of strings and [Account Objects](#account-object). | List of accounts that belong to the organizational unit. Values in the list can be either plain account ids or [Account Objects](#account-object). |
| aiServicesOptOutPolicies | no | string, string[] | List of AI services opt-out policies to attach to the organizational unit. |
| backupPolicies | no | string, string[] | List of backup policies to attach to the organizational unit. |
| bootstrapConfigSets | no | string, string[] | List of config sets to run when accounts belonging to the organizational unit are bootstrapped. |
| configSets | no | string, string[] | List of config sets to run when accounts belonging to the organizational unit are deployed. |
| priority | no | number | Number used to define the launch order of organizational unit directly under the same parent. |
| serviceControlPolicies | no | string, string[] | List of service control policies to attach to the organizational unit. |
| status | no | string | Organizational unit status. Used to define if the accounts belonging to the organizational unit should be included in organization accounts deploy/undeploy and bootstrap/tear down operations.<br/><br/>Allowed values:<br/><ul><li>**active** - Accounts are included to organization accounts operations</li><li>**disabled** - Accounts are excluded from organization accounts operations</li></ul> |
| tagPolicies | no | string, string[] | List of tag policies to attach to the organizational unit. |
| vars | no | [Organizational Unit Vars Object](#organizational-unit-vars-object) | Variables object. |

### Organizational Unit Vars Object

An object where keys are names for the variables and values are the variables themselves. 

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| {variable&nbsp;name} | yes | any | Variable value. |

### Account Object

Configuration for a single account.

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| accountAdminRoleName | no | string | The IAM role name to be used to manage the account. If no value is given, then value from the parent organizational unit's [accountAdminRoleName](#organizationalunits-path-accountadminrolename) is used. |
| accountBootstrapRoleName | no | string | The IAM role name to be used to bootstrap the account. If no value is given, then value from the parent organizational unit's [accountBootstrapRoleName](#organizationalunits-path-accountbootstraprolename) is used. |
| aiServicesOptOutPolicies | no | string, string[] | List of AI services opt-out policies to attach to the account. |
| backupPolicies | no | string, string[] | List of backup policies to attach to the account. |
| bootstrapConfigSets | no | string, string[] | List of config sets to run when the account is bootstrapped. |
| configSets | no | string, string[] | List of config sets to run when the account is deployed. |
| description | no | string | Description for the account. |
| email | no | string | Root email of the account. |
| id | no | string | Id of the account. |
| name | no | string | Name of the account. |
| serviceControlPolicies | no | string, string[] | List of service control policies to attach to the account. |
| status | no | string | Account status. Used to define if the account should be included in organization accounts deploy/undeploy and bootstrap/tear down operations.<br/><br/>Allowed values:<br/><ul><li>**active** - The account is included to organization accounts operations</li><li>**disabled** - The account is excluded from organization accounts operations</li><li>**suspended** - The account is suspended and excluded from organization accounts operations </li></ul>Defaults to **active**. |
| tagPolicies | no | string, string[] | List of tag policies to attach to the account. |
| vars | no | [Account Vars Object](#account-vars-object) | Variables object. |

### Account Vars Object

An object where keys are names for the variables and values are the variables themselves. 

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| {variable&nbsp;name} | yes | any | Variable value. |

### Examples

Some organizational units:

```yaml
organizationalUnits:
  Root:
    serviceControlPolicies:
      - MySCP
    accounts:
      - id: "123456789012"
        description: Master account
  Root/test-accounts:
    status: disabled
    tagPolicies: my-tag-policy
    accounts:
      - "111111111111"
      - "222222222222"
      - "333333333333"
  "Root/sandbox accounts/sandbox-1": {}
  "Root/sandbox accounts/sandbox-2":
    vars: 
      company:
        name: Acme Inc.
        id: 1234000
    accounts:
      - id: "444444444444"
```

## serviceControlPolicies

Organization service control policies.

<OrgConfigReferenceTable 
    required={false}
    types={<a href='#service-control-policies-object'>Service Control Policies Object</a>}
    defaultValue='undefined'
/>    

### Service Control Policies Object

Service control policies configuration is an object where keys are names for the service control policies and values are configuration objects for the corresponding policy. The service control policy name is used to find the actual policy file from the `organization/service-control-policies` directory.

Requirements for service control policy names:

- minimum minimum length is 1
- maximum length is 128
- must match pattern `/^[a-zA-Z0-9_-]+$/`
- must be unique among service control policies

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| {service&nbsp;control&nbsp;policy&nbsp;name} | yes | [Service Control Policy Object](#service-control-policy-object) | Configuration for the service control policy. |

### Service Control Policy Object

Configuration for a single service control policy.

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| description | yes | string | Mandatory description for the service control policy. |
| awsManaged | no | string | Optional boolean defining if the policy is managed by AWS. Defaults to **false**. |

### Examples

An user managed policy named `mySCP` and another, AWS managed policy, named `FullAWSAccess`.

```yaml
serviceControlPolicies:
  mySCP:
    description: My service control policy 
  FullAWSAccess:
    awsManaged: true
    description: Default AWS managed policy
```

## tagPolicies

Organization tag policies.

<OrgConfigReferenceTable 
    required={false}
    types={<a href='#tag-policies-object'>Tag Policies Object</a>}
    defaultValue='undefined'
/>    

### Tag Policies Object

Tag policies configuration is an object where keys are names for the tag policies and values are configuration objects for the corresponding policy. The tag policy name is used to find the actual policy file from the `organization/tag-policies` directory.

Requirements for tag policy names:

- minimum minimum length is 1
- maximum length is 128
- must match pattern `/^[a-zA-Z0-9_-]+$/`
- must be unique among tag policies

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| {tag&nbsp;policy&nbsp;name} | yes | [Tag Policy Object](#tag-policy-object) | Configuration for the tag policy. |

### Tag Policy Object

Configuration for a single tag policy.

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| description | yes | string | Mandatory description for the tag policy. |
| awsManaged | no | string | Optional boolean defining if the policy is managed by AWS. Defaults to **false**. |

### Examples

Two tag policies:

```yaml
tagPolicies:
  myTagPolicy:
    description: My strict tag policy 
  anotherTagPolicy:
    description: Some tag policy
```

## trustedAwsServices

List of trusted AWS service principals.

<OrgConfigReferenceTable 
    required={false}
    types='string[]'
    defaultValue='A list containing all AWS service principals'
    requirements={<div>Allowed AWS service principals:{ awsServicePrincipals() }</div>}
/>    

### Examples

Trust some AWS services:

```yaml
trustedAwsServices:
  - config.amazonaws.com
  - ds.amazonaws.com
  - fms.amazonaws.com
```

## vars

Variables available in the accounts.

<OrgConfigReferenceTable 
    required={false}
    types={<a href='#vars-object'>Vars Object</a>}
    defaultValue='undefined' 
/>    

### Vars Object

An object where keys are names for the variables and values are the variables themselves. 

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| {variable&nbsp;name} | yes | any | Variable value. |

### Examples

Different kinds of variables:

```yaml
vars:
  cost-center: 12345
  environment:
    name: Production
    code: prod
  codes:
    - foo
    - bar
    - baz
```
