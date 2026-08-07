# 搜索服务

包名：`koishi-plugin-yesimbot-search-service`

提供 Web 搜索与网页抓取工具。

## Tavily

```yaml
yesimbot-search-service:
  provider: tavily
  tavily:
    apiKey: tvly-xxx
    searchDepth: basic
```

## SearXNG

```yaml
yesimbot-search-service:
  provider: searxng
  searxng:
    endpoint: http://127.0.0.1:8888
    engines:
      - google
      - bing
```

常用选项：

- `defaultLimit` / `maxLimit`
- `timeoutMs`
- `blacklist`

插件会注册 `web_search`，支持抓取的 backend 还会注册 `web_scrape`。
