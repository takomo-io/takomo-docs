import {ApiLink} from '@site/src/components/ApiLink';

# Custom parameter resolvers

You can provide custom parameter resolvers by placing plain JavaScript files, with **.js** file extension, into the resolvers directory. Each file must export a parameter resolver provider object. Takomo uses the provider to initialize the actual parameter resolver.

## API

### Parameter Resolver Provider

The parameter resolver provider must implement the <ApiLink text="ResolverProvider" source="interfaces/ResolverProvider.html"/> interface which has the following properties:

- `name`
  - Name of the resolver used to refer to the resolver from stack configuration files.
  - Must be either a string or a synchronous function that returns a string.
  - Required.
- `init`
  - A function that initializes the resolver with properties given in a stack configuration file.
  - Can be either synchronous or asynchronous.
  - Must return an instantiated parameter resolver object.
  - Required.
- `schema`
  - An optional function that returns a Joi schema that is used to validate configuration provided for the resolver from stack configuration files.
  - It takes one argument that is an object with the following properties:
    - `ctx` - CommandContext object that provides access to project configuration
    - `joi` - Joi instance to create new validation constraints
    - `base` - A pre-initialized Joi object schema that you can modify to provide your resolver's validation schema
  - You can return the pre-initialized schema from the schema function or use the Joi instance to create an entirely new schema. In most cases you should modify the base schema object as needed and then return it.

### Parameter Resolver

The parameter resolver must implement the <ApiLink text="Resolver" source="interfaces/Resolver.html"/> interface which consists of the following properties:

- `resolve`
  - A function that resolves the actual parameter value. The resolved value can be of any type and is converted to a string before it is passed to CloudFormation. If the value is an array, it is converted to a string by joining its values with a comma.
  - The resolve function is invoked with a single argument of type ResolverInput that contains the following properties:
    - `ctx` - CommandContext object that provides access to project configuration
    - `logger` - Logger instance.
    - `stack` - The stack where the parameter whose value is being resolved belongs to.
    - `listParameterIndex` - If the parameter whose value is being resolved is of type list, this will hold the index of the value in the list. The index begins from 0. This will be 0 if the parameter being resolved os not list.
    - `parameterName` - Name of the parameter whose value is being resolved.
    - `variables` - A mutable copy of the current command variables during the stack operation.
  - `confidential`
      - A boolean or a synchronous function that returns a boolean value determining if the resolved parameter value should be concealed from log messages. The confidential property in a stack configuration file takes precedence over this value.
      - Optional, defaults to false.
  - `dependencies`
    - A list of stack paths or a synchronous function that returns a list of stack paths of the stacks that the resolver depends on.
    - Optional, defaults to an empty list.
  - `iamRoleArns`
    - A list of IAM role ARNs or a synchronous function that returns a list of IAM role ARNs needed to resolve the value.
    - Optional, defaults to an empty list.

## Examples

### Simple custom resolver

Here's an example of a simple custom parameter resolver that converts the value given in the parameter resolver configuration to uppercase. The parameter resolver schema requires that in the stack configuration file where the resolver is used, the resolver configuration must contain a value property of type string, and that its value must not have more than 50 characters.

Our file structure looks like this:

```shell
.
├─ stacks
│  └─ my-stack.yml
├─ resolvers
│  └─ uppercase.js
└─ templates
   └─ my-stack.yml
```

The parameter resolver provider defined in **resolvers/uppercase.js** looks like this:

```javascript title="resolvers/uppercase.js"
export default {
  name: "uppercase",
  schema: ({joi, base}) => {
    return base.keys({
      value: joi.string().max(50).required()
    })
  },
  init: (props) => {
    return {
      confidential: true,
      dependencies: () => [],
      iamRoleArns: [],
      resolve: (input) => {
        input.logger.debug("Execute uppercase!");
        input.logger.debug(`Resolve value for parameter '${input.parameterName}'`);
        return props.value.toUpperCase();
      }
    }
  }
}
```

Our custom parameter resolver is used in the stack configuration like so:

```yaml title="stacks/my-stack.yml"
parameters:
  MyParameter:
    resolver: uppercase
    value: hello
```

When the stack is deployed, the value for **MyParameter** parameter is resolved using the **uppercase** custom parameter resolver. The actual value that is assigned to the parameter will be **"HELLO"**.

## Publishing resolvers to NPM

You can share your custom resolvers with others by publishing them to NPM. The published NPM package must export a parameter resolver provider object.

#### Example

Here's an example of how to publish a simple custom resolver that returns the current timestamp. The project file structure looks like this:

```shell
.
├─ index.js
└─ package.json
```

The **index.js** file contains the parameter resolver provider:

```javascript title="index.js"
export default {
  name: "timestamp",
  init: () => Date.now(),
}
```

The **package.json** file contains minimum configuration that is needed to publish the resolver to NPM: 

```yaml title="package.json"
{
  "name": "takomo-timestamp-resolver",
  "version": "0.0.1",
  "description": "My custom timestamp resolver",
  "files": [
    "index.js"
  ],
  "main": "index.js",
  "license": "MIT",
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  }
}
```

Refer to official NPM [documentation](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry) for more information about publishing NPM packages.

## Using resolvers from NPM

To use custom resolvers published to NPM, you need to install the resolver's NPM package to your project and then register the resolver in your project's **takomo.yml** file.

#### Example

Let's see how we would include the timestamp resolver from the previous example to our own project.

First of all, we need to install and save the resolver package to our project's dependencies:

```shell
npm install takomo-timestamp-resolver@0.0.1 --save-dev 
```

Then, we need to register the resolver to our Takomo project by modifying the **takomo.yml** file. There are three ways to register a resolver:

```yaml title="takomo.yml"
# Add resolvers section
resolvers:

  # 1) Use just the package name
  - takomo-timestamp-resolver

  # 2) Give the package name with 'package' property
  - package: takomo-timestamp-resolver

  # 3) Give the package name with 'package' property and
  #    override the resolver name with 'name' property.    
  - package: takomo-timestamp-resolver
    name: special-timestamp
```

When registering the resolver using option 1 or 2, Takomo registers the resolver using the name exposed by the resolver provider object - in this case that is **timestamp**.

It's possible that our project already has a resolver registered with the same name. Takomo requires that all resolver names are unique and will throw an error if more that one resolver has the same name. To work around this problem, you can use the third way to register a resolver, which let's you specify a new name for it. In our example, we have set the resolver name to be **special-timestamp**.

Once the resolver is registered, you can use it like any resolver. For more information, see the related documentation.

## Using TypeScript

You can also implement custom parameter resolvers using TypeScript. Make sure you have [TypeScript support enabled](../configuration/project-configuration#typescript-support).

Place code for your custom parameter resolvers in `src` directory under the project directory:

```typescript title="src/example-resolver.ts"
import {ResolverInput, ResolverProvider, ParameterConfig} from "takomo"

const exampleResolverProvider: ResolverProvider = {
  init: async (config: ParameterConfig): Promise<Resolver> => {
    return {
      resolve: async (input: ResolverInput): Promise<string> => {
        return "hello"
      },
    }
  },
  name: "my-resolver",
}
```

Register your parameter resolvers in `takomo.ts` file located in the project directory like so:

```typescript title="takomo.ts"
import {TakomoConfigProvider} from 'takomo'
import {exampleResolverProvider} from './src/example-resolver'

const provider: TakomoConfigProvider = async () => ({
  resolverProviders: [
    exampleResolverProvider,
  ],
})

export default provider
```
