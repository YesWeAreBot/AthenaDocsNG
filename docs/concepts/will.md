# 机器人什么时候回复

Will 控制机器人决定要不要回复。

## 两种行为

每条消息进入后，系统先做低成本判断：

- **触发回复**：把消息交给模型，生成回复。
- **先观察**：只把消息记下来，不调用模型。

这个判断发生在调用模型之前，机器人不会对每条消息都花一次模型费用。

## 默认规则：最小启动配置

```yaml-config
will:
  engine: routing   # 固定规则（routing）
  direct: trigger   # 私聊消息
  mention: trigger  # @ 机器人
  group: wait       # 普通群消息
```

覆盖的场景：

1. 私聊机器人 → 回应。
2. 群里 @ 机器人 → 回应。
3. 群里普通聊天 → 潜水。

`group: wait` 意味着普通群聊消息不交给模型。机器人看不到这些消息，不会主动参与。

这个默认配置适合：

- 刚安装做最小验证；
- 只处理私聊和 @；
- 暂时不想让机器人进入普通群聊上下文。

想让机器人像群友一样自然参与，使用 `willingness` 引擎 + Will 策略插件。

## 让机器人更活跃

把群聊普通消息改成 `trigger`：

```yaml-config
will:
  engine: routing
  group: trigger   # 普通群消息
```

改完重启 Koishi。机器人可能在热闹群里频繁发言，注意刷屏。

`group: trigger` 对所有普通消息直接触发，仍不够"自然"。更好的做法是使用意愿值。

## 按意愿值动态判断

固定规则适合"明确要不要回"的场景。想让机器人根据话题热度和节奏自然决定：

```yaml-config
will:
  engine: willingness
  probabilityThreshold: 55     # 触发概率阈值
  decayHalfLifeSeconds: 600    # 意愿值半衰期(秒)
  replyCost: 35                # 每次成功回复后扣除的意愿值
```

- `probabilityThreshold` 越高，机器人越"高冷"。
- `decayHalfLifeSeconds` 越短，兴趣消退越快。
- `replyCost` 越大，说完一次后越不容易立刻再说。

## 推荐做法：willingness + Will 策略插件

想做出"平时潜水、遇到感兴趣的话题参与"的效果，安装 [Will 策略插件](../plugins/will-policy.md)，引擎设为 `willingness`。

比默认 routing 更接近自然群友：

- 普通群聊消息先积累意愿；
- 命中关键词、被 @、私聊、引用或图片时，意愿提高；
- 只有意愿达到阈值才触发回复；
- 每次回复后消耗意愿，避免连续刷屏。

不需要每条消息直接触发模型，但机器人会"看到"群聊并有机会自然加入。

## 机器人正在忙时

正在回复时，新消息不会抢线。它进入当前对话流程排队，等合适时机处理。同一频道不会出现多个回复互相打架。

## 更细的控制

[Will 策略插件](../plugins/will-policy.md) 可以按引用、图片、关键词、具体频道或用户调整回复规则。
