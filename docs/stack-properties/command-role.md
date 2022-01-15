---
sidebar_position: 5
---

# Command role

When you execute a Takomo command, the AWS credentials present in the current terminal session dictate the target AWS account. We call these credentials the default credentials.

Should you want to target a different account, you can specify an IAM role that Takomo should assume using the default credentials and then use it to execute the commands to the account where the role is bound. We call this role the command role, and you can specify it with the `commandRole` property, which accepts an IAM role ARN.

:::warning
The command role must not require MFA authentication.
:::

#### Example

Specify a command role:

```yaml
arn:aws:iam::123456789012:role/deployer-role
```

## Where to define

The `commandRole` property can be defined in stack and stack group configuration files. If specified in a stack group, the stack group's children and stacks inherit the value. Stack groups and stacks can override the value they have inherited from their parent.

## Requirements

The `commandRole` property must satisfy these requirements:

- Must be a valid IAM role ARN
