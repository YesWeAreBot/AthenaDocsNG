# 工具与资源

Agent 的工具来自 Core 和 AgentPlugin。Core 只提供少量与消息、资源和会话生命周期相关的工具，其余能力由插件按需注入。

## Core 工具

| 工具 | 用途 |
| --- | --- |
| `read` | 读取频道资源、artifact 或已注册 scheme，并按图片预算投影图片 |
| `sendMessage` | 向当前频道以外的频道发送消息 |
| `describe_image` | 使用 `visionModel` 描述图片 |
| `finalize` | 在不产生对外文本的情况下结束本轮 |

## 输出元素

模型输出使用类似 HTML 的元素语法，Core 会解析为 Koishi 元素：

```text
<at id="用户ID"/>
<quote id="消息ID"/>
<img src="workspace:///out/chart.png"/>
<file src="asset://..."/>
<message/>
<text>含 < 或 > 的逐字内容</text>
```

- `<message/>` 是消息边界。
- `<text>` 保护逐字内容，不解析为元素。
- `<inner_thought>` 会被剥离，不会到达平台。
- 只有 `<img>` 和 `<file>` 的 `src` 支持频道资源 URI。

## 资源 Scheme

Core 保留：

- `asset://`：入站媒体。
- `artifact://`：工具产生的不可变媒体。

插件可以注册额外 scheme，例如：

- `workspace://`：工作区文件。
- `skill://`：技能文件。

资源读取必须经过 `read` 工具。发送时不能直接引用未经系统生成的 URI。

## 图片预算

```yaml
imageInput:
  maxCount: 3
  maxBytesPerImage: 5242880
  maxTotalBytes: 10485760
```

图片按 history 后 current 的顺序投影，并应用当次调用预算。PlatformTranslator 负责把入站图片下载到 AssetStore。
