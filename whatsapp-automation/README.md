# Good Invest — WhatsApp Otomasyonu

İki parçadan oluşur:
1. **Toplu ilk mesaj** (`send-bulk`): Excel'deki numaralara Meta'da onaylı bir şablon mesaj gönderir.
2. **Otomatik yanıt sunucusu** (`server`): Size gelen WhatsApp mesajlarına anahtar kelimeye göre otomatik cevap verir.

## 1. Meta tarafında yapmanız gerekenler (bir kerelik kurulum)

Bu adımları yalnızca işletme hesabı sahibi olarak siz tamamlayabilirsiniz:

1. **Meta Business Manager** hesabı oluşturun/doğrulayın: business.facebook.com
2. **Meta for Developers**'ta bir uygulama oluşturun: developers.facebook.com/apps → "Create App" → "Business" türü.
3. Uygulamaya **WhatsApp** ürününü ekleyin. Bu size şunları verir:
   - Geçici bir test numarası ve **Phone Number ID**
   - Geçici bir **Access Token** (24 saatlik; kalıcı kullanım için "System User" token'ı oluşturmanız gerekir — Business Settings > System Users)
4. **Message Template** oluşturun (WhatsApp Manager > Message Templates > Create Template):
   - Kategori: Marketing veya Utility
   - Dil: Turkish
   - Örnek gövde metni: `Merhaba {{1}}, Good Invest'ten Mustafa Onur Kılıç. İzmir'de ev arayışınızla ilgili formu doldurduğunuz için teşekkürler. Size en uygun seçenekleri sunmak için sizi arayabilir miyim?`
   - Onay genelde birkaç saat–birkaç gün sürer.
5. **Webhook kurulumu** (otomatik yanıt için gerekli):
   - App Dashboard > WhatsApp > Configuration > Webhook
   - Callback URL: sunucunuzun herkese açık adresi + `/webhook` (yerelde test için `ngrok http 3000` kullanabilirsiniz)
   - Verify Token: `.env` dosyanızdaki `WHATSAPP_VERIFY_TOKEN` ile birebir aynı olmalı
   - "messages" alanına abone olun

## 2. Kurulum

```bash
cd whatsapp-automation
npm install
cp .env.example .env
# .env dosyasını Meta'dan aldığınız bilgilerle doldurun
```

## 3. Toplu ilk mesaj gönderme

`data/leads.xlsx` dosyasını `data/README.md`'deki formata göre hazırlayın, sonra:

```bash
npm run send-bulk
```

## 4. Otomatik yanıt sunucusunu çalıştırma

```bash
npm run server
```

Yanıt metinlerini `src/replies.ts` dosyasından düzenleyebilirsiniz.

## Önemli kısıtlama

WhatsApp kuralı gereği: bir numaraya **ilk kez** siz yazıyorsanız yalnızca onaylı bir şablonla mesaj atabilirsiniz (bu yüzden `send-bulk` şablon kullanır). Karşı taraf size yazdıktan sonraki 24 saat içinde serbest metinle yanıt verebilirsiniz (`autoReplyServer` bunu yapar). 24 saatten sonra tekrar sadece şablonla yazabilirsiniz.
