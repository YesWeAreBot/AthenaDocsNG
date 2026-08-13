# MemOS 记忆

包名：`koishi-plugin-yesimbot-memos-client`

## 这个插件解决什么问题

默认情况下，YesImBot 只保存聊天会话，不具备真正意义上的长期记忆。安装 MemOS 后，机器人可以把值得记住的事实、偏好和经历存到 MemOS Cloud，之后在对话里检索使用。

## 举个例子

用户告诉机器人“我喜欢咖啡”，一段时间后再问“我喜欢喝什么”，机器人可以凭记忆回答，而不是每次重新认识你。

## 安装和配置

当前 v4 未上架插件市场；通过 Launcher 接入源码后，在 Koishi 插件列表启用 `koishi-plugin-yesimbot-memos-client`，然后填写：

```yaml-config
yesimbot-memos-client:
  baseUrl: https://memos.memtensor.cn/api/openmem/v1
  apiKey: your-api-key
  memoryScope: auto   # auto=群聊按频道、私聊按用户
```

`memoryScope` 决定记忆属于谁：

- `auto`：群聊记忆属于频道，私聊记忆属于用户。
- `channel`：始终按频道保存。
- `user`：始终按用户保存。

## 重要说明

MemOS 是可选的。没有安装它，机器人不会自动获得长期事实记忆。它也不是聊天记录的替代品，而是用来保存“值得记住”的信息。
