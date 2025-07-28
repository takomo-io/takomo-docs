# Stacks and Stack Groups

Each stack you manage with Takomo requires a configuration file inside the **stacks** directory. These configuration files must be written in **YAML** format and define all necessary settings to deploy the associated CloudFormation stack.

> [!NOTE]
> Takomo uses the `.yml` file extension for all YAML configuration files.

## Stack Groups for Shared Configuration

You can create subdirectories under the `stacks` directory to group stacks by environment, region, application, or other criteria. These subdirectories are called **stack groups**.

By placing a `config.yml` file inside a stack group directory, you can define configuration that applies to all stacks within that group. Stacks can override any inherited values from their parent group.

Stack groups can be nested to form a hierarchy. Child stack groups inherit configuration from their parent groups, and may override specific values as needed.

The `stacks` directory itself acts as the **root stack group**. Any configuration defined in its `config.yml` file is inherited by all other stack groups and stacks in the project.

## Identifying Stacks and Stack Groups

Stacks and stack groups are identified by their **path**, which resembles a Unix-style file system path rooted at the `stacks` directory:

- The root stack group (i.e., the `stacks` directory) has the path `/`.
- A nested stack group path is the relative directory path from `stacks`, prefixed with a slash (e.g., `/dev`).

Stack paths follow the same structure but include a **region specifier** to indicate the deployment region:

```
/<stack-group>/<stack-config-file>.yml/<region>
```

If a stack is configured to deploy to only one region, the region specifier can be omitted.

> [!NOTE]
> Stacks can be deployed to one or more regions, as defined in their configuration file. Takomo creates a separate CloudFormation stack for each region listed.

## Command Path

The term **command path** refers to both stack group and stack paths. Many Takomo configuration files and CLI commands accept command paths as input. You can use either a stack or stack group path wherever a command path is required.

## Example Project Structure

Here’s an example of a simple Takomo project:

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

### Explanation

- `stacks/config.yml` defines global settings inherited by all stack groups and stacks.
- `stacks/dev/config.yml` overrides the global settings for the `dev` environment.
- `application.yml` and `vpc.yml` are stack configuration files.
- The `templates` directory contains CloudFormation templates referenced in the stack configurations.

Suppose the root `config.yml` sets the default region to `eu-west-1`, and the `dev/config.yml` overrides this with `us-east-1`.

### Stack and Stack Group Paths

| File                      | Path                              |
|---------------------------|----------------------------------|
| stacks directory          | `/`                              |
| dev (stack group)         | `/dev`                           |
| dev/application.yml       | `/dev/application.yml/us-east-1` |
| dev/vpc.yml               | `/dev/vpc.yml/us-east-1`         |
| prod (stack group)        | `/prod`                          |
| prod/application.yml      | `/prod/application.yml/eu-west-1` |
| prod/vpc.yml              | `/prod/vpc.yml/eu-west-1`        |
