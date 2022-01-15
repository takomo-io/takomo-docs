---
sidebar_position: 2
---

# Quickstart

This quick start guide will show you how to install and configure Takomo and deploy some basic infrastructure.

## AWS credentials

During this tutorial, you'll deploy some stacks, so you need an AWS account where you can safely try things out.

Create an IAM user with administrator permissions.

Next, create access keys for the IAM user and configure them to your **~/.aws/credentials** file. Let's name our profile as **takomo-quick-start**.

```shell
[takomo-quick-start]
aws_access_key_id = ENTER_YOUR_ACCESS_KEY_ID_HERE
aws_secret_access_key = ENTER_YOUR_SECRET_ACCESS_KEY_HERE
```

## Project initialization

We'll start by creating a new directory for your Takomo project:

```shell
mkdir takomo-quick-start
```

From now on, we'll call the **takomo-quick-start** directory as project's root directory.

Change to the root directory and initialize a new NPM project:

```shell
cd takomo-quick-start
npm init -y
```

Add Takomo as a development dependency:

```shell
npm install -D takomo 
```

Initialize a new Takomo project:

```shell
npx tkm init --create-samples --project quick-start --regions eu-west-1
```

From the command output you can see what directories and files were created.

## Deploy stacks

Now that you have the project initialized, it's time to deploy the stacks. Go ahead and run the following command:

```shell
npx tkm stacks deploy --profile takomo-quick-start
```

Takomo will present you a deployment plan. Review it and continue when you are ready. Once the deployment completes, you can see a summary of what just happened.

## Clean up

You can remove the created stacks by running the following command:

```shell
npx tkm stacks undeploy --profile takomo-quick-start
```

You'll see a plan showing what will happen next. Review the plan and proceed. After the operation you'll see a summary. 