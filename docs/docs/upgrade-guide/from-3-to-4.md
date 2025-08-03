# From Takomo 3.x to 4.x

Takomo 4.0 is a maintenance release with a few breaking changes. Upgrading from 3.x should be straightforward in most cases.

## Breaking changes

Here are the breaking changes introduced in Takomo 4.0.

### Drop organization management commands

AWS Control Tower has improved significantly in recent years and is now the recommended tool to manage AWS organization. For this reason, Takomo no longer includes AWS organization management commands.

You can use Takomo's [deployment targets](/targets/intro) feature to complement functionalities provided by Control Tower.

### Require Nodejs 14.17.1

Nodejs 14.17.1 is now required to run Takomo. This change makes it possible to keep upgrading project dependencies to their latest versions in the future.

**Required actions**

Upgrade your Nodejs to version 14.17.1 or later.

### Upgrade AWS SDK to v3

Takomo uses AWS SDK to interact with AWS APIs. In December 2020 AWS released [version 3 of SDK](https://aws.amazon.com/blogs/developer/modular-aws-sdk-for-javascript-is-now-generally-available/) with many improvements like modular packages, middleware stack, and first-class TypeScript support.

Starting from version 4.0, Takomo uses SDK v3 instead of the older v2.

This change might require actions when upgrading to Takomo 4.0.

**Required actions**

If your project has custom parameter resolvers or hooks that use AWS clients exposed by Takomo stack instances, you need to go through your code and make the necessary changes.

You will probably need to modify the way you use the AWS clients but the required changes should be minor in most cases. Please read the related AWS documentation [here](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html) and [here](https://github.com/aws/aws-sdk-js-v3/blob/main/UPGRADING.md) to understand how to make the changes.

### Remove Load AWS SDK config command line option

Command line option `--load-aws-sdk-config` used to instruct AWS SDK to load credentials from ~/.aws/config file instead of ~/.aws/credentials file was removed.
