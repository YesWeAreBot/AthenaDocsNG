# 贴纸管理

包名：`koishi-plugin-yesimbot-sticker-manager`

## 这个插件解决什么问题

让机器人能收藏、分类、搜索和发送表情包。你可以在群里把看到的好图“偷”进表情库，之后让机器人按关键词或分类发送。

## 安装和配置

在插件市场安装 `koishi-plugin-yesimbot-sticker-manager`。

```yaml
yesimbot-sticker-manager:
  scope: global                  # global=全局库，channel=按频道
  storagePath: data/yesimbot/sticker-manager
  classificationModel: ""        # 留空使用默认聊天模型
  tagMode: false                 # 是否启用实验性标签
  sendStaticAsGif: true          # 静态图是否转 GIF
  stickerElement: true           # 是否允许直接输出表情元素
```

## 常用能力

- 查询表情分类；
- 搜索表情；
- 收藏当前消息里的图片；
- 发送指定或随机表情；
- 开启 `tagMode` 后，可以按多个标签发送。

这个插件需要 Koishi 数据库。
