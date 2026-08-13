from __future__ import annotations

import re

_FENCE = re.compile(r"^```yaml-config\s*$(.*?)^```\s*$", re.MULTILINE | re.DOTALL)


def on_page_markdown(markdown: str, **kwargs: object) -> str:
    return _FENCE.sub(
        lambda match: '<div class="config-preview" markdown="1">\n\n```yaml\n' + match.group(1) + "\n```\n\n</div>",
        markdown,
    )
