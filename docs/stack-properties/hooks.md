---
sidebar_position: 17
---

# Hooks

You use the `hooks` property to specify actions Takomo should execute at different stages of deploy and undeploy commands. The hooks property accepts a list of hook configuration objects. A hook configuration object has the following properties:

- name - Name of the hook
- type - Type of the hook
- operation - Operations during which the hook should be executed
  - Supported operations are:
    - create
    - update
    - delete
  - Accepts a single operation or a list of operations
  - By default, a hook is executed on every operation
- stage - Stages during which the hook should be executed
  - Supported values are:
    - before
    - after
  - Accepts a single stage or a list of stages
  - By default, a hook is executed on every stage
- status - Statuses during which the hook should be executed
  - Available on when stage is after
  - Supported values are:
    - success - The operation succeeded
    - failed - The operation failed
    - cancelled - The operation was cancelled
  - By default, a hook is executed on every status

Takomo executes hooks in the order that you have defined them in the configuration files. If one hook fails, the whole stack operation with any remaining hooks is aborted and deemed a failure.

#### Examples

A cmd hook that is executed after a successful stack creation:

```yaml
hooks:
  - name: executed-after-successful-create
    type: cmd
    operation: create
    stage: after
    status: success
    command: echo 'success'
```

A cmd hook that is executed after all create and update operations:

```yaml
hooks:
  - name: my-hook
    type: cmd
    operation:
      - create
      - update
    stage: after
    command: echo 'hello'
```

## Where to define

The `hooks` property can be defined in stack and stack group configuration files. If specified in a stack group, the stack group's children and stacks inherit the value. The hooks defined by stack groups and stacks are appended to the list of hooks they inherit from their parent.

## Requirements

The `hooks` property must satisfy these requirements:

- Must be a list of objects