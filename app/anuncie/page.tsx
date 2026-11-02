import { SupplierForm } from "@/components/SupplierForm";

export const metadata = { title: "Anuncie" };

const steps = [
  ["Crie a página", "O cadastro pede o nome do ateliê, a cidade e o que você produz."],
  ["Mostre os produtos", "No protótipo o catálogo já vem preenchido. No banco, cada produto é uma linha da tabela products."],
  ["Receba orçamentos", "O comprador envia o pedido e você lê os contatos na tabela quotes."],
];

export default function AdvertisePage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-2">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-clay">Para quem produz</p>
        <h1 className="mt-2 text-2xl font-semibold">Anuncie seu ateliê</h1>
        <p className="mt-4 leading-7 text-ink/75">
          Compradores encontram a peça e falam com a empresa. Não há intermediário no preço: a
          negociação é sua.
        </p>
        <ol className="mt-8 space-y-4">
          {steps.map(([title, text], index) => (
            <li key={title} className="rounded-3xl border border-line bg-cream p-4">
              <p className="text-sm text-clay">Passo {index + 1}</p>
              <h2 className="text-base font-semibold">{title}</h2>
              <p className="mt-1 text-sm leading-6 text-ink/70">{text}</p>
            </li>
          ))}
        </ol>
      </div>
      <SupplierForm />
    </div>
  );
}
