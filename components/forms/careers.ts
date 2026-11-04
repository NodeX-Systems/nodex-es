import { track } from "@/lib/analytics";
import { FORM_ENDPOINTS } from "@/lib/constants";

// Shared by the classic careers form and the careers chat: both post the same
// fields to the same n8n webhook, so the payload is built in one place.

export type Profile = "technical" | "nontechnical";

export const AREAS = {
  technical: {
    en: ["AI & ML", "Backend", "Frontend", "Full stack", "Data", "Cloud & DevOps", "Other"],
    es: ["IA y ML", "Backend", "Frontend", "Full stack", "Datos", "Cloud y DevOps", "Otro"],
  },
  nontechnical: {
    en: ["Sales", "Marketing", "Operations", "People", "Finance", "Design", "Other"],
    es: ["Ventas", "Marketing", "Operaciones", "Personas", "Finanzas", "Diseño", "Otro"],
  },
} as const;

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type CareersValues = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  profile: Profile;
  area: string;
  about: string;
  link: string;
  proud: string;
  extra: string;
  cv?: File | null;
};

// `role`, `address` and `message` keep the shape the existing n8n flow expects.
export function buildCareersBody(v: CareersValues): FormData {
  const body = new FormData();
  body.set("first_name", v.firstName);
  body.set("last_name", v.lastName);
  body.set("email", v.email);
  body.set("phone", "");
  body.set("address", v.address);
  body.set("role", `${v.profile === "technical" ? "Technical" : "Non-technical"} · ${v.area}`);
  body.set(
    "message",
    [
      `About: ${v.about}`,
      `Link: ${v.link}`,
      `Proud of: ${v.proud}`,
      v.extra ? `Anything else: ${v.extra}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  );
  if (v.cv && v.cv.size > 0) body.set("cv", v.cv);
  return body;
}

export type SubmitResult = { ok: true } | { ok: false; error?: string };

export async function submitCareers(body: FormData): Promise<SubmitResult> {
  try {
    const res = await fetch(FORM_ENDPOINTS.careers, { method: "POST", body });
    const json: { status?: string; error?: string } = res.ok ? await res.json() : {};
    if (json.status === "ok") {
      track("form_submit", { form: "careers" });
      return { ok: true };
    }
    return { ok: false, error: json.error };
  } catch {
    return { ok: false };
  }
}
