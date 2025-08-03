# Account ids

Working simultaneously with multiple accounts usually requires switching between many credentials or IAM roles. This poses a real risk of accidentally deploying infrastructure to a wrong account.

You can mitigate this risk with the `accountIds` property, which lets you define a list of allowed accounts to deploy a stack. It accepts a single account id or a list of account ids.

#### Examples

A single allowed account:

```yaml
accountIds: "123456789012"
```

A list of allowed accounts:

```yaml
accountIds:
  - "876272828282"
  - "763273627326"
```

## Usage in Configuration

`accountIds` property can be defined in:

- stack group configuration files
- blueprint configuration files
- stack configuration files

### Stack Group Config File

When `accountIds` property is defined in a stack group configuration file: 

- its value completely overrides the value inherited from the parent stack group
- its value is inherited by stack groups and stacks that belong under the stack group

### Blueprint Config File 

When `accountIds` property is defined in a blueprint configuration file:

- its value completely overrides the value inherited from the parent stack group
- its value is inherited by stacks that extend the blueprint

### Stack Config File

When `accountIds` property is defined in a stack configuration file:

- if the stack extends a blueprint, its value completely overrides the value inherited from the blueprint
- otherwise, its value completely overrides the value inherited from the parent stack group

## Requirements

The `accountIds` property must satisfy these requirements:

- Must be a string or a list of strings
- Account ids must be valid AWS account ids