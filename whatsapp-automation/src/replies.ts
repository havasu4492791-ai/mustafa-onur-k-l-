// Good Invest için basit anahtar kelime tabanlı otomatik yanıtlar.
// Kendi cümlelerinizle serbestçe düzenleyebilirsiniz.
export const keywordReplies: { keywords: string[]; reply: string }[] = [
  {
    keywords: ["fiyat", "bütçe", "ne kadar"],
    reply:
      "İlgilendiğiniz bölge ve bütçenizi belirtirseniz size uygun, gerçek satış fiyatlı seçenekleri hemen paylaşabilirim.",
  },
  {
    keywords: ["kredi"],
    reply:
      "Kredi kullanmayı planlıyorsanız size uygun bankalarla süreci birlikte yürütüyoruz. Kaç kredi çekmeyi düşünüyorsunuz, ona göre yönlendirebilirim.",
  },
  {
    keywords: ["randevu", "görüşme", "ne zaman"],
    reply:
      "Elbette, sizi arayabileceğim uygun bir gün ve saat belirtirseniz hemen randevu oluşturayım.",
  },
  {
    keywords: ["merhaba", "selam", "iyi günler"],
    reply:
      "Merhaba, Good Invest'ten Mustafa Onur Kılıç. Size nasıl yardımcı olabilirim?",
  },
];

const fallbackReply =
  "Mesajınız için teşekkürler! Mustafa Onur Kılıç en kısa sürede size dönüş yapacak.";

export function pickReply(incomingText: string): string {
  const normalized = incomingText.toLocaleLowerCase("tr");
  const match = keywordReplies.find(({ keywords }) =>
    keywords.some((keyword) => normalized.includes(keyword)),
  );
  return match?.reply ?? fallbackReply;
}
