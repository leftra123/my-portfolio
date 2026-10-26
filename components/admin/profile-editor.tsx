"use client";

import { FieldsEditor } from "@/components/admin/fields-editor";
import { SaveBar } from "@/components/admin/save-bar";
import { useEditor } from "@/components/admin/use-editor";
import { saveProfile } from "@/lib/admin/actions";
import { clean, profileFields } from "@/lib/admin/fields";

export function ProfileEditor({ initial, readOnly }: { initial: Record<string, unknown>; readOnly: boolean }) {
  const editor = useEditor(initial, (value) => saveProfile(clean(value, profileFields)));
  return (
    <>
      <div className="rounded-2xl border border-line bg-bg-elevated/40 p-5 sm:p-6">
        <FieldsEditor fields={profileFields} value={editor.value} onChange={editor.setValue} errors={editor.errors} />
      </div>
      <SaveBar status={editor.status} dirty={editor.dirty} onSave={editor.submit} readOnly={readOnly} />
    </>
  );
}
