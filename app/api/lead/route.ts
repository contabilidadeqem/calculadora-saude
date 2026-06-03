import { NextResponse } from "next/server";

// Forçar runtime Node (não Edge) para garantir fetch padrão e logs.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface LeadRequest {
  nome: string;
  email: string;
  whatsapp: string;
  areaInternal: string; // ex: "Médico" — label dropdown HubSpot
  regimeInternal: string; // ex: "Lucro Presumido"
  faturamentoMensal: number;
  economiaMensal: number;
  economiaAnual: number;
  pageUri?: string;
}

function splitName(full: string): { firstname: string; lastname: string } {
  const parts = full.trim().split(/\s+/);
  const firstname = parts.shift() || "";
  const lastname = parts.join(" ");
  return { firstname, lastname };
}

function sanitizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  // Adiciona DDI Brasil se vier só com DDD + número
  if (digits.length === 10 || digits.length === 11) return `+55${digits}`;
  if (digits.length === 12 || digits.length === 13) return `+${digits}`;
  return raw;
}

export async function POST(req: Request) {
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formGuid = process.env.HUBSPOT_FORM_GUID;

  if (!portalId || !formGuid) {
    console.warn(
      "[/api/lead] HUBSPOT_PORTAL_ID ou HUBSPOT_FORM_GUID não configurados — lead não foi enviado ao HubSpot."
    );
    return NextResponse.json(
      { ok: false, reason: "hubspot_not_configured" },
      { status: 200 } // 200 propositalmente: front-end segue para o WhatsApp
    );
  }

  let body: LeadRequest;
  try {
    body = (await req.json()) as LeadRequest;
  } catch {
    return NextResponse.json({ ok: false, reason: "bad_json" }, { status: 400 });
  }

  if (!body.email || !body.nome || !body.whatsapp) {
    return NextResponse.json(
      { ok: false, reason: "missing_fields" },
      { status: 400 }
    );
  }

  const { firstname, lastname } = splitName(body.nome);
  const phone = sanitizePhone(body.whatsapp);

  // HubSpot Forms v2 endpoint — usado pelos formulários HTML5 modernos do HubSpot.
  // Body precisa ser application/x-www-form-urlencoded.
  const form = new URLSearchParams();
  form.set("firstname", firstname);
  form.set("lastname", lastname);
  form.set("email", body.email);
  form.set("phone", phone);
  form.set("area_atuacao", body.areaInternal);
  form.set("regime_tributario", body.regimeInternal);
  form.set("faturamento_mensal", String(Math.round(body.faturamentoMensal)));
  form.set(
    "economia_mensal_estimada",
    String(Math.round(body.economiaMensal))
  );
  form.set(
    "economia_anual_estimada",
    String(Math.round(body.economiaAnual))
  );

  // hs_context é opcional mas recomendado — vincula a submissão à URL de origem.
  const hsContext = {
    pageUrl: body.pageUri || "calculadora-saude",
    pageName: "Calculadora de Equiparação Hospitalar",
  };
  form.set("hs_context", JSON.stringify(hsContext));

  const url = `https://forms.hubspot.com/uploads/form/v2/${portalId}/${formGuid}`;

  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString(),
    });

    // HubSpot Forms v2 retorna 204 No Content em sucesso, ou 302 redirect.
    if (r.status === 204 || r.status === 200 || r.status === 302) {
      return NextResponse.json({ ok: true });
    }

    const text = await r.text();
    console.error("[/api/lead] HubSpot rejeitou:", r.status, text.slice(0, 500));
    return NextResponse.json(
      { ok: false, reason: "hubspot_error", status: r.status },
      { status: 200 } // não bloqueia WhatsApp
    );
  } catch (err) {
    console.error("[/api/lead] Erro de rede:", err);
    return NextResponse.json(
      { ok: false, reason: "network_error" },
      { status: 200 }
    );
  }
}
