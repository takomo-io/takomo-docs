---
sidebar_position: 1
---

# Built-in parameter resolvers

You can use parameter resolvers to resolve values for stack parameters at deployment time. Takomo has a few built-in parameter resolvers, and you can also implement your own.

In a stack configuration, you choose which resolver to use by providing value to the resolver property. In addition to the resolver property, each resolver may have its own set of additional properties.

Here are the built-in parameter resolvers:

- Stack output resolver
- External stack output resolver
- Command resolver
- File contents resolver
- Hook output resolver
- SSM parameter resolver
- Secret resolver
