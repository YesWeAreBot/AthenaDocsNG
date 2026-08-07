# 定时任务

包名：`koishi-plugin-yesimbot-schedule`

## 这个插件解决什么问题

让机器人在指定时间自动发起提醒或任务。例如每天早上 9 点提醒大家打卡，或者某个时刻自动向频道发一条消息。

## 安装

在插件市场安装 `koishi-plugin-yesimbot-schedule`，启用后即可使用命令。

## 常用命令

```text
yesimbot.schedule.create <标题> <提示词> --at <时间>
yesimbot.schedule.create <标题> <提示词> --cron <表达式>
yesimbot.schedule.list
yesimbot.schedule.pause <id>
yesimbot.schedule.resume <id>
yesimbot.schedule.cancel <id>
```

示例：

```text
yesimbot.schedule.create 早会提醒 提醒大家准备早会 --at 2030-01-01T09:00:00+08:00
```

## 注意

命令需要一定管理权限。cron 使用 Asia/Shanghai 时区，相邻两次执行至少间隔 15 分钟。
