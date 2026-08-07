# 定时任务

包名：`koishi-plugin-yesimbot-schedule`

为当前频道提供持久化的定时事件触发能力。到点后通过 `ctx.yesimbot.trigger()` 向频道 Runtime 提交事件。

## 命令

```text
yesimbot.schedule
yesimbot.schedule.create <title> <prompt> --at <RFC3339>
yesimbot.schedule.create <title> <prompt> --cron <5段cron>
yesimbot.schedule.list
yesimbot.schedule.update <id>
yesimbot.schedule.pause <id>
yesimbot.schedule.resume <id>
yesimbot.schedule.cancel <id>
```

命令要求 authority ≥ 4。cron 使用 Asia/Shanghai 时区，相邻两次执行至少间隔 15 分钟。
