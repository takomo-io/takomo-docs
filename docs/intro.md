---
sidebar_position: 1
---

# What is Takomo?

Takomo helps you organize, parameterize and deploy CloudFormation stacks across multiple regions and accounts. It works equally well with smaller deployments consisting of just a few stacks and larger multi-account environments.

Takomo was inspired by Cloudreach’s excellent [Sceptre](https://sceptre.cloudreach.com/), a CloudFormation wrapper tool built with Python, and [Terraform](https://sceptre.cloudreach.com/) created by Hashicorp.

## Motivation

[AWS CloudFormation](https://aws.amazon.com/cloudformation/) is a great tool to manage AWS infrastructure, but as a low-level tool, it's not sufficient alone to manage deployments spanning multiple regions and accounts. Many tools do a good job generating and deploying CloudFormation templates but lack crucial features to handle large-scale deployments.

Takomo was created to overcome challenges that arise when managing a complex AWS infrastructure with inter-stack dependencies across multiple accounts and regions.

## How Takomo works?

You specify the stacks you want to manage with Takomo in configuration files. Each file contains information about the stack, including stack name, regions, values for parameters and tags, and which template file to use.

When you run a command, Takomo starts by reading the configuration files and building a plan showing the changes it is about to execute. Once you have reviewed the plan, you can decide to cancel or proceed with the deployment. During the operation, Takomo prints stack events so you can see what is happening. Once the operation completes, Takomo presents you with a summary of changes and possible errors.

Takomo doesn't store the infrastructure's state or operations it has executed anywhere. It relies solely on the configuration files' information to match locally defined stacks with the ones found in the target accounts.

## Features

Here are Takomo's key features.

### Stack configuration
Provide configuration to your CloudFormation stacks including, input parameters, tags, region, timeouts and more. Use outputs from other stacks as input parameters to your stacks, even if the source stacks reside in different accounts or regions.

### Stack deployment

Quickly deploy all of your stacks at once or choose to deploy only a subset. Takomo understands inter-stack dependencies and deploys stacks in the correct order and parallel when possible.

### Generate IAM policies

Takomo helps you follow the principle of least privilege by providing you with a command to generate IAM policies based on actions performed during your previous deployments.

### Resolve parameter values at deployment time

Avoid hard coding of parameter values to configuration files by using parameter resolvers that provide parameter values at deployment time.
Takomo comes with these built-in resolvers that resolve parameter values from:

- [Stack outputs](parameter-resolvers/stack-output-resolver.md) - use outputs from other stacks  
- [File contents](parameter-resolvers/file-contents-resolver.md) - read contents of a file
- [Shell command](parameter-resolvers/command-resolver.md) output - execute a shell command and use its output 
- [Hook output](parameter-resolvers/hook-output-resolver.md) - use value exposed by a lifecycle hook
- [SSM parameter](parameter-resolvers/ssm-parameter-resolver.md) - read value from an SSM parameter 
- [Secret](parameter-resolvers/secret-resolver.md) - read value from AWS Secrets Manager

It's really easy to implement your own custom resolvers, too!

[Read more about parameter resolvers](/docs/category/parameter-resolvers).

### Dynamic templates files

Take advantage of dynamic Handlebars templating and avoid repetitive configuration and copy-pasting in CloudFormation templates.

[Read more about dynamic templating with Handlebars](/docs/category/variables-and-templating).

### Safe

Avoid mistakes by reviewing changes to the configuration before deployment. Take advantage of safety features that prevent deployments to the wrong environments and accounts.

- Enable stack termination protection.
- Ensure stacks are deployed only to allowed accounts.

### Extensible

Plug in your own JavaScript/TypeScript code to extend the core features. You can implement your own:

- Parameter resolvers to resolve stack parameter values at deployment time
- Hooks to run code at different deployment stages
- Joi validation schemas to validate your configuration
- Handlebars helpers to run custom code when processing configuration 

### Continuous integration

Easily integrate Takomo to your CI pipeline.

### Large-scale deployments

Manage hundreds of AWS accounts with [deployment target features](/targets/intro).