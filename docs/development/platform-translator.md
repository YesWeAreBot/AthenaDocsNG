# PlatformTranslator 开发

Translator 负责把平台 Session 转成 Core 的 Message/Event record。

## 接口

```typescript
import type { Translator } from "koishi-plugin-yesimbot";
import type { ChannelResources, MessageRecord } from "koishi-plugin-yesimbot";
import type { Session } from "koishi";

const translator: Translator = {
  platform: "my-platform",
  async translate(session: Session, resources: ChannelResources) {
    if (session.type !== "message-created") return null;
    // 使用 session 和 resources 构造 MessageRecord
    return {
      platform: session.platform,
      selfId: session.selfId,
      channel: { id: session.channelId, type: session.isDirect ? 1 : 0 },
      messageId: session.messageId,
      elements: session.elements,
      author: { id: session.userId, name: session.username },
      timestamp: Date.now(),
    };
  },
};
```

## 注册

```typescript
export function apply(ctx: Context) {
  const dispose = ctx.yesimbot.messenger.use(translator);
  ctx.on("dispose", dispose);
}
```

一个 `platform` 只能注册一个 Translator。注册 `"*"` 作为 fallback，匹配所有未精确注册的平台。

## 媒体持久化

Translator 通过 `resources.assets`（AssetStore）持久化媒体：

```typescript
const id = await resources.assets.put(bytes);
```

返回的 `img` 元素携带 `asset://<id>` URI，模型投影和发送解析都使用本地资源。

## 默认透传

没有注册精确或 `*` Translator 时，`message-created` 且 message ID 非空的消息走内置默认透传。自定义事件和复杂媒体仍需显式 Translator。

## 事件转换示例

OneBot 内置 Translator 把 `notice.poke` 转为事件记录：

```typescript
// 简化示意
return {
  ...base,
  type: "event",
  eventType: "notice.poke",
  text: "A 拍了拍 B",
};
```
