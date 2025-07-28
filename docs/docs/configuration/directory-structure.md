# Directory Structure

A typical Takomo project follows the directory structure below:

```shell
.
├─ stacks
├─ templates
├─ helpers
├─ partials
├─ resolvers
├─ hooks
├─ schemas
├─ blueprints
├─ deployment
└─ config-sets
```

At a minimum, your project must include the `stacks` and `templates` directories:

- **stacks**: Contains all stack configuration files. You can organize stacks into subdirectories (called *stack groups*), each of which can include a `config.yml` file to define shared configuration.
- **templates**: Contains CloudFormation template files referenced in stack configurations. Subdirectories can be used for further organization.

Below is a description of each supported directory:

| Directory     | Description |
|---------------|-------------|
| `stacks`      | Stack configuration files. Each subdirectory represents a stack group and may include a `config.yml` file for shared settings. |
| `templates`   | CloudFormation template files used by stacks. Supports subdirectory organization. |
| `helpers`     | Custom Handlebars helpers used in stack configuration and template files. |
| `partials`    | Handlebars partials that can be reused in configuration and template files. |
| `resolvers`   | Custom parameter resolvers for dynamic values at deployment time. |
| `hooks`       | Custom lifecycle hooks executed during deployment stages. |
| `schemas`     | Custom Joi schemas used to validate stack or stack group configurations. |
| `blueprints`  | Reusable blueprint files for defining stack patterns. |
| `deployment`  | Configuration files for deployment targets and organizational units. |
| `config-sets` | Configuration sets that group and orchestrate deployments across stacks. |