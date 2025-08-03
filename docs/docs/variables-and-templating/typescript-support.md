import {ApiLink} from '@site/src/components/ApiLink';

# Typescript support

[Customizing Takomo with Typescript](configuration/typescript-support.md) allows you to implement your own templating engine or customize Takomo's default Handlebars templating engine with Typescript.

## Implementing custom template engine

If you want to implement your own template engine from scratch, you need to implement two objects. First, the template engine itself which must implement interface <ApiLink text="TemplateEngine" source="interfaces/TemplateEngine.html"/>, and then a provider that implements <ApiLink text="TemplateEngineProvider" source="interfaces/TemplateEngineProvider.html"/> and is used to instantiate the template engine.

In your entry point file (defaults to `takomo.ts`) you register the template engine provider with `templateEngineProvider` property:

```typescript title=takomo.ts
import {
  HandlebarsTemplateEngineProvider,
  RenderTemplateFileProps,
  RenderTemplateProps,
  TakomoConfigProvider,
  TemplateEngine,
  TemplateEngineProps,
  TemplateEngineProvider,
} from "takomo"

const myTemplateEngine: TemplateEngine = {
  renderTemplate: async (props: RenderTemplateProps): Promise<string> => {
    return // TODO: Implement
  },
  renderTemplateFile: async (props: RenderTemplateFileProps): Promise<string> => {
    return // TODO: Implement
  },
}

const myTemplateEngineProvider: TemplateEngineProvider = {
  init: async (props: TemplateEngineProps): Promise<TemplateEngine> => {
    return myTemplateEngine
  },
}

const provider: TakomoConfigProvider = async () => ({
  templateEngineProvider: myTemplateEngineProvider
})

export default provider
```

:::note
Please note that `templateEngineProvider` completely overrides any Handlebars configuration you have specified in **takomo.yml** file.
:::

## Customizing Handlebars template engine

You can also customize the default Handlebars templating engine like so:


```typescript title=takomo.ts
import { 
  HandlebarsTemplateEngineProvider, 
  TakomoConfigProvider,
} from "takomo"

const provider: TakomoConfigProvider = async () => ({
  templateEngineProvider: new HandlebarsTemplateEngineProvider({
    helpersDirs: [/* paths to dirs containing helpers implemented with JavaScript */],
    partialsDirs: [/* paths to dirs containing partials */],
  }),
})

export default provider
```

## Implementing helpers with Typescript

Your helpers must be of type <ApiLink text="HandlebarsHelper" source="interfaces/HandlebarsHelper.html"/>. You can also implement helper providers of type <ApiLink text="HandlebarsHelperProvider" source="interfaces/HandlebarsHelperProvider.html"/> that instantiate helpers.

```typescript title=takomo.ts
import { 
  HandlebarsTemplateEngineProvider, 
  TakomoConfigProvider, 
  HandlebarsHelperProvider, 
  InitHandlebarsHelperProps,  
  HandlebarsHelper,
} from "takomo"

// Example helper
const jsonHelper: HandlebarsHelper = {
  name: "json",
  fn: (value) => JSON.stringify(value),
}

// Example helper provider
const equalsHelper: HandlebarsHelperProvider = {
  init: async (props: InitHandlebarsHelperProps): Promise<HandlebarsHelper> => {
    return {
      name: "equals",
      fn: (val1, val2) => val1 === val2,
    }
  },
}

const provider: TakomoConfigProvider = async () => ({
  templateEngineProvider: new HandlebarsTemplateEngineProvider({
    helpers: [
      jsonHelper,
    ],
    helperProviders: [
      equalsHelper,  
    ],
  }),
})

export default provider
```
