---
sidebar_position: 19
---

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
module.exports = {
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
module.exports = {
  name: "commonTags",
  init: ({ joi }) => joi.object({
    project: joi.string().required()
  })
}
```

Finally, we have the implementation of environmentTag schema provider:

```javascript title="schemas/environment-tag.js"
module.exports = {
  name: "environmentTag",
  init: ({ joi, props }) => {
    return joi.object({
      environment: joi.string().valid(...props.allowedValues)
    })
  }
}
```

Unlike the other schema providers, its `init` function uses properties from the stack configuration file that are passed via the `props` argument.

## Where to define

The `schemas` property can be defined in stack and stack group configuration files. If specified in a stack group, the stack group's children and stacks inherit the value. The schemas defined by stack groups and stacks are appended to the list of schemas they inherit from their parent.

## Requirements

The `schemas` property must satisfy these requirements:

- Must be an object with the following optional properties: `data`, `tags`, `parameters` and `name`.