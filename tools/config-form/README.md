# Config Form Widget

把文档里的 YAML 配置块渲染成 Koishi 插件配置同款静态表单。

使用方式：

```md
```yaml-config
yesimbot:
  logLevel: 2
```
```

构建静态产物：

```bash
yarn install
yarn build
```

产物会输出到 `docs/assets/config-form/`，MkDocs 会自动加载 `config-form.js` 和 `config-form.css`。
