/*
 * Medición anónima y sin cookies: solo página, clic y tipo de pantalla.
 * Nada identifica a la persona; si el navegador pide no ser medido (GPC o DNT), no se envía nada.
 */

export type TrackEvent = {
  t: "view" | "click";
  p: string;
  k?: string;
  r?: string;
  w?: number;
};

export function trackingAllowed() {
  if (typeof navigator === "undefined") return false;
  const gpc = (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl;
  return !(gpc === true || navigator.doNotTrack === "1");
}

export function send(event: Omit<TrackEvent, "w">) {
  if (!trackingAllowed()) return;
  const body = JSON.stringify({ ...event, w: window.innerWidth });
  const blob = new Blob([body], { type: "application/json" });
  if (!navigator.sendBeacon?.("/api/a", blob)) {
    void fetch("/api/a", { method: "POST", body, keepalive: true, headers: { "content-type": "application/json" } });
  }
}

/** Para acciones que no son enlaces (copiar correo, buscador, tema…). */
export function track(key: string) {
  send({ t: "click", p: window.location.pathname, k: key });
}
