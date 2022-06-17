---
sidebar_position: 5
---

# Run targets

Run command against the given set of deployment targets.

## Usage

```shell
tkm targets run [group-path...] \
  --map <command> \
  [--reduce <command>] \
  [--map-role-name <role-name>] \
  [--map-args <args>] \
  [--disable-map-role] \
  [--reduce-role-arn <role-arn>] \
  [--target <target>]... \
  [--exclude-target <target>]... \
  [--label <label>]... \
  [--exclude-label <label>]... \
  [--capture-after <line>] \
  [--capture-before <line>] \
  [--capture-last-line] \
  [--output <format>] \
  [--concurrent-targets <count>] \
  [--reset-cache]
```

## Positional arguments

- `group-path`
  - Provide one or more deployment group paths to run command only against the targets that belong to the deployment groups located under the given deployment group paths in the deployment groups hierarchy.
  - Optional.

## Options

In addition to the [common options](../../docs/command-line-usage/common-options), this command has the following options.

- `--map <command>`
  - Command to run against each target.
  - To invoke a JavaScript function from a file, give path to the file prefixed with js:
    - The JavaScript file must export a function.
    - For each target, the function is invoked with an object that contains the following properties:
      - target = Current target configuration
      - deploymentGroupPath = Deployment group path of the current target
      - credentials = AWS credentials bound to the current target
      - args = Arguments passed with the --map-args option
    - The function can return anything. Takomo collects the returned values to a list and invokes the reduce command with it.
- `--reduce <command>`
  - Command to invoke with results from the map command.
  - To invoke a JavaScript function from a file, give path to the file prefixed with js:
    - The JavaScript file must export a function which accepts a an object with the following properties:
      - credentials = Credentials from the command line or credentials bound to the IAM role specified in --reduce-role-arn option.
      - targets = List of results from the map command
- `--map-role-name <role-name>`
  - Name of IAM role Takomo should assume from each account when invoking the map command.
- `--map-args <args>`
  - Additional arguments passed to the map command
  - To read the argument value from a file, prefix the argument with file:
    - If the file's extension is .json, its contents are parsed as JSON and stored to an object.
    - If the file's extension is .yaml or .yml, its contents are parsed as YAML and stored to an object.
    - Otherwise, the file's contents are passed as is.
- `--disable-map-role`
  - By default, Takomo assumes an IAM role from each account. Use this option to disable this functionality.
- `--reduce-role-arn <role arn>`
  - ARN of IAM role Takomo should assume when running the reduce command.
- `--label <label>`
  - Choose deployment targets by label. You can use this option multiple times to specify more labels.
- `--exclude-label <label>`
  - Exclude deployment targets by label. You can use this option multiple times to specify more labels.
- `--target <target>`
  - Deployment targets to include in the run. You can use this option multiple times to specify more targets. You can use % character as a wildcard at the beginning and/or end of the target name to more than one target.
- `--exclude-target <target>`
  - Exclude deployment targets. You can use this option multiple times to specify more targets. You can use % character as a wildcard at the beginning and/or end of the target name to more than one target.
- `--capture-after <line>`
  - Capture all output from the map command after this line.
- `--capture-before <line>`
  - Capture all output from the map command before this line.
- `--capture-last-line`
  - Capture only the last line from the map command.
- `--output <format>`
  - Print the result from the reduce command using this format
  - Supported values: text, json, yaml
- `--concurrent-targets <number>`
  - Number of deployment targets to run concurrently. Defaults to 1.
- `--reset-cache`
  - Reset cached files under **.takomo-cache** dir
  
## IAM permissions

```yaml
# Minimum permissions. Additional permissions are needed to actually 
# modify resources defined in the CloudFormation templates.
Statement: 
  
  # IAM permissions needed only if targets are located in more
  # than one AWS account. Specify resource to restrict access 
  # to specific roles.  
  - Sid: IAM
    Effect: Allow
    Action:
      - sts:AssumeRole
    Resource: "*"
```

## Examples

Run aws s3 ls command against all targets. Assume role MyRunnerRole from each target account.

```shell
tkm targets run --map "aws s3 ls" --map-role-name MyRunnerRole
```

Invoke a JavaScript function defined in a file found from path /Documents/my-mapper.js:

```shell
tkm targets run --map js:/Documents/my-mapper.js --map-role-name MyRunnerRole
```

Invoke a JavaScript function defined in a file found from path /Documents/my-mapper.js then invoke another JavaScript function from a file /Documents/reducer.js with the list of results collected from the map function.

```shell
tkm targets run \
  --map js:/Documents/my-mapper.js \
  --reduce js:/Documents/reducer.js \
  --map-role-name MyRunnerRole
```
