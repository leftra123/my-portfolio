"use client";

import { ArrowDown, ArrowUp, ChevronDown, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { FieldsEditor, IconButton } from "@/components/admin/fields-editor";
import { SaveBar } from "@/components/admin/save-bar";
import { useEditor } from "@/components/admin/use-editor";
import { saveList } from "@/lib/admin/actions";
import { clean, listConfigs } from "@/lib/admin/fields";
import { cn } from "@/lib/utils";

type Item = Record<string, unknown>;

/** Editor de listas cortas (trayectoria, archivo, certificaciones…): todo en una página, un solo guardado. */
export function ListEditor({ name, initial, readOnly }: { name: string; initial: Item[]; readOnly: boolean }) {
  const config = listConfigs[name]!;
  const editor = useEditor(initial, (items) => saveList(name, items.map((item) => clean(item, config.fields))));
  const [open, setOpen] = useState<number | null>(null);
  const items = editor.value;

  const update = (next: Item[]) => editor.setValue(next);
  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    const next = [...items];
    [next[from], next[to]] = [next[to]!, next[from]!];
    update(next);
    setOpen(open === from ? to : open === to ? from : open);
  };
  const hasError = (index: number) => Object.keys(editor.errors).some((key) => key.startsWith(`${index}.`));

  return (
    <>
      <ol className="grid gap-2">
        {items.map((item, index) => {
          const expanded = open === index || hasError(index);
          const title = String(item[config.titleKey] ?? "") || `Nuevo ${config.itemLabel}`;
          const subtitle = config.subtitleKey ? String(item[config.subtitleKey] ?? "") : "";
          return (
            <li
              key={index}
              className={cn(
                "rounded-2xl border bg-bg-elevated/40 transition-colors",
                hasError(index) ? "border-rose-400/50" : expanded ? "border-line-strong" : "border-line",
              )}
            >
              <div className="flex items-center gap-2 py-2 pr-2 pl-4">
                <button
                  type="button"
                  onClick={() => setOpen(expanded ? null : index)}
                  aria-expanded={expanded}
                  className="flex min-w-0 flex-1 items-center gap-3 py-1 text-left"
                >
                  <span className="font-mono text-[11px] text-fg-subtle tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm text-fg">{title}</span>
                    {subtitle ? <span className="block truncate text-xs text-fg-subtle">{subtitle}</span> : null}
                  </span>
                  <ChevronDown className={cn("ml-auto size-4 shrink-0 text-fg-subtle transition-transform", expanded && "rotate-180")} />
                </button>
                <IconButton label="Subir" onClick={() => move(index, index - 1)} disabled={index === 0}>
                  <ArrowUp className="size-3.5" />
                </IconButton>
                <IconButton label="Bajar" onClick={() => move(index, index + 1)} disabled={index === items.length - 1}>
                  <ArrowDown className="size-3.5" />
                </IconButton>
                <IconButton
                  label="Eliminar"
                  onClick={() => {
                    if (window.confirm(`¿Eliminar «${title}»? Se aplica al guardar.`)) {
                      update(items.filter((_, i) => i !== index));
                      setOpen(null);
                    }
                  }}
                >
                  <Trash2 className="size-3.5" />
                </IconButton>
              </div>
              {expanded ? (
                <div className="border-t border-line p-4 sm:p-5">
                  <FieldsEditor
                    fields={config.fields}
                    value={item}
                    onChange={(next) => update(items.with(index, next))}
                    errors={editor.errors}
                    path={String(index)}
                  />
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>

      <button
        type="button"
        onClick={() => {
          update([{ ...config.blank }, ...items]);
          setOpen(0);
        }}
        className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-dashed border-line-strong px-4 py-2 text-sm text-fg-muted hover:text-fg"
      >
        <Plus className="size-4" /> Agregar {config.itemLabel} al inicio
      </button>

      <SaveBar status={editor.status} dirty={editor.dirty} onSave={editor.submit} readOnly={readOnly} />
    </>
  );
}
