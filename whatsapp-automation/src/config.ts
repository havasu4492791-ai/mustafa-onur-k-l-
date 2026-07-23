import "dotenv/config";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `${name} tanımlı değil. whatsapp-automation/.env dosyasını .env.example'a bakarak oluşturun.`,
    );
  }
  return value;
}

export const config = {
  accessToken: requireEnv("WHATSAPP_ACCESS_TOKEN"),
  phoneNumberId: requireEnv("WHATSAPP_PHONE_NUMBER_ID"),
  apiVersion: process.env.WHATSAPP_API_VERSION ?? "v21.0",
  templateName: process.env.WHATSAPP_TEMPLATE_NAME ?? "good_invest_ilk_mesaj",
  templateLanguage: process.env.WHATSAPP_TEMPLATE_LANGUAGE ?? "tr",
  verifyToken: process.env.WHATSAPP_VERIFY_TOKEN ?? "",
  port: Number(process.env.PORT ?? 3000),
};

export const graphApiBaseUrl = `https://graph.facebook.com/${config.apiVersion}/${config.phoneNumberId}`;
