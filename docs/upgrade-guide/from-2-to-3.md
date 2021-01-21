---
id: from-2-to-3
title: From 2.x to 3.x
description: Upgrading Takomo from version 2.x to 3.x
keywords:
  - upgrading
  - Takomo
---

This release includes major refactoring of the TypeScript codebase to ease development in the future.

From this page, you can find breaking changes introduced in version 3.0.0 and instructions on migrating from version 2.x.

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

## Breaking Changes to Organization Configuration Files

- The `projectDir` property was removed from config sets used with organizations.
- The default value for `trustedAwsServices` was changed. Earlier, if you didn't define services, all services were trusted by default. Now, you must always specify the trusted services and if you don't specify services, no services are trusted by default.

## Breaking Changes to Deployment Targets Configuration Files

- The `projectDir` property was removed from config sets used with deployment targets.

## Breaking Changes to Stack Configuration Files

- All CloudFormation template files are processed with Handlebars templating engine regardless the file extension. Before, one had to explicitly enable Handlebars processing by using `.hbs` file extension.
- Expose stack tags in CloudFormation template files as an array instead of an object.

## Breaking Changes to Hooks

Previously, the hooks were not always executed if the stack operation failed because of an error. The error handling has been improved and the hooks should alway execute on error if that is possible. 

## Breaking Changes to APIs

Major refactoring and clean up of the TypeScript codebase to ease development in the future.

From now on, interfaces, types, functions and classes documented in the [API documentation](https://takomo.io/api-docs/release/v3-0-0/) are stable. Possible backward-incompatible changes to them are introduced only along with new major version releases. Please note that most of the modules are still undocumented and subject to breaking changes.

### Resolvers

Resolver provider's `schema` function signature was changed. Previously, the `schema` function accepted two arguments: Joi instance and Joi object schema. Now, the function accepts a single argument that is an object containing the two arguments that were previously given separately.

If you are using schema function, you need to change your code from:

```javascript
module.exports = {
  name: "example",
  schema: (joi, base) => { // The old way to give arguments to schema function
    return base.keys({
      value: joi.string().max(50).required()
    })
  },
  init: (props) => {
    // Init function body omitted
  }
}
```

to: 

```javascript
module.exports = {
  name: "example",
  schema: ({joi, base}) => { // The new way to give arguments to schema function
    return base.keys({
      value: joi.string().max(50).required()
    })
  },
  init: (props) => {
    // Init function body omitted
  }
}
```

Please note that in many examples the `base` argument was named as `schema`.

### Other changes

You might bump into other breaking changes if you have used Takomo's types in your custom resolvers, hooks or helpers. Most of the changes to the codebase are small, and you should be able to fix any possible issues easily. You can find the stable type definitions from the [API documentation](https://takomo.io/api-docs/release/v3-0-0/).

If you have are uncertain about upgrading to 3.x, please feel free to contact me in [Gitter](https://gitter.im/takomo-io/community) or via email &lt;henri at takomo.io&gt;.
