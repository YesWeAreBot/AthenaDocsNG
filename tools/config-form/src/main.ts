import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import Markdown from "marked-vue";
import Schema from "schemastery";
import { form } from "schemastery-vue";
import { createApp, defineComponent, h, type PropType } from "vue";
import { createI18n } from "vue-i18n";
import { isMap, isScalar, isSeq, parseDocument } from "yaml";

const ConfigForm = defineComponent({
  name: "ConfigForm",
  props: {
    schema: {
      type: Object as PropType<ReturnType<typeof Schema>>,
      required: true,
    },
    initial: {
      type: Object as PropType<Record<string, unknown>>,
      required: true,
    },
  },
  setup(props) {
    return () =>
      h(form.Form, {
        schema: props.schema,
        initial: props.initial,
        modelValue: props.initial,
        showHeader: false,
      });
  },
});

type SchemaType = ReturnType<typeof Schema>;

function readComment(...nodes: Array<{ comment?: string | null; commentBefore?: string | null } | null | undefined>): string | undefined {
  for (const node of nodes) {
    if (!node) continue;
    const parts = [node.commentBefore, node.comment].filter((part): part is string => Boolean(part?.trim()));
    if (parts.length) {
      return parts.join("\n").replace(/^#\s?/gm, "").trim();
    }
  }
  return undefined;
}

function primitiveSchema(value: unknown): SchemaType {
  if (typeof value === "boolean") {
    return Schema.boolean().default(value);
  }
  if (typeof value === "number") {
    return Schema.number().default(value);
  }
  if (typeof value === "string") {
    return Schema.string().default(value);
  }
  return Schema.any();
}

function buildSchema(node: any, inheritedDescription = ""): SchemaType {
  const description = readComment(node) ?? inheritedDescription;
  if (isMap(node)) {
    const dict: Record<string, SchemaType> = {};
    for (const item of node.items ?? []) {
      const key = String(item.key?.value ?? item.key);
      dict[key] = buildSchema(item.value, readComment(item.key, item.value));
    }
    return Schema.object(dict).description(description);
  }
  if (isSeq(node)) {
    const items = node.items ?? [];
    if (items.length > 0 && isMap(items[0])) {
      return Schema.array(buildSchema(items[0])).description(description).default(node.toJSON() ?? []);
    }
    if (items.length > 0 && isScalar(items[0])) {
      return Schema.array(primitiveSchema(items[0].value)).description(description).default(node.toJSON() ?? []);
    }
    return Schema.array(Schema.any()).description(description).default(node.toJSON() ?? []);
  }
  if (isScalar(node)) {
    return primitiveSchema(node.value).description(description);
  }
  return primitiveSchema(node?.toJSON ? node.toJSON() : node).description(description);
}

function unwrapRoot(node: any): { node: any; initial: unknown } {
  if (isMap(node) && node.items.length === 1) {
    const item = node.items[0];
    if (isMap(item.value)) {
      return { node: item.value, initial: item.value.toJSON() };
    }
  }
  return { node, initial: node?.toJSON ? node.toJSON() : undefined };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function mountConfigForm(block: HTMLElement): void {
  const code = block.querySelector("pre code") as HTMLElement | null;
  const pre = code.closest("pre");
  const highlight = pre?.parentElement;
  if (!code || !pre || !highlight) return;

  const source = code.textContent ?? "";
  let formHtml = "";
  let schema: ReturnType<typeof Schema> | undefined;
  let initial: Record<string, unknown> = {};
  try {
    const document = parseDocument(source);
    if (document.errors.length > 0) {
      throw document.errors[0];
    }
    const unwrapped = unwrapRoot(document.contents);
    initial = (unwrapped.initial ?? {}) as Record<string, unknown>;
    schema = buildSchema(unwrapped.node);
  } catch (error) {
    formHtml = `<div class="config-preview-error">无法解析 YAML：${escapeHtml(String(error))}</div>`;
  }

  const container = document.createElement("div");
  container.className = "config-preview";
  container.innerHTML =
    '<div class="config-preview-tabs" role="tablist">' +
    '<button class="config-preview-tab" data-panel="yaml" type="button">YAML</button>' +
    '<button class="config-preview-tab active" data-panel="form" type="button">表单预览</button>' +
    "</div>" +
    '<div class="config-preview-panel" data-panel="yaml" hidden></div>' +
    `<div class="config-preview-panel" data-panel="form">${formHtml}</div>`;
  container.dataset.configMounted = "true";

  block.replaceWith(container);
  container.querySelector('.config-preview-panel[data-panel="yaml"]')!.appendChild(highlight);

  const tabs = container.querySelectorAll(".config-preview-tab");
  const panels = container.querySelectorAll(".config-preview-panel");
  for (const tab of tabs) {
    tab.addEventListener("click", () => {
      for (const candidate of tabs) {
        candidate.classList.toggle("active", candidate === tab);
      }
      for (const panel of panels) {
        panel.hidden = panel.dataset.panel !== tab.dataset.panel;
      }
    });
  }

  if (!schema) return;
  const mount = document.createElement("div");
  container.querySelector('.config-preview-panel[data-panel="form"]')!.appendChild(mount);
  const app = createApp(ConfigForm, { schema, initial });
  const i18n = createI18n({ legacy: false, locale: "zh-CN", fallbackLocale: "en-US" });
  app.use(ElementPlus);
  app.use(i18n);
  app.use(form);
  app.component("k-markdown", Markdown);
  app.mount(mount);
}

function setupConfigPreview() {
  for (const block of document.querySelectorAll(".config-preview")) {
    if (block.dataset.configMounted === "true") continue;
    mountConfigForm(block as HTMLElement);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupConfigPreview();
  new MutationObserver(() => setupConfigPreview()).observe(document.body, { childList: true, subtree: true });
});
