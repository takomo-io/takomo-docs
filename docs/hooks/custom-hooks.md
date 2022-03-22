---
sidebar_position: 4
---

import {ApiLink} from '@site/src/components/ApiLink';


# Custom hooks

You can provide custom hooks by placing plain JavaScript files, with **.js** file extension, into the **hooks** directory. Each file must export a hook provider object. Takomo uses the provider to initialize the actual hook.

## Hook provider

Hook provider has the following properties:

- `type`
  - Type of the hook
  - Required
- `init`
  - A function that initializes the hook with properties given in a stack group or stack configuration file. The function can be either synchronous or asynchronous, and must return an instantiated hook object.
  - Required

See more information from <ApiLink text="API docs" source="interfaces/stacks_model_src.HookProvider.html"/>.

## Hook

Hook has the following properties:

- `execute`
  - A function that is invoked with an hook input object when the hook is executed. The function can be synchronous or asynchronous and must return a hook output. 
  - Required

See more information from <ApiLink text="API docs" source="interfaces/stacks_model_src.Hook.html"/>.

## Hook Input

A hook input is an object that is passed to hook's execute function. It has the following properties:

- `stage`
  - Current stack operation stage. Possible values are: before, after
- `operation`
  - Current stack operation. Possible values are: create, update, delete
- `status`
  - Current stack operation status. Possible values are: success, failed, cancelled. This is defined only when the stage is after.
- `variables`
  - Mutable variables object containing command line and environment variables. The hook can modify existing variables and add new ones. After the hook is completed, the same variables object is passed to the subsequent hooks which can then access its contents. The variables are available also in the stack's template file.
- `ctx`
  - Command context object

See more information from <ApiLink text="API docs" source="interfaces/stacks_model_src.HookInput.html"/>.

## Hook Output

A hook output is a value returned from hook's execute function. It is used to determine if the hook execution was successful and to share data between hooks. It can be either a boolean, an Error which is always considered as failure, or a detailed object with the following properties:

- `success`
  - A boolean determining if the hook execution was successful.
  - Required
- `message`
  - An informative message about the hook execution outcome.
  - Optional
- `value`
  - A value to be exposed to other hooks.
  - Optional
- `skip`
  - A boolean determining if all the remaining hooks of the current stack and the stack operation itself should be skipped.  
  - Optional

See more information from <ApiLink text="API docs" source="modules/stacks_model_src.html#HookOutput"/>.

## Example

This example hook prints some debug information to the console.

Our file structure looks like this:

```shell
.
├─ stacks
│  └─ my-stack.yml
├─ hooks
│  └─ debug.js
└─ templates
   └─ my-stack.yml
```

The hook provider defined in **hooks/debug.js** looks like this:

```javascript title="hooks/debug.js"
module.exports = {
  type: "debug",
  init: (props) => {
    console.log("Initialize debug hook")
    return {
      execute: (input) => {
        console.log("Execute debug hook!")
        console.log(`Stage:     ${input.stage}`)
        console.log(`Operation: ${input.operation}`)
        console.log(`Status:    ${input.status}`)
        console.log(JSON.stringify(props, null, 2))
        
        return {
          message: "OK",
          success: true,
          value: "Did some debugging"
        }
      }
    }
  }
}
```

Our custom hook is used in the stack configuration like so:

```yaml title="stacks/my-stack.yml"
hooks:
  - name: my-hook
    type: debug
```

When executed, the hook exposes string **"Did some debugging"** in the mutable variables object.