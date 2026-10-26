import { cn } from "@/lib/utils";

/*
 * Isotipo Aura Tech (01-vectores/aura-tech-isotipo-color.svg).
 * Los degradados se definen una sola vez en <AuraDefs /> (layout) para no
 * duplicar ids ni romperlos cuando una instancia queda oculta.
 */

const RIGHT =
  "M 120 18 C 139 18 151 30 162 49 L 232 173 C 244 195 235 211 219 211 C 204 213 194 203 184 188 L 120 88 L 77 156 L 50 187 L 30 166 L 80 65 C 94 38 104 18 120 18 Z";
const LEFT =
  "M 13 174 L 77 59 C 91 34 103 18 122 18 C 139 18 151 30 162 49 C 143 43 130 60 116 81 L 56 180 C 45 200 36 211 22 211 C 5 211 0 193 13 174 Z";
const BRIDGE =
  "M 13 174 C 34 147 58 126 82 123 C 115 117 141 133 159 153 L 184 188 C 164 159 146 137 122 133 C 97 128 76 147 56 180 C 45 200 36 211 22 211 C 5 211 0 193 13 174 Z";

export function AuraDefs() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute">
      <defs>
        <linearGradient id="aura-right" x1="0.25" y1="0" x2="0.7" y2="1">
          <stop stopColor="#42DFFF" />
          <stop offset=".40" stopColor="#009AFF" />
          <stop offset="1" stopColor="#0041FF" />
        </linearGradient>
        <linearGradient id="aura-left" x1="0" y1=".6" x2="1" y2=".3">
          <stop stopColor="#0065FF" />
          <stop offset=".55" stopColor="#009BFF" />
          <stop offset="1" stopColor="#55E6FF" />
        </linearGradient>
        <linearGradient id="aura-bridge" x1=".25" y1="0" x2=".75" y2="1">
          <stop stopColor="#32D4FF" />
          <stop offset=".5" stopColor="#009CFF" />
          <stop offset="1" stopColor="#0064FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

type IsotipoProps = {
  className?: string;
  style?: React.CSSProperties;
  /** "color" usa los degradados de marca; "mono" hereda currentColor. */
  variant?: "color" | "mono";
  title?: string;
};

export function Isotipo({ className, style, variant = "color", title }: IsotipoProps) {
  const mono = variant === "mono";
  return (
    <svg
      viewBox="0 0 248 228"
      className={cn("shrink-0", className)}
      style={style}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <g transform="translate(0,-4)">
        <path d={RIGHT} fill={mono ? "currentColor" : "url(#aura-right)"} />
        <path d={LEFT} fill={mono ? "currentColor" : "url(#aura-left)"} />
        <path
          d={BRIDGE}
          fill={mono ? "currentColor" : "url(#aura-bridge)"}
          opacity={mono ? 0.72 : 1}
        />
      </g>
    </svg>
  );
}

/** Isotipo dibujado solo con trazo: se usa grande y tenue como fondo. */
export function IsotipoOutline({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 248 228" className={cn("shrink-0", className)} style={style} aria-hidden>
      <g transform="translate(0,-4)" fill="none" strokeWidth="1">
        <path d={RIGHT} stroke="url(#aura-right)" vectorEffect="non-scaling-stroke" />
        <path d={LEFT} stroke="url(#aura-left)" vectorEffect="non-scaling-stroke" />
        <path d={BRIDGE} stroke="url(#aura-bridge)" vectorEffect="non-scaling-stroke" />
      </g>
    </svg>
  );
}
