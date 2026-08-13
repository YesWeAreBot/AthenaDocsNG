# 模型服务插件

模型服务插件负责让 YesImBot 连接模型 API。它不是一份“只能连接这几家服务商”的清单；下表是仓库预置的 Provider 插件，通过 `baseURL` 和克隆配置可以接入任意兼容 API。

当前 v4 模型服务插件未上架 npm/插件市场；通过 Launcher 接入源码后，在 Koishi 插件列表启用对应插件并填写 API Key。

## 预置 Provider 插件

| 预置 Provider | 插件 |
| --- | --- |
| OpenAI | `@yesimbot/koishi-plugin-provider-openai` |
| Anthropic | `@yesimbot/koishi-plugin-provider-anthropic` |
| DeepSeek | `@yesimbot/koishi-plugin-provider-deepseek` |
| Google | `@yesimbot/koishi-plugin-provider-google` |

> 这些不是“只能使用这些厂商”。以 OpenAI Provider 为例，它按 OpenAI-compatible API 工作；把 `baseURL` 指向官方、中转站或自建网关都可以。Provider 也可以克隆多开，每个实例只需保证 `id` 唯一。

## 通用配置

以 OpenAI 为例：

```yaml-config
@yesimbot/koishi-plugin-provider-openai:
  id: openai        # Provider 实例 ID，必须唯一
  apiKey: sk-xxx    # 对应 API 的 Key
  baseURL: ""       # 留空使用官方地址；中转站填中转站地址
  chatModels:
    - id: gpt-4o    # 允许使用的模型 ID
      toolCall: true
      reasoning: true
```

## Provider 不绑定具体厂商

“OpenAI Provider”不代表只能连接 OpenAI 官方。很多第三方中转站和自建网关提供兼容 OpenAI 的 API，只要填入 `baseURL` 和对应 API Key 就能使用。

例如：

```yaml-config
@yesimbot/koishi-plugin-provider-openai:
  id: relay
  apiKey: relay-key
  baseURL: https://your-relay.example.com/v1
  chatModels:
    - id: gpt-4o
```

这样你在 `yesimbot` 里选择的模型 ID 就是 `relay:gpt-4o`。

## 一个插件可以克隆多个实例

如果你需要同时连接多个 Provider，或多个中转站，不需要安装多个插件。

在 Koishi 插件列表里，对模型服务插件点击右键，选择“克隆”。克隆后的每个实例可以拥有自己的：

- `id`
- `apiKey`
- `baseURL`
- 模型列表

克隆后必须把每个实例的 `id` 改成唯一值；模型 ID 会写成 `<id>:<modelId>`。

每个克隆实例还可以使用 Koishi 过滤器，只对特定频道或用户生效。

## DeepSeek 的特殊设置

DeepSeek 可以额外配置思考等级：

```yaml-config
@yesimbot/koishi-plugin-provider-deepseek:
  id: deepseek
  apiKey: sk-xxx
  thinking: high
```

模型 ID 也可以带等级后缀，例如 `deepseek-v4-pro:high`。

## 模型 ID

选择聊天模型时，写法是“Provider ID:模型”：

```text
openai:gpt-4o
relay:gpt-4o
anthropic:claude-sonnet-4-6
deepseek:deepseek-v4-pro
google:gemini-2.5-pro
```

## 图片能力

图片能力是否可用，由模型和 `models.json` 共同决定。具体步骤见[模型服务](../concepts/model.md)。
