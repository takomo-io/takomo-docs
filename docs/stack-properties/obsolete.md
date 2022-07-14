---
sidebar_position: 16
---

# Obsolete

You can exclude stacks from configuration by marking them as obsolete with the `obsolete` property. Obsolete stacks can be removed with [prune stacks command](../command-line-usage/prune-stacks.md).
Obsolete stacks can't have dependents that are not obsolete themselves.

#### Examples

Setting the obsolete property:

```yaml
obsolete: true
```

## Where to define

The `obsolete` property can be defined in stack and stack group configuration files. If specified in a stack group, the stack group's children and stacks inherit the value but can also override it.

## Requirements

The `obsolete` property must satisfy these requirements:

- Must be a boolean