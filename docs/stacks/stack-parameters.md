---
id: stack-parameters
title: Stack Parameters
description: Input parameter for stacks
keywords:
  - Takomo
  - paramaters
  - stack
---

Input parameters for a CloudFormation stack are given with the [parameters](/docs/config-reference/stacks#parameters) property. It's an object of key-value pairs where the keys are parameter names, and the values are configuration for the parameter value. The value configuration can be a single static value, an object, or a list of the two aforementioned types. The object form is used when the parameter value is resolved at deployment time using a parameter resolver.

## Static Parameters

The simplest way to specify the value for a parameter is to hard code the value to the stack configuration file.

#### Examples

A single static value for a parameter named **VpcId**:

```yaml
parameters:
  VpcId: vpc-06e4ab6c6c
```

A list of values for a parameter named **CidrBlocs**:

```yaml
parameters:
  CidrBlocs:
    - 10.0.0.0/26
    - 10.0.0.64/26
```

You can provide configuration for static parameters using object notation which allows you to use additional properties in the configuration. When using the object notation you give the parameter value in `value` property:

```yaml
parameters:
  VpcId:
    value: vpc-06e4ab6c6c
```

## Immutable Parameters

You can mark parameters as immutable if you want to make sure their values are not updated. Many CloudFormation resources have properties that don't support updating after creation, and making them immutable in stack configuration helps prevent failures during deployment.

A parameter can't be marked as immutable if it has **NoEcho** set to true in the CloudFormation template file. There is no way to find out the current value for NoEcho parameters and therefore Takomo can't detect if their value is about to be changed. 

#### Examples

A static immnutable value for a parameter named **VpcId**:

```yaml
parameters:
  VpcId:
    value: vpc-06e4ab6c6c
    immutable: true
```

## Dynamic Parameters

In many cases, it's not wise or even possible to hard code all parameter values. When you need to assign parameter values dynamically at deployment time, you can use parameter resolvers. There are a few built-in parameter resolvers, and you can also implement your own.

You use the **resolver** property to specify which parameter resolver should be used to resolve the value for a parameter.

Below, you can find some examples of built-in parameter resolvers. In [the next section](/docs/stacks/parameter-resolvers) we'll learn more about parameter resolvers. 

#### Example: Reading Value for a Parameter from Another Stack's Outputs

If we have two stacks configured within the same Takomo project, we can use the [stack-output resolver](/docs/stacks/parameter-resolvers#stack-output) to read the first stack's output value and use it as a parameter value in the second stack.

```yaml
parameters:
  VpcId:
    resolver: stack-output
    stack: /vpc.yml
    output: vpcId
```

If the stacks are not configured within the same Takomo project, we need to use the [external-stack-output resolver](/docs/stacks/parameter-resolvers#external-stack-output).

```yaml
parameters:
  VpcId:
    resolver: external-stack-output
    stack: vpc-stack
    output: vpcId
    region: eu-west-1
    commandRole: arn:aws:iam::123456789012:role/deployer
```

## See Also

- [Config reference > parameters property](/docs/config-reference/stacks#parameters)
- [Parameter resolvers](/docs/stacks/parameter-resolvers)