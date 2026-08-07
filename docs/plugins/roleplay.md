# 角色卡

包名：`koishi-plugin-yesimbot-roleplay`

从 PNG 角色卡加载角色扮演提示词。

```yaml
yesimbot-roleplay:
  characterCard: ./characters/athena.png
  useRandomGreeting: false
```

插件读取角色卡并注册一个 `AgentPlugin`，向频道提示词注入角色设定与开场白。
