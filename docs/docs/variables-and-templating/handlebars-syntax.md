# Handlebars syntax

Here's a short guide to Handlebars syntax. For more information, consult the official Handlebars [documentation](https://handlebarsjs.com/).

## Variables

You refer to variables like this:

```yaml
{{ variable_name }}
```

If the variable is an object with properties of its own, you can refer to them like so:

```yaml
{{ person.firstName }}
```

This is how you refer to a specific index of an array:

```yaml
{{ people.[0] }}
```

## Comments

You can use Handlebars comments in your files. Commented out sections won't show up in the final rendered output.

```yaml
{{! This comment will not show up in the output}}
```

If the content you want to comment out contains }} or other Handlebars tokens, you need to use different comment style: 

```yaml
{{!-- This comment may contain mustaches like }} --}}
```

## If-conditions

Here's an example of if-condition:

```yaml
{{#if some_variable}}
  this will be included in the output
{{/if}}
```

## Iterating over collections

This is how you iterate over a collection of items:

```yaml
{{#each securityGroupIds}}
  - {{this}}
{{/each}}
```

## Escaping expressions

If you don't want to process a Handlebars expressio, you can escape it by prefixing it with an escape character `\` like so:

```yaml
\{{my expression to escape}}
```
