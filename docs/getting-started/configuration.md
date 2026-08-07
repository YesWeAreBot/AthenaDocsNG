# 基础配置

## 最小配置

```yaml
plugins:
  group:yesimbot:
    yesimbot:
      chatModel: openai:gpt-4o
      allowedChannels:
        - platform: onebot
          channelId: "123456"
    ~@yesimbot/koishi-plugin-provider-openai:
      id: openai
      apiKey: sk-xxxxxxxx
      chatModels:
        - id: gpt-4o
          toolCall: true
          reasoning: true
```

## 关键行为

- `allowedChannels` 默认拒绝所有频道。
- Runtime 在创建时快照模型、Will、提示词、工具和插件。
- Core 不提供 `reload()`；配置、模型或插件变化会在 Runtime 被替换后生效。
- shared 频道还需要 Koishi `channel.assignee` 与当前 Bot 匹配。

## 图片输入

模型是否支持图片由 `models.json` 声明，`imageInput` 只控制全局开关和预算。

```json
{
  "chat": {
    "openai:gpt-4o": {
      "modalities": { "input": ["image"] }
    }
  }
}
```

启用后可以配置：

```yaml
imageInput:
  maxCount: 3
  maxBytesPerImage: 5242880
  maxTotalBytes: 10485760
```

详细格式见[配置参考](../reference/configuration.md)和[模型服务](../concepts/model.md)。
