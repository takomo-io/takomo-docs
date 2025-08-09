# Sharing Data Between Hooks

Hooks can expose values to other hooks by returning a hook output object. Takomo stores the returned value with a hook's name in a mutable variables object that it then passes to the subsequent hooks. Takomo discards the mutable variables object after the stack operation completes, which means the exposed data is not visible to hooks executed in other stacks.

## Example

This example shows how you can share data between hooks.

Our file structure looks like this:

```shell
.
├─ stacks
│  └─ my-stack.yml
├─ hooks
│  ├─ first.js 
│  └─ second.js
└─ templates
   └─ my-stack.yml
```

There are two custom hooks located in the hooks dir.

```javascript title="hooks/first.js"
export default {
  type: "first",
  init: (props) => {
    return {
      execute: (input) => {
        return {
          message: "OK",
          success: true,
          value: "My greeting to the next hook"
        }
      }
    }
  }
}
```

The first hook returns a hook output object that contains a greeting to other hooks in the value property.

```javascript title="hooks/second.js"
export default {
  type: "second",
  init: (props) => {
    return {
      execute: (input) => {
        const greeting = input.variables.hooks.firstHook
        // Do something with the greeting here...
        return true
      }
    }
  }
}
```

The second hook reads the greeting from the input argument.

And this is how you glue everything together in a stack configuration file:

```yaml
template: my-stack.yml
regions: eu-west-1
hooks:
  - name: firstHook
    type: first
  - name: secondHook
    type: second  
```

The `hooks` property defines two hooks, one of each type. Takomo executes the hooks in order they are defined.