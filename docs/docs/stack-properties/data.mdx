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

## Usage in configuration

`data` property can be defined in:

- stack group configuration files
- blueprint configuration files
- stack configuration files

### Stack group config file

When `data` property is defined in a stack group configuration file:

- its value is merged with the value inherited from the parent stack group
- its value is inherited by stack groups and stacks that belong under the stack group

### Blueprint config file

When `data` property is defined in a blueprint configuration file:

- its value is merged with the value inherited from the parent stack group
- its value is inherited by stacks that extend the blueprint

### Stack config file

When `data` property is defined in a stack configuration file:

- if the stack extends a blueprint, its value is merged with the value inherited from the blueprint
- otherwise, its value is merged with the value inherited from the parent stack group

## Configuration merging

Configuration merging happens when a stack group, blueprint or stack inherits `data` property but also defines `data` property of its own.

Data objects are merged recursively.

## Requirements

The `data` property must satisfy these requirements:

- Must be an object