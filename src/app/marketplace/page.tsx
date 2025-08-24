"use client";
import { useMemo, useState } from "react";
import { Card, SectionTitle } from "@/components/ui";
import { useApp } from "@/components/AppState";
import ProductCard from "@/components/ProductCard";

export default function MarketplacePage(){
  const { products } = useApp();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const categories = useMemo(()=> ["All", ...Array.from(new Set(products.map(p=>p.category)))], [products]);
  const filtered = products.filter(p => (cat==="All" || p.category===cat) && p.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 space-y-6">
      <SectionTitle title="Marketplace UMKM" subtitle="Produk siap ekspor dengan info HS code, MOQ, incoterms, dan lead time" />
      <Card className="p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="flex items-center gap-2">
          <select value={cat} onChange={e=>setCat(e.target.value)} className="rounded-xl border border-gray-300 text-sm px-3 py-2">
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari: kopi, cengkeh, rotan…" className="rounded-xl border border-gray-300 text-sm px-3 py-2 w-72" />
        </div>
        <div className="text-xs text-gray-500">{filtered.length} produk ditemukan</div>
      </Card>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(p => <ProductCard key={p.id} p={p} />)}
      </div>
    </main>
  );
}
