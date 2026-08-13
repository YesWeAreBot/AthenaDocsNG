# 工作区插件

包名：`koishi-plugin-yesimbot-workspace`

## 这个插件解决什么问题

默认情况下，机器人只能聊天，不能碰文件。安装工作区插件后，你可以给机器人一个“工作目录”，让它：

- 读取指定文件夹里的文件；
- 生成和修改文件；
- 在隔离环境里运行命令；
- 加载你准备的技能文件。

这适合处理文件、写代码、生成图表，或者把一些重复任务交给机器人。

## 安装和启用

当前 v4 未上架插件市场；通过 Launcher 接入源码后，在 Koishi 插件列表启用 `koishi-plugin-yesimbot-workspace`。

## 基本配置

```yaml-config
yesimbot-workspace:
  bash:
    mode: sandbox         # 沙箱模式，不会直接操作宿主机
    cwd: /home/workspace  # 机器人在沙箱里的默认目录
    timeoutMs: 30000      # 单条命令最多运行 30 秒
    enableNetwork: false  # 是否允许沙箱联网
    enablePython: false   # 是否允许运行 Python
    enableJavascript: false # 是否允许运行 JavaScript
    mounts:
      - source: ./data   # 本机目录
        target: /data    # 沙箱里的路径
        mode: ro         # ro=只读，rw=可读写
  skillPaths:
    - ./skills           # 技能文件目录
```

简单理解：

- `cwd`：机器人在沙箱里的默认目录。
- `timeoutMs`：单条命令最多运行多久。
- `enableNetwork`：是否允许沙箱联网，默认关闭。
- `mounts`：把你本机目录挂载进沙箱，`ro` 是只读，`rw` 是可读写。
- `skillPaths`：你准备好的技能文件夹位置。

## Host 模式

如果你想让机器人直接操作宿主机，可以使用 Host 模式。它会受到更严格的频道白名单和目录白名单限制，高风险操作需要管理员审批。这个模式只推荐给有经验的用户。

## 常见用法

安装并配置后，你可以让机器人做类似这样的事：

```text
读取工作区里的 notes.md，总结一下
运行一个 Python 脚本，把结果整理成表格
生成一张图表并发送到群里
```

机器人能否做到，取决于沙箱里启用了哪些能力，以及你挂载了哪些目录。
