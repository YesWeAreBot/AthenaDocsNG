# 会话与记忆

v4 的“记忆”被明确拆成两部分：

- 频道会话：Core 保存可重放的 JSONL 消息记录。
- 长期记忆：由 MemOS、全局脑等插件按需提供。

## 频道存储

每个频道在 `basePath/channels/` 下有自己的目录，包含：

```text
channel.json
sessions/
assets/
artifacts/
workspace/
```

- `channel.json` 是权威 Manifest。
- `sessions/` 保存当前会话 JSONL。
- `assets/` 保存入站媒体字节。
- `artifacts/` 保存工具生成的不可变工件。
- `workspace/` 由工作区插件使用。

## 会话压缩与归档

`session.compact` 控制上下文压缩：

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

压缩不会删除原始 JSONL，而是追加 `compact` 条目。`yesimbot.session.archive` 可以把当前会话归档为独立会话文件。

## PERSONA.md 与 AGENTS.md

Runtime 的系统提示词由固定顺序组成：

1. Core Constitution
2. `<persona>`：用户 `PERSONA.md` 或内置默认人格
3. 可选 `<agents>`：用户 `AGENTS.md`
4. `<runtime_context>`：ChannelScope 与 Bot selfId

文件位于 `basePath`。首次启动会自动创建 `PERSONA.md` 和空的 `AGENTS.md`。

!!! warning "不要混淆"
    Runtime 的 `AGENTS.md` / `PERSONA.md` 是给模型的人格和任务说明，不是仓库维护者开发指南。

## 会话命令

- `yesimbot.session.compact`：手动压缩。
- `yesimbot.session.archive`：归档当前会话。
- `yesimbot.session.clear`：清空会话与资源。
- `yesimbot.session.status`：查看活动会话和压缩状态。
- `yesimbot.session.list`：列出会话文件。
