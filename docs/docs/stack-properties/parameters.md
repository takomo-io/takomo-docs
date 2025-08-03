# Parameters

You use the `parameters` property to define input parameters for a stack. It's an object of key-value pairs where the keys are parameter names, and the values are configuration for the corresponding parameter values.

The value configuration can be a single static value, an object, or a list of the two types mentioned above. You must use the object configuration when the parameter requires additional configuration, or you want Takomo to resolve its value at deployment time.

## Simple static parameters

The simplest way to specify the value for a parameter is to hard code the value to the stack configuration file.

#### Examples

A single static value for a parameter named VpcId:

```yaml
parameters:
  VpcId: vpc-06e4ab6c6c
```

A list of values for a parameter named **CidrBlocks**:

```yaml
parameters:
  CidrBlocks:
    - 10.0.0.0/26
    - 10.0.0.64/26
```

## Static parameters with object notation

You can provide configuration for static parameters using the object notation which allows you to use additional properties in the configuration. When using the object notation you give the parameter value in `value` property.

#### Example

A single static parameter using the object notation:

```yaml
parameters:
  VpcId:
    value: vpc-06e4ab6c6c
```

## Immutable parameters

You can mark parameters as immutable if you want to make sure their values are not updated. Many CloudFormation resources have properties that don't support updating after creation, and making them immutable in stack configuration helps prevent failures during deployment.

A parameter can't be marked as immutable if it has **NoEcho** set to true in the CloudFormation template file. There is no way to find out the current value for NoEcho parameters and therefore Takomo can't detect if their value is about to be changed.

#### Example

A static immutable value for a parameter named **VpcId**:

```yaml
parameters:
  VpcId:
    value: vpc-06e4ab6c6c
    immutable: true
```

## Dynamic parameters

In many cases, it's not wise or even possible to hard code all parameter values. When you need to assign parameter values dynamically at deployment time, you can use parameter resolvers. There are a few built-in parameter resolvers, and you can also implement your own.

You use the `resolver` property to specify which parameter resolver to use to resolve the value for a parameter.

Below, you can find some examples of built-in parameter resolvers. You can read more about parameter resolvers from here.

#### Examples

If you have two stacks configured within the same Takomo project, you can use the stack-output resolver to read the first stack's output value and use it as a parameter value in the second stack.

```yaml
parameters:
  VpcId:
    resolver: stack-output
    stack: /vpc.yml
    output: vpcId
```

If the stacks are not configured within the same Takomo project, you need to use the external-stack-output resolver.

```yaml
parameters:
  VpcId:
    resolver: external-stack-output
    stack: vpc-stack
    output: vpcId
    region: eu-west-1
    commandRole: arn:aws:iam::123456789012:role/deployer
```

## Usage in configuration

`parameters` property can be defined in:

- blueprint configuration files
- stack configuration files

### Blueprint config file

When `parameters` property is defined in a blueprint configuration file:

- its value is inherited by stacks that extend the blueprint

### Stack config file

When `parameters` property is defined in a stack configuration file:

- if the stack extends a blueprint, its value is merged with the value inherited from the blueprint
- otherwise, its value is used as is

## Configuration merging

Configuration merging happens when a stack inherits `parameters` property from a blueprint but also defines `parameters` property of its own.

These rules are used when configuration merging happens:

1. Parameters are identified by their name
2. If the parameters defined by a blueprint and the parameters defined by the stack both have parameters with the same name, the parameters defined by the stack override the inherited parameters

## Requirements

The `parameters` property must satisfy these requirements:

- Parameter name must be a string
- Parameter name must match regex `^[a-zA-Z0-9]*$`

