# 架构总览

YesImBot v4 是一个 message-first 的 Koishi Agent Runtime。核心原则是：先固定“一条消息是什么”，再决定“要不要回应”，最后才进入模型与工具执行。

## 输入管线

```text
Session
  -> allowlist
  -> shared assignee admission
  -> channel AssetStore
  -> PlatformTranslator
  -> final Message/Event Record
  -> RuntimeManager
  -> ChannelRuntime FIFO
  -> Will: wait | join | one output consumer
  -> passive Gateway delivery
```

## 组件边界

### Gateway

Gateway 是 live Session 的唯一 owner。它负责：

- 检查 `allowedChannels` 白名单；
- 检查 shared 频道的 assignee；
- 创建频道 `AssetStore`；
- 调用 `PlatformTranslator` 生成最终 record；
- 用原 Session 被动发送模型输出；
- 管理 Session 生命周期和投递失败反馈。

Gateway 不保存 Session 到 Runtime，也不做平台业务。

### RuntimeManager

RuntimeManager 按持久化频道维护 `ChannelRuntime`。它负责：

- 根据 record 推导 `ChannelScope`；
- 创建或替换 Runtime；
- 停止、reset、clear、compact、archive、status；
- 在 shared 频道 Bot 变化时停止旧 Runtime。

### ChannelRuntime

每个频道有独立的 FIFO。ChannelRuntime 持有：

- Agent 状态与 JSONL storage；
- Will engine；
- 模型输入投影；
- 输出队列与 delivery feedback；
- 当前 Bot 的 `sendMessage` 工具；
- Core 的 `read`、`finalize` 等工具。

ChannelRuntime 不保留 Koishi Session。

### @yesimbot/agent-runtime

`@yesimbot/agent-runtime` 是框架无关的通用 Agent 核心，提供：

- `createAgent()` 与 turn queue；
- append / send / run / wait / interrupt / stop；
- 有序 AgentPlugin hooks；
- 工具包装、流式模型执行和 terminal events；
- AgentStorage 抽象。

它不理解 Koishi Session、平台 API 或频道目录。

## 生命周期

- Runtime 创建时快照模型、Will、提示词、工具和插件。
- 没有热更新或 `reload()`。
- 停止或 shared Bot 替换后，下一次路由会创建新的 Runtime。
- reset 只清理会话与资源，不清理 workspace 和插件数据。

## 投递失败

投递失败会通过 `delivery.failed` 事件回到 producing Runtime，并作为同频道事件提交，后续输出仍继续处理。首段发送成功只通知一次 Will `onReply()`。
