# YesImBot v4 官方文档

<div class="home-hero">

## 让语言模型自然融入群聊

YesImBot v4 是一套基于 Koishi 的 message-first Agent Runtime。它不再把每条消息都当成一次“提问”，而是按频道持续观察对话、判断何时回应，并通过工具和插件扩展行动能力。

</div>

## 核心能力

<div class="feature-grid">

<div class="feature-card">
<strong>Message-first 运行时</strong>
<p>消息按频道进入 FIFO，忙时加入当前 turn，避免多个模型流同时消费同一个频道上下文。</p>
</div>

<div class="feature-card">
<strong>稳定的 Will 边界</strong>
<p>routing 按私聊、提及和群聊决定 wait/trigger；willingness 提供可解释的意愿值与衰减模型。</p>
</div>

<div class="feature-card">
<strong>插件与 Provider 生态</strong>
<p>AgentPlugin 扩展工具、提示词和生命周期；Provider 只负责把 AI SDK 模型注册进 `ctx.yesimbot.model`。</p>
</div>

<div class="feature-card">
<strong>本地可验证的会话与资源</strong>
<p>频道目录保存 manifest、JSONL 会话、assets、artifacts、workspace 和插件数据，不依赖平台在线状态重放历史。</p>
</div>

</div>

## 快速通道

<div class="quick-grid">

<a class="quick-card" href="getting-started/quick-start.md"><strong>快速开始</strong><span>5 分钟完成基础配置并开始对话。</span></a>

<a class="quick-card" href="concepts/architecture.md"><strong>架构总览</strong><span>了解 Gateway、RuntimeManager、ChannelRuntime 与 agent-runtime 的边界。</span></a>

<a class="quick-card" href="reference/configuration.md"><strong>配置参考</strong><span>查看当前 v4 配置项与 `models.json` 用法。</span></a>

<a class="quick-card" href="plugins/index.md"><strong>插件总览</strong><span>浏览工作区、MCP、搜索、记忆和平台工具插件。</span></a>

<a class="quick-card" href="development/overview.md"><strong>开发指南</strong><span>开发 AgentPlugin、PlatformTranslator 与模型 Provider。</span></a>

<a class="quick-card" href="development/versioning.md"><strong>多版本文档</strong><span>使用 Mike 发布 v3 与 v4 等历史版本。</span></a>

</div>

## 数据流

```mermaid
graph LR
  S[Koishi Session] --> G[Gateway]
  G --> A[AssetStore]
  G --> R[Message Record]
  R --> M[RuntimeManager]
  M --> C[ChannelRuntime FIFO]
  C --> W[Will Decision]
  W --> AG[Agent]
  AG --> T[Tools Plugins Model]
  AG --> O[OutputQueue]
  O --> D[Passive Delivery]
```

## 项目信息

- 当前文档面向 `dev` 分支实现的 v4 架构。
- 代码仓库：[YesWeAreBot/YesImBot](https://github.com/YesWeAreBot/YesImBot)
- 文档仓库：[YesWeAreBot/AthenaDocsNG](https://github.com/YesWeAreBot/AthenaDocsNG)
- 许可证：MIT
