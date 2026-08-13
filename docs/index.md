# YesImBot 官方文档

<div class="home-hero">

<h2 class="home-hero-title">让 AI 成为群聊中一个合适的存在</h2>

<p>YesImBot 的目标不是更快地回复，而是更合适地存在。它像群聊里的真实参与者：知道什么时候说话，也知道什么时候保持沉默；有自己的看法，也允许经历改变它。</p>

</div>

## 在解决什么问题

传统聊天机器人把每条消息当成一次"请求"：收到问题、调用模型、返回答案。这在客服和问答中有效，在群聊中不自然。

群聊是一个持续发生的场：

- 有人在聊天，但不一定对机器人说；
- 话题会分叉、升温、冷却；
- 机器人过去说过什么、和谁熟悉，影响下一次开口；
- 沉默本身也是完整的选择。

YesImBot 让 AI 不再只是"会回答的工具"，而是能理解自己身处什么场景、何时加入、何时退后的参与者。

## 核心特征

<div class="pillar-grid">

<div class="pillar-card">
<strong>稳定人设</strong>
<p>每次对话都带着同一个身份，不会每次从头认识世界。</p>
</div>

<div class="pillar-card">
<strong>允许改变</strong>
<p>可以形成看法，也允许经历改变它。</p>
</div>

<div class="pillar-card">
<strong>沉默是选择</strong>
<p>不为礼貌对每句话都回应。不说话也是完整选择。</p>
</div>

<div class="pillar-card">
<strong>记得关系</strong>
<p>记住共同经历和偏好，不只是归档聊天日志。</p>
</div>

<div class="pillar-card">
<strong>工具服务于判断</strong>
<p>能行动，但行动不替代判断。</p>
</div>

<div class="pillar-card">
<strong>合适地存在</strong>
<p>知道什么时候加入对话，什么时候退后观察。</p>
</div>

</div>

## 具体能力

### 自然参与群聊

默认配置只处理私聊和 @。想让机器人像群友一样参与群聊，安装 Will 策略插件并使用 `willingness` 引擎。机器人根据关键词、引用、图片和意愿值判断是否加入，而不是每条都回。

### 持续的人格与记忆

人格写在 `PERSONA.md` 和角色卡里。关系与经历通过 MemOS 或全局脑插件长期保存，也可跨频道共享。

### 行动能力

工作区、搜索、MCP 等插件让机器人不只聊天，还可以读取文件、运行命令、联网查资料、调用外部工具，并把结果带回对话。

### 适配真实平台

运行在 Koishi 上，内置 OneBot 接入，也支持其他平台。平台差异由接入层处理，机器人不需为每种消息格式重写人格。

## 快速开始

<ol class="steps-list">
<li>安装 Launcher 并运行 <code>yesimbot-cli init</code> 接入 v4。</li>
<li>在 Koishi 控制台启用一个模型服务插件，并填写 API Key。</li>
<li>在配置里选择聊天模型，并添加允许响应的频道。</li>
</ol>

详细步骤见[快速开始](getting-started/quick-start.md)。

!!! warning "尚未上架"
    目前 v4 还未发布到 npm，也未上架 Koishi 插件市场；请使用 Launcher 或源码方式安装。

## 使用前先理解

- 机器人不是有问必答的客服，默认不处理群聊普通消息。
- 想自然参与群聊，使用 Will 策略插件和 `willingness` 引擎。
- 长期记忆不默认开启，需安装 MemOS 或全局脑插件。
- 修改模型、插件或主要配置后，通常需重启 Koishi。

## 项目信息

- 当前文档面向 `dev` 分支的 v4 架构。
- 代码仓库：[YesWeAreBot/YesImBot](https://github.com/YesWeAreBot/YesImBot)
- 文档仓库：[YesWeAreBot/AthenaDocsNG](https://github.com/YesWeAreBot/AthenaDocsNG)
- 许可证：MIT
