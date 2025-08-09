# Stack policy

You specify a stack policy with the `stackPolicy` property. It accepts a string or an object.

#### Examples

Setting a stack policy as a string:

```yaml
stackPolicy: |
  {
    "Statement": [
      {
        "Effect": "Allow",
        "NotAction": "Update:Delete",
        "Principal": "*",
        "Resource": "*"
      }
    ]
  }
```

Setting a stack policy as an object:

```yaml
stackPolicy:
  Statement:
    - Effect: Allow
      NotAction: Update:Delete
      Principal: "*"
      Resource: "*"
```

## Stack policy during update

You specify a stack policy to use during stack update with the `stackPolicyDuringUpdate` property. It works the same way as the stackPolicy property.

#### Examples

Setting a stack policy to use during the stack update as an object:

```yaml
stackPolicyDuringUpdate:
  Statement:
    - Effect: Allow
      Action: Update:*
      Principal: "*"
      Resource: "*"
```

## Deleting stack policy

CloudFormation doesn't support removing of a stack policy once it has been created. As a workaround, when you remove the stack policy from the stack configuration, Takomo updates the policy with the allow all policy shown below, which is essentially equivalent to not having a stack policy attached at all.

```yaml title="allow all stack policy"
{
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "Update:*",
      "Principal": "*",
      "Resource": "*"
    }
  ]
}
```

## Usage in configuration

`stackPolicy` and `stackPolicyDuringUpdate` properties can be defined in:

- stack group configuration files
- blueprint configuration files
- stack configuration files

### Stack group config file

When `stackPolicy` / `stackPolicyDuringUpdate` property is defined in a stack group configuration file:

- its value completely overrides the value inherited from the parent stack group
- its value is inherited by stack groups and stacks that belong under the stack group

### Blueprint config file

When `stackPolicy` / `stackPolicyDuringUpdate` property is defined in a blueprint configuration file:

- its value completely overrides the value inherited from the parent stack group
- its value is inherited by stacks that extend the blueprint

### Stack config file

When `stackPolicy` / `stackPolicyDuringUpdate` property is defined in a stack configuration file:

- if the stack extends a blueprint, its value completely overrides the value inherited from the blueprint
- otherwise, its value completely overrides the value inherited from the parent stack group

## Requirements

The `stackPolicy` and `stackPolicyDuringUpdate` properties must satisfy these requirements:

- Must be a valid JSON document 
