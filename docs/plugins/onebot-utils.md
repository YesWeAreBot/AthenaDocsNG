# OneBot 工具

包名：`koishi-plugin-yesimbot-onebot-utils`

为 OneBot 平台提供平台专属工具。只在 `scope.platform === "onebot"` 的频道注册。

## 工具

```text
onebot_get_forward_message
onebot_send_forward_message
onebot_create_reaction
onebot_set_essence
onebot_ban_user
onebot_unban_user
onebot_kick_user
onebot_ocr_image
onebot_set_qq_profile
onebot_set_qq_avatar
```

## 配置

```yaml
yesimbot-onebot-utils:
  enabledTools:
    - onebot_get_forward_message
    - onebot_set_essence
  parseImages: false
  attachImageSummary: true
  maxForwardPageChars: 6000
```

群管理工具只在 shared 频道暴露。
