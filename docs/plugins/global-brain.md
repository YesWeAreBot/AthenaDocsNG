# 全局脑

包名：`koishi-plugin-yesimbot-global-brain`

让同一个 Bot 在多个群聊和私聊之间共享值得保留的知识、问题与经验。某个会话写入的内容会持久化到全局脑，其他会话按需读取，并自行判断是否回复、转发或吸收。

## 配置

```yaml
yesimbot-global-brain:
  shareImmediately: false
  storageDir: ""
  maxDigestThreads: 5
  maxDigestReplies: 5
  maxDigestContentLength: 80
```

- `storageDir` 留空时使用 `<baseDir>/global-brain`。
- `shareImmediately` 允许工具在请求时向其他 session 发起一次触发。

插件提供 `brain_*` 工具，并在每个 turn 前注入摘要。
