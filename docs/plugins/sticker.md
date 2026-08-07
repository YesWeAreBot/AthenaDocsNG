# 贴纸管理

包名：`koishi-plugin-yesimbot-sticker-manager`

表情包收藏、分类、导入和管理插件。

## 配置

```yaml
yesimbot-sticker-manager:
  scope: global
  storagePath: data/yesimbot/sticker-manager
  classificationModel: ""
  tagMode: false
  sendStaticAsGif: true
  stickerElement: true
```

## 能力

- `sticker_categories` / `sticker_search` / `sticker_steal` / `sticker_send`
- 开启 `tagMode` 后提供 `sticker_tags` 和按 tag 发送
- 允许直接输出 `<sticker id="..."/>` 或 `<sticker category="..."/>`

该插件需要 Koishi database。
