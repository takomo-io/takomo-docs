# Introduction

## What is Takomo?

Takomo is an infrastructure-as-code tool that helps you organize, parameterize, and deploy AWS CloudFormation stacks across multiple regions and accounts. It’s designed to scale from small projects with a few stacks to complex, multi-account enterprise environments.

Takomo draws inspiration from [Sceptre](https://sceptre.cloudreach.com/), a CloudFormation wrapper developed by Cloudreach, and [Terraform](https://sceptre.cloudreach.com/) by HashiCorp.

## Why Takomo?

While AWS CloudFormation provides a powerful foundation for managing AWS infrastructure, it lacks higher-level features required for orchestrating deployments across multiple accounts and regions.

Many existing tools focus on generating and deploying individual templates, but they often fall short in managing inter-stack dependencies, access boundaries, and complex deployment logic.

Takomo was built to fill these gaps and help you manage scalable, secure, and well-structured AWS environments.

## How Takomo Works

Takomo uses declarative configuration files to define the stacks you want to manage. Each file specifies:
- Stack name
- Deployment region(s)
- Template file path
- Input parameters and tags

When you run a Takomo command:
1. Takomo reads your configuration files and builds a plan outlining the proposed changes.
2. You review the plan and choose to proceed or cancel.
3. During execution, Takomo displays real-time stack events.
4. After completion, it provides a summary of changes, including any errors.

Takomo does not store state about previous operations. Instead, it uses only your configuration files and the current state of stacks in AWS to determine what needs to be done.

## Key Features

### Stack Configuration

Define your CloudFormation stacks declaratively:
- Set input parameters, tags, regions, and timeouts.
- Reference outputs from other stacks, even across accounts or regions.
- Modularize and reuse your configuration logic.

### Smart Stack Deployment

Deploy all stacks at once or target a subset. Takomo automatically:
- Resolves inter-stack dependencies
- Determines deployment order
- Executes deployments in parallel when possible

### IAM Policy Generation

Enforce the principle of least privilege by auto-generating IAM policies based on actions from previous deployments.

### Parameter Resolvers

Avoid hardcoded values with dynamic, runtime parameter resolution. Takomo provides built-in resolvers for:
- Stack outputs
- File contents
- Shell commands
- Hook outputs
- SSM parameters
- Secrets Manager

Custom resolvers are easy to implement in JavaScript or TypeScript.

👉 Learn more about parameter resolvers

### Dynamic Template Rendering

Reduce duplication and boilerplate by using Handlebars templating in your CloudFormation templates.

👉 Learn more about dynamic templating

### Safe by Design

Takomo minimizes deployment risks with built-in safety features:
- Preview plans before applying changes
- Enable stack termination protection
- Restrict deployments to approved AWS accounts

### Extensibility

Customize and extend Takomo’s behavior by writing your own plugins in JavaScript or TypeScript:
- Custom parameter resolvers
- Lifecycle hooks
- Configuration validation schemas (Joi)
- Handlebars helpers

### CI/CD Integration

Takomo works seamlessly in automated environments. Integrate it into your CI/CD pipeline for continuous deployments.

### Scalable for Large Environments

Manage deployments across hundreds of AWS accounts using Takomo’s deployment targets feature.
