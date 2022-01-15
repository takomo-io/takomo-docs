---
sidebar_position: 3
---

# Tutorial

Now that we have the introduction out of the way, it's time to learn how to use Takomo. The best way to learn is by doing, so let's get our hands dirty and deploy some stacks.

## What are we going to build?

Let's do something more interesting than just a trivial single stack example. Let's create a setup where we have a DynamoDB table, a VPC without internet access, a lambda function inside the VPC, and a VPC endpoint to DynamoDB to make it possible for the lambda function to access the DynamoDB table.

To make our configuration resemble a real-life use case, we'll create two separate environments: **dev** and **prod**.

Finally, we choose to deploy our stacks to the **eu-west-1** region.

## AWS credentials

During this tutorial, you'll deploy some stacks, so you need an AWS account where you can safely try things out.

Create an IAM user with administrator permissions.

Next, create access keys for the IAM user and configure them to your **~/.aws/credentials** file. Let's name our profile as **takomo-tutorial**.

```shell title="~/.aws/credentials"
[takomo-tutorial]
aws_access_key_id = ENTER_YOUR_ACCESS_KEY_ID_HERE
aws_secret_access_key = ENTER_YOUR_SECRET_ACCESS_KEY_HERE
```

## Project initialization

We'll start by creating a new directory for your Takomo project:

```shell
mkdir takomo-tutorial
```

From now on, we'll call the **takomo-tutorial** directory as project's root directory.

Change to the root directory and initialize a new NPM project:

```shell
cd takomo-tutorial
npm init -y
```

Add Takomo as a development dependency:

```shell
npm install -D takomo 
```

## Project file structure

Make sure you are in the project root directory and create two other directories under it:

```shell
mkdir stacks
mkdir templates
```

The stacks directory will contain all configuration files for your stacks, and the templates directory is where you'll place template files for the stacks.

## Stack groups

Takomo lets you organize stacks into directories under the stacks directory to group them by the environment, region, or other criteria. These directories are called stack groups. You can use them to provide configuration shared by the stacks that belong under the same stack group.

You can also nest stack groups to build tree-like hierarchies. You identify stack groups by their path, which is the file path to the stack group's directory from the stacks directory.

Let's group our stacks first by the environment and then by region. To do that, create directories under the stacks directory like so:

```shell
mkdir -p stacks/dev/eu-west-1
mkdir -p stacks/prod/eu-west-1
```

Now, you should have the following files in place:

```shell
.
├─ stacks
│  ├─ dev
│  │  └─ eu-west-1
│  └─ prod
│     └─ eu-west-1
├─ templates
└─ package.json
```

## DynamoDB stack

It's time to start adding configuration for our stacks. We begin by creating a template file for the DynamoDB table. Go ahead and create a new file for it:

```shell
touch templates/dynamodb.yml
```

Add the following contents to it:

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

The template is simple; it has a single parameter for the environment used as a suffix of the DynamoDB table name.

Let's then add configuration for the dev environment's DynamoDB stack.

```shell
touch stacks/dev/eu-west-1/dynamodb.yml
```

Add the following contents to it:

```yaml title="stacks/dev/eu-west-1/dynamodb.yml"
regions: eu-west-1
template: dynamodb.yml
parameters:
  Environment: dev
```

In the stack configuration file, you can find three important properties.

We instruct Takomo to deploy the stack to the eu-west-1 region using the regions property. It's in plural form because you can deploy a single stack to multiple regions, and therefore the regions property accepts a single region or a list of regions.

The template property takes a file path relative to the templates directory and specifies which template file Takomo uses when it deploys the stack.

Finally, we provide values for the stack parameters using the parameters property.

You should now have the following files in place:

