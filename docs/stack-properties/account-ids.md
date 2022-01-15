---
sidebar_position: 6
---

# Account ids

Working simultaneously with multiple accounts usually requires switching between many credentials or IAM roles. This poses a real risk of accidentally deploying infrastructure to the wrong account.

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

## Where to define

The `accountIds` property can be defined in stack and stack group configuration files. If specified in a stack group, the stack group's children and stacks inherit the value. Stack groups and stacks can override the value they have inherited from their parent.

## Requirements

The `accountIds` property must satisfy these requirements:

- Must be a string or a list of strings
- Account ids must be valid AWS account ids