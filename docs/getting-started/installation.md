# 安装指南

这个页面讲怎样把 YesImBot 安装到 Koishi 里。第一次使用的话，推荐从[快速开始](quick-start.md)开始；如果你已经知道自己在做什么，可以按这里的方式安装。

## 需要准备什么

- 一个已经能运行的 Koishi 实例，版本 4.18 或更高。
- Node.js 18 或更高版本。
- Koishi 数据库服务，例如 SQLite、MySQL 或 PostgreSQL。
- 一个能访问模型 API 的网络环境。

## 方式一：在插件市场安装（推荐）

1. 打开 Koishi 控制台。
2. 进入“插件市场”。
3. 搜索 `yesimbot`。
4. 安装 `koishi-plugin-yesimbot`。
5. 按需安装模型服务插件和功能插件。

这个方式不需要接触命令行，适合大多数用户。

## 方式二：命令行安装

如果你已经熟悉 Koishi 项目，可以在项目目录运行：

```bash
yarn add koishi-plugin-yesimbot
yarn add @yesimbot/koishi-plugin-provider-openai
```

然后在 `koishi.yml` 或 Koishi 控制台里启用插件。

## 方式三：接入当前 dev 源码

这个方式只推荐给开发者或想要提前体验最新代码的人。普通用户不需要这样做。

```bash
git clone https://github.com/YesWeAreBot/YesImBot.git
cd YesImBot
git checkout dev
yarn install
node scripts/setup-koishi.mjs --create-app ../my-koishi
```

脚本会创建 Koishi 应用、构建插件并写入 workspace 配置。之后从 YesImBot 仓库启动：

```bash
yarn koishi:start
```

!!! warning "dev 分支"
    `dev` 是开发分支，配置和功能可能随时变化。本版本文档以当前 `dev` 代码为准。

## 安装功能插件

YesImBot 的功能插件可以按需安装，例如：

- 联网搜索
- 文件和工作区操作
- 长期记忆
- 定时提醒
- 贴纸管理
- OneBot 群管理工具

安装方式和其他 Koishi 插件一样：在插件市场搜索、安装，然后在插件配置页打开开关。不需要写代码。

完整列表见[插件总览](../plugins/index.md)。
