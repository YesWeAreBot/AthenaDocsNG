# 工作区插件

包名：`koishi-plugin-yesimbot-workspace`

提供虚拟文件系统、Bash 沙箱和 Skill 加载能力。它把每个频道的 `workspace/` 暴露给 Agent，并把 `skillPaths` 下的技能挂载到沙箱。

## Sandbox 模式

```yaml
plugins:
  group:yesimbot:
    yesimbot-workspace:
      bash:
        mode: sandbox
        cwd: /home/workspace
        timeoutMs: 30000
        enableNetwork: false
        enablePython: false
        enableJavascript: false
        mounts:
          - source: ./data
            target: /data
            mode: ro
      skillPaths:
        - ./skills
```

`mounts` 支持 `rw`、`ro`、`overlay`。`/skills/<skill-name>` 是保留挂载点。

## Host 模式

Host 模式只在类 Unix 环境可用，需要显式 `allowedChannels`、`hostRoots` 和 `identity.uid/gid`。高风险调用会生成审批请求：

- `yesimbot.workspace.approvals`
- `yesimbot.workspace.approve <requestId>`
- `yesimbot.workspace.reject <requestId>`

这些命令要求 authority ≥ 5。

## 资源 Scheme

- `workspace:///relative/path`：频道工作区文件。
- `skill://<skill-name>/<relative-path>`：技能文件。

沙箱内部操作应使用 `/home/workspace/...` 路径，`bash` 不接受 `workspace://` 形式。
