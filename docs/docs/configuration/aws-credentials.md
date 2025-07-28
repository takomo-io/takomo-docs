# AWS Credentials

To use Takomo, you must have valid AWS credentials configured. Takomo uses the AWS SDK for JavaScript under the hood, which supports multiple ways to provide credentials. For detailed information, refer to the [official SDK documentation](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/setting-credentials.html).

## Using a Profile

The simplest method for local development is to define a profile in your `~/.aws/credentials` file. You can then provide it to Takomo using either the `AWS_PROFILE` environment variable or the `--profile` command-line option.

### Step 1: Configure the profile

```ini title="~/.aws/credentials"
[my-profile]
aws_access_key_id = <YOUR ACCESS KEY ID>
aws_secret_access_key = <YOUR SECRET ACCESS KEY>
```

### Step 2: Use the profile

**Option A: Set environment variable**

```shell
AWS_PROFILE=my-profile tkm stacks deploy
```

**Option B: Use command-line option**

```shell
tkm stacks deploy --profile my-profile
```

## Assuming Roles

If your IAM user assumes roles in the same or different AWS accounts, you can configure a base profile with access keys and use that as the `source_profile` for role-based profiles.

### Example configuration

```ini title="~/.aws/credentials"
[manager]
aws_access_key_id = <YOUR ACCESS KEY ID>
aws_secret_access_key = <YOUR SECRET ACCESS KEY>

[account-a-admin]
role_arn = arn:aws:iam::123456789012:role/admin
source_profile = manager

[account-b-readonly]
role_arn = arn:aws:iam::210987654321:role/readonly
source_profile = manager
```

### Usage

```shell
tkm stacks deploy --profile account-a-admin
```

In this setup, the `manager` profile is used to assume the `admin` role in Account A or the `readonly` role in Account B.

## Assuming Roles with MFA

For roles that require MFA, include the `mfa_serial` property in the profile configuration.

### Example

```ini title="~/.aws/credentials"
[manager]
aws_access_key_id = <YOUR ACCESS KEY ID>
aws_secret_access_key = <YOUR SECRET ACCESS KEY>

[account-a-admin]
role_arn = arn:aws:iam::123456789012:role/admin
source_profile = manager
mfa_serial = arn:aws:iam::224466880011:mfa/username
```

When executing commands, Takomo will prompt you to enter the MFA code:

```shell
tkm stacks deploy --profile account-a-admin
```

