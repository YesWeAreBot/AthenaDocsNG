# MCP 客户端

包名：`koishi-plugin-yesimbot-mcp-client`

连接 MCP 服务器并把服务器工具注册为 Agent 工具。工具名会加服务器名前缀：

```text
<server-name>-<tool-name>
```

## 配置

```yaml
yesimbot-mcp-client:
  mcpServers:
    filesystem:
      type: stdio
      command: npx
      args:
        - -y
        - @modelcontextprotocol/server-filesystem
    remote:
      type: http
      url: https://example.com/mcp
```

支持 `stdio`、`http`、`sse` 三种 transport。

## 媒体处理

MCP 返回的图片会写入频道 ArtifactStore，并转换成 `artifact://` 引用。MCP 输出会被限制长度，防止工具结果无限膨胀。
