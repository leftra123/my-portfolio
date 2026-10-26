"use client";

import { ExternalLink, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useTransition } from "react";
import { FieldsEditor } from "@/components/admin/fields-editor";
import { SaveBar } from "@/components/admin/save-bar";
import { useEditor } from "@/components/admin/use-editor";
import { deleteProject, saveProject } from "@/lib/admin/actions";
import { clean, projectFields } from "@/lib/admin/fields";

type ProjectEditorProps = {
  initial: Record<string, unknown>;
  originalSlug: string | null;
  readOnly: boolean;
};

export function ProjectEditor({ initial, originalSlug, readOnly }: ProjectEditorProps) {
  const router = useRouter();
  const slugRef = useRef(originalSlug);
  const [deleting, startDelete] = useTransition();

  const editor = useEditor(initial, async (value) => {
    const result = await saveProject(slugRef.current, clean(value, projectFields));
    if (result.ok && result.slug && result.slug !== slugRef.current) {
      slugRef.current = result.slug;
      router.replace(`/admin/proyectos/${result.slug}`);
    }
    return result;
  });

  const slug = slugRef.current;
  const isDraft = Boolean(editor.value.draft);

  return (
    <>
      <div className="rounded-2xl border border-line bg-bg-elevated/40 p-5 sm:p-6">
        <FieldsEditor fields={projectFields} value={editor.value} onChange={editor.setValue} errors={editor.errors} />
      </div>
      <SaveBar
        status={editor.status}
        dirty={editor.dirty}
        onSave={editor.submit}
        readOnly={readOnly}
        extra={
          slug ? (
            <>
              {!isDraft ? (
                <a
                  href={`/proyectos/${slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line px-3.5 text-sm text-fg-muted hover:text-fg"
                >
                  Ver <ExternalLink className="size-3.5" />
                </a>
              ) : null}
              <button
                type="button"
                disabled={readOnly || deleting}
                onClick={() => {
                  if (!window.confirm("¿Eliminar este proyecto? Se puede recuperar desde git.")) return;
                  startDelete(async () => {
                    const result = await deleteProject(slug);
                    if (result.ok) router.replace("/admin/proyectos");
                    else window.alert(result.error);
                  });
                }}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line px-3.5 text-sm text-fg-muted hover:border-rose-400/50 hover:text-rose-300 disabled:opacity-40"
              >
                <Trash2 className="size-3.5" /> Eliminar
              </button>
            </>
          ) : null
        }
      />
    </>
  );
}
