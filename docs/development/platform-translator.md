# PlatformTranslator 开发

Translator 负责把平台 Session 转成 Core 的 Message/Event record。

## 接口

```typescript
import type { AssetStore, PlatformTranslator, RecordBase } from "koishi-plugin-yesimbot";
import type { Session } from "koishi";

const translator: PlatformTranslator = {
  platform: "my-platform",
  async translate(base: RecordBase, session: Session, store: AssetStore) {
    if (session.type !== "message-created") return null;
    return {
      ...base,
      messageId: session.messageId,
      elements: session.elements,
    };
  },
};

export function apply(ctx: Context) {
  ctx.yesimbot.registerTranslator(translator);
}
```

## 媒体持久化

Translator 自己决定是否下载媒体，并把字节写入 `AssetStore`：

```typescript
const id = await store.put(bytes);
```

返回的 `img` 元素会携带 `asset://` ID，模型输入投影和发送解析都会使用本地资源。

## 默认透传

没有注册精确或 `*` Translator 时，`message-created` 且 message ID 非空的消息会走内置默认透传。自定义事件和复杂媒体仍需要显式 Translator。

## 事件

OneBot 内置 Translator 会把 `notice.poke` 转为事件：

```typescript
assembleEvent(base, {
  eventType: "notice.poke",
  targetId: "...",
  action: "拍了拍",
  text: "A 拍了拍 B",
});
```
