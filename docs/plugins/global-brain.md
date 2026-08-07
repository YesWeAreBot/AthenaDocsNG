# 全局脑

包名：`koishi-plugin-yesimbot-global-brain`

## 这个插件解决什么问题

全局脑让同一个 Bot 在多个群和私聊之间共享知识。某个频道里学到的重要内容，可以保存到全局脑，之后其他频道按需读取。

## 举个例子

机器人在 A 群里学会了“这个项目每周五发版”。之后在 B 群里提到项目计划时，机器人可以结合这条经验来回应。

## 安装和配置

在插件市场安装 `koishi-plugin-yesimbot-global-brain`。基本配置：

```yaml
yesimbot-global-brain:
  shareImmediately: false  # 是否允许主动唤起其他频道
  storageDir: ""           # 留空使用默认目录
  maxDigestThreads: 5      # 每次最多摘要几个新内容
  maxDigestReplies: 5      # 每次最多摘要几个回复线程
  maxDigestContentLength: 80 # 摘要里每条内容最多多少字
```

- `storageDir` 留空时使用默认目录。
- `shareImmediately` 允许插件在写入内容后主动唤起其他频道。

## 注意

全局脑不是“所有聊天记录自动共享”，而是按值得保留的内容写入和读取。机器人会自己判断哪些内容需要进入全局脑。
