---
sidebar_position: 3
---

# Stacks and stack groups

You create a configuration file in the **stacks** directory for each stack you want to manage with Takomo. Configuration files are in **YAML** format and should contain the configuration needed to deploy the corresponding stacks.

:::note
Takomo uses **.yml** file extension with YAML files.
:::

## Stack groups for common configuration

You can create more directories under the stacks directory to group stacks by application environment, region, or another criterion. Takomo treats these directories as stack groups. You can use them to provide common configurations for stacks that belong to the stack groups by placing a config.yml file into the stack group's directory. Individual stacks can override parts or all of the configurations they inherit from their stack group.

You can also nest stack groups to create a tree-like hierarchy where child stack groups inherit configuration from their parent. Like the stacks, they can override the configuration they inherit.

The stacks directory itself is the root stack group, and the configuration defined in its config.yml file gets inherited for all other stack groups and every stack in the project.

## Identifying stacks and stack groups

You identify stack groups and stacks by their path, which is basically like a file path in Linux filesystem where the stacks directory is the filesystem root.
We learned earlier the stacks directory is the root stack group. Its path is /. Other stack groups' path is the absolute file path to the stack group's directory from the stacks directory.

The stack paths follow this same logic with one important difference. A stack's path is the absolute file path to its configuration file from the stacks directory, appended with a region specifier that is a forward slash followed by the stack's region. You may omit the region specifier if the stack has only one region.

:::note
A stack can have one or more regions. The regions are defined in the stack's configuration file, which means more than one CloudFormation stack can be created from a single stack configuration file.
:::

## Command path

A common name for both stack and stack group paths is the command path. The command path is used in many places in Takomo's configuration files and is accepted as input arguments by many CLI commands. Wherever a command path is required, you can always use either a stack or stack group path.

## Example project

Here is an example of how a Takomo project could look like.

```shell
.
├─ stacks
│  ├─ config.yml
│  ├─ dev
│  │  ├─ config.yml
│  │  ├─ application.yml
│  │  └─ vpc.yml
│  └─ prod
│     ├─ application.yml
│     └─ vpc.yml
└─ templates
   ├─ application-template.yml
   └─ vpc-template.yml
```

In the stacks directory, there is a config.yml file that contains configurations shared with all stack groups and stacks.

There are two stack groups for application environments: dev and prod. Each environment consists of two stacks: application.yml and vpc.yml. The dev environment also has its own config.yml file with configurations shared only with its stacks.

Let's say that in the root config.yml file, we specify that we want to use region eu-west-1, and that we override this for the dev environment by setting a different region, us-east-1, in its config.yml file.

The templates directory contains CloudFormation template files for the stacks.

This table shows the paths for each stack and stack group found from the example project.


| File | Path |
| ---- | ---- |
| the stacks directory | / |
| dev | /dev |
| dev/application.yml | /dev/application.yml/us-east-1 |
| dev/vpc.yml | /dev/vpc.yml/us-east-1 |
| prod | /prod |
| prod/application.yml | /prod/application.yml/us-east-1 |
| prod/vpc.yml | /prod/vpc.yml/us-east-1 |
