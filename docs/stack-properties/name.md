---
sidebar_position: 1
---

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

## Where to define

The `name` property can be defined only in stack configuration files.

## Requirements

The name property must satisfy these requirements:

- Must be a string
- Must match regex ^[a-zA-Z0-9][-a-zA-Z0-9]*$
- Have a minimum length of 1
- Have a maximum length 128

## Renaming stacks

You can't rename stacks. If you change the name of an existing stack, Takomo will use the new name to find a corresponding stack from the target account. As Takomo does not keep track of the stacks it has deployed, it can't know that the stack still exists with the old name.