```shell
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

## First deploy

Alright then, we are now ready to deploy our first stack. Make sure you are in the project's root directory and run the following command:

```shell
npx tkm stacks deploy --profile takomo-tutorial
```

You should see the deployment plan, and from it that you're about to deploy the DynamoDB stack.

The line printed in green displays the stack's path, which should be /dev/eu-west-1/dynamodb.yml/eu-west-1. The stack path is sort-of a file path to the stack's configuration file under the stacks directory and is used to identify stacks.

From the deployment plan, you can also see the stack's name, which is dev-eu-west-1-dynamodb. We can specify the stack name ourselves by using the name property, but as we didn't do that, Takomo generated the name for us from the stack path.

Choose "continue, but let me review changes to each stack"

You should see a stack-specific deployment plan showing changes about to be performed to the DynamoDB stack.

Choose "continue to deploy the stack, then let me review the remaining stacks"

The deployment should take a few seconds, and after it, you should see a deployment summary.

## VPC stack

Let's proceed to the VPC stack. Create a template for it:

```shell
touch templates/vpc.yml
```

Add the following contents to it:

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

Then, create the stack configuration file:

```shell
touch stacks/dev/eu-west-1/vpc.yml
```

Add the following contents to it:

```yaml title="stacks/dev/eu-west-1/vpc.yml"
regions: eu-west-1
template: vpc.yml
parameters:
  Environment: dev
  VpcCidr: 10.0.0.0/26
```

You should now have the following files in place:

```shell
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

## Listing stacks

Let's quickly check what stacks we have configured and what's their current status:

```shell
npx tkm stacks list --profile takomo-tutorial
```

You should see two stacks: the DynamoDB stack we already deployed and the VPC stack that is still waiting for deployment.

## Second deploy

Rerun the deploy command to get also the VPC stack deployed:

```shell
npx tkm stacks deploy --profile takomo-tutorial
```

This time the deployment plan shows you both of the stacks. The DynamoDB stack already exists, and it is about to be updated. The VPC stack, on the other hand, doesn't exist yet, so Takomo needs to create it.

Choose "continue, but let me review changes to each stack"

The DynamoDB stack contains no changes and you don't need to confirm its deployment. Instead, you'll see the plan for the VPC stack.

Review the changes and choose "continue to deploy the stack, then let me review the remaining stacks".

Like earlier, the deployment takes just a short amount of time, and you'll see the summary once it completes.

## Shared configuration

At this point, we notice that we have specified the same properties in multiple configuration files. Both of our stacks belong to the dev environment and reside in the eu-west-1 region.

Earlier, we learned that we can use stack groups to provide common configuration for multiple stacks. You provide configuration for a stack group by placing a config.yml file in its directory. Stacks that belong to the stack group inherit the stack group's configuration.

Let's start by creating configuration for the /dev stack group.

Create the configuration file:

```shell
touch stacks/dev/config.yml
```

Add the following contents to it:

```yaml title="stacks/dev/config.yml"
data:
  environment: dev
```

We specified the environment under the data property. It's an object that can contain arbitrary values.

Then, create another file for the /dev/eu-west-1 stack group:

```shell
touch stacks/dev/eu-west-1/config.yml
```

Add the following contents to it:

```yaml title="stacks/dev/eu-west-1/config.yml"
regions: eu-west-1
```

We can now remove the regions properties from our stack configuration files. We also need to modify the way we give value for the Environment parameter.

Update the stack configuration files to look like this:

```yaml title="stacks/dev/eu-west-1/dynamodb.yml"
template: dynamodb.yml
parameters:
  Environment: {{ stackGroup.data.environment }}
```

```shell title="stacks/dev/eu-west-1/vpc.yml"
template: vpc.yml
parameters:
  Environment: {{ stackGroup.data.environment }}
  VpcCidr: 10.0.0.0/26
```

Notice how we refer to the values specified in the stack group.

You should now have the following files in place:

