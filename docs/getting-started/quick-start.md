# 快速开始

本页只覆盖让 YesImBot 在 Koishi 里跑起来的最小路径。更完整的配置项见[配置参考](../reference/configuration.md)。

## 1. 安装核心插件

在 Koishi 控制台的插件市场搜索 `koishi-plugin-yesimbot` 并安装，或在 Koishi 项目目录执行：

```bash
yarn add koishi-plugin-yesimbot
```

YesImBot 需要 Koishi 数据库服务，因此请确保你的 Koishi 已经配置 `database`。

## 2. 安装一个模型 Provider

v4 不在核心插件里直接维护模型 API。你需要同时安装 Provider 插件，例如：

```bash
yarn add @yesimbot/koishi-plugin-provider-openai
```

当前官方 Provider 包：

| Provider | 包名 |
| --- | --- |
| OpenAI | `@yesimbot/koishi-plugin-provider-openai` |
| Anthropic | `@yesimbot/koishi-plugin-provider-anthropic` |
| DeepSeek | `@yesimbot/koishi-plugin-provider-deepseek` |
| Google | `@yesimbot/koishi-plugin-provider-google` |

## 3. 启用并填写配置

在 Koishi 中启用 `yesimbot` 和至少一个 Provider。Provider 的 `id` 默认是 `openai`、`anthropic`、`deepseek` 或 `google`，也可以自定义。

`chatModel` 使用 `providerId:modelId` 格式，例如：

```text
openai:gpt-4o
```

`allowedChannels` 采用默认拒绝策略。未配置时插件不会处理任何外部 Session。至少添加一条规则后才能收到消息：

```yaml
yesimbot:
  chatModel: openai:gpt-4o
  allowedChannels:
    - platform: onebot
      channelId: "123456"
```

规则按 OR 合并，`platform` 与 `channelId` 支持 `*`。省略 `isDirect` 表示同时匹配私聊和群聊：

```yaml
allowedChannels:
  - platform: "*"
    channelId: "*"
```

## 4. 验证

在允许的频道中 @ 机器人：

```text
@Athena 你好
```

如果默认 routing 配置下被 @ 会触发回复，说明基础链路已经工作。默认群聊普通消息是 `wait`，机器人不会每条都回复。

!!! tip "开发分支自动接入"
    如果要直接使用当前 `dev` 分支源码，可以运行仓库内的 `scripts/setup-koishi.mjs`，具体见[安装指南](installation.md)。
