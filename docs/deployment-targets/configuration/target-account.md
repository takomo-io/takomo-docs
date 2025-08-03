# Target Account

There are two options to specify to which account Takomo should deploy stacks defined in a deployment target's config sets.

- Provide a complete IAM role ARN in the deplomentRole property.
- Provide the target account's id in the accountId property and the name of the IAM role in the deploymentRoleName property.

The first option takes precedence over the second one.

#### Example

Let's specify target accounts for our deployment targets.

```yaml title="deployment/targets.yml"
vars:
  cost-center: 12345
  budget: 2000

targetsSchema: budget

deploymentGroups:
  all:
    configSets: security
  all/shared:
    targets:
      - name: infra
        deploymentRole: arn:aws:iam::123456789012:role/ExampleAdmin
  all/application:
    configSets: networking
    targetsSchema: environment
    deploymentRoleName: deployer
  all/application/dev:
    targets:
      - name: dev-environment
        accountId: "222244446666"
      - name: sandbox
        accountId: "111133335555"
  all/application/prod:
    targets:
      - name: prod-environment
        accountId: "333355557777"
```

The infra deployment target uses the `deploymentRole` property to set the IAM role Takomo should use to deploy its configurations. The value for the `deploymentRole` property is complete IAM role ARN which also includes the target account id.

The rest of the deployment targets belong under the all/application deployment group in the deployment groups hierarchy. Therefore, they inherit the `deploymentRoleName` property defined by the all/application deployment group. Each target then specifies the `accountId` property, which Takomo combines with the deploymentRoleName property to form the complete ARN for the deployment role.