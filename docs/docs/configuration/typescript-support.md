# TypeScript Support

Takomo supports custom configuration written in TypeScript. By default, it looks for a `takomo.ts` file in the project root. If found, this file is compiled using [esbuild](https://esbuild.github.io/) and executed to apply any customizations.

You can control this behavior through the `esbuild` property in your `takomo.yml` file:

| Property    | Description                                                  | Required | Default                |
|-------------|--------------------------------------------------------------|----------|------------------------|
| `enabled`   | Enable or disable esbuild and TypeScript support             | No       | `true`                 |
| `outFile`   | Output path for the compiled TypeScript file                 | No       | `.takomo/out/takomo.mjs` |
| `entryPoint`| Entry file to compile with esbuild                           | No       | `takomo.ts`            |

### Examples

Use a custom entry point:

```yaml title="takomo.yml"
esbuild:
  entryPoint: src/index.ts
```

Disable TypeScript support:

```yaml title="takomo.yml"
esbuild:
  enabled: false
```

## Customizing Project Configuration

The entry point file (typically `takomo.ts`) must export a default function of type [TakomoConfigProvider](types/TakomoConfigProvider.html).  
This function returns a [TakomoConfig](interfaces/TakomoConfig.html) object containing your project's custom configuration.

### Example

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
