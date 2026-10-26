"use client";

import { ArrowDown, ArrowUp, Plus, Trash2, X } from "lucide-react";
import { useId, useState, type KeyboardEvent } from "react";
import type { Field } from "@/lib/admin/fields";
import { cn } from "@/lib/utils";

type Value = Record<string, unknown>;

export const inputClass =
  "w-full rounded-xl border border-line bg-bg px-3 py-2 text-sm text-fg outline-none transition-colors placeholder:text-fg-subtle hover:border-line-strong focus:border-accent";

type FieldsEditorProps = {
  fields: Field[];
  value: Value;
  onChange: (next: Value) => void;
  /** Errores de validación por ruta ("metrics.0.value"). */
  errors?: Record<string, string>;
  path?: string;
};

/** Dibuja cualquier formulario del admin a partir de sus descriptores. */
const isWide = (field: Field) =>
  field.kind === "repeat" || field.kind === "group" || field.kind === "textarea" || ("wide" in field && Boolean(field.wide));

/** Un campo de media fila que queda solo (antes de uno ancho o al final) pasa a ocupar la fila: sin huecos. */
function loneHalves(fields: Field[]) {
  const lone = new Set<string>();
  let pending: string | null = null;
  for (const field of fields) {
    if (isWide(field)) {
      if (pending) lone.add(pending);
      pending = null;
    } else {
      pending = pending ? null : field.key;
    }
  }
  if (pending) lone.add(pending);
  return lone;
}

export function FieldsEditor({ fields, value, onChange, errors = {}, path = "" }: FieldsEditorProps) {
  const set = (key: string, next: unknown) => onChange({ ...value, [key]: next });
  const lone = loneHalves(fields);

  return (
    <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
      {fields.map((field) => {
        const fieldPath = path ? `${path}.${field.key}` : field.key;
        const error = errors[fieldPath];
        const wide = isWide(field) || lone.has(field.key);
        return (
          <div key={field.key} className={cn(wide && "sm:col-span-2")}>
            <FieldControl field={field} value={value[field.key]} onChange={(next) => set(field.key, next)} errors={errors} path={fieldPath} />
            {error ? <p className="mt-1.5 text-xs text-rose-400">{error}</p> : null}
          </div>
        );
      })}
    </div>
  );
}

function Label({ htmlFor, field }: { htmlFor?: string; field: Field }) {
  return (
    <div className="mb-1.5 flex items-baseline justify-between gap-3">
      <label htmlFor={htmlFor} className="text-xs font-medium text-fg-muted">
        {field.label}
        {"optional" in field && field.optional ? <span className="ml-1.5 font-normal text-fg-subtle">opcional</span> : null}
      </label>
      {field.hint ? <span className="truncate text-[11px] text-fg-subtle">{field.hint}</span> : null}
    </div>
  );
}

type ControlProps = {
  field: Field;
  value: unknown;
  onChange: (next: unknown) => void;
  errors: Record<string, string>;
  path: string;
};

function FieldControl({ field, value, onChange, errors, path }: ControlProps) {
  const id = useId();

  switch (field.kind) {
    case "text":
    case "url":
    case "email":
    case "number":
      return (
        <>
          <Label htmlFor={id} field={field} />
          <input
            id={id}
            type={field.kind === "number" ? "number" : field.kind === "text" ? "text" : field.kind}
            value={value === undefined || value === null ? "" : String(value)}
            placeholder={field.placeholder}
            onChange={(event) => onChange(field.kind === "number" ? event.target.valueAsNumber || event.target.value : event.target.value)}
            className={inputClass}
          />
        </>
      );
    case "textarea":
      return (
        <>
          <Label htmlFor={id} field={field} />
          <textarea
            id={id}
            rows={3}
            value={String(value ?? "")}
            placeholder={field.placeholder}
            onChange={(event) => onChange(event.target.value)}
            className={cn(inputClass, "min-h-20 resize-y leading-relaxed")}
          />
        </>
      );
    case "boolean":
      return (
        <label className="flex h-full cursor-pointer items-center gap-3 rounded-xl border border-line px-3 py-2.5 hover:border-line-strong">
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(event) => onChange(event.target.checked)}
            className="size-4 accent-[var(--aura-blue)]"
          />
          <span className="text-sm">
            {field.label}
            {field.hint ? <span className="block text-xs text-fg-subtle">{field.hint}</span> : null}
          </span>
        </label>
      );
    case "select":
      return (
        <>
          <Label htmlFor={id} field={field} />
          <select
            id={id}
            value={String(value ?? "")}
            onChange={(event) => onChange(event.target.value || undefined)}
            className={inputClass}
          >
            {field.optional ? <option value="">—</option> : null}
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </>
      );
    case "tags":
      return (
        <>
          <Label htmlFor={id} field={field} />
          <TagsInput id={id} value={Array.isArray(value) ? (value as string[]) : []} onChange={onChange} />
        </>
      );
    case "lines":
      return (
        <>
          <Label htmlFor={id} field={field} />
          <textarea
            id={id}
            rows={4}
            value={Array.isArray(value) ? (value as string[]).join("\n") : ""}
            onChange={(event) => onChange(event.target.value.split("\n"))}
            className={cn(inputClass, "min-h-24 resize-y leading-relaxed")}
          />
        </>
      );
    case "group": {
      const group = (value && typeof value === "object" ? value : {}) as Value;
      return (
        <fieldset className="rounded-2xl border border-line p-4">
          <legend className="px-1.5 text-xs font-medium text-fg-muted">
            {field.label}
            {field.optional ? <span className="ml-1.5 font-normal text-fg-subtle">opcional</span> : null}
          </legend>
          {field.hint ? <p className="mb-3 text-[11px] text-fg-subtle">{field.hint}</p> : null}
          <FieldsEditor fields={field.fields} value={group} onChange={onChange} errors={errors} path={path} />
        </fieldset>
      );
    }
    case "repeat":
      return <RepeatControl field={field} value={value} onChange={onChange} errors={errors} path={path} />;
  }
}

