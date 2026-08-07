# 从 v3 升级到 v4

v4 是重写版本，旧的 v3 配置和旧版 Athena 配置不兼容。不要尝试把 `modelService`、`agentBehavior`、`capabilities` 原样搬到 v4。

## 主要变化

| v3 概念 | v4 对应 |
| --- | --- |
| `modelService.providers` / `modelGroups` | Provider 插件 + `chatModel` / `models.json` |
| `agentBehavior.willingness` 四层模型 | `will.engine` 下的 routing / willingness |
| `agentBehavior.arousal.allowedChannelGroups` | `allowedChannels` 白名单 |
| `capabilities.memory` 核心记忆目录 | `PERSONA.md`、`AGENTS.md` 与频道会话 |
| `WorldStateService` 摘要记忆 | JSONL 会话压缩、归档和可选记忆插件 |
| `ToolService` 扩展 | AgentPlugin 与 Provider/Translator 边界 |
| `setup` / `conf.get` / `conf.set` | 由 Koishi 配置页和 `yesimbot.session.*` 命令承担 |

## 迁移步骤

1. 备份 `PERSONA.md` 或旧的记忆文件内容。
2. 安装 `koishi-plugin-yesimbot` 和一个模型 Provider。
3. 配置 `chatModel` 与 `allowedChannels`。
4. 重新按需启用插件。
5. 用 `yesimbot.session.status` 观察会话，而不是依赖旧配置页。

## 不再保留的假设

- 没有自动迁移旧 JSONL 或旧目录布局。
- 不提供 dual read、alias 或 fallback。
- reset 只清理 `sessions/` 和 `assets`，不会清理 workspace 或插件数据。
