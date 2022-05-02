---
sidebar_position: 5
---

# Partials

Each file in the `partials` directory or its subdirectory can be used as a [Handlebars partial](https://handlebarsjs.com/guide/partials.html).

## Examples

Here are some examples of how to use partials.

### Simple partial

If the `partials` directory contains a file named `my-log-group.yml`, you can include it as a partial in a configuration file like so:

```yaml
{{> my-partial.hbs }}
```