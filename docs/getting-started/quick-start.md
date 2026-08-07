# 快速开始

这个页面是给第一次使用 YesImBot 的人看的。目标只有一个：让机器人能在 Koishi 里回复你。

你不需要写代码。下面所有操作都能在 Koishi 控制台里完成；命令行安装只是给喜欢用终端的人准备的替代方式。

## 先认识三个名字

- **Koishi**：机器人框架，相当于机器人运行的家。
- **插件市场**：Koishi 控制台里安装插件的地方，类似手机应用商店。
- **模型服务插件**：负责连接 OpenAI、Anthropic、DeepSeek 或 Google 的插件。机器人用哪个模型，由它决定。

## 1. 安装核心插件

打开 Koishi 控制台，进入“插件市场”，搜索 `koishi-plugin-yesimbot`，点击安装。

如果喜欢命令行，也可以这样做：

```bash
yarn add koishi-plugin-yesimbot
```

YesImBot 需要一个数据库来保存聊天记录和频道信息。Koishi 默认项目一般已经配置好 SQLite，所以多数情况下你不需要额外设置。

## 2. 安装一个模型服务插件

YesImBot 本身不连接任何模型公司。你还得安装一个模型服务插件，告诉机器人可以调用谁的 API。

最常用的是 OpenAI：

```bash
yarn add @yesimbot/koishi-plugin-provider-openai
```

如果你用其他模型服务商，也可以在插件市场搜索：

| 服务商 | 插件 |
| --- | --- |
| OpenAI | `@yesimbot/koishi-plugin-provider-openai` |
| Anthropic | `@yesimbot/koishi-plugin-provider-anthropic` |
| DeepSeek | `@yesimbot/koishi-plugin-provider-deepseek` |
| Google | `@yesimbot/koishi-plugin-provider-google` |

## 3. 在控制台里完成配置

安装完成后，进入 Koishi 的“插件配置”页面：

1. 启用 `yesimbot`。
2. 启用模型服务插件，并填写 API Key。
3. 在模型列表里确认有你要用的模型，例如 `gpt-4o`。
4. 回到 `yesimbot` 配置，选择聊天模型。
5. 添加一个“允许响应的频道”。

“允许响应的频道”的意思是：机器人只在这些频道里接收消息。默认情况下，如果没有添加频道，机器人不会回复任何人。

如果你愿意直接编辑配置，最小示例是：

```yaml
yesimbot:
  chatModel: openai:gpt-4o  # 选择模型
  allowedChannels:
    - platform: onebot      # 平台
      channelId: "123456"   # 频道 ID
```

想测试时也可以先放行所有频道，但正式使用时不建议这样：

```yaml
allowedChannels:
  - platform: "*"
    channelId: "*"
```

## 4. 验证是否成功

在允许的频道里 @ 机器人：

```text
@Athena 你好
```

机器人回复，说明基础配置已经成功。

默认情况下：

- 私聊消息会触发回复；
- 群聊里 @ 机器人会触发回复；
- 群聊普通消息只会被记录，不会交给模型。

如果你希望机器人像群友一样自然参与群聊，不建议只把 `group` 改成 `trigger`。更好的做法是安装 [Will 策略插件](../plugins/will-policy.md)，并使用 `willingness` 引擎，让机器人按关键词、引用、图片和意愿值判断是否加入。

!!! tip "想直接用开发版源码？"
这通常是给开发者用的。普通用户不需要。如果你确实需要，可以看[安装指南](installation.md)里的 dev 接入说明。
