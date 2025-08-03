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

## Usage in configuration

`commandRole` property can be defined in:

- stack group configuration files
- blueprint configuration files
- stack configuration files

### Stack group config file

When `commandRole` property is defined in a stack group configuration file:

- its value completely overrides the value inherited from the parent stack group
- its value is inherited by stack groups and stacks that belong under the stack group

### Blueprint config file

When `commandRole` property is defined in a blueprint configuration file:

- its value completely overrides the value inherited from the parent stack group
- its value is inherited by stacks that extend the blueprint

### Stack config file

When `commandRole` property is defined in a stack configuration file:

- if the stack extends a blueprint, its value completely overrides the value inherited from the blueprint
- otherwise, its value completely overrides the value inherited from the parent stack group

## Requirements

The `commandRole` property must satisfy these requirements:

- Must be a valid IAM role ARN