```shell
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

Our little configuration restructuring didn't actually change configurations of the stacks. We can verify that by deploying the stacks again. There shouldn't be any updates to the stacks.

```shell
npx tkm stacks deploy --profile takomo-tutorial
```

## VPC endpoints stack

Next, we'll add a stack for the VPC endpoint that makes it possible to use DynamoDB from the VPC without Internet access.
Create a new template file:

```shell
touch templates/vpc-endpoints.yml
```

Add the following contents to it:

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

Then, create the stack configuration file:

```shell
touch stacks/dev/eu-west-1/vpc-endpoints.yml
```

Add the following contents to it:

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

The parameters in this stack use a new kind of syntax. Previously, we have used static values for our parameters, but here we are using parameter resolvers that resolve the parameter values at deployment time.

Resolver of type stack-output reads the value for a parameter from another stack's outputs. In this case, we read values from the VPC stack's outputs.

You should now have the following files in place:

```shell
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

It's again time to deploy our changes, but this time, let's do something different. Instead of deploying all stacks, let's deploy just the VPC endpoints stack. To achieve that, you need to give the path of the stack you want to deploy to the deploy stacks command:

```shell
npx tkm stacks deploy \
  /dev/eu-west-1/vpc-endpoints.yml \
  --profile takomo-tutorial
```

When you review the deployment plan, you notice something that you might find unexpected. You chose to deploy only the VPC endpoints stack, but the deployment plan indicates that Takomo will deploy the VPC stack as well.

This is because the VPC endpoints stack uses the VPC stack's outputs as inputs to its parameters, making the VPC endpoint stack dependent on the VPC stack. When building the deployment plan, Takomo takes relations between the stacks into account and ensures that it deploys the stacks in the correct order.

## Lambda function stack

The infrastructure for the dev environment is almost complete. We still need to add the Lambda function that accesses the DynamoDB table through the VPC endpoint.

Let's start by creating a file that holds the Lambda function body:

```shell
mkdir partials
touch partials/lambda.js
```

Add the following contents to it:

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

Create a new template file:

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

Notice how the lambda code is included in the template file (line 69).

Then, create the stack configuration file:

```shell
touch stacks/dev/eu-west-1/lambda.yml
```

Add the following contents to it:

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

You should now have the following files in place:

```shell
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

It's time to deploy the stacks again to get the lambda function stack created.

```shell
npx tkm stacks deploy --profile takomo-tutorial
```

## Testing

We now have everything ready for the development environment, and it's time to test the lambda function.

If you have the AWS CLI installed, you can test the function from command-line:

```shell
aws lambda invoke \
  --region eu-west-1 \
  --function-name tutorial-function-dev \
  --profile takomo-tutorial \
  response.txt
```

The lambda returns the number of items in the DynamoDB table, so each invocation should increase the number in response.txt by one.

You can also invoke the function from AWS management console.

## Production environment

Now that we have the dev environment ready, it's time to set up the prod environment.

Create shared configuration for the prod environment.

```shell
touch stacks/prod/config.yml
```

Add the following contents to it:

```yaml title="stacks/prod/config.yml"
data:
  environment: prod
```

Then, create configuration shared by all stacks located in the eu-west-1 region.

```shell
touch stacks/prod/eu-west-1/config.yml
```

Add the following contents to it:

```yaml title="stacks/prod/eu-west-1/config.yml"
regions: eu-west-1
```

Next, create configuration files for the stacks.

```shell
touch stacks/prod/eu-west-1/dynamodb.yml
touch stacks/prod/eu-west-1/lambda.yml
touch stacks/prod/eu-west-1/vpc.yml
touch stacks/prod/eu-west-1/vpc-endpoints.yml
```

Then, add the following contents to them:

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

Your file structure should now look like this:

```shell
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

Let's quickly check how our stacks look like now:

```shell
npx tkm stacks list --profile takomo-tutorial
```

You should see four more stacks in addition to the existing dev stacks.

Deploy the stacks like earlier but this time use `-y` option to skip the plan review and confirm step.

```shell
npx tkm stacks deploy --profile takomo-tutorial -y
```

## Clean up

You have reached the end of this tutorial. Hopefully, you now have a better understanding of how to configure and deploy CloudFormation stacks with Takomo.

To remove the stacks you have created, run the next command:

```shell
npx tkm stacks undeploy --profile takomo-tutorial
```