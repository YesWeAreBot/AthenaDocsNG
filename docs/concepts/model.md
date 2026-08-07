# 模型服务

模型服务位于 `ctx.yesimbot.model`，负责 Provider 注册、模型解析和 `models.json` 覆盖。

## Provider 与模型 ID

每个 Provider 插件通过 `ctx.yesimbot.model.register()` 注册：

```typescript
ctx.yesimbot.model.register({
  id: "openai",
  capabilities: { chat: true, embedding: true },
  chatModels: () => config.chatModels,
  embeddingModels: () => config.embeddingModels ?? [],
  chat: (modelId) => client.chat(modelId),
  embedding: (modelId) => client.embedding(modelId),
});
```

模型完整 ID 是 `providerId:modelId`：

```text
openai:gpt-4o
anthropic:claude-sonnet-4-6
deepseek:deepseek-v4-pro
google:gemini-2.5-pro
```

`chatModel` 使用这个 ID，也可以使用 `models.json` 中定义的 alias。

## models.json

文件默认在 `basePath/models.json`。它负责：

- `defaults.chat`：默认聊天模型。
- `defaults.embedding`：默认嵌入模型。
- `aliases`：模型 ID 别名。
- `chat`：覆盖模型能力、上下文/输出限制、隐藏状态、模态。
- `embedding`：覆盖嵌入模型元数据。

```json
{
  "defaults": {
    "chat": "openai:gpt-4o"
  },
  "aliases": {
    "main": "openai:gpt-4o"
  },
  "chat": {
    "openai:gpt-4o": {
      "modalities": { "input": ["image"] },
      "limit": { "context": 128000, "output": 16384 }
    }
  }
}
```

## 图片能力

- Provider 本身不声明模态能力。
- 只有 `models.json` 的 `modalities.input` 能声明模型支持图片。
- `imageInput` 控制全局开关和预算。
- 模型没有声明图片能力时，即使 `imageInput` 开启也只发送文本。
- 模型调用不会自动扫描历史图片；图片由 `read` 工具按预算投影。

## 运行时快照

活动 Runtime 在创建时快照模型能力、`chatModel`、`visionModel`、`imageInput`、Will、提示词与插件。修改 `models.json` 后需要重启 Koishi 或等待 Runtime 替换。
