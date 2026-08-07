# Will 策略

包名：`koishi-plugin-yesimbot-will-policy`

## 这个插件解决什么问题

默认的 Will 规则只有私聊、@ 和群聊普通消息三个开关。Will 策略插件可以让你按更多条件控制机器人什么时候说话，例如：

- 引用某条消息；
- 消息里带图片；
- 命中特定关键词；
- 只对某个频道或某些用户生效。

这也是当前推荐的方向。如果你希望机器人像群友一样参与群聊，而不是只处理私聊和 @，请优先使用这个插件，并把引擎设为 `willingness`。

## 固定规则

```yaml
yesimbot-will-policy:
  engine: routing      # 使用固定规则
  routing:
    direct: trigger    # 私聊：回复
    mention: trigger   # 被 @：回复
    quote: wait        # 引用机器人：先观察
    image: wait        # 含图片：先观察
    group: wait        # 普通群聊消息：先观察
```

每个规则都可以改成 `trigger` 或 `wait`。

## 按关键词和意愿值

如果希望机器人对某些话题更积极，可以使用意愿值：

```yaml
yesimbot-will-policy:
  engine: willingness
  willingness:
    probabilityThreshold: 55
    replyCost: 35
    keywords: ["Koishi", "文档"]
    keywordMultiplier: 1.2
```

命中关键词时，机器人回复概率会更高。

## 克隆实例和过滤器

Will 策略插件是可复用、可克隆的。如果你希望不同频道使用不同规则：

1. 在 Koishi 插件列表里，对 `yesimbot-will-policy` 点击右键，选择“克隆”。
2. 每个克隆实例配置自己的规则。
3. 使用 Koishi 过滤器，让不同实例只对指定频道或用户生效。

这样可以做到：A 群更活跃、B 群更安静，而不用改全局配置。
