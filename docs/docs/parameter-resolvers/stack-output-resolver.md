# Stack output resolver

Stack output resolver reads the parameter value from a stack output of another stack configured within the same Takomo project. The source stack automatically becomes the target stack's dependency. Takomo reads the output value using the credentials associated with the source stack.

:::note
If you need to read outputs of stacks that are not configured in the same Takomo project, you can use [external stack output resolver](./external-stack-output-resolver).
:::

## Properties

Here are the properties of the stack output resolver:

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| resolver | yes | string | Resolver name, this must be **stack-output**. |
| stack | yes | string | Stack path of the source stack. Can be an absolute or a relative stack path. |
| output | yes | string | Name of the stack output whose value is read. |
| confidential | no | boolean | Conceal the resolved parameter value from logs, defaults to **false**. |
| immutable | no | boolean | Mark the parameter as immutable, defaults to **false**. |

## Example 

Say, we have two stacks: **vpc.yml** and **security-groups.yml**. The former creates a VPC and exposes its id in the stack outputs with a name VpcId, and the latter uses the VPC id to create some security groups.

The directory structure looks like this:

```shell
.
├─ stacks
│  ├─ vpc.yml
│  └─ security-groups.yml
└─ templates
   ├─ vpc.yml
   └─ security-groups.yml
```

In **security-groups.yml** stack configuration we use the **stack-output** resolver to read the value for the **VpcId** parameter like so:

```yaml title="stacks/security-groups.yml"
parameters:
  VpcId:
    resolver: stack-output
    stack: /vpc.yml
    output: MyVpcId
```

