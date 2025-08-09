# Depends

It’s a good practice to split the infrastructure into multiple stacks that group related resources together. Naturally, there will be dependencies between the stacks.

For example, one stack creates a VPC with subnets, and another stack creates some resources into those subnets. The stacks need to be created and updated in a certain order to ensure that the dependencies can be satisfied. For example, you need to have the subnets ready before you can create other resources into them.

You specify the stacks that a stack depends on by using the `depends` property which accepts a single stack path or a list of stack paths.

#### Examples

A single dependency:

```yaml
depends: /dev/vpc.yml
```

A single dependency with region:

```yaml
depends: /dev/vpc.yml/eu-west-1
```

Multiple dependencies:

```yaml
depends:
  - /dev/vpc.yml
  - /dev/security-groups.yml
```

Using a relative stack path:

```yaml
depends: ../../common/logs.yml
```

## Usage in configuration

`depends` property can be defined in:

- blueprint configuration files
- stack configuration files

### Blueprint config file

When `depends` property is defined in a blueprint configuration file:

- its value is inherited by stacks that extend the blueprint

### Stack config file

When `depends` property is defined in a stack configuration file:

- if the stack extends a blueprint, its value completely overrides the value inherited from the blueprint
- otherwise, its value is used as is

## Requirements

The depends property must satisfy these requirements:

- Must be a string or a list of strings
- Must contain valid stack paths