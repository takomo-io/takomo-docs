# Template

You put CloudFormation template files for stacks in the templates directory or its subdirectories.

For each stack, you specify the template file to use with the `template` property. It accepts a relative file path to the template file in the templates directory.

If you don't specify the template, Takomo looks for a template file using the relative file path to the current stack configuration file from the stacks directory.

:::note
Takomo supports both of the standard CloudFormation template file formats, i.e., JSON and YAML.
:::

#### Example

Say, we have the following project.

```shell
.
├─ stacks
│  └─ application.yml
└─ templates
   └─ application-template.yml
```

In **application.yml** stack configuration file you can define the `template` property like so:

```yaml title="application.yml"
template: application-template.yml
```

If you omit the `template` property, Takomo would fallback to the default behaviour and look for a template file by name **application.yml** from the templates directory.

## Inline template body

You can also inline the template body in a stack configuration file.

#### Example

```yaml
template:
  inline: |
    Resources:
      VPC:
        Type: AWS::EC2::VPC
        Properties:
          CidrBlock: 10.0.0.0/16
```

## Disabling dynamic template

By default, Takomo processes each template file with [Handlebars](https://handlebarsjs.com/) templating engine. You can turn off this dynamic template processing by providing the template configuration with an object with two properties: `filename` and `dynamic`. The former specifies the relative file path to the template file in the templates directory, and the latter is an optional boolean to enable or disable dynamic processing.

#### Example

Use the object notation to disable dynamic template:

```yaml
template:
  filename: networking.yml
  dynamic: false
```

## Usage in configuration

`template` property can be defined in:

- blueprint configuration files
- stack configuration files

### Blueprint config file

When `template` property is defined in a blueprint configuration file:

- its value is inherited by stacks that extend the blueprint

### Stack config file

When `template` property is defined in a stack configuration file:

- if the stack extends a blueprint, its value completely overrides the value inherited from the blueprint
- otherwise, its value is used as is

## Requirements

The `template` property must satisfy these requirements:

- Must be a string or an object