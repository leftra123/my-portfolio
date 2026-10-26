"use client";

import { ArrowRight, LoaderCircle } from "lucide-react";
import { useActionState } from "react";
import { inputClass } from "@/components/admin/fields-editor";
import { login, type LoginState } from "@/lib/admin/actions";

export function LoginForm({ volver, disabled }: { volver: string; disabled: boolean }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  return (
    <form action={action} className="mt-8 grid gap-3">
      <input type="hidden" name="volver" value={volver} />
      <label htmlFor="password" className="text-xs font-medium text-fg-muted">
        Contraseña
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        autoFocus
        disabled={disabled}
        className={`${inputClass} h-11`}
      />
      {state.error ? (
        <p role="alert" className="text-sm text-rose-300">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending || disabled}
        className="mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-btn text-sm font-medium text-btn-fg disabled:opacity-50"
      >
        {pending ? <LoaderCircle className="size-4 animate-spin" /> : null}
        Entrar
        {!pending ? <ArrowRight className="size-4" /> : null}
      </button>
    </form>
  );
}
