# 开发总览

YesImBot 是 Yarn 4 monorepo：

```text
core/                    koishi-plugin-yesimbot
packages/agent-runtime/  @yesimbot/agent-runtime
plugins/*                可选 Koishi 插件
providers/*              模型 Provider 插件
```

## 核心边界

- `core/` 负责 Koishi 集成、模型注册、Gateway、频道存储、RuntimeManager 与 ChannelRuntime。
- `packages/agent-runtime/` 是框架无关的 Agent 核心。
- `plugins/*` 通过 `registerChannelPlugin()` 注册 AgentPlugin。
- `providers/*` 通过 `ctx.yesimbot.model.register()` 注册模型。

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

- 用户文档先写当前能力，不写推测中的路线。
- 架构变化同步更新 `docs/athena-v4-vision-and-evolution-notes.md` 和本站在 `docs/` 下的页面。
- 多版本发布见[多版本文档发布](versioning.md)。
