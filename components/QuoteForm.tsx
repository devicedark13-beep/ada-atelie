"use client";

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
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const product = products.find((item) => item.slug === data.productSlug);
    const lines = [
      "Olá! Quero um orçamento.",
      data.name ? `Nome: ${data.name}` : "",
      product ? `Produto: ${product.name}` : "",
      data.quantity ? `Quantidade: ${data.quantity}` : "",
      data.customization ? `Personalização: ${data.customization}` : "",
      data.message ? `Mensagem: ${data.message}` : "",
    ].filter(Boolean);
    window.location.href = `https://wa.me/5531973353097?text=${encodeURIComponent(lines.join("\n"))}`;
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
      <button className="rounded bg-quote px-5 py-3 text-sm font-semibold text-white">
        Pedir no WhatsApp
      </button>
    </form>
  );
}
