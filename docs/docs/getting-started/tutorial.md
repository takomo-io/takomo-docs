# Tutorial

Welcome to the Takomo hands-on tutorial! In this guide, you'll learn how to use Takomo to manage and deploy AWS CloudFormation stacks. We'll walk through building a real-world infrastructure setup, covering best practices and demonstrating Takomo's key features.

## What Will You Build?

Instead of a simple single-stack example, we'll create a more realistic environment:

- A DynamoDB table.
- A VPC **without** internet access.
- A Lambda function running inside the VPC.
- A VPC endpoint to DynamoDB, so the Lambda can access the table securely.

We'll set up **two environments**: `dev` and `prod`, both deployed in the `eu-west-1` region.

## Setting Up AWS Credentials

You'll need access to an AWS account where you can safely experiment.

1. **Create an IAM user** with administrator permissions.
2. **Generate access keys** for this user.
3. **Configure your credentials** in your `~/.aws/credentials` file, using the profile name `takomo-tutorial`:

```ini title="~/.aws/credentials"
[takomo-tutorial]
aws_access_key_id = ENTER_YOUR_ACCESS_KEY_ID_HERE
aws_secret_access_key = ENTER_YOUR_SECRET_ACCESS_KEY_HERE
```

## Initializing Your Takomo Project

Let's create a new directory for your Takomo project and set up the required files.

```shell
mkdir takomo-tutorial
cd takomo-tutorial
```

From here on, we'll refer to the `takomo-tutorial` directory as the **project's root directory**.

Initialize a new NPM project:

```shell
npm init -y
```

Install Takomo as a development dependency:

```shell
npm install -D takomo
```

## Project File Structure

Within your project root, create directories to organize your stack configurations and templates:

```shell
mkdir stacks
mkdir templates
```

The `stacks` directory contains all stack configuration files, while the `templates` directory holds the CloudFormation templates.

## Organizing with Stack Groups

Takomo lets you organize stacks into **stack groups** - directories under `stacks` that group stacks by environment, region, or other criteria. Stack groups can be nested to create a hierarchical structure, and you can provide shared configuration within each group.

Let's group our stacks by environment and then by region:

```shell
mkdir -p stacks/dev/eu-west-1
mkdir -p stacks/prod/eu-west-1
```

Your directory tree should now look like this:

```text
.
├─ stacks
│  ├─ dev
│  │  └─ eu-west-1
│  └─ prod
│     └─ eu-west-1
├─ templates
└─ package.json
```

## Creating the DynamoDB Stack

Let's start by defining a CloudFormation template for the DynamoDB table.

Create the template file:

```shell
touch templates/dynamodb.yml
```

Add the following content:

```yaml title="templates/dynamodb.yml"
Parameters:
  Environment:
    Type: String
    Description: Application environment
    AllowedValues:
      - dev
      - prod

Resources:
  Table:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: !Sub my-table-${Environment}
      BillingMode: PAY_PER_REQUEST
      AttributeDefinitions:
        - AttributeName: id
          AttributeType: S
      KeySchema:
        - AttributeName: id
          KeyType: HASH

Outputs:
  TableName:
    Value: !Ref Table
  TableArn:
    Value: !GetAtt Table.Arn
```

This template defines a single DynamoDB table, with the environment name as a suffix.

Now, add the stack configuration for the `dev` environment:

```shell
touch stacks/dev/eu-west-1/dynamodb.yml
```

```yaml title="stacks/dev/eu-west-1/dynamodb.yml"
regions: eu-west-1
template: dynamodb.yml
parameters:
  Environment: dev
```

**Explanation:**
- `regions`: Tells Takomo where to deploy the stack. (You can specify one or multiple regions.)
- `template`: Path to the template file (relative to `templates` directory).
- `parameters`: Values for the template parameters.

Your structure should now look like:

```text
.
├─ stacks
│  ├─ dev
│  │  └─ eu-west-1
│  │     └─ dynamodb.yml
│  └─ prod
│     └─ eu-west-1
├─ templates
│  └─ dynamodb.yml
└─ package.json
```

## Deploying Your First Stack

Let's deploy the DynamoDB stack!

Make sure you're in the project's root directory and run:

```shell
npx tkm stacks deploy --profile takomo-tutorial
```

You'll see a deployment plan. The stack's path (e.g., `/dev/eu-west-1/dynamodb.yml/eu-west-1`) uniquely identifies it. Takomo will generate a stack name (e.g., `dev-eu-west-1-dynamodb`) unless you specify one.

Follow the prompts:
1. Choose **"continue, but let me review changes to each stack"**.
2. Review the stack-specific plan, then choose **"continue to deploy the stack, then let me review the remaining stacks"**.

Deployment should only take a few seconds. You'll see a summary at the end.

## Adding the VPC Stack

Next, let's add a VPC stack.

