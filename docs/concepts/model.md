# 模型服务

这个页面讲机器人如何选择和使用模型。

## 一句话解释

YesImBot 不内置任何模型公司。它通过“模型服务插件”连接 OpenAI、Anthropic、DeepSeek、Google 等服务商。插件负责注册模型，配置负责选择用哪个模型。

## 模型 ID

每个模型有一个完整 ID，写法是“服务商:模型”：

```text
openai:gpt-4o
anthropic:claude-sonnet-4-6
deepseek:deepseek-v4-pro
google:gemini-2.5-pro
```

在 `yesimbot` 配置里，`chatModel` 填这个 ID。

## models.json 是什么

`models.json` 是模型能力的补充配置文件，主要用来告诉系统：

- 默认使用哪个模型；
- 某个 ID 可以叫一个更短的名字；
- 模型是否支持图片；
- 模型的上下文和输出长度。

普通用户如果只做文本聊天，通常不需要修改它。

```json
{
  "defaults": {
    "chat": "openai:gpt-4o"
  },
  "aliases": {
    "main": "openai:gpt-4o"
  },
  "chat": {
    "openai:gpt-4o": {
      "modalities": { "input": ["image"] },
      "limit": { "context": 128000, "output": 16384 }
    }
  }
}
```

## 图片能力

想让机器人看图，需要：

1. 模型本身支持图片；
2. `models.json` 里声明支持图片；
3. `imageInput` 没有关闭。

模型不会自动翻看历史图片，只会读取当前步骤中明确读取的图片。

### 一步步启用图片

如果你希望机器人能看图，按下面的步骤操作：

1. 先确认模型服务插件里的模型 ID，例如 `openai:gpt-4o`。
2. 打开 `data/yesimbot/models.json`。如果文件不存在，就创建一个空文件，内容为 `{}`。
3. 在 `chat` 下添加这个模型，并声明图片输入：

```json
{
  "chat": {
    "openai:gpt-4o": {
      "modalities": {
        "input": ["image"]
      }
    }
  }
}
```

4. 保存文件，然后重启 Koishi。
5. 确认 `imageInput` 没有设为 `false`。

!!! warning "模型 ID 不能写错"
    `models.json` 里的键必须是完整的“服务商:模型”格式。写错会被忽略，并在启动日志里出现警告。

### 控制图片预算

```yaml
imageInput:
  maxCount: 3            # 最多同时读取 3 张图片
  maxBytesPerImage: 5242880   # 单张图片最大 5MB
  maxTotalBytes: 10485760     # 本轮图片总共最大 10MB
```

## 修改模型后

模型、图片能力和相关配置会在频道开始时被固定下来。修改后建议重启 Koishi，让新设置完整生效。
