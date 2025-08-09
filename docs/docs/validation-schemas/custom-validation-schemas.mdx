# Custom Validation Schemas

You can use custom Joi validation schemas to validate your configuration. 

:::note
Please read more about Joi from its [official documentation](https://joi.dev/api/?v=17.4.0). 
:::

You provide custom validation schemas by placing plain JavaScript files, with **.js** file extension, into the schemas directory or its subdirectories. Each file must export a schema provider object. Takomo uses the provider to initialize the actual schema.

## Schema provider

Schema provider initializes a Joi validation schema. It has the following properties:

- `name`
  - Name of the resolver used to refer to the schema from configuration files. It can be either a string or a function that returns a string. The function must not be asynchronous.
  - Required.
- `init`
  - A function that initializes the Joi schema object with properties given in a configuration file that uses to the schema.
  - The function can be either synchronous or asynchronous, and must return an instantiated Joi schema.
  - It takes one argument that is an object with the following properties:
    - ctx - CommandContext object that provides access to project configuration
    - joi - Joi instance to create new validation constraints
    - props - Properties from the configuration file
  - Required.
- `schema`
  - A function that return a Joi schema object used to validate the properties given to the init function.
  - It takes one argument that is an object with the following properties:
    - ctx - CommandContext object that provides access to project configuration
    - joi - Joi instance to create new validation constraints
    - base - A pre-initialized Joi object schema that you can modify to provide your resolver's validation schema
  - You can return the pre-initialized schema from the schema function or use the Joi instance to create an entirely new schema. In most cases you should modify the base schema object as needed and then return it.
  - Optional.

## Examples

Here are a few examples of custom schemas.

### Validation schema for stack tags

You can use the schemas property to specify validation schemas for stack tag configuration. Tag configuration is an object whose keys are tag keys and values are value for the corresponding tags. Therefore you need to use Joi's object schema to validate your tag configurations.

First, you need to implement a schema provider. We name our tag schema as my-tags and specify two required properties: environment and costCenter. In other words, we require that every stack must always have these two tags.

```javascript title="schemas/my-tags.js"
export default {
  name: "my-tags",
  init: ({ joi }) => joi.object({
    environment: joi.string().valid("dev", "test", "prod").required(),
    costCenter: joi.number().required()
  }).unknown(false)
} 
```

In stack configuration we specify that we want to validate stack tags using our custom schema like so:

```yaml
schemas:
  tags: my-tags
  
tags:
  environment: dev
  costCenter: 1234  
```

## Using TypeScript

You can also implement validation schemas using TypeScript. Make sure you have [TypeScript support enabled](../configuration/project-configuration#typescript-support).

Place code for your validation schemas in `src` directory under the project directory:

```typescript title="src/stack-name-schema.ts"
import { InitSchemaProps, SchemaProvider } from "takomo"

const init = async ({ joi, props }: InitSchemaProps) =>
  joi
    .string()
    .lowercase()
    .custom((value, helpers) => {
      // Name must begin with the given prefix
      if (!value.startsWith(props.prefix)) {
        return helpers.error("invalidPrefix", {
          prefix: props.prefix,
          name: value,
        })
      }
    })
    .messages({
      invalidPrefix: "Stack name '{{#name}}' does not begin with required prefix '{{#prefix}}'",
    })

export const stackNameSchemaProvider: SchemaProvider = {
  name: "stack-name",
  init,
}

```

Register your validation schemas in `takomo.ts` file located in the project directory like so:

```typescript title="takomo.ts"
import {TakomoConfigProvider} from 'takomo'
import {stackNameSchemaProvider} from './src/stack-name-schema'

const provider: TakomoConfigProvider = async () => ({
  schemaProviders: [
    stackNameSchemaProvider,
  ],
})

export default provider
```
