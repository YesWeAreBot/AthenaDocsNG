# 安装指南

## 环境要求

- Node.js 18 或更高版本
- Koishi 4.18 或更高版本
- Koishi Database 服务，例如 SQLite、MySQL 或 PostgreSQL
- 可访问模型 API 的网络环境

## 方式一：Koishi 插件市场

1. 打开 Koishi 控制台，进入插件市场。
2. 搜索 `yesimbot`。
3. 安装 `koishi-plugin-yesimbot`。
4. 按需安装 Provider 和可选插件。

## 方式二：命令行安装

```bash
yarn add koishi-plugin-yesimbot
yarn add @yesimbot/koishi-plugin-provider-openai
```

然后在 `koishi.yml` 或 Koishi 控制台启用插件。

## 方式三：接入当前 dev 源码

如果你希望直接使用 `dev` 分支代码，可以把 YesImBot monorepo 克隆到本地，并运行：

```bash
git clone https://github.com/YesWeAreBot/YesImBot.git
cd YesImBot
yarn install
node scripts/setup-koishi.mjs --create-app ../my-koishi
```

脚本会创建 Koishi 应用、构建插件、写入 workspace 配置并生成 `group:yesimbot`。之后从 YesImBot 仓库启动：

```bash
yarn koishi:start
```

!!! warning "dev 分支"
    `dev` 是开发分支，配置和 API 可能随重构变化。本版本文档以当前 `dev` 代码为准。

## 启用可选插件

可选插件通过 `ctx.yesimbot.registerChannelPlugin()` 向每个频道的 Runtime 注入 AgentPlugin。安装后按需在 Koishi 控制台启用即可。完整列表见[插件总览](../plugins/index.md)。
