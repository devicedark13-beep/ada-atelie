const WHATSAPP_NUMBER = "5531973353097";

export function whatsAppQuoteUrl(productName?: string) {
  const text = productName
    ? `Olá! Quero um orçamento de ${productName}.`
    : "Olá! Quero um orçamento.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
