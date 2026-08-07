# 会话与记忆

这个页面讲机器人怎么记住东西。

## 先区分两件事

YesImBot 把“记忆”分成两层：

1. **会话记录**：机器人当前频道里发生过什么，用来维持对话上下文。
2. **长期记忆**：机器人真正记住的事实、偏好和经历，由 MemOS 或全局脑等插件提供。

默认情况下，YesImBot 有第一层，没有第二层。想要长期记忆，需要另外安装插件。

## 会话记录存在哪里

每个频道有自己的数据目录，里面保存：

- 频道信息；
- 当前会话消息；
- 收到的图片等资源；
- 工具生成的文件；
- 工作区文件。

这些数据保存在本地，不会因为平台接口失效而丢失。

## 对话太长怎么办

模型能处理的消息长度有限。会话很长时，系统会自动压缩较早的内容，把关键信息保留下来。

相关配置：

```yaml
session:
  compact:
    threshold: 0.9
    charTokenRatio: 1.8
    minMessages: 20
    maxFailures: 3
    model: openai:gpt-4o
  idle:
    timeout: 7200000
```

也可以手动执行：

```text
yesimbot.session.compact
yesimbot.session.archive
yesimbot.session.status
```

## 人设文件

机器人的人设保存在两个文件里：

- `PERSONA.md`：机器人是谁、怎么表达。
- `AGENTS.md`：给机器人的额外任务说明。

首次启动会自动创建。直接编辑这些文件，就能调整机器人的人格和行为。

如何拆分 `PERSONA.md` 与 `AGENTS.md`、如何写少样本和工具链，见[拟人发言模板](../best-practices/prompt-engineering.md)。

## 长期记忆

- [MemOS](../plugins/memos.md)：云端长期记忆。
- [全局脑](../plugins/global-brain.md)：跨频道共享经验。

这些插件不会自动保存所有聊天记录，而是保存“值得记住”的信息。
