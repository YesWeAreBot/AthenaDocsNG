# 故障排查

## 开启详细日志

```yaml
yesimbot:
  logLevel: 3
```

在 Koishi 中还可以把 Provider 或插件日志调到 debug。

## 模型调用失败

检查：

- Provider 是否已启用；
- `apiKey` 是否有效；
- `chatModel` 是否为 `providerId:modelId`；
- 网络与代理是否可达；
- 模型 ID 是否存在于 Provider 的 `chatModels`。

## 消息无法进入 Runtime

检查：

- `allowedChannels` 是否匹配；
- shared 频道 `assignee` 是否为空或不是当前 Bot；
- 是否缺少 Database；
- 日志中是否有 `gateway.route_failed`。

## 图片无法读取

检查：

- PlatformTranslator 是否把图片写入 AssetStore；
- `models.json` 是否声明 image 模态；
- `imageInput` 是否开启；
- `resourceReadTimeoutMs` 是否足够。

## 会话文件损坏

JSONL 读取会逐行 `JSON.parse`，语法损坏的行会被跳过并警告。Core 不做语义校验。

## 插件工具没有出现

确认插件已启用，并且插件确实调用了 `registerChannelPlugin()`。Runtime 创建后插件变化不会热更新。
