---
sidebar_position: 2
---

# Directory structure

Takomo project's directory structure looks like this.

```shell
.
├─ stacks
├─ templates
├─ helpers
├─ partials
├─ resolvers
├─ hooks
├─ schemas
├─ deployment
├─ config-sets
└─ organization
```

There are two mandatory directories: **stacks** and **templates**. The stacks directory will contain all configuration files for your stacks, and the templates directory is where you'll place template files for the stacks.

You can find the purpose of each directory from the table below.

| Directory | Description |
| --------- | ----------- |
| stacks | Configuration files for stacks. You can create subdirectories to organize stacks and to provide common configuration. Takomo treats each subdirectory as a stack group, You can provide configuration for a stack group by placing a config.yml file into its directory. |
| templates | CloudFormation template files that can be referenced from the stack configuration files. You can use subdirectories to organize template files. |
| helpers | Custom Handlebars helpers. You can use helpers in stack configuration and template files. |                 
| partials | Handlebars partial files. You can include partial files in stack configuration and template files.  |
| resolvers | Custom resolvers |
| hooks | Custom hooks. |
| schemas | Custom Joi schemas |
| deployment | Configuration for deployment targets |
| config-sets | Config sets |
| organization | AWS organization configuration. |