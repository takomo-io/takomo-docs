---
sidebar_position: 3
---

# EJS syntax

Here's a short guide to EJS syntax. For more information, consult the official Handlebars [documentation](https://ejs.co/).

:::note
When using EJS templating engine, all variables are available under one top-level variable named `it`. For example, to access `context` variable listed in the table below, you must write `it.context`.
:::

## Variables

You refer to variables like this:

```yaml
<%= it.variable_name %>
```

If the variable is an object with properties of its own, you can refer to them like so:

```yaml
<%= it.person.firstName %>
```

## Comments

You can use EJS comments in your files. Commented out sections won't show up in the final rendered output.

```yaml
<%# This comment will not show up in the output %>
```

## If-conditions

Here's an example of if-condition:

```yaml
<% if (it.some_variable) { %>
  this will be included in the output
<% } %>
```

## Iterating over collections

This is how you iterate over a collection of items:

```yaml
<% it.securityGroupIds.forEach(function(sg){ %>
<%= sg %>
<% }) %>
```

## Escaping expressions

If you don't want to process a EJS expression, you can escape it like so:

```yaml
<%% this content is not processed %>
```
