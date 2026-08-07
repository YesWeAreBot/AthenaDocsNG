# 术语表

## AgentPlugin

由插件注册到每个频道 Runtime 的 Agent 扩展，可提供工具、提示词块和生命周期 hooks。

## AssetStore

频道范围内的字节存储，以内容哈希作为 ID。PlatformTranslator 把入站媒体写入这里。

## ArtifactStore

工具产生的不可变媒体存储，例如 MCP 返回的图片。

## ChannelRuntime

每个频道独立持有的 FIFO、Agent、Will、JSONL、资源与输出消费者。

## ChannelScope

公开的频道标识，只包含 `type`、`platform`、`selfId`、`channelId`。

## Message-first

先把消息固定为 Canonical Record，再决定是否触发模型 turn。

## PlatformTranslator

把 Koishi Session 转成 Core Message/Event record 的平台接入层。

## Provider

把 AI SDK 模型注册到 `ctx.yesimbot.model` 的 Koishi 插件。

## Runtime Snapshot

Runtime 创建时冻结的模型、Will、提示词、工具和插件集合。

## Will

决定消息进入历史后是 `wait` 还是 `trigger` 的固定边界。
