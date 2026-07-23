# Excel formatı

`leads.xlsx` adıyla bu klasöre koyduğunuz dosyada şu sütunlar olmalı (sıra önemli değil, başlık isimleri büyük/küçük harf duyarsız):

| Ad Soyad       | Telefon        |
|----------------|----------------|
| Ayşe Yılmaz    | 0532 123 45 67 |
| Mehmet Demir   | 905331234567   |

- Telefon numarası hangi formatta olursa olsun (başında 0, +90, boşluklu vb.) otomatik olarak `90XXXXXXXXXX` formatına çevrilir.
- Bu dosya `.gitignore` ile Git'e eklenmez — gerçek müşteri telefon numaraları GitHub'a asla commit edilmemeli.
