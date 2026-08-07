# 消息与 Will

Will 决定一条消息进入 Agent 后是 `wait` 还是 `trigger`。它不是“模型自己决定要不要回”，而是 Runtime 在调用模型之前完成的固定判断。

## routing 引擎（默认）

```yaml
will:
  engine: routing
  direct: trigger
  mention: trigger
  group: wait
```

- `direct`：私聊消息。
- `mention`：群聊中 @ 当前 Bot。
- `group`：群聊普通消息。

每个值只能是 `wait` 或 `trigger`。默认群聊普通消息不触发，避免机器人刷屏。

## willingness 引擎

```yaml
will:
  engine: willingness
  probabilityThreshold: 55
  decayHalfLifeSeconds: 600
  replyCost: 35
```

实现按消息增益、动态衰减和概率掷骰决定是否触发。它只保留三个面向用户的旋钮，不提供无限扩展的状态机。

## 忙时行为

当频道已有活动 turn 时，新消息不会创建第二个模型流消费者：

- `wait`：只进入历史。
- `trigger` 且忙：join 当前 turn，在下一模型 step 或后续循环中进入上下文。
- 主动事件 `trigger()` 忙时同样 join。

## 插件扩展 seam

Core 暴露两组注册入口：

- `registerWillConfigContributor(contributor)`：按 `ChannelScope` 修改 Will 配置。
- `registerWillEngineFactory(factory)`：按 scope 和 session 提供自定义 WillEngine。

没有插件注册时，Core 使用内置默认引擎。更多精细策略见[Will 策略插件](../plugins/will-policy.md)。
