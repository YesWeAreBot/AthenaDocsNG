# Will 策略

包名：`koishi-plugin-yesimbot-will-policy`

提供可克隆、可筛选、可组合的 Will 与 routing 策略。插件注册 `WillEngineFactory`，可用 Koishi filter 限制到特定频道或用户。

```yaml
yesimbot-will-policy:
  engine: routing
  factoryPriority: 1000
  routing:
    direct: trigger
    mention: trigger
    quote: wait
    image: wait
    group: wait
```

也可以使用 `willingness` 引擎：

```yaml
yesimbot-will-policy:
  engine: willingness
  willingness:
    maxScore: 100
    probabilityThreshold: 55
    replyCost: 35
    keywords: ["Koishi", "文档"]
    keywordMultiplier: 1.2
```

调试命令：

```text
yesimbot.will-policy
```
