import { config, graphApiBaseUrl } from "./config";

function toWhatsAppNumber(rawPhone: string): string {
  // WhatsApp Cloud API wants digits only, with country code, no "+" or spaces.
  const digits = rawPhone.replace(/\D/g, "");
  if (digits.startsWith("90")) return digits;
  if (digits.startsWith("0")) return `90${digits.slice(1)}`;
  return `90${digits}`;
}

async function callGraphApi(body: unknown) {
  const response = await fetch(`${graphApiBaseUrl}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`WhatsApp API hatası: ${JSON.stringify(data)}`);
  }
  return data;
}

// İlk mesaj: karşı taraf size hiç yazmamışsa yalnızca Meta'da onaylı bir
// şablonla gönderilebilir (WhatsApp kuralı).
export async function sendTemplateMessage(rawPhone: string, nameParam: string) {
  return callGraphApi({
    messaging_product: "whatsapp",
    to: toWhatsAppNumber(rawPhone),
    type: "template",
    template: {
      name: config.templateName,
      language: { code: config.templateLanguage },
      components: [
        {
          type: "body",
          parameters: [{ type: "text", text: nameParam }],
        },
      ],
    },
  });
}

// Serbest metin: yalnızca karşı taraf size son 24 saat içinde yazdıysa
// gönderilebilir (WhatsApp'ın "customer service window" kuralı). Otomatik
// yanıt botu bu yüzden sadece gelen mesajlara cevap olarak kullanılmalı.
export async function sendTextMessage(rawPhone: string, text: string) {
  return callGraphApi({
    messaging_product: "whatsapp",
    to: toWhatsAppNumber(rawPhone),
    type: "text",
    text: { body: text },
  });
}
