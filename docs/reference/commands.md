# 命令参考

这个页面列出主要管理命令。普通用户通常只需要知道少数几个会话命令；插件命令会在对应插件页面里介绍。

## 会话命令

Core 注册 `yesimbot.session` 命令组，要求 authority ≥ 4。

| 命令 | 说明 |
| --- | --- |
| `yesimbot.session.compact` | 手动压缩当前会话 |
| `yesimbot.session.archive` | 归档当前会话 |
| `yesimbot.session.archive --no-summary` | 归档但不生成摘要 |
| `yesimbot.session.clear` | 清空会话和资源，需要二次确认 |
| `yesimbot.session.status` | 查看活动会话、消息数、压缩状态 |
| `yesimbot.session.list` | 列出会话文件 |

## 定时任务命令

由 `koishi-plugin-yesimbot-schedule` 提供，要求 authority ≥ 4。

```text
yesimbot.schedule
yesimbot.schedule.create <title> <prompt> --at <RFC3339>
yesimbot.schedule.create <title> <prompt> --cron <5段cron>
yesimbot.schedule.list
yesimbot.schedule.update <id> [--title ...] [--prompt ...] [--at ...|--cron ...]
yesimbot.schedule.pause <id>
yesimbot.schedule.resume <id>
yesimbot.schedule.cancel <id>
```

## 工作区审批命令

由 `koishi-plugin-yesimbot-workspace` 的 Host 模式提供，要求 authority ≥ 5。

```text
yesimbot.workspace.approvals
yesimbot.workspace.approve <requestId>
yesimbot.workspace.reject <requestId>
```

## 其他命令

- `yesimbot.will-policy`：检查当前 Will 策略实例。

旧版 `setup`、`conf.get`、`conf.set` 不再由 v4 Core 提供。
