# Command resolver

The command resolver executes a specified shell command and uses the command output as a parameter value.

## Properties

Here are the properties of the command resolver:

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| resolver | yes | string | Resolver name, this must be **cmd**. |
| command | yes | string | Shell command to execute. |
| cwd | no | string | Path to the working directory from where the shell command is executed. Relative to the current project directory. |
| exposeStackCredentials | no | boolean | Make the current stack's AWS credentials available for the shell command. Defaults to false. |
| exposeStackRegion | no | boolean | Make the current stack's region available for the shell command. Defaults to false. |
| capture | no | string | Controls how to capture the output of the executed shell command. By default, all output is captured. To capture only the last line, set this to **last-line**. |
| confidential | no | boolean | Conceal the resolved parameter value from logs, defaults to **false**. |
| immutable | no | boolean | Mark the parameter as immutable, defaults to **false**. |

## Environment variables available in the shell command

The following environment variables are available in the shell command:

| Name | Description |
| ---- | ----------- |
| AWS_ACCESS_KEY_ID | If `exposeStackCredentials` is **true**, this will hold the access key id of credentials of the current stack. |
| AWS_SECRET_ACCESS_KEY | If `exposeStackCredentials` is **true**, this will hold the secret access key of credentials of the current stack. |
| AWS_SESSION_TOKEN | If `exposeStackCredentials` is **true**, this will hold the session token of credentials of the current stack. |
| AWS_SECURITY_TOKEN | If `exposeStackCredentials` is **true**, this will hold the session token of credentials of the current stack. |
| AWS_DEFAULT_REGION | If `exposeStackRegion` is **true**, this will hold the region of the current stack. |

## Example

Use contents of **/home/password.txt** file as parameter value:

```yaml
parameters:
  Password:
    resolver: cmd
    command: cat /home/password.txt
```
