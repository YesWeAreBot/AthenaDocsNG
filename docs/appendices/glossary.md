# 术语表

遇到看不懂的词时回来查，不需要一次读完。

## AgentPlugin

给机器人增加能力的运行时接口。通过 ChannelPlugin 的 `setup()` 方法返回，在每个频道生效。

## AssetStore / ArtifactStore

本地资源仓库。AssetStore 存放收到的图片和文件，ArtifactStore 存放工具生成的资源。

## ChannelPlugin

插件向 Core 注册的工厂接口。每个频道 Runtime 初始化时调用其 `setup(scope, bot)` 方法，返回 AgentPlugin 或 null。

## ChannelResources

一个频道的资源集合，包含 AssetStore、ArtifactStore 和注册的 ResourceReader。通过 `ctx.yesimbot.resource.get(scope)` 获取。

## ChannelRuntime

每个频道独立的运行状态，负责按顺序处理消息队列。

## ChannelScope

标识"哪个平台、哪个机器人、哪个频道"的一组信息。

## Koishi

机器人框架。YesImBot 是运行在 Koishi 里的插件。

## MCP

一种连接外部工具服务的协议。安装 MCP 客户端后，机器人可调用外部服务提供的工具。

## Messenger

Core 的消息入口与出口。注册 Koishi 中间件接收平台消息，处理白名单检查、Translator 选择、回复投递和节奏控制。

## 模型服务插件

连接 OpenAI、Anthropic、DeepSeek、Google 等服务商的 Provider 插件。通过 `ctx.yesimbot.model.register()` 注册。

## PlatformTranslator / Translator

把不同平台消息转成统一格式的接入层。通过 `ctx.yesimbot.messenger.use()` 注册。

## ResourceReader

读取自定义 URI scheme 资源的接口。通过 `ctx.yesimbot.resource.use()` 注册。

## Runtime Snapshot

频道开始时固定下来的模型、工具和插件设置。修改这些配置后需重启才能生效。

## WillEngine

机器人决定"先观察"还是"触发回复"的判断引擎。内置 routing 引擎按固定规则判断，willingness 引擎按动态意愿值判断。

## WillPlugin

通过 `ctx.yesimbot.agent.will()` 注册的回复策略插件。按 priority 匹配，首个匹配的插件接管频道的回复判断。

## 允许响应的频道

机器人可以接收消息的频道白名单。未配置时机器人不接收任何频道消息。