Create the template:

```shell
touch templates/vpc.yml
```

```yaml title="templates/vpc.yml"
Parameters:
  Environment:
    Type: String
    Description: Application environment
    AllowedValues:
      - dev
      - prod
  VpcCidr:
    Type: String
    Description: VPC CIDR block

Resources:
  Vpc:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: !Ref VpcCidr
  Subnet:
    Type: AWS::EC2::Subnet
    Properties:
      CidrBlock: !Ref VpcCidr
      VpcId: !Ref Vpc
  RouteTable:
    Type: AWS::EC2::RouteTable
    Properties:
      VpcId: !Ref Vpc
  RouteTableAssociation:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      SubnetId: !Ref Subnet
      RouteTableId: !Ref RouteTable

Outputs:
  VpcId:
    Value: !Ref Vpc
  RouteTableIds:
    Value: !Ref RouteTable
  SubnetIds:
    Value: !Ref Subnet
```

Now, add the stack configuration:

```shell
touch stacks/dev/eu-west-1/vpc.yml
```

```yaml title="stacks/dev/eu-west-1/vpc.yml"
regions: eu-west-1
template: vpc.yml
parameters:
  Environment: dev
  VpcCidr: 10.0.0.0/26
```

Your files should now look like:

```text
.
├─ stacks
│  ├─ dev
│  │  └─ eu-west-1
│  │     ├─ dynamodb.yml
│  │     └─ vpc.yml
│  └─ prod
│     └─ eu-west-1
├─ templates
│  ├─ dynamodb.yml
│  └─ vpc.yml
└─ package.json
```

## Listing Stacks

To see which stacks are configured and their status, run:

```shell
npx tkm stacks list --profile takomo-tutorial
```

You should see both the DynamoDB stack (deployed) and the VPC stack (pending deployment).

## Deploying the VPC Stack

Run the deploy command again to deploy both stacks:

```shell
npx tkm stacks deploy --profile takomo-tutorial
```

This time, the plan will show both stacks. The DynamoDB stack will be updated (if needed), and the VPC stack will be created.

Follow the prompts to review and continue the deployment.

## Using Shared Configuration with Stack Groups

Notice that both stacks share some configuration, like the environment and region. Let's refactor to use **stack groups** for shared settings.

> [!TIP]
> Stack groups allow you to define configuration once and inherit it in all child stacks.

### Step 1: Add Shared Configuration for `/dev`

```shell
touch stacks/dev/config.yml
```

```yaml title="stacks/dev/config.yml"
data:
  environment: dev
```

### Step 2: Add Shared Configuration for `/dev/eu-west-1`

```shell
touch stacks/dev/eu-west-1/config.yml
```

```yaml title="stacks/dev/eu-west-1/config.yml"
regions: eu-west-1
```

### Step 3: Update Stack Configurations to Use Shared Values

Edit `stacks/dev/eu-west-1/dynamodb.yml`:

```yaml title="stacks/dev/eu-west-1/dynamodb.yml"
template: dynamodb.yml
parameters:
  Environment: {{ stackGroup.data.environment }}
```

Edit `stacks/dev/eu-west-1/vpc.yml`:

```yaml title="stacks/dev/eu-west-1/vpc.yml"
template: vpc.yml
parameters:
  Environment: {{ stackGroup.data.environment }}
  VpcCidr: 10.0.0.0/26
```

Now, both stacks inherit the region and environment from their stack groups.

Your file structure should look like:

```text
.
├─ stacks
│  ├─ dev
│  │  ├─ config.yml
│  │  └─ eu-west-1
│  │     ├─ config.yml
│  │     ├─ dynamodb.yml
│  │     └─ vpc.yml
│  └─ prod
│     └─ eu-west-1
├─ templates
│  ├─ dynamodb.yml
│  └─ vpc.yml
└─ package.json
```

Redeploy to verify that nothing changes (no updates needed):

```shell
npx tkm stacks deploy --profile takomo-tutorial
```

## Adding a VPC Endpoints Stack

To allow your Lambda function to access DynamoDB privately, add a VPC endpoint stack.

Create the template:

```shell
touch templates/vpc-endpoints.yml
```

```yaml title="templates/vpc-endpoints.yml"
Parameters:
  Environment:
    Type: String
    Description: Application environment
    AllowedValues:
      - dev
      - prod
  VpcId:
    Type: AWS::EC2::VPC::Id
    Description: Id of the VPC where the endpoints should be created
  RouteTableIds:
    Type: CommaDelimitedList
    Description: Ids of the route tables where the endpoints should be attached

Resources:
  DynamoDbVpcEndpoint:
    Type: AWS::EC2::VPCEndpoint
    Properties:
      RouteTableIds: !Ref RouteTableIds
      ServiceName: !Sub com.amazonaws.${AWS::Region}.dynamodb
      VpcEndpointType: Gateway
      VpcId: !Ref VpcId
```

