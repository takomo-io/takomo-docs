# Introduction

Deployment targets offer a scalable and flexible way to deploy Takomo configurations across multiple accounts and regions.

:::note
Deployment targets functionality builds on top of Takomo's stack configuration and deployment features. Before learning more about deployment targets, you should have a good understanding of Takomo's basics.
:::

## Deployment targets

A deployment target represents a target where to deploy CloudFormation stacks. Targets can reside in different accounts and regions. Each target has a name that you use to refer to it.

## Deployment groups

You use deployment groups to group deployment targets with similar configurations. You can nest deployment groups to create tree-like hierarchies where child groups inherit configuration from their parents.

Deployment targets inherit configuration from the deployment group they belong to. Both the child deployment groups and deployment targets can also override all or parts of the configuration they inherit.

## Config sets

You use config sets to specify stacks you want to deploy to your deployment targets. Config sets are regular Takomo stack configurations.

You can attach config sets to deployment groups and deployment targets. Deployment targets inherit config sets attached to the deployment group they belong to.

## Variables

You can specify variables for deployment groups and targets. Deployment groups inherit variables from their parents, and targets inherit variables from the deployment group they belong to. The variables are useful when you want to deploy your stacks to multiple targets with different parameters..

Takomo exposes variables attached to a deployment target when it gets deployed. You can refer to the variables in stack and stack group configuration files and stack templates the same way you would refer to standard command-line variables.

## Schemas

You can validate deployment targets you have defined in the deployment configuration using custom [Joi validation](https://joi.dev/) schemas. 