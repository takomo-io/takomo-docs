---
sidebar_position: 18
---

# Data

You can define custom properties by using the `data` property. The properties specified in a stack group configuration are available in its children's and stack's configuration files and stack templates files.

#### Example

If you specify data in a stack configuration file like this:

```yaml
data:
  subnets:
    - subnet-ccbbb18ac981dc554e
    - subnet-969b3de3fa0a275d9b
    - subnet-7609598000b229fcb3
  environment:
    name: dev
    code: 123
```

Then, you can refer to the properties in the stack template file like so:

```yaml
Resources:
  Bucket:
    Type: AWS::S3::Bucket
    Properties:
      Tags:
        - Key: Environment
          Value: {{ stack.data.environment.name }}
        - Key: Code
          Value: {{ stack.data.environment.code }}
```

## Where to define

The `data` property can be defined in stack and stack group configuration files. If specified in a stack group, the stack group's children and stacks inherit the value. Takomo merges the properties defined by stack groups and stacks to the properties they inherit from their parents.

## Requirements

The `data` property must satisfy these requirements:

- Must be an object