---
sidebar_position: 13
---

# Capabilities

You specify stack capabilities with the `capabilities` property.

#### Examples

A single capability:

```yaml
capabilities: CAPABILITY_IAM
```

A list of capabilities

```yaml
capabilities:
  - CAPABILITY_IAM
  - CAPABILITY_NAMED_IAM
```

Disable all capabilities:

```yaml
capabilities: []
```

## Default value

By default, all capabilities are enabled.

## Where to define

The `capabilities` property can be defined in stack and stack group configuration files. If specified in a stack group, the stack group's children and stacks inherit the value. Stack groups and stacks can override the value they have inherited from their parent.

## Requirements

The `capabilities` property must satisfy these requirements:

- Must be a string or a list of strings
- Allowed values are:
  - CAPABILITY_IAM
  - CAPABILITY_NAMED_IAM
  - CAPABILITY_AUTO_EXPAND
