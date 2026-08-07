# 基础配置

这个页面介绍 YesImBot 最常用的几项设置。完整字段表放在[配置参考](../reference/configuration.md)，这里只讲大多数人会碰到的内容。

## 聊天模型

聊天模型决定机器人用哪一个模型来思考。它由两部分组成，写法是“服务商:模型”，例如：

```text
openai:gpt-4o
deepseek:deepseek-v4-pro
google:gemini-2.5-pro
```

你不需要记住每个 ID。在 Koishi 控制台的 `yesimbot` 配置里，一般可以直接从下拉列表选择。

## 允许响应的频道

“允许响应的频道”决定机器人能在哪里说话。默认情况下，列表是空的，也就是机器人不会接收任何频道消息。

至少要添加一条规则。最简单的规则是：

```yaml
allowedChannels:
  - platform: onebot   # 平台，例如 onebot、discord
    channelId: "123456" # 频道 ID
```

想允许所有平台和所有频道，可以写：

```yaml
allowedChannels:
  - platform: "*"   # 不限平台
    channelId: "*"  # 不限频道
```

`*` 表示“不限制”。正式使用时不建议直接放行所有频道。

## 机器人什么时候回复

默认情况下，私聊和群聊 @ 会回复，群聊普通消息只会被记录，不会交给模型。

如果你希望机器人自然参与群聊，推荐安装 [Will 策略插件](../plugins/will-policy.md) 并使用 `willingness` 引擎。这样机器人会先“看到”群聊，根据关键词、引用、图片和意愿值决定是否加入，而不是机械地每一条都回。

## 群聊里的 assignee

群聊频道还需要把 Koishi 的 assignee 设置为当前 Bot。否则即使 `allowedChannels` 配置正确，机器人也不会接收该频道消息。

## 修改后要重启吗

如果你修改了模型、插件或主要配置，建议重启 Koishi。重启后新设置会完整生效。有些临时调试设置不会自动写入配置文件，重启后会丢失。

## 图片输入

想让机器人看图，需要两个条件同时满足：

1. 模型本身支持图片。
2. 图片输入功能没有关闭。

模型支持图片的信息写在 `models.json` 里。普通用户如果只做文本聊天，不需要修改这个文件。

最小示例：

```json
{
  "chat": {
    "openai:gpt-4o": {
      "modalities": { "input": ["image"] }
    }
  }
}
```

还可以限制图片数量、单张大小和总大小：

```yaml
imageInput:
  maxCount: 3
  maxBytesPerImage: 5242880
  maxTotalBytes: 10485760
```

更完整的说明见[模型服务](../concepts/model.md)和[配置参考](../reference/configuration.md)。
