# AgentPlugin 开发

AgentPlugin 是 v4 主要的扩展方式。插件通过 `ctx.yesimbot.registerChannelPlugin()` 注册 factory，Core 在创建每个频道 Runtime 时调用它。

## 最小示例

```typescript
import { Context, Schema } from "koishi";
import { jsonSchema, type AgentPlugin, type AgentTool } from "@yesimbot/agent-runtime";

export const inject = ["yesimbot"];

export const Config: Schema<{ greeting: string }> = Schema.object({
  greeting: Schema.string().default("你好"),
});

export function apply(ctx: Context, config: { greeting: string }) {
  const tool: AgentTool = {
    name: "say_hello",
    description: "向指定用户发送问候",
    inputSchema: jsonSchema({
      type: "object",
      properties: {
        name: { type: "string" },
      },
      required: ["name"],
    }),
    execute: async ({ name }) => `${config.greeting}, ${name}`,
  };

  ctx.yesimbot.registerChannelPlugin((): AgentPlugin => ({
    name: "my-plugin",
    tools: [tool],
    appendSystemPrompt: () => "你可以使用 say_hello 工具。",
  }));
}
```

## 可用 Hook

| Hook | 作用 |
| --- | --- |
| `tools` | 声明稳定工具 |
| `appendSystemPrompt` | 追加系统提示词块 |
| `extendSystemPrompt` | 修改 legacy system prompt |
| `onAppend` | 消息写入存储前变换 entry |
| `transformEntries` | 读取历史时变换 entry |
| `toModelMessages` | 自定义单条消息到模型消息的投影 |
| `prepareStep` | 每个模型 step 前调整 messages |
| `beforeToolCall` / `afterToolCall` | 工具调用拦截和结果变换 |
| `onTurnFinish` | turn 结束时执行 |
| `init` / `stop` | 插件生命周期 |

插件按 `pre`、normal、`post` 顺序执行。

## 频道存储

受信任插件使用：

```typescript
const root = await ctx.yesimbot.getStoragePath(scope);
```

自行选择 `workspace/` 等子目录。不要假设 Core 暴露频道 identity 或 storage namespace。

## 资源 Scheme

插件可以注册资源 scheme：

```typescript
ctx.yesimbot.registerResourceScheme("myfile", "myfile:// 说明", async (scope, uri, options) => {
  return { bytes, mediaType, filename };
});
```

`asset` 和 `artifact` 是保留 scheme。
