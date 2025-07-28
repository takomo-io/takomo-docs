# Quickstart

This quickstart guide walks you through installing and configuring Takomo, and deploying your first AWS CloudFormation stack.

## AWS Credentials Setup

To get started, you’ll need an AWS account with permissions to deploy resources.
1. Create an IAM user with AdministratorAccess permissions.
2. Generate access keys for the user.
3. Add the credentials to your `~/.aws/credentials` file under a new profile named `takomo-quick-start`:

```ini title="~/.aws/credentials"
[takomo-quick-start]
aws_access_key_id = ENTER_YOUR_ACCESS_KEY_ID_HERE
aws_secret_access_key = ENTER_YOUR_SECRET_ACCESS_KEY_HERE
```

## Project Setup

Create and navigate to your project directory:

```shell
mkdir takomo-quick-start
cd takomo-quick-start
```

Initialize a new Node.js project:

```shell
npm init -y
```

Install Takomo as a development dependency:

```shell
npm install --save-dev takomo
```

Verify the installation:

```shell
npx tkm --version
```

## Stack Configuration

We’ll deploy a simple VPC stack with a customizable CIDR block. 

Create a stacks directory:

```shell
mkdir stacks
```

Inside the stacks directory, create a file named `vpc.yml`:

```yaml
regions: eu-west-1
parameters:
  CidrBlock: 10.0.0.0/24
```

## Stack Template

Now, let’s define the CloudFormation template for the VPC.

Create a `templates` directory next to `stacks`:

```shell
mkdir templates
```

Inside the `templates` directory, create a file named `vpc.yml`:

```yaml
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
```

## Deploy the Stack

From the root directory of your project, deploy the stack using:

```shell
npx tkm stacks deploy --profile takomo-quick-start
```

You will be prompted to confirm the deployment and review a plan showing the proposed changes. Answer **yes** to proceed.

If your credentials are set up correctly and the IAM user has sufficient permissions, the deployment will succeed.

## Clean Up

To remove the stack and its resources:

```shell
npx tkm stacks undeploy --profile takomo-quick-start
```

Takomo will show a plan before proceeding. Confirm to undeploy, and you’ll see a summary of the results afterward.
