# 角色卡

包名：`koishi-plugin-yesimbot-roleplay`

## 这个插件解决什么问题

让机器人使用一张 PNG 角色卡来扮演特定角色。角色卡里包含人设、性格和开场白，适合做角色扮演或设定固定人格。

## 安装和配置

在插件市场安装 `koishi-plugin-yesimbot-roleplay`，然后指定角色卡文件：

```yaml
yesimbot-roleplay:
  characterCard: ./characters/athena.png # PNG 角色卡路径
  useRandomGreeting: false               # 是否随机选开场白
```

启用后，机器人会在当前频道按角色卡表现。
