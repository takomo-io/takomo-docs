# Termination protection

You can enable termination protection for a stack with the `terminationProtection` property.

#### Example

Enabling termination protection:

```yaml
terminationProtection: true
```

## Default value

Termination protection is not enabled by default.

## Usage in configuration

`terminationProtection` property can be defined in:

- stack group configuration files
- blueprint configuration files
- stack configuration files

### Stack group config file

When `terminationProtection` property is defined in a stack group configuration file:

- its value completely overrides the value inherited from the parent stack group
- its value is inherited by stack groups and stacks that belong under the stack group

### Blueprint config file

When `terminationProtection` property is defined in a blueprint configuration file:

- its value completely overrides the value inherited from the parent stack group
- its value is inherited by stacks that extend the blueprint

### Stack config file

When `terminationProtection` property is defined in a stack configuration file:

- if the stack extends a blueprint, its value completely overrides the value inherited from the blueprint
- otherwise, its value completely overrides the value inherited from the parent stack group

## Requirements

The `terminationProtection` property must satisfy these requirements:

- Must be a boolean