---
id: from-2-to-3
title: From 2.x to 3.x
description: Upgrading Takomo from version 2.x to 3.x
keywords:
  - upgrading
  - Takomo
---

This page describes breaking changes introduced in version 3.0.0 and how to migrate from version 2.x.

## Breaking Changes to CLI Commands

The following secrets management CLI commands were removed:

- tkm stacks secrets list
- tkm stacks secrets diff
- tkm stacks secrets get
- tkm stacks secrets set
- tkm stacks secrets sync

Because of these commands, IAM permissions for SSM and KMS were required even if the commands themselves were not used. Secrets management functionality might be provided later in some other way.

## Breaking Changes to Resolvers

Because the secrets management is no longer provided, also the `secret` resolver was removed.

## Breaking Changes to Configuration Files

The `projectDir` property was removed from config sets used with organizations and deployment targets.

This means that a custom project dir can no longer be defined like this:

```yaml
configSets:
  myConfigSet:
    description: This config set is located in custom location
    projectDir: /home/ec2-user/takomo-configs
    commandPaths:
      - /
```

All CloudFormation template files are processed with Handlebars templating engine regardless the file extension. Before, one had to explicitly enable Handlebars processing by using `.hbs` file extension.

Expose stack tags in CloudFormation template files as an array instead of an object.

## Breaking Changes to APIs

Major refactoring and clean up of the TypeScript codebase in order to provide easier development.


