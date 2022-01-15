---
sidebar_position: 1
---

# Introduction

Sometimes static configuration files and templates are not enough to solve the real-life problems we might face. To help overcome those trickier challenges and avoid tedious and error-prone manual work, Takomo supports dynamic templating with [Handlebars](https://handlebarsjs.com/).

All standard Handlebars features are available, which means you can use loops, if-conditions, partial includes, helpers, and variables to streamline your configuration.

By default, Takomo processes all stack configuration, stack group configuration, and stack template files using Handlebars. 

:::note
You can turn off dynamic processing of stack template files by setting `dynamic` to false under the stack's [template](../stack-properties/template) property.
:::

## Understanding dynamic templating

It's essential to understand how dynamic templating works with Takomo. Takomo processes configuration files with Handlebars before parsing their content. The output produced by the processing needs to be a valid YAML document.

The YAML standard has some gotchas which may cause unexpected behaviour especially if you generate configuration files dynamically using Handlebars. It's helpful to set the logging level to trace when troubleshooting YAML-related problems.
