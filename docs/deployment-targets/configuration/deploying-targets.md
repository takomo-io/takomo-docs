# Deploying Targets

## Deploying config sets

You use the deploy targets command to deploy stacks configured in config sets that are attached to deployment targets. For detailed information about the command, please see here.

#### Example

Here's an example showing how to deploy config sets to all targets under the all/application group:

```shell
tkm targets deploy all/application
```

## Removing config sets

You use the undeploy targets command to remove stacks configured in config sets that are attached to deployment targets. For detailed information about the command, please see here.

#### Example

Here's an example demonstrating how to remove config sets from the sandbox target:

```shell
tkm targets undeploy --target sandbox
```

