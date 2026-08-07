# 插件总览

插件是用来给机器人增加具体能力的。你可以只安装需要的部分，不需要一次装齐，也不需要写代码。

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

## 模型服务插件

| 服务商 | 包名 |
| --- | --- |
| OpenAI | `@yesimbot/koishi-plugin-provider-openai` |
| Anthropic | `@yesimbot/koishi-plugin-provider-anthropic` |
| DeepSeek | `@yesimbot/koishi-plugin-provider-deepseek` |
| Google | `@yesimbot/koishi-plugin-provider-google` |

## 安装方式

1. 打开 Koishi 控制台的插件市场。
2. 搜索插件名，点击安装。
3. 安装完成后，在插件配置页面打开开关。
4. 按页面提示填写 API Key、文件路径等设置。

大部分插件安装后立即对当前频道生效。修改模型或插件配置后，如果机器人没有马上变化，重启 Koishi 通常是最直接的解决方式。

!!! tip "插件可以克隆"
    模型服务插件和 Will 策略插件是可复用、可克隆的。在 Koishi 插件列表里点击右键选择“克隆”，就可以用不同配置创建多个实例，并通过 Koishi 过滤器应用到不同频道或用户。
