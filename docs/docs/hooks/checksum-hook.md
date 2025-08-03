# Checksum Hook

The checksum hook calculates a checksum from a specified directory. The checksum is calculated recursively, i.e. all files and directories under the specified directory are included in the checksum.

## Properties

Here are the properties of the Checksum hook:

| Key | Required | Type | Description |
| --- | -------- | ---- | ----------- |
| type | yes | string | Type of the hook, this must be **checksum**. |
| name | yes | string | Name of the hook. |
| dir | yes | string | Path to the directory from where the checksum should be calculated. The path can be absolute or relative to the project directory. |
| encoding | no | string | Encoding used to encode the calculated checksum. Supported values are **base64** (default) and **hex**. |
| operation | no | string | Operations during which the hook should be executed. Supported operations are: `create`, `update`, `delete`. Accepts a single operation or a list of operations. By default, a hook is executed on every operation. |
| stage | no | string | Stages during which the hook should be executed. Supported values are: `before`, `after`. Accepts a single stage or a list of stages. By default, a hook is executed on every stage. |
| status | no | string | Statuses during which the hook should be executed. Available on when stage is **after**. Supported values are: `success` = The operation succeeded, `failed` = The operation failed, `cancelled` = The operation was cancelled. By default, a hook is executed on every status. |

## Examples

Calculate a checksum from a directory lambda/scripts located in the project directory.

```yaml
- name: my-checksum
  type: checksum
  dir: lambda/scripts
```

The same as above but using the hex encoding.

```yaml
- name: my-hex-checksum
  type: checksum
  dir: lambda/scripts
  encoding: hex
```

