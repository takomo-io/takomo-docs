---
sidebar_position: 15
---

# Ignore

You can exclude stacks and stack groups from the configuration with the `ignore` property.

#### Examples

Setting the ignore property:

```yaml
ignore: true
```

## Where to define

The `ignore` property can be defined in stack and stack group configuration files. If specified in a stack group, the stack group's children and stacks inherit the value. If you set a stack group as ignored, its children or stacks can't set the ignore property back to false.

## Requirements

The `ignore` property must satisfy these requirements:

- Must be a boolean
