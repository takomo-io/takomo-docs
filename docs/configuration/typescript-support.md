---
sidebar_position: 5
---

import {ApiLink} from '@site/src/components/ApiLink';

# Typescript support

By default, Takomo looks for a `takomo.ts` file, which can be used to customize Takomo configuration, from the project root dir. If the file is found, it's compiled with [esbuild](https://esbuild.github.io/), and then run to apply customizations it contains.

You can customize this feature by providing `esbuild` property. It has the following properties:

| Property  | Description                                                 | Required | Default                |
|-----------|-------------------------------------------------------------|----------|------------------------|
| enabled   | Toggle esbuild and Typescript feature on or off             | no       | true                   |
| outFile   | Name of the file where compiled Typescript code is written  | no       | .takomo/out/takomo.mjs |
| entryPoint | Input entry point file for esbuild                         | no       | takomo.ts              |

#### Example

Use different entry point file.

```yaml title="takomo.yml"
esbuild:
  entryPoint: src/index.ts
```

Disable Typescript support:

```yaml title="takomo.yml"
esbuild:
  enabled: false
```

## Customizing project configuration

The entry point file (defaults to `takomo.ts`) must have default export function of type <ApiLink text="TakomoConfigProvider" source="types/TakomoConfigProvider.html"/> that returns a <ApiLink text="TakomoConfigProvider" source="interfaces/TakomoConfig.html"/> object which in turn contains the custom configuration for your Takomo project.

#### Example

```typescript
import { HandlebarsTemplateEngineProvider, TakomoConfigProvider } from "takomo"

const provider: TakomoConfigProvider = async () => ({
  schemaProviders: [ 
    // Custom schema providers
  ],
  hookProviders: [
    // Custom hook providers
  ],
  resolverProviders: [
    // Custom resolver providers
  ],
  templateEngineProvider: new HandlebarsTemplateEngineProvider(),
})

export default provider
```

