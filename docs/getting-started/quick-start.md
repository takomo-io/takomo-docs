---
sidebar_position: 2
---

# Quickstart

This quick start guide will show you how to install and configure Takomo and deploy a single CloudFormation stack.

## AWS credentials

You need an AWS account where you can safely try things out.

Create an IAM user with administrator permissions.

Next, create access keys for the IAM user and configure them to your **~/.aws/credentials** file. Let's name our profile as **takomo-quick-start**.

```shell
[takomo-quick-start]
aws_access_key_id = ENTER_YOUR_ACCESS_KEY_ID_HERE
aws_secret_access_key = ENTER_YOUR_SECRET_ACCESS_KEY_HERE
```

## Project setup

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

Verify installation:

```shell
npx tkm --version
```

## Stack Configuration

Our stack contains a VPC whose CIDR range can be parameterized. First, we need to create a `stacks` directory that will host all stack configurations. Create the directory and add there a file named `vpc.yml` with the following contents:

    regions: eu-west-1
    parameters:
      CidrBlock: 10.0.0.0/24

## Stack Template

Next, we need to provide a CloudFormation template for our stack. Create `templates` directory next to the `stacks` directory, and add there a file named `vpc.yml` with the following contents:

    Description: My VPC
    Parameters:
      CidrBlock:
        Type: String
        Description: VPC CIDR block
    Resources:
      VPC:
        Type: AWS::EC2::VPC
        Properties:
          CidrBlock: !Ref CidrBlock

## Stack Deployment

Alright, we are ready to deploy our stack. Change to the project root directory and run:

    npx tkm stacks deploy --profile takomo-quick-start

You will be prompted if you want to continue the deployment. You also need to review and approve the changes. If you answer yes to both questions, then the deploy will proceed, and given your AWS credentials had all the needed IAM permissions, it should also succeed.

## Clean Up

You can delete the stack with command:

```shell
npx tkm stacks undeploy --profile takomo-quick-start
```

You'll see a plan showing what will happen next. Review the plan and proceed. After the operation you'll see a summary. 