Now, add the stack configuration:

```shell
touch stacks/dev/eu-west-1/vpc-endpoints.yml
```

```yaml title="stacks/dev/eu-west-1/vpc-endpoints.yml"
template: vpc-endpoints.yml
parameters:
  Environment: {{ stackGroup.data.environment }}
  VpcId:
    resolver: stack-output
    stack: vpc.yml
    output: VpcId
  RouteTableIds:
    resolver: stack-output
    stack: vpc.yml
    output: RouteTableIds
```

**Parameter Resolvers Explained:**  
Here, instead of static values, we're using **parameter resolvers**. The `stack-output` resolver fetches output values from another stack (in this case, the VPC stack) at deployment time.

Your structure should now look like:

```text
.
├─ stacks
│  ├─ dev
│  │  ├─ config.yml
│  │  └─ eu-west-1
│  │     ├─ config.yml
│  │     ├─ dynamodb.yml
│  │     ├─ vpc.yml
│  │     └─ vpc-endpoints.yml
│  └─ prod
│     └─ eu-west-1
├─ templates
│  ├─ dynamodb.yml
│  ├─ vpc.yml
│  └─ vpc-endpoints.yml
└─ package.json
```

## Deploying a Single Stack and Its Dependencies

Let's deploy only the VPC endpoints stack (and any dependencies Takomo detects):

```shell
npx tkm stacks deploy /dev/eu-west-1/vpc-endpoints.yml --profile takomo-tutorial
```

> [!TIP]
> Takomo automatically detects dependencies between stacks (e.g., via parameter resolvers) and deploys them in the correct order.

## Adding the Lambda Function Stack

We're almost done! Now, let's add a Lambda function that will access the DynamoDB table through the VPC endpoint.

First, create a directory to hold code partials and add the Lambda function code:

```shell
mkdir partials
touch partials/lambda.js
```

```js title="partials/lambda.js"
const AWS = require("aws-sdk")
const dynamo = new AWS.DynamoDB.DocumentClient()

exports.handler = async (event, context) => {
  console.log("EVENT: \n" + JSON.stringify(event, null, 2))
  await dynamo.put({
    TableName: process.env.TABLE_NAME,
    Item: {
      id: Date.now().toString()
    }
  }).promise()

  const { Count } = await dynamo.scan({ TableName: process.env.TABLE_NAME }).promise()
  return Count
}
```

Now, create the Lambda template:

```shell
touch templates/lambda.yml
```

```yaml title="templates/lambda.yml"
Parameters:
  Environment:
    Type: String
    Description: Application environment
    AllowedValues:
      - dev
      - prod
  VpcId:
    Type: AWS::EC2::VPC::Id
    Description: Id of the VPC where the endpoints should be created
  SubnetIds:
    Type: CommaDelimitedList
    Description: Ids of the subnets where the function should be created
  TableName:
    Type: String
    Description: Name of the DynamoDB table
  TableArn:
    Type: String
    Description: ARN of the DynamoDB table

Resources:
  FunctionSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: !Sub tutorial-function-${Environment}
      VpcId: !Ref VpcId

  FunctionRole:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Version: 2012-10-17
        Statement:
          - Effect: Allow
            Principal:
              Service: lambda.amazonaws.com
            Action: sts:AssumeRole
      ManagedPolicyArns:
        - arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole
      Policies:
        - PolicyName: DynamoDB
          PolicyDocument:
            Version: 2012-10-17
            Statement:
              - Effect: Allow
                Action:
                  - dynamodb:PutItem
                  - dynamodb:Scan
                Resource: !Ref TableArn

  Function:
    Type: AWS::Lambda::Function
    Properties:
      FunctionName: !Sub tutorial-function-${Environment}
      Handler: index.handler
      MemorySize: 128
      Role: !GetAtt FunctionRole.Arn
      Runtime: nodejs12.x
      Timeout: 10
      Environment:
        Variables:
          TABLE_NAME: !Ref TableName
      VpcConfig:
        SecurityGroupIds:
          - !Ref FunctionSecurityGroup
        SubnetIds: !Ref SubnetIds
      Code:
        ZipFile: |
          {{> lambda.js }}
```

Notice how the Lambda code is included in the template file using a partial (`{{> lambda.js }}`).

Now, add the stack configuration:

```shell
touch stacks/dev/eu-west-1/lambda.yml
```

```yaml title="stacks/dev/eu-west-1/lambda.yml"
template: lambda.yml
parameters:
  Environment: {{ stackGroup.data.environment }}
  VpcId:
    resolver: stack-output
    stack: vpc.yml
    output: VpcId
  SubnetIds:
    resolver: stack-output
    stack: vpc.yml
    output: SubnetIds
  TableName:
    resolver: stack-output
    stack: dynamodb.yml
    output: TableName
  TableArn:
    resolver: stack-output
    stack: dynamodb.yml
    output: TableArn
```

