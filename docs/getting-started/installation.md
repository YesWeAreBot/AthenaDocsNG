# 安装指南

这个页面讲怎样把 YesImBot 安装到 Koishi 里。第一次使用的话，推荐从[快速开始](quick-start.md)开始；如果你已经知道自己在做什么，可以按这里的方式安装。

## 需要准备什么

- Node.js 18 或更高版本。
- Git（Launcher 接入源码时需要）。
- 数据库：Launcher 创建的 Koishi App 自带 SQLite，默认无需单独安装；如需 MySQL/PostgreSQL，在 Koishi App 中配置即可。
- 一个能访问模型 API 的网络环境。
- 可选：一个已有 Koishi App；没有的话 Launcher 会创建新的。

## 当前 v4 安装状态

!!! warning "尚未发布到 npm / 插件市场"
    目前 v4 还没有上架 npm，也没有进入 Koishi 插件市场。请不要使用 `yarn add koishi-plugin-yesimbot` 或在插件市场搜索安装；这些方式现在拿不到 v4。

## 方式一：使用 Launcher 安装（推荐）

YesImBot Launcher 会从 GitHub Release 安装 `yesimbot-cli`，然后由 `yesimbot-cli init` 创建或接入 Koishi App，并从 GitHub `dev` 分支拉取 YesImBot 源码、构建并写入 workspace 配置。

```bash
# Linux / WSL / macOS
curl -fsSL https://raw.githubusercontent.com/YesWeAreBot/launcher/main/install.sh | sh
yesimbot-cli init          # 结束后按提示选择是否立即启动
# 以后需要再次启动时：
yesimbot-cli start --daemon
```

```powershell
# Windows PowerShell
irm https://raw.githubusercontent.com/YesWeAreBot/launcher/main/install.ps1 | iex
yesimbot-cli init          # 结束后按提示选择是否立即启动
# 以后需要再次启动时：
yesimbot-cli start --daemon
```

`init` 默认创建 `./yesimbot-app`；传入目录可以创建到指定位置，也可以接入已有 Koishi App。安装完成后，Koishi 控制台里会包含 `yesimbot`、模型服务插件和功能插件，按需启用即可。

## 方式二：手动接入当前 dev 源码

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

接入源码后，YesImBot 的功能插件可以按需启用，例如：

- 联网搜索
- 文件和工作区操作
- 长期记忆
- 定时提醒
- 贴纸管理
- OneBot 群管理工具

当前 v4 功能插件没有上架插件市场，不需要逐个执行 `yarn add`。通过 Launcher 接入源码后，直接在 Koishi 控制台的插件列表里启用对应插件，然后在插件配置页填写设置。

完整列表见[插件总览](../plugins/index.md)。
