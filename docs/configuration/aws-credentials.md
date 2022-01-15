---
sidebar_position: 1
---

# AWS credentials

To do anything with Takomo, you need to have valid AWS credentials configured. Under the hood, Takomo uses AWS JavaScript SDK to acquire the credentials. Take a look at the [SDK's documentation](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html) to learn the ways you can configure credentials.

## Using profile

The easiest way to provide credentials when running Takomo on your local computer is to configure a profile in the **~/.aws/credentials** file and then either export the profile name in AWS_PROFILE environment variable or pass it on with the `--profile` command-line option.

#### Example

Configure a profile in the **~/.aws/credentials** file:

```shell title="~/.aws/credentials"
[my-profile]
aws_access_key_id=<YOUR ACCESS KEY ID>
aws_secret_access_key=<YOUR SECRET ACCESS KEY>
```

You can then provide the profile in an environment variable:

```shell
AWS_PROFILE=my-profile tkm stacks deploy
```

Or, you can use the --profile command line option:

```shell
tkm stacks deploy --profile my-profile
```

## Assuming roles

If you have an IAM user in one account that you use to assume roles from the same or other accounts, you can configure the access keys for the user in the credentials file and then create separate profiles for each of the roles.

#### Example

Configure a profile and roles in the credentials file:

```shell title="~/.aws/credentials"
[manager]
aws_access_key_id=<YOUR ACCESS KEY ID>
aws_secret_access_key=<YOUR SECRET ACCESS KEY>

[account-a-admin]
role_arn=arn:aws:iam::123456789012:role/admin
source_profile=manager

[account-b-readonly]
role_arn=arn:aws:iam::210987654321:role/readonly
source_profile=manager
```

Now, when you run a command with **account-a-admin** profile, AWS SDK uses the access keys you have configured for the manager profile to assume the **arn:aws:iam::123456789012:role/admin** IAM role referenced by the **account-a-admin** profile.

```shell
tkm stacks deploy --profile account-a-admin
```

## Assuming roles that require MFA

You can specify in an IAM role's trust policy that the user must provide an MFA token to assume it. Then, to assume the role, you need to configure your IAM user's MFA device with `mfa_serial` property in the role's profile like so:

```shell title="~/.aws/credentials"
[manager]
aws_access_key_id=<YOUR ACCESS KEY ID>
aws_secret_access_key=<YOUR SECRET ACCESS KEY>

[account-a-admin]
role_arn=arn:aws:iam::123456789012:role/admin
source_profile=manager
mfa_serial=arn:aws:iam::224466880011:mfa/username
```

When you run a command, Takomo will ask you the MFA code.

```shell
tkm stacks deploy --profile account-admin
```

