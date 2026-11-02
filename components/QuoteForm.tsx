"use client";

import { useState } from "react";

type Option = { slug: string; name: string; companyName: string };

const field =
  "mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-sm outline-none focus:border-clay";

export function QuoteForm({
  products,
  initialSlug,
}: {
  products: Option[];
  initialSlug?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [detail, setDetail] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setDetail("");
    try {
      const response = await fetch("/api/orcamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = (await response.json()) as { ok: boolean; storage?: string; error?: string };
      if (!response.ok || !payload.ok) {
        setStatus("error");
        setDetail(payload.error || "Não foi possível enviar o pedido.");
        return;
      }
      setStatus("ok");
      setDetail(
        payload.storage === "supabase"
          ? "Pedido salvo no Supabase, na tabela quotes. Abra o painel do banco para ler os dados."
          : "Pedido guardado neste computador, na pasta data. Quando o Supabase estiver ligado, os próximos vão para o banco.",
      );
      form.reset();
    } catch {
      setStatus("error");
      setDetail("A conexão falhou. Tente de novo.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-3xl border border-line bg-cream p-5">
      <label className="text-sm">
        Nome
        <input name="name" required className={field} />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          E-mail
          <input name="email" type="email" required className={field} />
        </label>
        <label className="text-sm">
          Telefone
          <input name="phone" className={field} />
        </label>
      </div>
      <label className="text-sm">
        Empresa
        <input name="buyerCompany" className={field} />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          Produto
          <select name="productSlug" defaultValue={initialSlug ?? ""} className={field}>
            <option value="">Ainda não escolhi</option>
            {products.map((product) => (
              <option key={product.slug} value={product.slug}>
                {product.name} — {product.companyName}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          Quantidade
          <input name="quantity" type="number" min={1} required defaultValue={50} className={field} />
        </label>
      </div>
      <label className="text-sm">
        Personalização
        <input
          name="customization"
          placeholder="Logo, cor, texto, técnica"
          className={field}
        />
      </label>
      <label className="text-sm">
        Mensagem
        <textarea name="message" rows={4} className={field} />
      </label>
      <button
        disabled={status === "sending"}
        className="rounded bg-quote px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {status === "sending" ? "Enviando..." : "Enviar pedido"}
      </button>
      {detail ? (
        <p className={status === "error" ? "text-sm text-clay-dark" : "text-sm text-moss"}>{detail}</p>
      ) : null}
    </form>
  );
}
