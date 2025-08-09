# Variables

You can specify variables for deployment groups and deployment targets with the vars property. It is an object whose keys are variable names and values contain the values for the corresponding variables. Variable values can be strings, numbers, booleans, objects or lists of the aforementioned types.

Deployment groups inherit variables from their parents, and deployment targets inherit variables from the deployment group they belong to.

If you want to apply variables to all deployment groups and targets, you can define the vars property at the top-level of the deployment configuration.

#### Example

Here's how you could use variables:

```yaml title="deployment/targets.yml"
vars:
  cost-center: 12345
  budget: 2000

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
    deploymentRoleName: deployer
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
          budget: 3000
```

We specify cost-center and budget variables to be applied to all deployment groups and targets using the top-level vars property. The all/shared deployment group overrides both of these variables, and all/application overrides only the cost-center. The targets located under the all/application specify a new variable named environment. The prod-environment target overrides the budget variable. 