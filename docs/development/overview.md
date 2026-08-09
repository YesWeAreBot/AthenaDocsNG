# 开发总览

YesImBot 是 Yarn 4 monorepo：

```text
core/                    koishi-plugin-yesimbot（Koishi 集成层）
packages/agent-runtime/  @yesimbot/agent-runtime（框架无关的 Agent 核心）
plugins/*                可选 Koishi 插件
providers/*              模型 Provider 插件
```

## 核心边界

- `core/` 负责 Koishi 集成、模型注册、Messenger（消息收发）、Channels（频道存储）、RuntimeManager 与 ChannelRuntime。
- `packages/agent-runtime/` 是框架无关的 Agent 核心：turn 队列、工具执行、插件 hook。
- `plugins/*` 通过 `ctx.yesimbot.agent.use()` 注册 ChannelPlugin。
- `providers/*` 通过 `ctx.yesimbot.model.register()` 注册模型。

## 公开 API 入口

安装 YesImBot 后，`ctx.yesimbot` 暴露四个子对象：

| 入口 | 用途 |
| --- | --- |
| `ctx.yesimbot.model` | 模型注册与解析 |
| `ctx.yesimbot.messenger` | Translator 注册、主动投递消息 |
| `ctx.yesimbot.agent` | ChannelPlugin 注册、WillPlugin 注册 |
| `ctx.yesimbot.resource` | ResourceReader 注册、频道资源获取 |

## 常用验证

```bash
yarn install
yarn lint
yarn check-types
yarn build
yarn test
```

包级验证：

```bash
npx tsc --noEmit -p packages/agent-runtime/tsconfig.json
npx vitest run packages/agent-runtime
npx vitest run core/tests/gateway.test.ts
```

## 文档维护

- 用户文档写当前已实现的能力，不写推测中的路线。
- 架构变化同步更新 `docs/athena-v4-vision-and-evolution-notes.md` 和本站 `docs/` 下的页面。
- 多版本发布见[多版本文档发布](versioning.md)。
