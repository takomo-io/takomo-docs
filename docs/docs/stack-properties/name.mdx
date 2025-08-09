# Name

Each CloudFormation stack must have a name that is unique within the stack's region. Takomo uses stack names to match stacks found from the local configuration with the target accounts' stacks.

You can give a name for a stack using the `name` property.

#### Example

Specifying a name:

```yaml
name: vpc
```

## Default value

If you omit the name, Takomo will generate the name using the following logic:

1. Take the stack path and remove the leading forward slash
2. Remove the region specifier from the end of the stack path
3. Replace the remaining forward slashes with hyphens
4. If the project property is specified, prepend it to the name

For example, if your stack's path is **/dev/eu-west-1/vpc.yml/eu-west-1**, its generated name will be **dev-eu-west-1-vpc**.

## Usage in configuration

`name` property can be defined in:

- blueprint configuration files
- stack configuration files

### Blueprint config file

When `name` property is defined in a blueprint configuration file:

- its value is inherited by stacks that extend the blueprint

### Stack config file

When `name` property is defined in a stack configuration file:

- if the stack extends a blueprint, its value completely overrides the value inherited from the blueprint
- otherwise, its value is used as is

## Requirements

The name property must satisfy these requirements:

- Must be a string
- Must match regex ^[a-zA-Z0-9][-a-zA-Z0-9]*$
- Have a minimum length of 1
- Have a maximum length 128

## Renaming stacks

You can't rename stacks. If you change the name of an existing stack, Takomo will use the new name to find a corresponding stack from the target account. As Takomo does not keep track of the stacks it has deployed, it can't know that the stack still exists with the old name.