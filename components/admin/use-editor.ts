"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import type { WriteResult } from "@/lib/admin/store";
import { issuesToErrors, type SaveStatus } from "@/components/admin/save-bar";

/** Estado común de los editores: cambios sin guardar, guardado con ⌘S y errores por campo. */
export function useEditor<T>(initial: T, save: (value: T) => Promise<WriteResult>) {
  const [value, setValue] = useState(initial);
  const [saved, setSaved] = useState(() => JSON.stringify(initial));
  const [status, setStatus] = useState<SaveStatus>({ kind: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [, startTransition] = useTransition();
  const dirty = JSON.stringify(value) !== saved;
  const latest = useRef({ value, dirty });
  latest.current = { value, dirty };

  const submit = useCallback(() => {
    if (!latest.current.dirty) return;
    const snapshot = latest.current.value;
    setStatus({ kind: "saving" });
    startTransition(async () => {
      const result = await save(snapshot);
      if (result.ok) {
        setSaved(JSON.stringify(snapshot));
        setErrors({});
        setStatus({ kind: "saved", at: new Date() });
      } else {
        setErrors(issuesToErrors(result));
        setStatus({ kind: "error", message: result.error });
      }
    });
  }, [save]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "s" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        submit();
      }
    };
    const onLeave = (event: BeforeUnloadEvent) => {
      if (latest.current.dirty) event.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("beforeunload", onLeave);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("beforeunload", onLeave);
    };
  }, [submit]);

  return { value, setValue, status, errors, dirty, submit };
}
