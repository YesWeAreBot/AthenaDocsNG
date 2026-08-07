# 模型 Provider

Provider 是独立的 Koishi 插件，直接使用 `ctx.yesimbot.model.register()` 注册 AI SDK 模型。

## 通用配置

```yaml
@yesimbot/koishi-plugin-provider-openai:
  id: openai
  apiKey: sk-xxx
  baseURL: ""
  chatModels:
    - id: gpt-4o
      toolCall: true
      reasoning: true
  embeddingModels:
    - id: text-embedding-3-small
```

`id` 会成为模型完整 ID 的 provider 部分：

```text
openai:gpt-4o
```

## DeepSeek

DeepSeek 额外支持 `thinking`：

```yaml
@yesimbot/koishi-plugin-provider-deepseek:
  id: deepseek
  apiKey: sk-xxx
  thinking: high
```

模型 ID 也可以带 `:level` 后缀，例如 `deepseek-v4-pro:high`。

## 模型能力

- Provider 只声明 `id`、`chatModels`、`embeddingModels` 和模型工厂。
- Provider 不声明图片模态能力。
- 图片、上下文长度等元数据由 `models.json` 覆盖。
