import { NextResponse } from "next/server";
import { saveDemoRecord } from "@/lib/demo-store";
import { getSupabase } from "@/lib/supabase";
import { parseQuote } from "@/lib/validate";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Envie os dados em JSON." }, { status: 400 });
  }

  const parsed = parseQuote(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    const saved = await saveDemoRecord("orcamentos", { ...parsed.value });
    if (!saved) {
      return NextResponse.json(
        { ok: false, error: "Não consegui guardar o pedido neste computador." },
        { status: 500 },
      );
    }
    return NextResponse.json({ ok: true, storage: "local" });
  }

  const { error } = await supabase.from("quotes").insert({
    name: parsed.value.name,
    email: parsed.value.email,
    phone: parsed.value.phone,
    buyer_company: parsed.value.buyerCompany,
    product_slug: parsed.value.productSlug || null,
    quantity: parsed.value.quantity,
    customization: parsed.value.customization,
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
