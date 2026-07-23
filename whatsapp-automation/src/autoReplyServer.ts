import express from "express";
import { config } from "./config";
import { pickReply } from "./replies";
import { sendTextMessage } from "./whatsappClient";

const app = express();
app.use(express.json());

// Meta, webhook'u bu adrese kaydederken bir doğrulama isteği (GET) atar.
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === config.verifyToken) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Gelen mesajlar buraya POST edilir.
app.post("/webhook", async (req, res) => {
  // Meta 5 saniye içinde 200 bekler, işlemi bloklamadan hemen yanıt ver.
  res.sendStatus(200);

  const value = req.body?.entry?.[0]?.changes?.[0]?.value;
  const message = value?.messages?.[0];
  if (!message || message.type !== "text") return;

  const fromNumber: string = message.from;
  const incomingText: string = message.text.body;
  const reply = pickReply(incomingText);

  try {
    await sendTextMessage(fromNumber, reply);
    console.log(`↩ ${fromNumber} → "${incomingText}" için yanıt gönderildi`);
  } catch (error) {
    console.error(`Yanıt gönderilemedi (${fromNumber}):`, error);
  }
});

app.listen(config.port, () => {
  console.log(`Webhook sunucusu http://localhost:${config.port}/webhook adresinde dinliyor`);
});
