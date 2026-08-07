# 插件总览

YesImBot v4 的插件通过 `ctx.yesimbot.registerChannelPlugin()` 向每个频道的 Agent 注入工具、提示词和生命周期行为。Provider 插件通过 `ctx.yesimbot.model.register()` 注册模型。

## Agent 能力插件

| 插件 | 包名 | 能力 |
| --- | --- | --- |
| 工作区 | `koishi-plugin-yesimbot-workspace` | 虚拟文件系统、Bash 沙箱、Skill 加载 |
| MCP 客户端 | `koishi-plugin-yesimbot-mcp-client` | 连接 MCP 服务器并注册工具 |
| MemOS 记忆 | `koishi-plugin-yesimbot-memos-client` | MemOS Cloud 长期记忆读写 |
| 全局脑 | `koishi-plugin-yesimbot-global-brain` | 跨频道共享知识、问题与经验 |
| 搜索 | `koishi-plugin-yesimbot-search-service` | Web 搜索与网页抓取 |
| OneBot 工具 | `koishi-plugin-yesimbot-onebot-utils` | 合并转发、表态、精华、OCR 等 |
| 贴纸管理 | `koishi-plugin-yesimbot-sticker-manager` | 表情包收藏、分类、导入和发送 |
| 角色卡 | `koishi-plugin-yesimbot-roleplay` | 从 PNG 角色卡加载人设 |
| 定时任务 | `koishi-plugin-yesimbot-schedule` | 频道内持久化定时事件 |
| Will 策略 | `koishi-plugin-yesimbot-will-policy` | 精细 routing / willingness 策略 |

## 模型 Provider

| Provider | 包名 |
| --- | --- |
| OpenAI | `@yesimbot/koishi-plugin-provider-openai` |
| Anthropic | `@yesimbot/koishi-plugin-provider-anthropic` |
| DeepSeek | `@yesimbot/koishi-plugin-provider-deepseek` |
| Google | `@yesimbot/koishi-plugin-provider-google` |

## 安装后

在 Koishi 控制台启用插件即可。每个插件会注册自己的 `AgentPlugin`，但不会修改 Core 的公开协议。

!!! tip "插件存储"
    受信任插件可以通过 `ctx.yesimbot.getStoragePath(scope)` 获得频道根目录，并自行选择 `workspace/` 等子目录。
