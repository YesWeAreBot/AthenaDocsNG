# MCP 客户端

包名：`koishi-plugin-yesimbot-mcp-client`

## 这个插件解决什么问题

MCP 是一种连接外部工具服务的协议。安装 MCP 客户端后，机器人可以调用别人已经写好的工具服务，而不需要每个工具都做成一个 Koishi 插件。

## 举个例子

假设你有一个“天气查询服务”。把它配置成 MCP 服务器后，机器人就能调用“查天气”这个工具，而不需要你写代码。

## 安装和配置

当前 v4 未上架插件市场；通过 Launcher 接入源码后，在 Koishi 插件列表启用 `koishi-plugin-yesimbot-mcp-client`，然后在配置里添加服务器：

```yaml-config
yesimbot-mcp-client:
  mcpServers:
    filesystem:
      type: stdio        # 通过本地命令启动
      command: npx       # 要运行的命令
      args:
        - -y
        - @modelcontextprotocol/server-filesystem
    remote:
      type: http         # 通过 HTTP 连接
      url: https://example.com/mcp  # 服务地址
```

连接方式有三种：

- `stdio`：启动一个本地命令作为服务。
- `http`：连接远程 HTTP 服务。
- `sse`：连接远程 SSE 服务。

## 工具名

来自服务器的工具会加上服务器名前缀，避免不同服务器之间冲突。例如服务器叫 `filesystem`，里面的工具可能叫 `filesystem-read_file`。

## 注意事项

MCP 返回的图片会被保存为本地资源，避免把大段数据直接塞进模型。返回内容也有长度限制，防止机器人一次处理过多数据。
