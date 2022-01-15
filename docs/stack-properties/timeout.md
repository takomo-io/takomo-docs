---
sidebar_position: 12
---

# Timeout

You specify a timeout in seconds for stack create and update operations by using the `timeout` property. Takomo cancels the operation if it takes longer than what you have specified in the timeout property. You can't set a timeout for the delete operation. Use 0 to disable the timeout.

You set the timeout for both create and update operations by specifying a single integer. You can also set a separate timeout for `create` and `update` operations by using an object with create and update properties.

#### Examples

Timeout of 180 seconds for both create and update:

```yaml
timeout: 180
```

Timeout of 300 seconds for create and no timeout for update:

```yaml
timeout:
  create: 300
```

Separate timeouts for create and update:

```yaml
timeout:
  create: 300
  update: 120
```

## Where to define

The `timeout` property can be defined in stack and stack group configuration files. If specified in a stack group, the stack group's children and stacks inherit the value. Stack groups and stacks can override the value they have inherited from their parent.

##Requirements

The `timeout` property must satisfy these requirements:

- Must be an integer greater or equal to 0
