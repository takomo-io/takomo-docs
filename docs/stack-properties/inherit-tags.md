---
sidebar_position: 10
---

# Inherit tags

By default, stacks and stack groups inherit tags from their parent stack group. You can disable this behaviour by setting `inheritTags` to false.

#### Examples

Disable inheriting of tags.

```yaml
inheritTags: false
```

## Where to define

The `inheritTags` property can be defined in stack and stack group configuration files. Disabling tag inheritance in a stack group configuration affects only to the stack group itself and not stacks and stack groups that belong under it.

## Requirements

The `inheritTags` property must satisfy these requirements:

- Must be a boolean