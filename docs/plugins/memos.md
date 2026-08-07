# MemOS 记忆

包名：`koishi-plugin-yesimbot-memos-client`

把 MemOS Cloud 作为长期记忆后端。Core 不负责长期记忆，MemOS 插件负责事实、偏好和跨频道记忆的读写。

## 最小配置

```yaml
yesimbot-memos-client:
  baseUrl: https://memos.memtensor.cn/api/openmem/v1
  apiKey: your-api-key
  memoryScope: auto
```

`memoryScope` 支持：

- `auto`：群聊使用频道记忆，私聊使用用户记忆。
- `channel`：始终使用频道 scope。
- `user`：始终使用用户 scope。

插件提供 `search_memory` / `add_memory` 等工具，并通过 `appendSystemPrompt` 告诉 Agent 如何使用。

## 重要边界

MemOS 是可选插件，不是 Core 的一部分。没有安装该插件时，Agent 没有长期事实记忆。
