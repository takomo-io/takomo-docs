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

## Usage in configuration

`timeout` property can be defined in:

- stack group configuration files
- blueprint configuration files
- stack configuration files

### Stack group config file

When `timeout` property is defined in a stack group configuration file:

- its value completely overrides the value inherited from the parent stack group
- its value is inherited by stack groups and stacks that belong under the stack group

### Blueprint config file

When `timeout` property is defined in a blueprint configuration file:

- its value completely overrides the value inherited from the parent stack group
- its value is inherited by stacks that extend the blueprint

### Stack config file

When `timeout` property is defined in a stack configuration file:

- if the stack extends a blueprint, its value completely overrides the value inherited from the blueprint
- otherwise, its value completely overrides the value inherited from the parent stack group

## Requirements

The `timeout` property must satisfy these requirements:

- Must be an integer greater or equal to 0
