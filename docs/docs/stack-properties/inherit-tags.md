# Inherit tags

By default, stacks and stack groups inherit tags from their parent stack group. You can disable this behaviour by setting `inheritTags` to false.

#### Examples

Disable inheriting of tags.

```yaml
inheritTags: false
```

## Usage in configuration

`inheritTags` property can be defined in:

- stack group configuration files
- blueprint configuration files
- stack configuration files

### Stack group config file

When `inheritTags` property is defined in a stack group configuration file:

- its value is used as is
- its value is not inherited by stack groups and stacks that belong under the stack group

### Blueprint config file

When `inheritTags` property is defined in a blueprint configuration file:

- its value is used as is
- its value is inherited by stacks that extend the blueprint

### Stack config file

When `inheritTags` property is defined in a stack configuration file:

- if the stack extends a blueprint, its value completely overrides the value inherited from the blueprint
- otherwise, its value is used as is

## Requirements

The `inheritTags` property must satisfy these requirements:

- Must be a boolean