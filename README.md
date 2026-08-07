# AthenaDocsNG

Athena / YesImBot ([YesImBot](https://github.com/YesWeAreBot/YesImBot)) v4 的官方文档站。

本仓库基于 MkDocs Material，支持通过 Mike 发布多版本文档。

## 本地预览

```bash
python -m venv .venv
.venv/Scripts/activate
pip install -r requirements.txt
mkdocs serve
```

## 构建

```bash
mkdocs build
```

## 多版本发布

```bash
mike deploy v4 latest
mike set-default latest
mike serve
```

旧 v3 文档可从 v4 改版前的历史 commit 发布：

```bash
git tag v3 <commit>
git checkout v3
mike deploy v3
```

详见 [docs/development/versioning.md](docs/development/versioning.md)。
