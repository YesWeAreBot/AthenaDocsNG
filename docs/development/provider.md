# 模型 Provider 开发

Provider 是 Koishi 插件，注册 AI SDK 的 `LanguageModel` / `EmbeddingModel`。

## 最小实现

```typescript
import { createOpenAI } from "@ai-sdk/openai";
import { Context, Schema } from "koishi";
import type { BaseProviderConfig } from "koishi-plugin-yesimbot";

interface Config extends BaseProviderConfig {
  format: "chat" | "responses";
}

export const inject = ["yesimbot"];

export const Config: Schema<Config> = Schema.object({
  id: Schema.string().default("openai"),
  apiKey: Schema.string().role("secret").required(),
  baseURL: Schema.string(),
  chatModels: Schema.array(
    Schema.object({
      id: Schema.string().required(),
      toolCall: Schema.boolean().default(true),
      reasoning: Schema.boolean().default(false),
    }),
  ).default([]),
});

export function apply(ctx: Context, config: Config) {
  ctx.on("ready", () => {
    const client = createOpenAI({ apiKey: config.apiKey, baseURL: config.baseURL });
    const dispose = ctx.yesimbot.model.register({
      id: config.id,
      capabilities: { chat: true, embedding: false },
      chatModels: () => config.chatModels,
      embeddingModels: () => [],
      chat: (modelId) => client.chat(modelId),
      embedding: () => {
        throw new Error("not supported");
      },
    });
    ctx.on("dispose", dispose);
  });
}
```

## 注册契约

```typescript
interface Provider {
  id: string;
  capabilities: { chat: boolean; embedding: boolean };
  chatModels(): ChatModelConfig[];
  embeddingModels(): EmbeddingModelConfig[];
  chat?(modelId: string): LanguageModel;
  embedding?(modelId: string): EmbeddingModel;
}
```

Provider 不声明图片模态能力，该信息由 `models.json` 控制。
