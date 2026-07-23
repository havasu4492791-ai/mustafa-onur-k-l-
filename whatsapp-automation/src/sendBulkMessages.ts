import * as path from "node:path";
import ExcelJS from "exceljs";
import { sendTemplateMessage } from "./whatsappClient";

// Excel'de beklenen sütun başlıkları (büyük/küçük harf duyarsız):
//   Ad Soyad | Telefon
const EXCEL_PATH = process.argv[2] ?? path.join(__dirname, "..", "data", "leads.xlsx");
const DELAY_MS_BETWEEN_SENDS = 1500;

type Lead = { name: string; phone: string };

export async function readLeads(filePath: string): Promise<Lead[]> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.worksheets[0];

  const columnIndex: Record<string, number> = {};
  worksheet.getRow(1).eachCell((cell, colNumber) => {
    columnIndex[String(cell.value ?? "").trim().toLowerCase()] = colNumber;
  });
  const nameCol = columnIndex["ad soyad"] ?? columnIndex["isim"] ?? columnIndex["ad"];
  const phoneCol = columnIndex["telefon"] ?? columnIndex["phone"] ?? columnIndex["numara"];

  const leads: Lead[] = [];
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    const name = nameCol ? String(row.getCell(nameCol).value ?? "").trim() : "";
    const phone = phoneCol ? String(row.getCell(phoneCol).value ?? "").trim() : "";
    if (phone) leads.push({ name, phone });
  });

  return leads;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const leads = await readLeads(EXCEL_PATH);
  console.log(`${leads.length} numaraya ilk mesaj gönderilecek (${EXCEL_PATH})`);

  for (const lead of leads) {
    const displayName = lead.name || "Değerli Müşterimiz";
    try {
      await sendTemplateMessage(lead.phone, displayName);
      console.log(`✓ Gönderildi: ${displayName} (${lead.phone})`);
    } catch (error) {
      console.error(`✗ Başarısız: ${displayName} (${lead.phone}) —`, error);
    }
    await sleep(DELAY_MS_BETWEEN_SENDS);
  }

  console.log("Bitti.");
}

if (require.main === module) {
  main();
}