Your structure should now be:

```text
.
├─ stacks
│  ├─ dev
│  │  ├─ config.yml
│  │  └─ eu-west-1
│  │     ├─ config.yml
│  │     ├─ dynamodb.yml
│  │     ├─ lambda.yml
│  │     ├─ vpc.yml
│  │     └─ vpc-endpoints.yml
│  └─ prod
│     └─ eu-west-1
├─ templates
│  ├─ dynamodb.yml
│  ├─ vpc.yml
│  └─ vpc-endpoints.yml
└─ package.json
```

Deploy the stacks to create the Lambda function:

```shell
npx tkm stacks deploy --profile takomo-tutorial
```

## Testing the Lambda Function

With everything deployed, let's test your Lambda function!

If you have the AWS CLI installed, run:

```shell
aws lambda invoke \
  --region eu-west-1 \
  --function-name tutorial-function-dev \
  --profile takomo-tutorial \
  response.txt
```

Each invocation increments the number of items in the DynamoDB table. Check `response.txt` for the updated count.

Alternatively, you can invoke the function from the AWS Management Console.

## Setting Up the Production Environment

Now, let's replicate our setup for the `prod` environment.

### Step 1: Add Shared Configuration for `prod`

```shell
touch stacks/prod/config.yml
```

```yaml title="stacks/prod/config.yml"
data:
  environment: prod
```

### Step 2: Add Shared Configuration for `prod/eu-west-1`

```shell
touch stacks/prod/eu-west-1/config.yml
```

```yaml title="stacks/prod/eu-west-1/config.yml"
regions: eu-west-1
```

### Step 3: Create Stack Configuration Files

```shell
touch stacks/prod/eu-west-1/dynamodb.yml
touch stacks/prod/eu-west-1/lambda.yml
touch stacks/prod/eu-west-1/vpc.yml
touch stacks/prod/eu-west-1/vpc-endpoints.yml
```

Add the following content to each file:

```yaml title="stacks/prod/eu-west-1/dynamodb.yml"
template: dynamodb.yml
parameters:
  Environment: {{ stackGroup.data.environment }}
```

```yaml title="stacks/prod/eu-west-1/lambda.yml"
template: lambda.yml
parameters:
  Environment: {{ stackGroup.data.environment }}
  VpcId:
    resolver: stack-output
    stack: vpc.yml
    output: VpcId
  SubnetIds:
    resolver: stack-output
    stack: vpc.yml
    output: SubnetIds
  TableName:
    resolver: stack-output
    stack: dynamodb.yml
    output: TableName
  TableArn:
    resolver: stack-output
    stack: dynamodb.yml
    output: TableArn
```

```yaml title="stacks/prod/eu-west-1/vpc.yml"
template: vpc.yml
parameters:
  Environment: {{ stackGroup.data.environment }}
  VpcCidr: 10.0.0.64/26
```

```yaml title="stacks/prod/eu-west-1/vpc-endpoints.yml"
template: vpc-endpoints.yml
parameters:
  Environment: {{ stackGroup.data.environment }}
  VpcId:
    resolver: stack-output
    stack: vpc.yml
    output: VpcId
  RouteTableIds:
    resolver: stack-output
    stack: vpc.yml
    output: RouteTableIds
```

Your directory tree should now look like:

```text
.
├─ stacks
│  ├─ dev
│  │  ├─ config.yml
│  │  └─ eu-west-1
│  │     ├─ config.yml
│  │     ├─ dynamodb.yml
│  │     ├─ lambda.yml
│  │     ├─ vpc.yml
│  │     └─ vpc-endpoints.yml
│  └─ prod
│     ├─ config.yml
│     └─ eu-west-1
│        ├─ config.yml
│        ├─ dynamodb.yml
│        ├─ lambda.yml
│        ├─ vpc.yml
│        └─ vpc-endpoints.yml
├─ templates
│  ├─ dynamodb.yml
│  ├─ vpc.yml
│  └─ vpc-endpoints.yml
└─ package.json
```

## Listing and Deploying All Stacks

To see all stacks across both environments:

```shell
npx tkm stacks list --profile takomo-tutorial
```

You should see four new stacks for the `prod` environment.

Deploy all stacks (using `-y` to skip plan review and confirm automatically):

```shell
npx tkm stacks deploy --profile takomo-tutorial -y
```

## Cleaning Up

Congratulations! You've completed the Takomo tutorial and deployed real infrastructure to AWS.

To **remove** all stacks you created, simply run:

```shell
npx tkm stacks undeploy --profile takomo-tutorial
```

Thank you for following this tutorial. You now have a solid foundation for managing CloudFormation stacks with Takomo!