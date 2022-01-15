---
sidebar_position: 11
---

# Termination protection

You can enable termination protection for a stack with the `terminationProtection` property.

#### Example

Enabling termination protection:

```yaml
terminationProtection: true
```

## Default value

Termination protection is not enabled by default.

## Where to define

The `terminationProtection` property can be defined in stack and stack group configuration files. If specified in a stack group, the stack group's children and stacks inherit the value. Stack groups and stacks can override the value they have inherited from their parent.

## Requirements

The `terminationProtection` property must satisfy these requirements:

- Must be a boolean