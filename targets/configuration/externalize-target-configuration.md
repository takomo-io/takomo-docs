---
sidebar_position: 9
---

# Externalize target configuration

As the number of deployment targets grows, the size of the deployment configuration file might become unwieldy. You can externalize the deployment target configurations outside the deployment configuration file to make the deployment configuration file more manageable. To do this, you need to define the deployment target repository in a **takomo.yml** file located in your project's root directory.

There are two target repository implementations:

- [Load deployment targets from the filesystem](#load-deployment-targets-from-the-filesystem)
- [Load deployment targets from AWS organization](#load-deployment-targets-from-aws-organization)

## Load deployment targets from the filesystem

This target repository loads deployment target configurations from a specified directory. To enable it, you need to add the following configuration to the **takomo.yml** file.

```yaml title="takomo.yml"
deploymentTargets:
  repository:
    type: filesystem
    dir: <path to a directory with the target configurations>
    inferDeploymentGroupPathFromDirName: <boolean>
    inferDeploymentTargetNameFromFileName: <boolean>
```

The `type` property specifies that the target repository of type **filesystem** should be used to load the external targets configuration. The `dir` property specifies the file path to the directory from where to load the configurations. The file path can be absolute or relative to the project's root directory. Finally, the `inferDeploymentGroupPathFromDirName` property instructs Takomo to infer the target's deployment group from the name of the directory where the target's configuration file is located.  

Takomo will look for **.yml** files from the specified directory and its subdirectories. You can name the files as you wish. Each file must contain a valid configuration for one deployment target. The configuration format is the same as if the target's configuration was given in the deployment configuration file. The only difference is that unless you set `inferDeploymentGroupPathFromDirName` to true, you need to specify the target's deployment group with a deploymentGroupPath property. All deployment groups referred in the external configuration files must be defined in the deployment configuration file, too.

#### Example

Let's continue with our example and see how to externalize the deployment targets to a separate directory.

First, we specify that we want to load configuration for our deployment targets from a my-targets directory located in our project's root directory.

```yaml title="takomo.yml"
deploymentTargets:
  repository:
    type: filesystem
    dir: my-targets
```

Next, we extract the configuration for each of our target to separate files located in the my-targets directory.

```yaml title="my-targets/infra.yml"
deploymentGroupPath: all/shared
name: infra
deploymentRole: arn:aws:iam::123456789012:role/ExampleAdmin
labels: others
```

```yaml title="my-targets/dev-environment.yml"
deploymentGroupPath: all/application/dev
name: dev-environment
accountId: "222244446666"
labels: app
```

```yaml title="my-targets/sandbox.yml"
deploymentGroupPath: all/application/dev
name: sandbox
accountId: "111133335555"
labels: others 
```

```yaml title="my-targets/prod-environment.yml"
deploymentGroupPath: all/application/prod
name: prod-environment
accountId: "333355557777"
labels: app
```

As you can see, each deployment target specifies the deployment group where the target belongs to.

After our changes, the deployment configuration file looks like this: 

```yaml title="deployment/targets.yml"
vars:
  cost-center: 12345
  budget: 2000

targetsSchema: budget

deploymentGroups:
  all:
    configSets: security
  all/shared: {}
  all/application:
    configSets: networking
    targetsSchema: environment
    deploymentRoleName: deployer
  all/application/dev: {}
  all/application/prod: {}
```

And this is how our file system looks like:

```shell
.
├─ templates
├─ config-sets
│  ├─ networking
│  │  ├─ private
│  │  │  └─ tgw.yml 
│  │  └─ public 
│  │     └─ load-balancer.yml 
│  └─ security
│     ├─ config.yml
│     └─ audit.yml 
├─ deployment
│  └─ targets.yml
└─ my-targets
   ├─ infra.yml
   ├─ dev-environment.yml
   ├─ sandbox.yml
   └─ prod-environment.yml
```

### Infer deployment group from a directory name

As mentioned earlier, you can use the `inferDeploymentGroupPathFromDirName` property to instruct Takomo to infer the target's deployment group from the name of the directory where the target's configuration file is located. If you choose to use this option, you need to have a directory structure that mirrors your deployment group hierarchy. As a benefit, you can omit the `deploymentGroupPath` property from the target files.

#### Example

Alright, let's convert our example to use the `inferDeploymentGroupPathFromDirName` property.

```yaml title="takomo.yml"
deploymentTargets:
  repository:
    type: filesystem
    dir: my-targets
    inferDeploymentGroupPathFromDirName: true
```

The deployment configuration file deployment/targets.yml stays the same but we need to create a directory structure that mirrors our deployment groups under the my-targets directory and move the target files to correct subdirectories.  

```shell
.
├─ templates
├─ config-sets
│  ├─ networking
│  │  ├─ private
│  │  │  └─ tgw.yml 
│  │  └─ public 
│  │     └─ load-balancer.yml 
│  └─ security
│     ├─ config.yml
│     └─ audit.yml 
├─ deployment
│  └─ targets.yml
└─ my-targets
   └─ all
      ├─ shared
      │  └─ infra.yml
      └─ application
         ├─ dev
         │  ├─ dev-environment.yml
         │  └─ sandbox.yml
         └─ prod
            └─ prod-environment.yml
```

We can then remove the `deploymentGroupPath` property from the target files.

### Infer deployment targets' names from names of their config files

You can use the `inferDeploymentTargetNameFromFileName` property to instruct Takomo to infer targets' names from the names of their configuration files. You can then omit the name property from the target files.

The target name is inferred by removing the .yml file extension from the target's configuration file name.

#### Example

Let's add `inferDeploymentTargetNameFromFileName` to our example. 

```yaml title="takomo.yml"
deploymentTargets:
  repository:
    type: filesystem
    dir: my-targets
    inferDeploymentGroupPathFromDirName: true
    inferDeploymentTargetNameFromFileName: true
```

Then just remove the `name` property from configuration files of our targets.

## Load deployment targets from AWS organization

This target repository loads deployment target configurations from an AWS organization. It scans all organization's member accounts and creates one deployment target for each account. To enable it, you need to add the following configuration to the **takomo.yml** file.

```yaml title="takomo.yml"
deploymentTargets:
  repository:
    type: organization
    organizationReaderRoleArn: <path to a directory with the target configurations>
    inferDeploymentGroupPathFromOUPath: <boolean>
    inferDeploymentTargetNameFromAccountName: <boolean>
```

The `type` property specifies that the target repository of type **organization** should be used to load the external targets configuration. The `organizationReaderRoleArn` property specifies which IAM role Takomo should assume to query organization's member accounts. If no role is specified, Takomo uses AWS credentials found from the current terminal session.

By default, Takomo infers a target's deployment group from the organizational unit where the member account belongs to. You can turn off this feature by setting `false` to `inferDeploymentGroupPathFromOUPath` property, but then all targets will have same deployment group **ROOT**. 

By default, Takomo infers a target's name from the member account's name. You can turn off this feature by setting `false` to `inferDeploymentTargetNameFromAccountName` property, but then Takomo uses account's id as target name.

All deployment groups referred in the external configuration files must be defined in the deployment configuration file, too.
