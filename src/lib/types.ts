export type Seller = { name: string; verified: boolean; city: string };
export type Product = {
  id: string;
  name: string;
  category: string;
  hs: string;
  moq: number;
  unit: string;
  priceUSD: number;
  incoterms: string[];
  leadTimeDays: number;
  origin: string;
  fobPort: string;
  images: string[];
  specs: Record<string, string>;
  seller: Seller;
};
export type CartItem = { id: string; qty: number; incoterm: string };
export type Buyer = {
  company: string;
  country: string;
  email: string;
  website: string;
  status: "Unverified" | "In Review" | "Verified";
  infoConsent: boolean;
};
