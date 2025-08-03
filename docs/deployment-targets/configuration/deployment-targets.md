# Deployment Targets

You use deployment group's targets property to specify its targets. Each target must have a name that is unique among all targets in the deployment configuration.

#### Example

Let's continue the example we started earlier and add two targets to all/application/dev deployment group, and one to all/application/prod and all/shared deployment groups. 

```yaml title="deployment/targets.yml"
deploymentGroups:
  all/shared:
    targets:
      - name: infra
  all/application/dev:
    targets:
      - name: dev-environment
      - name: sandbox
  all/application/prod:
    targets:
      - name: prod-environment
```

Now, we have four deployment targets: infra, dev-environment, sandbox and prod-environment.