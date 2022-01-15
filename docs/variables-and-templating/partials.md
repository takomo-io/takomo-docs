---
sidebar_position: 5
---

# Partials

Each file in the partials directory or its subdirectory can be used as Handlebars partial.

#### Example

If the **partials** directory contains a file named **my-partial.hbs**, you can include it as a partial in a configuration file like so:

```yaml
{{> my-partial.hbs }}
```