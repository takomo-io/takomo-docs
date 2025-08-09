# Command Hook

The command hook executes the specified shell command.

## Properties

Here are the properties of the Command hook:

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| type | yes | string | Type of the hook, this must be **cmd**. |
| name | yes | string | Name of the hook. |
| command | yes | string | Shell command to execute. |
| cwd | no | string | Path to the working directory from where the shell command is executed. Relative to the current project directory. |
| operation | no | string | Operations during which the hook should be executed. Supported operations are: `create`, `update`, `delete`. Accepts a single operation or a list of operations. By default, a hook is executed on every operation. |
| stage | no | string | Stages during which the hook should be executed. Supported values are: `before`, `after`. Accepts a single stage or a list of stages. By default, a hook is executed on every stage. |
| status | no | string | Statuses during which the hook should be executed. Available on when stage is **after**. Supported values are: `success` = The operation succeeded, `failed` = The operation failed, `cancelled` = The operation was cancelled. By default, a hook is executed on every status. |
| exposeStackCredentials | no | boolean | Make the current stack's AWS credentials available for the shell command. Defaults to false. |
| exposeStackRegion | no | boolean | Make the current stack's region available for the shell command. Defaults to false. |
| capture | no | string | Controls how to capture the output of the executed shell command. By default, all output is captured. To capture only the last line, set this to **last-line**. |

## Environment variables available in the shell command

The following environment variables are available in the shell command:

| Name | Description |
| ---- | ----------- |
| TKM_COMMAND_STAGE | The current stack operation stage. |
| TKM_COMMAND_OPERATION | The current stack operation. |
| TKM_COMMAND_STATUS | The current stack operation status, not present in before stage. |
| AWS_ACCESS_KEY_ID | The current stack operation status, not present in before stage |
| AWS_SECRET_ACCESS_KEY | If `exposeStackCredentials` is **true**, this will hold the secret access key of credentials of the current stack. |
| AWS_SESSION_TOKEN | If `exposeStackCredentials` is **true**, this will hold the session token of credentials of the current stack. |
| AWS_SECURITY_TOKEN | If `exposeStackCredentials` is **true**, this will hold the session token of credentials of the current stack. |
| AWS_DEFAULT_REGION | If `exposeStackRegion` is **true**, this will hold the region of the current stack. |
| TKM\_HOOK_{hook-name} | Values returned from previous hooks are exposed in environment variables where the {hook-name} placeholder is replaced with the hook's name. Hooks whose name has unsafe characters not compatible with a pattern `/^[a-zA-Z_]+[a-zA-Z0-9_]*$/` are not exposed and a warning is logged instead.  |

Any output the hook prints to the stdout is captured and exposed to other hooks.

## Examples

A command hook that runs a simple shell command:

```yaml
- name: my-hook
  type: cmd
  command: echo 'hello world'
```

A command hook that exposes the current stack's AWS credentials to the shell command:

```yaml
- name: my-another-hook
  type: cmd
  exposeStackCredentials: true
  command: aws sts get-caller-identity
```