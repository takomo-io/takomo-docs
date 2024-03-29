---
sidebar_position: 7
---

import {ApiLink} from '@site/src/components/ApiLink';

# Helpers

Handlebars helpers are plain JavaScript functions you can invoke from your stack group and stack configuration, and template files.

:::note
Helpers are supported only when using Handlebars templating engine.
:::

You register your own custom Handlebars helpers by adding .js files to `helpers` dir.

Each file must export an object with the following properties:

- `name` = Helper name you use in configuration. 
- `fn` = Function to invoked when the helpers is invoked. Must not be asynchronous function.

## Examples

Here are some examples of different helpers.

### Helper with no arguments

This helper returns the current date and takes no arguments.

```javascript title="helpers/timestamp.js"
export default {
  name: 'timestamp',
  fn: () => Date.now().getTime(),
}
```

This is how you'd use it in your files:

```yaml
Description: Current timestamp is {{timestamp}}
```

And this is what the final rendered file looks like:

```yaml
Description: Current timestamp is 1647678689175
```

### Helper with single argument

This helper accepts a single string argument and returns it converted in upper case.

```javascript title="helpers/upper-case.js"
export default {
  name: 'upper-case',
  fn: (str) => str.toUpperCase(),
}
```

This is how you'd use it in your files:

```yaml
Description: Hello {{upper-case 'world'}}
```

And this is what the final rendered file looks like:

```yaml
Description: Hello WORLD
```

### Helper with two arguments

This helper accepts two arguments and returns a boolean value indicating if the two arguments are equal.

```javascript title="helpers/eq.js"
export default {
  name: 'eq',
  fn: (a, b) => a === b,
}
```

This is how you'd use it in your files:

```yaml
Parameters: 
  EnableFeature: {{eq var.environment 'prod'}}
```

And this is what the final rendered file looks like assuming `var.environment` is "prod":

```yaml
Parameters:
  EnableFeature: true
```

## Loading helpers from custom locations

You can provide additional directories from where Takomo should load helpers by using `helpersDir` property in `takomo.yml`. You can give a single path or list of paths. Paths can be absolute or relative to the current project directory. Regardless of additional helper locations, Takomo will always also look helpers from `helpers` directory located under the current project directory. 

### Examples

Specify a single custom location for helpers.

```yaml title="takomo.yml"
helpersDir: my-custom-helpers
```

Specify multiple custom locations.

```yaml title="takomo.yml"
helpersDir: 
  - my-custom-helpers
  - /absolute/path/to/helpers
```
