# 模型服务插件

模型服务插件负责让 YesImBot 连接某个模型服务商。安装插件、填写 API Key，然后在 `yesimbot` 配置里选择模型，机器人就能开始聊天。

当前 v4 模型服务插件未上架 npm/插件市场；通过 Launcher 接入源码后，在 Koishi 插件列表启用对应插件并填写 API Key。

## 支持的服务商

| 服务商 | 插件 |
| --- | --- |
| OpenAI | `@yesimbot/koishi-plugin-provider-openai` |
| Anthropic | `@yesimbot/koishi-plugin-provider-anthropic` |
| DeepSeek | `@yesimbot/koishi-plugin-provider-deepseek` |
| Google | `@yesimbot/koishi-plugin-provider-google` |

## 通用配置

以 OpenAI 为例：

```yaml
@yesimbot/koishi-plugin-provider-openai:
  id: openai        # 这个服务商在配置里的名字
  apiKey: sk-xxx    # 服务商给你的 API Key
  baseURL: ""       # 留空使用官方地址；中转站填中转站地址
  chatModels:
    - id: gpt-4o    # 允许使用的模型 ID
      toolCall: true
      reasoning: true
```

## OpenAI 插件也能接中转站

“OpenAI 插件”不代表只能连接 OpenAI 官方。很多第三方中转站提供兼容 OpenAI 的 API，只要填入 `baseURL` 和对应 API Key 就能使用。

例如：

```yaml
@yesimbot/koishi-plugin-provider-openai:
  id: relay
  apiKey: relay-key
  baseURL: https://your-relay.example.com/v1
  chatModels:
    - id: gpt-4o
```

这样你在 `yesimbot` 里选择的模型 ID 就是 `relay:gpt-4o`。

## 一个插件可以克隆多个实例

如果你需要同时连接多个服务商，或多个中转站，不需要安装多个插件。

在 Koishi 插件列表里，对模型服务插件点击右键，选择“克隆”。克隆后的每个实例可以拥有自己的：

- `id`
- `apiKey`
- `baseURL`
- 模型列表

每个克隆实例还可以使用 Koishi 过滤器，只对特定频道或用户生效。

## DeepSeek 的特殊设置

DeepSeek 可以额外配置思考等级：

```yaml
@yesimbot/koishi-plugin-provider-deepseek:
  id: deepseek
  apiKey: sk-xxx
  thinking: high
```

模型 ID 也可以带等级后缀，例如 `deepseek-v4-pro:high`。

## 模型 ID

选择聊天模型时，写法是“服务商:模型”：

```text
openai:gpt-4o
relay:gpt-4o
anthropic:claude-sonnet-4-6
deepseek:deepseek-v4-pro
google:gemini-2.5-pro
```

## 图片能力

图片能力是否可用，由模型和 `models.json` 共同决定。具体步骤见[模型服务](../concepts/model.md)。
