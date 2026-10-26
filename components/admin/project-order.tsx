"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { IconButton } from "@/components/admin/fields-editor";
import { moveProject } from "@/lib/admin/actions";

export function ProjectOrder({ slug, first, last, disabled }: { slug: string; first: boolean; last: boolean; disabled: boolean }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const move = (direction: -1 | 1) =>
    start(async () => {
      await moveProject(slug, direction);
      router.refresh();
    });
  return (
    <span className="flex items-center" aria-busy={pending}>
      <IconButton label="Subir" onClick={() => move(-1)} disabled={disabled || first || pending}>
        <ArrowUp className="size-3.5" />
      </IconButton>
      <IconButton label="Bajar" onClick={() => move(1)} disabled={disabled || last || pending}>
        <ArrowDown className="size-3.5" />
      </IconButton>
    </span>
  );
}
