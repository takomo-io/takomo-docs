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

## Usage in configuration

`hooks` property can be defined in:

- stack group configuration files
- blueprint configuration files
- stack configuration files

### Stack group config file

When `hooks` property is defined in a stack group configuration file:

- its value is merged with the value inherited from the parent stack group
- its value is inherited by stack groups and stacks that belong under the stack group

### Blueprint config file

When `hooks` property is defined in a blueprint configuration file:

- its value is merged with the value inherited from the parent stack group
- its value is inherited by stacks that extend the blueprint

### Stack config file

When `hooks` property is defined in a stack configuration file:

- if the stack extends a blueprint, its value is merged with the value inherited from the blueprint
- otherwise, its value is merged with the value inherited from the parent stack group

## Configuration merging

Configuration merging happens when a stack group, blueprint or stack inherits `hooks` property but also defines `hooks` property of its own. 

These rules are used when configuration merging happens:

1. Hooks are identified by their name
2. If the inherited hooks and the hooks defined by the inheritor have hooks with the same name, the hooks defined by the inheritor override the inherited hooks  
3. The remaining hooks defined by the inheritor are appended to the inherited list of hooks

## Requirements

The `hooks` property must satisfy these requirements:

- Must be a list of objects