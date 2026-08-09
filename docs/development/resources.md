# 资源 Scheme 开发

Core 通过 `read` 工具和 `ResourceReader` 统一读取频道资源。插件可以注册自定义 scheme。

## ResourceReader 接口

```typescript
import type { ChannelResources, ResourceReader, ResourceOpenOptions, ResourceOpenResult } from "koishi-plugin-yesimbot";

const myReader: ResourceReader = {
  scheme: "myfile",
  prompt: "myfile:///<name> 是自定义资源 URI，用于读取插件管理的文件。",
  async setup(resources: ChannelResources, uri: URL, options: ResourceOpenOptions): Promise<ResourceOpenResult> {
    const path = uri.pathname;
    // 校验路径不逃逸 root
    const bytes = await readFileBytes(path, options.signal);
    return { bytes, mediaType: "text/plain", filename: "example.txt" };
  },
};
```

## 注册

```typescript
const dispose = ctx.yesimbot.resource.use(myReader);
ctx.on("dispose", dispose);
```

`asset` 与 `artifact` 是保留 scheme，不能重复注册。

## 模型输入投影

只有 `<img>` 和 `<file>` 的 `src` 支持资源 URI。模型输入插件把已持久化资源转成文本占位符，再按 `imageInput` 预算把图片投递给视觉模型。

## 安全要求

- 解析 scheme 时验证路径不能逃逸 root。
- 使用 `realpath` 后再次校验包含关系。
- 遵守 `options.maxBytes` 和 `options.signal` 限制。
