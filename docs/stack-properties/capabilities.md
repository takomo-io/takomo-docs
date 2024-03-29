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

## Usage in configuration

`capabilities` property can be defined in:

- stack group configuration files
- blueprint configuration files
- stack configuration files

### Stack group config file

When `capabilities` property is defined in a stack group configuration file:

- its value completely overrides the value inherited from the parent stack group
- its value is inherited by stack groups and stacks that belong under the stack group

### Blueprint config file

When `capabilities` property is defined in a blueprint configuration file:

- its value completely overrides the value inherited from the parent stack group
- its value is inherited by stacks that extend the blueprint

### Stack config file

When `capabilities` property is defined in a stack configuration file:

- if the stack extends a blueprint, its value completely overrides the value inherited from the blueprint
- otherwise, its value completely overrides the value inherited from the parent stack group

## Requirements

The `capabilities` property must satisfy these requirements:

- Must be a string or a list of strings
- Allowed values are:
  - CAPABILITY_IAM
  - CAPABILITY_NAMED_IAM
  - CAPABILITY_AUTO_EXPAND
