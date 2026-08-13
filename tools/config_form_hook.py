from __future__ import annotations

import re

_FENCE = re.compile(r"^```yaml-config\s*$(.*?)^```\s*$", re.MULTILINE | re.DOTALL)


def on_page_markdown(markdown: str, **kwargs: object) -> str:
    return _FENCE.sub(
        lambda match: (
            '<div class="config-preview">'
            '<div class="config-preview-tabs" role="tablist">'
            '<button class="config-preview-tab" data-panel="yaml" type="button">YAML</button>'
            '<button class="config-preview-tab active" data-panel="form" type="button">表单预览</button>'
            "</div>"
            '<div class="config-preview-panel" data-panel="yaml" hidden>'
            '<div markdown="1">\n\n```yaml\n'
            + match.group(1)
            + "\n```\n\n</div>"
            "</div>"
            '<div class="config-preview-panel" data-panel="form"></div>'
            "</div>"
        ),
        markdown,
    )
