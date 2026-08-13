# 搜索服务

包名：`koishi-plugin-yesimbot-search-service`

## 这个插件解决什么问题

让机器人能联网搜索。没有搜索插件时，机器人只能依靠模型训练时学到的知识，无法回答“刚刚发生的事”或“某个网页现在的内容”。

## 安装和配置

当前 v4 未上架插件市场；通过 Launcher 接入源码后，在 Koishi 插件列表启用 `koishi-plugin-yesimbot-search-service`。

它支持两种搜索后端：

### Tavily

```yaml-config
yesimbot-search-service:
  provider: tavily   # 搜索后端
  tavily:
    apiKey: tvly-xxx   # Tavily API Key
    searchDepth: basic # basic 更快，advanced 更详细
```

### SearXNG

```yaml-config
yesimbot-search-service:
  provider: searxng   # 自建 SearXNG
  searxng:
    endpoint: http://127.0.0.1:8888  # SearXNG 实例地址
    engines:
      - google
      - bing
```

## 常见用法

配置完成后，你可以让机器人：

```text
帮我搜一下今天有什么新闻
查一下这个库的最新版本
打开这个网页，总结主要内容
```

如果后端支持抓取网页，机器人还会获得 `web_scrape` 能力，用来读取页面内容。
