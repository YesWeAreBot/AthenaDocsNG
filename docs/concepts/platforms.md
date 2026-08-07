# 平台接入

平台差异由 `PlatformTranslator` 处理。Translator 通过 `ctx.yesimbot.registerTranslator()` 注册。

## 接口

```typescript
interface PlatformTranslator {
  platform: string;
  translate(
    base: RecordBase,
    session: Session,
    store: AssetStore,
  ): Promise<MessageRecord | EventRecord | null>;
}
```

Translator 接收 live Session 和频道 `AssetStore`，返回最终 Message/Event record。返回 `null` 表示忽略该 Session。

## 默认透传

如果没有精确或显式 `*` Translator，`message-created` 且 message ID 非空的 Session 会走默认透传。默认透传会调用 `persistElements` 持久化媒体，但不理解平台专属自定义事件。

## 内置 OneBot

OneBot Translator 内置于 `koishi-plugin-yesimbot`：

- 持久化 `img` 元素到频道 AssetStore；
- 保留其他 Element 的结构；
- 把 OneBot `notice.poke` 转换为 `notice.poke` EventRecord。

## Translator 的责任

- 决定平台输入如何变成 Canonical Message/Event；
- 下载并持久化媒体字节；
- 处理平台专属事件；
- 不负责回复发送、频道存储或模型调用。

Gateway 持有 live Session，并在 Translator 返回后负责被动回复。
