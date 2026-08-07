# 多版本文档发布

本站使用 [Mike](https://github.com/jimporter/mike) 支持多版本文档。Material for MkDocs 通过 `extra.version.provider: mike` 渲染版本下拉框。

## 本地发布

```bash
python -m pip install -r requirements.txt
mike deploy v4 latest
mike set-default latest
mike serve
```

旧 v3 文档可以从历史 commit 发布：

```bash
# 在 AthenaDocsNG 仓库中，为当前 v4 改版前的提交打 tag
git tag v3 <commit>

# 从该 tag 检出旧文档后发布
mike deploy v3
```

## 版本命名

- 建议使用 `v4`、`v3` 等稳定版本名。
- 用 `latest` 作为默认别名。
- 发布新版本后再执行 `mike set-default latest`。

## 自动化

可以在 GitHub Actions 中按 tag 或 main push 执行：

```yaml
- run: pip install -r requirements.txt
- run: mike deploy --push v4 latest
```

发布目标通常是 `gh-pages` 分支。首次部署时需在 GitHub Pages 中选择该分支。
