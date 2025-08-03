# Partials

Each file in the `partials` directory or its subdirectory can be used as a [Handlebars partial](https://handlebarsjs.com/guide/partials.html).

:::note
Partials are supported only when using Handlebars templating engine.
:::

## Examples

Here are some examples of how to use partials.

### Simple partial

If the `partials` directory contains a file named `my-log-group.yml`, you can include it as a partial in a configuration file like so:

```yaml
{{> my-partial.hbs }}
```


## Loading partials from custom locations

You can provide additional directories from where Takomo should load partials by using `partialsDir` property in `takomo.yml`. You can give a single path or list of paths. Paths can be absolute or relative to the current project directory. Regardless of additional partials locations, Takomo will always also look partials from `partials` directory located under the current project directory.

### Examples

Specify a single custom location for partials.

```yaml title="takomo.yml"
partialsDir: my-custom-partials
```

Specify multiple custom locations.

```yaml title="takomo.yml"
partialsDir: 
  - my-custom-partials
  - /absolute/path/to/partials
```


