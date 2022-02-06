---
sidebar_position: 11
---

# Bootstrapping targets

Typically, you use a CI/CD pipeline to deploy stacks to your deployment targets. That usually means creating an IAM role for the CI/CD tool to assume and then use to perform the deployment. Of course, as a best practice, the deployment role should have only the minimum set of permissions.

The next question is how you create that deployment role in the first place. Takomo's approach to this problem is to divide config sets into two categories: standard and bootstrap.

The standard config sets are the ones you would deploy using the deployment role with a minimum set of permissions. The bootstrap config sets are, like the name implies, for bootstrapping resources needed to deploy the standard config sets, e.g., creating the deployment role. Deploying the bootstrap config sets should be a lightweight operation that you can run from your personal laptop with full admin permissions secured with MFA, or using some other automated but more restricted and secure option.

## Bootstrap config sets files and directories

At the file system level, there is no difference between the standard and bootstrap config sets. Take a look at [config sets documentation](/targets/configuration/config-sets) to learn how you create config sets.

## Attaching bootstrap config sets

The way you attach a config set to a deployment group or target makes it either a standard or bootstrap config set. To attach bootstrap config sets, you use the bootstrapConfigSets property instead of the configSets property that you use to attach the standard config sets. Take a look at [config sets documentation](/targets/configuration/config-sets) to learn how to  attach config sets.

## Target account

Setting the target account works the same way as with the [standard config sets](/targets/configuration/config-sets). There are two options to specify to which account Takomo should deploy stacks defined in  deployment target's bootstrap config sets.

- Provide a complete IAM role ARN in the `bootstrapRole` property.
- Provide the target account's id in the `accountId` property and the name of the IAM role in the `bootstrapRoleName` property.

The first option takes precedence over the second one.

## Deploying bootstrap config sets

You use the bootstrap targets command to deploy stacks configured in bootstrap config sets that are attached to deployment targets. For detailed information about the command, please see here.

#### Example

Here's an example showing how to deploy bootstrap config sets to all targets under the all/application group:

```shell
tkm targets bootstrap all/application
```

## Removing bootstrap config sets

You use the tear down targets command to remove stacks configured in bootstrap config sets that are attached to deployment targets. For detailed information about the command, please see here.

#### Example

Here's an example demonstrating how to remove bootstrap config sets from the sandbox target:

```shell
tkm targets tear-down --target sandbox
```
