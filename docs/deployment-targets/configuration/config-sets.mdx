# Config Sets

## Config set directory and files

Config sets are standard Takomo stack configurations‚ but instead of the stacks directory, you put them to subdirectories under the config-sets directory. The directory names become the names of the config sets, and you use them to refer to the config sets in the deployment configuration file.

You place your stack group and stack configuration files directly in the config set directory's root. Other standard Takomo directories such as the templates directory remains in the project's root.  

#### Example

Here is an example with two config sets named networking and security.

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
└─ deployment
   └─ targets.yml
```

The networking config set has two stack groups named private and public, and under them, there are stacks tgw.yml and load-balancer.yml.

The security config set has a stack group configuration (config.yml) and audit.yml stack.  

## Attaching config sets

You can attach config sets to deployment targets or deployment groups. Deployment groups and targets inherit config sets from the deployment group they belong to. They can add config sets of their own but can't remove the config sets they inherited.

You attach config sets to deployment groups and targets by providing single config set name or a list of config set names in their configSets property.

#### Example

Let's attach the two config sets (networking and security) from the previous example to some deployment groups and targets in our deployment configuration.

```yaml title="deployment/targets.yml"
deploymentGroups:
  all:
    configSets: security
  all/shared:
    targets:
      - name: infra
  all/application:
    configSets: networking
  all/application/dev:
    targets:
      - name: dev-environment
      - name: sandbox
  all/application/prod:
    targets:
      - name: prod-environment
```

We attached the security config set to the all deployment group. As all is the root deployment group, all of our targets inherit the security config set from it. We then attached the networking config set to the all/application group.