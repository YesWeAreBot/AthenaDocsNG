# 快速开始

这个页面是给第一次使用 YesImBot 的人看的。目标只有一个：让机器人能在 Koishi 里回复你。

你不需要写插件代码。安装阶段会用到 Launcher 的一两条命令，之后的大部分配置都在 Koishi 控制台里完成。

## 先认识三个名字

- **Koishi**：机器人框架，相当于机器人运行的家。
- **Koishi 控制台**：管理和配置机器人插件的地方。
- **模型服务插件**：负责连接 OpenAI、Anthropic、DeepSeek 或 Google 的插件。机器人用哪个模型，由它决定。

## 1. 安装 YesImBot

v4 尚未发布到 npm 或 Koishi 插件市场，所以这一步使用官方 Launcher 从源码接入。Launcher 会先安装命令行工具 `yesimbot-cli`，再由它创建 Koishi App、拉取 YesImBot v4 源码并构建。

### 1.1 安装 Launcher

根据你的系统选择一条命令：

Linux / WSL / macOS：

```bash
curl -fsSL https://raw.githubusercontent.com/YesWeAreBot/launcher/main/install.sh | sh
```

Windows PowerShell：

```powershell
irm https://raw.githubusercontent.com/YesWeAreBot/launcher/main/install.ps1 | iex
```

安装完成后可以运行 `yesimbot-cli --help` 验证。

### 1.2 创建或接入 Koishi App

第一次使用，直接运行：

```bash
yesimbot-cli init
```

已经有 Koishi App，传入它的目录：

```bash
yesimbot-cli init /path/to/koishi-app
```

`init` 会完成这些事：

- 没有 App 时下载 Koishi 模板；
- 从 GitHub `dev` 分支拉取 YesImBot v4 源码；
- 构建插件并写入 workspace 依赖；
- 结束后询问是否立即启动。

数据库不需要单独准备：Launcher 创建的 Koishi App 自带 SQLite，默认直接使用；需要 MySQL/PostgreSQL 时再在 Koishi App 中配置。

## 2. 启用一个模型服务插件

YesImBot 本身不连接任何模型公司。接入源码并启动后，在 Koishi 控制台的插件列表里启用一个模型服务插件，告诉机器人可以调用谁的 API。

最常用的是 OpenAI；其他服务商可以启用对应插件：

| 服务商 | 插件 |
| --- | --- |
| OpenAI | `@yesimbot/koishi-plugin-provider-openai` |
| Anthropic | `@yesimbot/koishi-plugin-provider-anthropic` |
| DeepSeek | `@yesimbot/koishi-plugin-provider-deepseek` |
| Google | `@yesimbot/koishi-plugin-provider-google` |

## 3. 在控制台里完成配置

接入并启动后，进入 Koishi 的“插件配置”页面：

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

!!! tip "Launcher 接入的就是当前 dev 源码"
    Launcher 的 `init` 默认从 GitHub `dev` 分支拉取 v4，因此普通用户不需要额外手工 clone。更完整的安装说明见[安装指南](installation.md)。
