import { NextResponse } from "next/server";
import { saveDemoRecord } from "@/lib/demo-store";
import { getSupabase } from "@/lib/supabase";
import { parseLead } from "@/lib/validate";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Envie os dados em JSON." }, { status: 400 });
  }

  const parsed = parseLead(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    const saved = await saveDemoRecord("anuncios", { ...parsed.value });
    if (!saved) {
      return NextResponse.json(
        { ok: false, error: "Não consegui guardar o cadastro neste computador." },
        { status: 500 },
      );
    }
    return NextResponse.json({ ok: true, storage: "local" });
  }

  const { error } = await supabase.from("supplier_leads").insert({
    company_name: parsed.value.companyName,
    contact_name: parsed.value.contactName,
    email: parsed.value.email,
    phone: parsed.value.phone,
    city: parsed.value.city,
    state: parsed.value.state,
    cnpj: parsed.value.cnpj,
    specialty: parsed.value.specialty,
    message: parsed.value.message,
  });

  if (error) {
    console.error(error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Não consegui salvar no Supabase. Confira se o arquivo schema.sql foi executado no SQL Editor.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, storage: "supabase" });
}
