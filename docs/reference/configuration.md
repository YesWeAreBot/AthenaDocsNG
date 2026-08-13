# 配置参考

这个页面是完整字段速查表，适合需要精确配置的用户。第一次使用建议先读[快速开始](../getting-started/quick-start.md)和[基础配置](../getting-started/configuration.md)。

本页对应当前 `dev` 分支的 `koishi-plugin-yesimbot` Config Schema。

## 根配置

```yaml-config
yesimbot:
  basePath: data/yesimbot
  chatModel: openai:gpt-4o
  visionModel: ""
  logLevel: 2
  allowedChannels: []
  imageInput: false
  resourceReadTimeoutMs: 30000
  will:
    engine: routing
    direct: trigger
    mention: trigger
    group: wait
  reply:
    pacing:
      charactersPerSecond: 8
      maxTotalDelayMs: 60000
    customInnerThought: false
  session:
    compact:
      threshold: 0.9
      charTokenRatio: 1.8
      minMessages: 20
      maxFailures: 3
      model: ""
    idle:
      timeout: 7200000
```

## 字段说明

| 键 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `basePath` | string | `data/yesimbot` | 频道存储、models.json、PERSONA.md 的根目录 |
| `chatModel` | string | 必填 | 聊天模型完整 ID 或 `models.json` alias |
| `visionModel` | string | 空 | `describe_image` 使用的识图模型 |
| `logLevel` | 0-3 | `2` | None / Error / Info / Debug |
| `allowedChannels` | array | `[]` | 外部 Session 白名单，默认拒绝 |
| `imageInput` | false \| object | `false` | 图片输入开关与预算 |
| `resourceReadTimeoutMs` | number | `30000` | 资源读取超时（毫秒） |
| `will` | object | routing | 消息触发策略 |
| `reply.pacing` | object | `8/60000` | 被动回复打字节奏 |
| `reply.customInnerThought` | boolean | `false` | 启用 `<inner_thought>` 协议 |
| `session.compact` | object | 见下 | 上下文压缩策略 |
| `session.idle.timeout` | number | `7200000` | 空闲压缩触发时长（毫秒），0 禁用 |

## allowedChannels

```yaml-config
allowedChannels:
  - platform: onebot
    channelId: "123456"
  - platform: discord
    channelId: "dm-123"
    isDirect: true
  - platform: "*"
    channelId: "*"
```

规则按 OR 合并。省略 `isDirect` 表示同时匹配私聊和群聊。

## imageInput

```yaml-config
imageInput:
  maxCount: 3
  maxBytesPerImage: 5242880
  maxTotalBytes: 10485760
```

模型是否支持图片仍由 `models.json` 声明。

## will

### routing

```yaml-config
will:
  engine: routing
  direct: trigger
  mention: trigger
  group: wait
```

### willingness

```yaml-config
will:
  engine: willingness
  probabilityThreshold: 55
  decayHalfLifeSeconds: 600
  replyCost: 35
```

## session.compact

| 键 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `threshold` | number | `0.9` | 触发压缩的 token 占比 |
| `charTokenRatio` | number | `1.8` | 字符与 token 估算比例 |
| `minMessages` | number | `20` | 最少消息数 |
| `maxFailures` | number | `3` | 连续失败上限 |
| `model` | string | 空 | 压缩模型，空则使用 `chatModel` |

## models.json

```json
{
  "defaults": {
    "chat": "openai:gpt-4o",
    "embedding": "openai:text-embedding-3-small"
  },
  "aliases": {
    "main": "openai:gpt-4o"
  },
  "chat": {
    "openai:gpt-4o": {
      "name": "GPT-4o",
      "toolCall": true,
      "reasoning": true,
      "hidden": false,
      "limit": {
        "context": 128000,
        "output": 16384
      },
      "modalities": {
        "input": ["text", "image"],
        "output": ["text"]
      }
    }
  },
  "embedding": {
    "openai:text-embedding-3-small": {
      "hidden": false
    }
  }
}
```

未知模型覆盖项会被忽略并记录 warning。
