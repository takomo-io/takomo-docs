# Secret resolver

The secret parameter resolver reads parameter values from secrets stored in Secrets Manager.

## Properties

Here are the properties of the secret parameter resolver:

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| resolver | yes | string | Resolver name, this must be **secret**. |
| secretId | yes | string | Secret id. |
| versionId | no | string | Secret version id. |
| versionStage | no | string | Secret version stage. |
| commandRole | no | string | IAM role used to access the secret from Secrets Manager. Command role is optional. By default, credentials associated with the current stack are used. |
| region | no | string | Region where the secret resides. By default, Takomo uses the region of the stack where the parameter resolver is used. |
| confidential | no | boolean | Conceal the resolved parameter value from logs, defaults to **false**. |
| immutable | no | boolean | Mark the parameter as immutable, defaults to **false**. |

## Examples

Read the parameter value from a secret with id **my-secret-password**: 

```yaml
parameters:
  Password:
    resolver: secret
    secretId: my-secret-password
```

Read the parameter value from a secret in a different region:

```yaml
parameters:
  MyParam:
    resolver: secret
    secretId: my-secret-password
    region: eu-west-1
```

Read the parameter value from a different account

```yaml
parameters:
  MyParam:
    resolver: secret
    secretId: arn:aws:secretsmanager:us-west-2:123456789012:secret:MySecret
    commandRole: arn:aws:iam::123456789012:role/SecretReader
```