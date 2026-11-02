"use client";

import { useState } from "react";

const field =
  "mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-sm outline-none focus:border-clay";

export function SupplierForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [detail, setDetail] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setDetail("");
    try {
      const response = await fetch("/api/anuncios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = (await response.json()) as { ok: boolean; storage?: string; error?: string };
      if (!response.ok || !payload.ok) {
        setStatus("error");
        setDetail(payload.error || "Não foi possível enviar o cadastro.");
        return;
      }
      setStatus("ok");
      setDetail(
        payload.storage === "supabase"
          ? "Cadastro salvo no Supabase, na tabela supplier_leads."
          : "Cadastro guardado neste computador, na pasta data. Com o Supabase ligado, os próximos vão para o banco.",
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
        Nome do ateliê ou empresa
        <input name="companyName" required className={field} />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          Responsável
          <input name="contactName" required className={field} />
        </label>
        <label className="text-sm">
          E-mail
          <input name="email" type="email" required className={field} />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="text-sm">
          Telefone
          <input name="phone" className={field} />
        </label>
        <label className="text-sm">
          Cidade
          <input name="city" className={field} />
        </label>
        <label className="text-sm">
          Estado
          <input name="state" className={field} />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          CNPJ
          <input name="cnpj" placeholder="Opcional neste protótipo" className={field} />
        </label>
        <label className="text-sm">
          O que você produz
          <input name="specialty" className={field} />
        </label>
      </div>
      <label className="text-sm">
        Mensagem
        <textarea name="message" rows={4} className={field} />
      </label>
      <button
        disabled={status === "sending"}
        className="rounded bg-portal px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {status === "sending" ? "Enviando..." : "Quero anunciar"}
      </button>
      {detail ? (
        <p className={status === "error" ? "text-sm text-clay-dark" : "text-sm text-moss"}>{detail}</p>
      ) : null}
    </form>
  );
}
