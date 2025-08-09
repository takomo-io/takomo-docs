# Hook output resolver

The hook output resolver reads parameter values from hook outputs.

## Properties

Here are the properties of the hook output resolver:

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| resolver | yes | string | Resolver name, this must be **hook-output**. |
| hook | yes | string | Name of the hook whose output should be read. |
| confidential | no | boolean | Conceal the resolved parameter value from logs, defaults to **false**. |
| immutable | no | boolean | Mark the parameter as immutable, defaults to **false**. |

## Examples

This stack configuration has a hook named **my-hook**, which runs before stack operations. It is a command hook and will store the output from the shell command to hook outputs from where the subsequent hooks and parameter resolvers can access it.

A hook output resolver reads the output of **my-hook** and sets it as the value of the **Greeting** parameter.

```yaml
parameters:
  Greeting:
    resolver: hook-output
    hook: my-hook
hooks:
  - name: my-hook
    type: cmd
    stage: before
    command: echo 'hello world'
```
