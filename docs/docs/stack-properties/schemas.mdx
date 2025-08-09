# Schemas

You can use custom Joi validation schemas to validate the following parts of stack configuration:

- stack data
- stack tags
- stack parameters
- stack name

You use the `schemas` property to specify which schemas Takomo should use for validation.

#### Example

In this example we have specified to use **myDataSchema** schema to validate data configuration. For tags, we have two schemas: **commonTags** and **environmentTag**.

```yaml
schemas:
  data: myDataSchema
  tags:
    - commonTags
    - name: environmentTag
      allowedValues:
        - dev
        - test
        - prod
```

The implementation of **myDataSchema** schema provider could look like this:

```javascript title="schemas/data.js"
export default {
  name: "myDataSchema",
  init: ({ joi }) => joi.object({
    owner: joi.string().email(),
    costCenter: joi.number().required()
  }) 
}
```

The file exports an object with two properties `name` and `init`. The former specifies the schema's name used to refer to it from configuration files and the latter is a function that initializes the schema object. 

The implementation of **commonTags** schema provider could look like this:

```javascript title="schemas/common-tags.js"
export default {
  name: "commonTags",
  init: ({ joi }) => joi.object({
    project: joi.string().required()
  })
}
```

Finally, we have the implementation of environmentTag schema provider:

```javascript title="schemas/environment-tag.js"
export default {
  name: "environmentTag",
  init: ({ joi, props }) => {
    return joi.object({
      environment: joi.string().valid(...props.allowedValues)
    })
  }
}
```

Unlike the other schema providers, its `init` function uses properties from the stack configuration file that are passed via the `props` argument.

## Usage in configuration

`schemas` property can be defined in:

- stack group configuration files
- blueprint configuration files
- stack configuration files

### Stack group config file

When `schemas` property is defined in a stack group configuration file:

- its value is merged with the value inherited from the parent stack group
- its value is inherited by stack groups and stacks that belong under the stack group

### Blueprint config file

When `schemas` property is defined in a blueprint configuration file:

- its value is merged with the value inherited from the parent stack group
- its value is inherited by stacks that extend the blueprint

### Stack config file

When `schemas` property is defined in a stack configuration file:

- if the stack extends a blueprint, its value is merged with the value inherited from the blueprint
- otherwise, its value is merged with the value inherited from the parent stack group

## Configuration merging

Configuration merging happens when a stack group, blueprint or stack inherits `schemas` property but also defines `schemas` property of its own.

Schemas defined by the inheritor are appended to the inherited list of schemas.

## Requirements

The `schemas` property must satisfy these requirements:

- Must be an object with the following optional properties: `data`, `tags`, `parameters` and `name`.