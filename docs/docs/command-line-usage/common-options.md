import TOCInline from '@theme/TOCInline';

# Common Options

Here are the options available for all commands (unless stated otherwise).

<TOCInline toc={toc} />

## Assume yes to all questions

Pass `--yes` or `-y` option to answer yes to all questions.

## Display help

Pass `--help` option to display help. Command specific helps include also the minimum IAM permissions needed to run the command.

## Display Takomo version

Pass `--version` option to print version information.

## Enable confidential information logging

By default, environment variables and confidential parameter values are concealed from logs. Override this default by passing `--log-confidential-info`.

## Enable statistics

Use `--stats` option to print statistics information of the executed command.

## Feature flags

You can use `--feature <feature>=<boolean value>` option to enable and disable certain Takomo features.

Available feature flags:

- `deploymentTargetsUndeploy` - Set false to disable undeploy deployment targets command

## Load environment variables from a file

Use `--env-file <path-to-environment-variables-file>` to load environment variables from a file. The loaded variables override existing variables with the same name. This option can be used multiple times.

The environment variables must be defined in a format accepted by dotenv, like so:

```shell
DB_HOST=localhost
DB_USER=root
DB_PASS=s1mpl3
```

## Set logging level

Use `--log <level>` option to choose the logging level.

Supported values are:

- none (suppress all logging)
- trace
- debug
- info (default)
- warn
- error

## Set project dir

Use `--dir <directory>` or `-d <directory>` option to define the directory from where Takomo loads configuration.

## Set variables

Pass `--var` and `--var-file` options to provide variables that can be used in stack group and stack configuration files and stack templates. Both options can be used multiple times.

For more information, see command-line variables.

## Show command to generate IAM policies

Use `--show-generate-iam-policies` option to print instructions how to generate IAM policies needed to run the command.

## Suppress all but the final output

Use `--quiet` or `-q` to suppress all logging and all but the final output. Useful when you want to write the command output to a file.

## Use AWS profile

Use `--profile <profile>` option to choose which AWS profile to use.

For more information, see AWS credentials.
