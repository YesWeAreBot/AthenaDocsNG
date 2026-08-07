# YesImBot 官方文档

<div class="home-hero">

<h2 class="home-hero-title">让 AI 成为群聊中一个合适的存在</h2>

<p>YesImBot 的目标不是更快地回复，而是更合适地存在。它应该像群聊里的真实参与者：知道什么时候说话，也知道什么时候保持沉默；有自己的看法，也允许经历慢慢改变它。</p>

</div>

## YesImBot 在解决什么问题

传统聊天机器人把每一条消息都当成一次“请求”：收到问题，调用模型，返回答案。这种模式在客服、问答和工作流里很有用，但在群聊里并不自然。

群聊不是一串独立请求，而是一个持续发生的场：

- 有人在聊天，但这句话不一定是对机器人说的；
- 话题会分叉、升温、冷却；
- 机器人过去说过什么、和谁熟悉，都会影响下一次开口；
- 沉默本身也是一种完整的选择。

YesImBot 想解决的就是这个问题：让 AI 不再只是“会回答的工具”，而是能够理解自己身处什么场景、何时加入、何时退后的参与者。

## 它首先是一种人格，而不是一套功能

<div class="pillar-grid">

<div class="pillar-card">
<strong>稳定人设</strong>
<p>每次对话都带着同一个身份，而不是每次从头认识世界。</p>
</div>

<div class="pillar-card">
<strong>允许改变</strong>
<p>可以形成自己的看法，也允许经历慢慢改变它。</p>
</div>

<div class="pillar-card">
<strong>沉默是选择</strong>
<p>不会为了礼貌而对每句话都回应。不说话也是一个完整的选择。</p>
</div>

<div class="pillar-card">
<strong>记得关系</strong>
<p>记住共同经历和偏好，而不是把聊天日志全归档。</p>
</div>

<div class="pillar-card">
<strong>工具服务于判断</strong>
<p>能行动，但行动不会替代判断。</p>
</div>

<div class="pillar-card">
<strong>合适地存在</strong>
<p>知道什么时候加入对话，什么时候退后观察。</p>
</div>

</div>

## 围绕这个目标，它可以做到

### 自然参与群聊

默认配置只处理私聊和 @。如果你希望机器人真正参与群聊，推荐使用 `willingness` 引擎和 Will 策略插件，让它根据关键词、引用、图片和意愿值判断是否加入，而不是机械地每条都回。

### 拥有持续的人格与记忆

人格写在 `PERSONA.md` 和角色卡里。关系与经历可以通过 MemOS 或全局脑插件长期保存，也可以跨频道共享有价值的经验。

### 具备行动能力

工作区、搜索、MCP 等插件让机器人不只是聊天，还可以读取文件、运行命令、联网查资料、调用外部工具，并把结果带回对话。

### 适配真实平台

YesImBot 运行在 Koishi 上，内置 OneBot 接入，也支持其他平台。平台差异由接入层处理，机器人不需要为每一种消息格式重新写一套人格。

## 快速开始

<ol class="steps-list">
<li>在 Koishi 插件市场安装 <code>koishi-plugin-yesimbot</code>。</li>
<li>安装一个模型服务插件，并填写 API Key。</li>
<li>在配置里选择聊天模型，并添加允许响应的频道。</li>
</ol>

更具体的步骤见[快速开始](getting-started/quick-start.md)。

## 使用前先理解

- 机器人不是有问必答的客服，默认不会处理群聊普通消息。
- 想让机器人自然参与群聊，请使用 Will 策略插件和 `willingness` 引擎。
- 长期记忆不是默认开启的，需要安装 MemOS 或全局脑插件。
- 修改模型、插件或主要配置后，通常需要重启 Koishi。

## 项目信息

- 当前文档面向 `dev` 分支实现的 v4 架构。
- 代码仓库：[YesWeAreBot/YesImBot](https://github.com/YesWeAreBot/YesImBot)
- 文档仓库：[YesWeAreBot/AthenaDocsNG](https://github.com/YesWeAreBot/AthenaDocsNG)
- 许可证：MIT
