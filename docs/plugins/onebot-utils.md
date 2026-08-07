# OneBot 工具

包名：`koishi-plugin-yesimbot-onebot-utils`

## 这个插件解决什么问题

OneBot 工具给机器人提供 QQ/OneBot 平台上的操作能力，例如读取合并转发、设置精华、表态、OCR 识别图片、群管理操作等。

## 安装和启用

在插件市场安装 `koishi-plugin-yesimbot-onebot-utils`，然后在插件配置里勾选需要的工具：

```yaml
yesimbot-onebot-utils:
  enabledTools:
    - onebot_get_forward_message   # 读取合并转发
    - onebot_set_essence          # 设置精华
  parseImages: false              # 是否解析转发里的图片
  attachImageSummary: true        # 动画表情是否附带 summary
  maxForwardPageChars: 6000       # 合并转发每页最大字符数
```

## 可用工具

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

## 注意

群管理工具只会在群聊频道出现。每个工具是否可用，还取决于你用的 OneBot 实现是否支持对应接口。
