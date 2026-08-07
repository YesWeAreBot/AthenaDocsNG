# 资源 Scheme 开发

Core 通过 `read` 工具和 `ResourceReader` 统一读取频道资源。插件可以注册自定义 scheme。

## 注册

```typescript
const dispose = ctx.yesimbot.registerResourceScheme(
  "myfile",
  "myfile:///<name> 是自定义资源 URI。",
  async (scope, uri, options) => {
    // 校验路径后读取字节
    return { bytes, mediaType: "text/plain", filename: "example.txt" };
  },
);
```

`asset` 与 `artifact` 是保留 scheme，不能重复注册。

## 模型输入投影

只有 `<img>` 和 `<file>` 的 `src` 支持资源 URI。模型输入插件会把已持久化资源转成文本占位符，再按 `imageInput` 预算把图片投递给视觉模型。

## 安全要求

- 解析 scheme 时必须验证路径不能逃逸 root。
- 使用 `realpath` 后再次校验包含关系。
- 遵守 `maxBytes` / `signal` 限制。
