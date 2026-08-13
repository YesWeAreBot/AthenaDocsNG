# 插件总览

插件是用来给机器人增加具体能力的。你可以只安装需要的部分，不需要一次装齐，也不需要写代码。

!!! warning "当前 v4 尚未上架"
    目前 v4 插件还没有发布到 npm，也没有上架 Koishi 插件市场。通过 Launcher 接入源码后，Koishi 插件列表会包含以下插件，直接启用即可。

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
| 聊天学习 | `koishi-plugin-yesimbot-chat-learning` | 历史对话风格学习与参考 |

## 模型服务插件

| 预置 Provider | 包名 |
| --- | --- |
| OpenAI | `@yesimbot/koishi-plugin-provider-openai` |
| Anthropic | `@yesimbot/koishi-plugin-provider-anthropic` |
| DeepSeek | `@yesimbot/koishi-plugin-provider-deepseek` |
| Google | `@yesimbot/koishi-plugin-provider-google` |

> 预置 Provider 不绑定具体厂商。OpenAI Provider 可改 `baseURL` 接任意 OpenAI-compatible API；Provider 支持克隆多开，每个实例的 `id` 必须唯一。

## 安装方式

1. 安装 Launcher，并运行 `yesimbot-cli init` 接入 v4 源码。
2. 打开 Koishi 控制台的插件列表。
3. 找到要用的插件，打开开关。
4. 按页面提示填写 API Key、文件路径等设置。

当前 v4 插件未上架 npm/插件市场，不需要逐个执行 `yarn add`。

大部分插件安装后立即对当前频道生效。修改模型或插件配置后，如果机器人没有马上变化，重启 Koishi 通常是最直接的解决方式。

!!! tip "插件可以克隆"
    模型服务插件和 Will 策略插件是可复用、可克隆的。在 Koishi 插件列表里点击右键选择“克隆”，就可以用不同配置创建多个实例；模型服务插件的每个实例必须保证 `id` 唯一。
