import { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "coffee-arabica-id",
    name: "Kopi Arabika Gayo – Grade 1",
    category: "Beverages",
    hs: "0901.21",
    moq: 500,
    unit: "kg",
    priceUSD: 6.8,
    incoterms: ["FOB","CIF","CFR"],
    leadTimeDays: 14,
    origin: "Aceh, Indonesia",
    fobPort: "Belawan, Medan (IDBLW)",
    images: ["https://images.unsplash.com/photo-1445077100181-a33e9ac94db0?q=80&w=1200&auto=format&fit=crop"],
    specs: { moisture: "≤ 12%", screen: "15+", defect: "≤ 8 full defects/300g", cup: "Chocolate, caramel, citrus" },
    seller: { name: "Gayo Nusantara Coop", verified: true, city: "Takengon" }
  },
  {
    id: "clove-whole-id",
    name: "Cengkeh Utuh (Whole Cloves)",
    category: "Spices",
    hs: "0907.10",
    moq: 1000,
    unit: "kg",
    priceUSD: 8.9,
    incoterms: ["FOB","CIF"],
    leadTimeDays: 21,
    origin: "Manado, Sulawesi Utara",
    fobPort: "Bitung (IDBIT)",
    images: ["https://images.unsplash.com/photo-1586201375761-83865001e31b?q=80&w=1200&auto=format&fit=crop"],
    specs: { moisture: "≤ 13%", headless: "≤ 2%", impurities: "≤ 1%" },
    seller: { name: "Rempah Bahari Sentosa", verified: true, city: "Manado" }
  },
  {
    id: "batik-handmade",
    name: "Kain Batik Tulis – Motif Parang",
    category: "Handicrafts",
    hs: "5801.36",
    moq: 50,
    unit: "pcs",
    priceUSD: 28.0,
    incoterms: ["FOB","EXW","FCA"],
    leadTimeDays: 10,
    origin: "Solo, Jawa Tengah",
    fobPort: "Tanjung Emas, Semarang (IDSRG)",
    images: ["https://images.unsplash.com/photo-1583807174185-4f8a96a8a19a?q=80&w=1200&auto=format&fit=crop"],
    specs: { material: "Katun primissima", size: "110 x 210 cm", technique: "Hand-drawn wax (tulis)" },
    seller: { name: "Batik Lestari Solo", verified: true, city: "Solo" }
  },
  {
    id: "rattan-basket",
    name: "Keranjang Rotan Anyaman – Set 3",
    category: "Handicrafts",
    hs: "4602.19",
    moq: 200,
    unit: "set",
    priceUSD: 19.5,
    incoterms: ["FOB","FCA","CIF"],
    leadTimeDays: 18,
    origin: "Cirebon, Jawa Barat",
    fobPort: "Tanjung Priok, Jakarta (IDTPP)",
    images: ["https://images.unsplash.com/photo-1624871115331-358d3c6df639?q=80&w=1200&auto=format&fit=crop"],
    specs: { material: "Rotan alami", finish: "Coated, anti-mold", set: "S, M, L" },
    seller: { name: "Rotan Jaya Cirebon", verified: true, city: "Cirebon" }
  },
];

export const COUNTRIES = ["United States","United Kingdom","Germany","Netherlands","United Arab Emirates","Saudi Arabia","Japan","South Korea","Australia","Canada","Brazil","India","Singapore"];
export const INCOTERMS = ["FOB","CIF","CFR","EXW","FCA"];
export const PAYMENTS = [
  { key: "escrow", label: "Escrow by Platform (Secure)", desc: "Funds held until goods pass inspection at destination." },
  { key: "lc", label: "Letter of Credit (L/C)", desc: "Irrevocable LC via buyer's bank." },
  { key: "tt", label: "Telegraphic Transfer (T/T)", desc: "30% deposit, 70% against BL copy." },
];
