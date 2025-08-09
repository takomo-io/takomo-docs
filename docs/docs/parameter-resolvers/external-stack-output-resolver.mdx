# External stack output resolver

The external stack output resolver reads the parameter value from a stack output of a stack. The source stack does not have to belong to the same Takomo project as the target stack.

## Properties

Here are the properties of the external stack output resolver:

| Key          | Required | Type | Description                                                                                                                            |
|--------------| -------- | ---- |----------------------------------------------------------------------------------------------------------------------------------------|
| resolver     | yes | string | Resolver name, this must be **external-stack-output**.                                                                                 |
| stack        | yes | string | Name of the source stack.                                                                                                              |
| output       | yes | string | Name of the stack output whose value is read.                                                                                          |
| region       | no | string | Region of the source stack. Region is optional. By default, the region of the target stack is used.                                    |
| commandRole  | no | string | IAM role used to access the stack output. Command role is optional. By default, credentials associated with the target stack are used. |
| confidential | no | boolean | Conceal the resolved parameter value from logs, defaults to **false**.                                                                 |
| immutable    | no | boolean | Mark the parameter as immutable, defaults to **false**.                                                                                |
| cache        | no | boolean | Cache the resolved parameter value for the duration of the deploy operation, defaults to **false**.                                    |

## Example

Say, we have two accounts: 123456789012 and 888888888888.

The account 123456789012 has one stack: src-bucket. It is located in the us-east-1 region and exposes the name of an application source bucket in a stack output named SrcBucketName. The 123456789012 account also has a read-only role that the 888888888888 account can assume.

The 888888888888 account has two stacks: assets-bucket and build-infra. The stacks are located in the us-east-1 and eu-west-1 regions, respectively. The assets-bucket stack exposes the name of an assets bucket in a stack output named AssetsBucket.

Only the build-infra stack is managed in our Takomo project. The two other stacks are configured elsewhere. The build-infra stack has two parameters: SrcBucket and AssetsBucket. To get the values for them, we use the external-stack-output resolver to read the two other stacks' outputs.

The directory structure looks like this:

```shell
.
├─ stacks
│  └─ build-infra.yml
└─ templates
   └─ build-infra.yml
```

The configuration of **build-infra** stack looks like this:

```yaml title="stacks/build-infra.yml"
regions: us-east-1
parameters:
  SrcBucket:
    resolver: external-stack-output
    stack: src-bucket
    output: SrcBucketName
    commandRole: arn:aws:iam::123456789012:role/read-only
  AssetsBucket:
    resolver: external-stack-output
    stack: assets-bucket
    output: AssetsBucketName
    region: eu-west-1
```

For the **SrcBucket** parameter, we need to specify the **commandRole** property because the source stack is located in a different account. We don't need to specify the **region** because both stacks are located in the same region.

For the **AssetsBucket** parameter, we must specify the **region** but not the **commandRole** because the stacks are located in the same account but different regions.