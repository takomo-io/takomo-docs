# Labels

You can add labels to deployment groups and targets with the `labels` property, which accepts a single label or a list of labels. Deployment groups and targets inherit labels from the deployment group they belong to and can have labels of their own but can't remove the inherited labels.

You can use labels to choose which deployment targets to include in commands. For example, you can deploy only those targets that have a dev label.

#### Example

Let's add label app to targets dev-environment and prod-environment, and another label others to infra and sandbox targets. We could use these labels to deploy all application targets (targets with the app label).

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
        labels: others
  all/application:
    configSets: networking
    targetsSchema: environment
    deploymentRoleName: deployer
  all/application/dev:
    targets:
      - name: dev-environment
        accountId: "222244446666"
        labels: app
      - name: sandbox
        accountId: "111133335555"
        labels: others 
  all/application/prod:
    targets:
      - name: prod-environment
        accountId: "333355557777"
        labels: app
```

