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

## Usage in configuration

`templateBucket` property can be defined in:

- stack group configuration files
- blueprint configuration files
- stack configuration files

### Stack group config file

When `templateBucket` property is defined in a stack group configuration file:

- its value completely overrides the value inherited from the parent stack group
- its value is inherited by stack groups and stacks that belong under the stack group

### Blueprint config file

When `templateBucket` property is defined in a blueprint configuration file:

- its value completely overrides the value inherited from the parent stack group
- its value is inherited by stacks that extend the blueprint

### Stack config file

When `templateBucket` property is defined in a stack configuration file:

- if the stack extends a blueprint, its value completely overrides the value inherited from the blueprint
- otherwise, its value completely overrides the value inherited from the parent stack group

## Requirements

The `templateBucket` property must satisfy these requirements:

- Name must be a valid S3 bucket name
- Key prefix must be a valid S3 object key prefix