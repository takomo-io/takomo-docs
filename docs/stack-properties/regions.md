---
sidebar_position: 2
---

# Regions

You specify the regions where to deploy a stack using the `regions` property. You can give a single region or a list of regions. Each stack must have at least one region.

#### Examples

Specifying a single region:

```yaml
regions: eu-west-1
```

Specifying multiple regions:

```yaml
regions:
  - eu-central-1
  - eu-north-1
  - us-east-1
```

## Where to define

The `regions` property can be defined in stack and stack group configuration files. If specified in a stack group, the stack group's children and stacks inherit the value. Stack groups and stacks can override the value they have inherited from their parent.

## Requirements

The `regions` property must satisfy these requirements:

- Must be a string or a list of strings
- Must be valid region

## Changing regions

You can't change the stack's region. If you change the region of an existing stack, Takomo will look for a corresponding stack from the new region. As Takomo does not keep track of the stacks it has deployed, it can't know that the stack still exists in the old region.

You can always add new regions for a stack.