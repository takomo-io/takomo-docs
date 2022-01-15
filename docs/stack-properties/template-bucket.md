---
sidebar_position: 4
---

# Template bucket

By default, the maximum size for a CloudFormation template file is **51,200 bytes**. Using larger template files, up to **460,800 bytes**, requires that you upload them to an S3 bucket before deployment.

You use the `templateBucket` property to instruct Takomo to upload template files to a specific S3 bucket before the deployment. The bucket must exist.

The `templateBucket` property is an object with two properties: `name` and `keyPrefix`. The former is required and used to specify the bucket's name, and the latter is optional and specifies the object key prefix under which Takomo uploads the templates files.

#### Examples

Specifying a template bucket with a key prefix:

```yaml
templateBucket:
  name: my-bucket
  keyPrefix: template-files/
```

Specifying a template bucket with just a name:

```yaml
templateBucket:
  name: hello-bucket
```

## Where to define

The `templateBucket` property can be defined in stack and stack group configuration files. If specified in a stack group, the stack group's children and stacks inherit the value. Stack groups and stacks can override the value they have inherited from their parent.

## Requirements

The `templateBucket` property must satisfy these requirements:

- Name must be a valid S3 bucket name
- Key prefix must be a valid S3 object key prefix