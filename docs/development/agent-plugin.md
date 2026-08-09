# AgentPlugin 开发

AgentPlugin 是 v4 的主要扩展方式。插件通过 `ctx.yesimbot.agent.use()` 注册一个 `ChannelPlugin`，Core 在创建每个频道 ChannelRuntime 时调用它的 `setup()` 方法。

## ChannelPlugin 接口

```typescript
import type { AgentPlugin } from "@yesimbot/agent-runtime";
import type { Awaitable, Bot } from "koishi";
import type { ChannelScope } from "koishi-plugin-yesimbot";

interface ChannelPlugin {
  setup(scope: ChannelScope, bot: Bot): Awaitable<AgentPlugin | null>;
}
```

`setup()` 在每个频道 Runtime 初始化时被调用。返回 `AgentPlugin` 实例注入到该频道，返回 `null` 表示此频道不启用此插件。

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
      properties: { name: { type: "string" } },
      required: ["name"],
    }),
    execute: async ({ name }) => `${config.greeting}, ${name}`,
  };

  const dispose = ctx.yesimbot.agent.use({
    setup: (scope, bot) => ({
      name: "my-plugin",
      tools: [tool],
      appendSystemPrompt: () => "你可以使用 say_hello 工具。",
    }),
  });

  ctx.on("dispose", dispose);
}
```

## 可用 Hook

| Hook | 作用 |
| --- | --- |
| `tools` | 声明工具列表 |
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

## 获取频道存储路径

通过 `ctx.yesimbot.resource.get(scope)` 获取频道的 `ChannelResources` 对象：

```typescript
const resources = await ctx.yesimbot.resource.get(scope);
const channelPath = resources.path; // 频道数据目录
```

自行选择 `workspace/` 等子目录存放插件数据。

## Will 插件

除了 ChannelPlugin，还可以注册 WillPlugin 来自定义回复判断逻辑：

```typescript
import type { WillPlugin, WillEngine } from "koishi-plugin-yesimbot";

const willPlugin: WillPlugin = {
  priority: 0,
  match: (session) => session.platform === "onebot",
  setup: (scope): WillEngine => ({
    decide(input, state) {
      return "trigger";
    },
  }),
};

const dispose = ctx.yesimbot.agent.will(willPlugin);
ctx.on("dispose", dispose);
```

Will 插件按 `priority` 升序匹配，第一个 `match()` 返回 `true` 的插件接管该频道的回复判断。

## 资源 Scheme

插件可注册自定义资源 scheme：

```typescript
const dispose = ctx.yesimbot.resource.use({
  scheme: "myfile",
  prompt: "myfile:///<name> 是自定义资源 URI。",
  async setup(resources, uri, options) {
    // 校验路径后读取字节
    return { bytes, mediaType: "text/plain", filename: "example.txt" };
  },
});
ctx.on("dispose", dispose);
```

`asset` 与 `artifact` 是保留 scheme，不能重复注册。
