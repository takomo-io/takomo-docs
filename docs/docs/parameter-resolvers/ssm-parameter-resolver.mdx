# SSM parameter resolver

The SSM parameter resolver reads parameter values from SSM parameter store. The parameter can be encrypted.

## Properties

Here are the properties of the SSM parameter resolver:

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| resolver | yes | string | Resolver name, this must be **ssm**. |
| name | yes | string | Name of the SSM parameter. |
| region | no | string | Region where the SSM parameter resides. By default, Takomo uses the region of the stack where the parameter resolver is used. |
| commandRole | no  | string | IAM role used to access the SSM parameter. Command role is optional. By default, credentials associated with the current stack are used. |
| confidential | no | boolean | Conceal the resolved parameter value from logs, defaults to **false**. |
| immutable | no | boolean | Mark the parameter as immutable, defaults to **false**. |

## Examples

Read value from an SSM parameter **/database/password** that resides in the same region as the current stack:

```yaml
parameters:
  Password:
    resolver: ssm
    name: /database/password
```

Read value from an SSM parameter **/database/username** that resides in **eu-north-1** region:

```yaml
parameters:
  Username:
    resolver: ssm
    region: eu-north-1
    name: /database/username
```

Read value from an SSM parameter using custom IAM role:

```yaml
parameters:
  Password:
    resolver: ssm
    commandRole: arn:aws:iam::123456789012:role/read-only
    name: MyParam
```