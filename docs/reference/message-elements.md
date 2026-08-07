# 消息元素

这个页面解释机器人输出消息时使用的元素语法。普通用户不一定需要读；如果你发现机器人发消息的格式不对，再回来对照。

Agent 的输出使用类似 HTML 的元素语法，Core 会解析为平台消息。每条消息前有观察头，它只用于模型上下文，不是消息内容。

## 常用元素

| 元素 | 用途 |
| --- | --- |
| `<at id="用户ID"/>` | 提及用户 |
| `<at type="all"/>` | 提及全体 |
| `<at type="here"/>` | 提及在线成员 |
| `<quote id="消息ID"/>` | 引用消息 |
| `<img src="..."/>` | 图片，支持频道资源 URI |
| `<file src="..."/>` | 文件，支持频道资源 URI |
| `<audio src="..."/>` | 语音，不解析资源 URI |
| `<video src="..."/>` | 视频，不解析资源 URI |
| `<text>…</text>` | 逐字交付，不解析元素 |
| `<message/>` | 消息边界 |
| `<inner_thought>…</inner_thought>` | 内部思考，发送前剥离 |

## 消息边界

```text
hello<message/>world
```

等价于：

```text
<message>hello</message><message>world</message>
```

没有子元素的 `<message/>` 不会被发送。

## 转义

文字包含 `<` 或 `>` 时必须转义，否则会被当作元素解析并吞掉内容。

| 原始字符 | 转义写法 |
| --- | --- |
| `"` | `&quot;` |
| `&` | `&amp;` |
| `<` | `&lt;` |
| `>` | `&gt;` |

需要原样呈现大段含尖括号的内容时，用 `<text>…</text>` 包裹。

## 资源解析

只有 `<img>` 和 `<file>` 的 `src` 支持：

```text
asset://...
artifact://...
workspace:///...
skill://...
```

解析失败时该元素会被整条丢掉，消息其余部分照常发出。

## 内部思考

`<inner_thought>` 会保留在 Agent 自己的历史里，但会被从对外内容中剥离，不会到达平台。启用开关：

```yaml
reply:
  customInnerThought: true
```
