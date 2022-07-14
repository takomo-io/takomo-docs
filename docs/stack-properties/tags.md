---
sidebar_position: 9
---

# Tags

You specify stack tags with the `tags` property. CloudFormation automatically adds the tags to each resource in the stack that supports tagging.

#### Examples

Setting tags:

```yaml
tags:
  foo: bar
  code: 123
  backups: true
```

## Where to define

The `tags` property can be defined in stack and stack group configuration files. If specified in a stack group, the stack group's children and stacks inherit the value. Stack groups and stacks can add new tags and overwrite individual tags they inherited from their parent by specifying a new value with the same key.

## Requirements

The `tags` property must satisfy these requirements:

- Each tag key must be a string
- Each tag value must be a string, a number or a boolean