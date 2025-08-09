# Schemas

You can validate deployment targets you have defined in the deployment configuration using custom [Joi validation](https://joi.dev/) schemas. 

:::note
Take a look at [custom validation schemas documentation](/docs/validation-schemas/custom-validation-schemas) to learn more about custom schemas.
:::

You associate schemas with a deployment group using the `targetsSchema` property, which accepts a single schema or a list of schemas. Takomo uses the schemas associated with a deployment group to validate all deployment targets located under it in the deployment groups hierarchy.

You can also specify the `targetsSchema` property at the top-level of the deployment configuration. Top-level schemas are applied to all deployment groups.

The schemas used to validate deployment targets must be [object schemas](https://joi.dev/api/?v=17.5.0#object) because the deployment targets to validate are given as an object whose keys are paths to deployment targets in the deployment groups hierarchy, and values are configurations of the deployment target themselves. 

#### Example

Let's add two custom validation schemas. One to validate that if the budget variable is given, it must be a non-negative number, and another to validate that the environment variable is given and is one of the allowed values. The schemas are located in the schemas directory.

```js title="schemas/budget.js"
module.exports = {
  name: "budget",
  init: ({ joi }) =>
    joi.object().pattern(
      /^/,
      joi
        .object({
          vars: joi
            .object({
              budget: joi.number().min(0),
            }),
        })
        .unknown(true),
    ),    
}
```

```js title="schemas/environment.js"
module.exports = {
  name: "environment",
  init: ({ joi }) =>
    joi.object().pattern(
      /^/,
      joi
        .object({
          vars: joi
            .object({
              environment: joi.valid("dev", "sandbox", "prod"),required(),
            }),
        }).required()
        .unknown(true),
    ),
}
```

With these schemas available, we can modify our deployment configuration and refer to the schemas with their names.

```yaml title="deployment/targets.yml"
vars:
  cost-center: 12345
  budget: 2000

targetsSchema: budget

deploymentGroups:
  all:
    configSets: security
  all/shared:
    vars:
      cost-center: 10000 
      budget: 500 
    targets:
      - name: infra
  all/application:
    configSets: networking
    targetsSchema: environment
    vars:
      cost-center: 600
  all/application/dev:
    targets:
      - name: dev-environment
        vars:
          environment: dev
      - name: sandbox
        vars:
          environment: sandbox
  all/application/prod:
    targets:
      - name: prod-environment
        vars:
          environment: prod
          budget: 300
```

We use the budget schema for all deployment targets and the environment schema for the targets under the all/applications deployment group.

With this configuration, the object that gets passed to our custom schemas looks like this:

```yaml title="deployment/targets.yml"
all/shared/infra:
  deploymentGroupPath: all/shared
  name: infra
  configSets:
    - security
  vars:
    cost-center: 10000 
    budget: 500   
all/application/dev/dev-environment:
  deploymentGroupPath: all/application/dev
  name: dev-environment
  configSets:
    - security
    - networking
  vars:
    cost-center: 12345
    budget: 2000
    environment: dev  
all/application/dev/sandbox:
  deploymentGroupPath: all/application/dev
  name: sandbox
  configSets:
    - security
    - networking
  vars:
    cost-center: 12345
    budget: 2000
    environment: sandbox  
all/application/prod/prod-environment:
  deploymentGroupPath: all/application/prod
  name: prod-environment
  configSets:
    - security
    - networking
  vars:
    cost-center: 12345
    budget: 300 
    environment: prod
```