function RepeatControl({ field, value, onChange, errors, path }: ControlProps & { field: Extract<Field, { kind: "repeat" }> }) {
  const items = Array.isArray(value) ? (value as Value[]) : [];
  const blank = Object.fromEntries(field.fields.map((inner) => [inner.key, ""]));
  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    const next = [...items];
    [next[from], next[to]] = [next[to]!, next[from]!];
    onChange(next);
  };

  return (
    <fieldset className="rounded-2xl border border-line p-4">
      <legend className="px-1.5 text-xs font-medium text-fg-muted">
        {field.label} <span className="font-mono text-fg-subtle">· {items.length}</span>
      </legend>
      {field.hint ? <p className="mb-3 text-[11px] text-fg-subtle">{field.hint}</p> : null}
      <ol className="grid gap-3">
        {items.map((item, index) => (
          <li key={index} className="rounded-xl border border-line bg-bg/60 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-[11px] text-fg-subtle">
                {field.itemLabel} {index + 1}
              </span>
              <span className="flex items-center gap-0.5">
                <IconButton label="Subir" onClick={() => move(index, index - 1)} disabled={index === 0}>
                  <ArrowUp className="size-3.5" />
                </IconButton>
                <IconButton label="Bajar" onClick={() => move(index, index + 1)} disabled={index === items.length - 1}>
                  <ArrowDown className="size-3.5" />
                </IconButton>
                <IconButton label="Quitar" onClick={() => onChange(items.filter((_, i) => i !== index))}>
                  <Trash2 className="size-3.5" />
                </IconButton>
              </span>
            </div>
            <FieldsEditor
              fields={field.fields}
              value={item}
              onChange={(next) => onChange(items.with(index, next))}
              errors={errors}
              path={`${path}.${index}`}
            />
          </li>
        ))}
      </ol>
      <button
        type="button"
        onClick={() => onChange([...items, blank])}
        className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-dashed border-line-strong px-3 py-1.5 text-xs text-fg-muted hover:text-fg"
      >
        <Plus className="size-3.5" /> Agregar {field.itemLabel.toLowerCase()}
      </button>
    </fieldset>
  );
}

export function IconButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="grid size-7 place-items-center rounded-lg text-fg-subtle transition-colors hover:bg-fg/[0.06] hover:text-fg disabled:pointer-events-none disabled:opacity-30"
    >
      {children}
    </button>
  );
}

function TagsInput({ id, value, onChange }: { id: string; value: string[]; onChange: (next: string[]) => void }) {
  const [draft, setDraft] = useState("");
  const add = () => {
    const parts = draft
      .split(",")
      .map((part) => part.trim())
      .filter((part) => part && !value.includes(part));
    if (parts.length) onChange([...value, ...parts]);
    setDraft("");
  };
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      add();
    } else if (event.key === "Backspace" && !draft && value.length) {
      onChange(value.slice(0, -1));
    }
  };
  return (
    <div className={cn(inputClass, "flex flex-wrap items-center gap-1.5 py-1.5 focus-within:border-accent")}>
      {value.map((tag) => (
        <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-fg/[0.07] py-0.5 pr-1 pl-2.5 font-mono text-[11px]">
          {tag}
          <button
            type="button"
            onClick={() => onChange(value.filter((item) => item !== tag))}
            aria-label={`Quitar ${tag}`}
            className="grid size-4 place-items-center rounded-full hover:bg-fg/10"
          >
            <X className="size-3" />
          </button>
        </span>
      ))}
      <input
        id={id}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={onKeyDown}
        onBlur={add}
        placeholder={value.length ? "" : "Escribe y presiona Enter"}
        className="min-w-24 flex-1 bg-transparent py-0.5 text-sm outline-none placeholder:text-fg-subtle"
      />
    </div>
  );
}
