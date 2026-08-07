# 常见问题

## 为什么机器人不回复？

按顺序检查：

1. `allowedChannels` 是否包含当前频道。
2. shared 频道是否配置了 Koishi assignee。
3. `chatModel` 是否指向已注册 Provider 的模型。
4. 模型 API Key 是否有效。
5. 当前 Will 配置是否把该场景设为 `wait`。

## 群聊普通消息不回复

这是默认行为。默认 routing 下 `group: wait`。如果希望群聊普通消息也触发，需要修改：

```yaml
will:
  engine: routing
  group: trigger
```

## 配置改完不生效

Runtime 在创建时快照配置。停止并重启 Koishi，或等待 Runtime 被替换。Core 不提供 `reload()`。

## models.json 覆盖被忽略

模型完整 ID 必须与 Provider 注册的 ID 完全一致。未知模型覆盖项会被记录 warning 并忽略。

## 图片没有发送给模型

- 确认 `models.json` 声明了该模型的 `modalities.input: ["image"]`。
- 确认 `imageInput` 没有设为 `false`。
- 图片需要通过 `read` 工具读取并受预算控制。

## v3 配置能迁移吗？

不能自动迁移。v3 的 `modelService`、`agentBehavior`、`capabilities` 已重写，请参考[从 v3 升级](../getting-started/migration.md)。
