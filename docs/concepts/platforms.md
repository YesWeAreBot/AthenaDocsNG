# 平台接入

这个页面讲机器人怎样支持不同的聊天平台。

## 一句话解释

不同平台的消息格式不一样。YesImBot 通过“平台接入层”把 OneBot、Discord 等平台的消息转成统一格式，之后机器人只需要处理一种内部格式。

## 内置支持

YesImBot 核心内置了 OneBot 平台接入，常见能力包括：

- 接收 QQ/OneBot 消息；
- 保存图片等媒体；
- 把“拍一拍”等事件转成内部事件。

## 其他平台

如果 Koishi 支持某个平台，但没有专门的 YesImBot 接入，普通文本消息仍有可能直接工作。不过媒体、自定义事件等高级能力需要更完整的平台接入。

## 给开发者

想给新平台写接入，可以看[开发指南里的 PlatformTranslator](../development/platform-translator.md)。
