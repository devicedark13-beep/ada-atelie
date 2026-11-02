export type QuoteInput = {
  name: string;
  email: string;
  phone: string;
  buyerCompany: string;
  productSlug: string;
  quantity: number;
  customization: string;
  message: string;
};

export type LeadInput = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  cnpj: string;
  specialty: string;
  message: string;
};

type Parsed<T> = { ok: true; value: T } | { ok: false; error: string };

function text(value: unknown, max: number) {
  return String(value ?? "").trim().slice(0, max);
}

function emailOk(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function parseQuote(body: unknown): Parsed<QuoteInput> {
  const data = (body ?? {}) as Record<string, unknown>;
  const name = text(data.name, 120);
  const email = text(data.email, 160);
  const quantity = Number(data.quantity);

  if (name.length < 2) return { ok: false, error: "Informe seu nome." };
  if (!emailOk(email)) return { ok: false, error: "Informe um e-mail válido." };
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100000) {
    return { ok: false, error: "Informe a quantidade em unidades inteiras." };
  }

  return {
    ok: true,
    value: {
      name,
      email,
      phone: text(data.phone, 40),
      buyerCompany: text(data.buyerCompany, 160),
      productSlug: text(data.productSlug, 80),
      quantity,
      customization: text(data.customization, 500),
      message: text(data.message, 2000),
    },
  };
}

export function parseLead(body: unknown): Parsed<LeadInput> {
  const data = (body ?? {}) as Record<string, unknown>;
  const companyName = text(data.companyName, 160);
  const contactName = text(data.contactName, 120);
  const email = text(data.email, 160);

  if (companyName.length < 2) return { ok: false, error: "Informe o nome do ateliê ou da empresa." };
  if (contactName.length < 2) return { ok: false, error: "Informe o nome de quem responde." };
  if (!emailOk(email)) return { ok: false, error: "Informe um e-mail válido." };

  return {
    ok: true,
    value: {
      companyName,
      contactName,
      email,
      phone: text(data.phone, 40),
      city: text(data.city, 80),
      state: text(data.state, 40),
      cnpj: text(data.cnpj, 20),
      specialty: text(data.specialty, 200),
      message: text(data.message, 2000),
    },
  };
}
