"use client";
import { Card, SectionTitle, Button } from "@/components/ui";
import { useApp } from "@/components/AppState";
import { INCOTERMS } from "@/lib/products";

export default function DashboardPage(){
  const { role, addSellerProduct, sellerProducts } = useApp();
  const [form, setForm] = React.useState({ name:"", category:"", priceUSD:"", moq:"", unit:"", hs:"", lead:"", origin:"", incoterms:["FOB"] as string[], fobPort:"" });
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 space-y-6">
      <SectionTitle title="Seller Dashboard (UMKM)" subtitle="Kelola katalog, harga FOB, MOQ, dan lead time." />
      {role !== "seller" && <Card className="p-4 bg-amber-50 border-amber-200"><div className="text-sm text-amber-900">Anda saat ini bukan mode <b>Seller</b>. Ubah role di kanan atas untuk uji coba fitur penjual.</div></Card>}
      <Card className="p-4 grid md:grid-cols-3 gap-4">
        <div className="md:col-span-1 space-y-3">
          <div className="font-semibold">Tambah Produk</div>
          <input className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm" placeholder="Nama produk" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <div className="grid grid-cols-2 gap-2">
            <input className="rounded-xl border border-gray-300 px-3 py-2 text-sm" placeholder="Kategori" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/>
            <input className="rounded-xl border border-gray-300 px-3 py-2 text-sm" placeholder="HS Code" value={form.hs} onChange={e=>setForm({...form,hs:e.target.value})}/>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <input className="rounded-xl border border-gray-300 px-3 py-2 text-sm" placeholder="Harga USD" type="number" value={form.priceUSD} onChange={e=>setForm({...form,priceUSD:e.target.value})}/>
            <input className="rounded-xl border border-gray-300 px-3 py-2 text-sm" placeholder="MOQ" type="number" value={form.moq} onChange={e=>setForm({...form,moq:e.target.value})}/>
            <input className="rounded-xl border border-gray-300 px-3 py-2 text-sm" placeholder="Unit (kg/pcs)" value={form.unit} onChange={e=>setForm({...form,unit:e.target.value})}/>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input className="rounded-xl border border-gray-300 px-3 py-2 text-sm" placeholder="Lead time (hari)" type="number" value={form.lead} onChange={e=>setForm({...form,lead:e.target.value})}/>
            <input className="rounded-xl border border-gray-300 px-3 py-2 text-sm" placeholder="Origin" value={form.origin} onChange={e=>setForm({...form,origin:e.target.value})}/>
          </div>
          <input className="rounded-xl border border-gray-300 px-3 py-2 text-sm" placeholder="FOB Port" value={form.fobPort} onChange={e=>setForm({...form,fobPort:e.target.value})}/>
          <div>
            <label className="text-sm text-gray-600">Incoterms</label>
            <div className="flex flex-wrap gap-2 pt-1">
              {INCOTERMS.map(t => (
                <label key={t} className="text-sm flex items-center gap-1">
                  <input type="checkbox" checked={form.incoterms.includes(t)} onChange={(e)=>{
                    setForm(f=> ({...f, incoterms: e.target.checked ? [...f.incoterms, t] : f.incoterms.filter(x=>x!==t)}));
                  }}/>
                  {t}
                </label>
              ))}
            </div>
          </div>
          <Button onClick={()=>{
            if (!form.name || !form.priceUSD || !form.moq) { alert("Lengkapi minimal nama, harga, MOQ."); return; }
            const p = {
              id: Math.random().toString(36).slice(2),
              name: form.name,
              category: form.category || "Misc",
              hs: form.hs || "-",
              moq: Number(form.moq),
              unit: form.unit || "unit",
              priceUSD: Number(form.priceUSD),
              incoterms: form.incoterms,
              leadTimeDays: Number(form.lead || 14),
              origin: form.origin || "Indonesia",
              fobPort: form.fobPort || "Tanjung Priok (IDTPP)",
              images: ["https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop"],
              specs: {},
              seller: { name: "UMKM Anda", verified: true, city: "-" },
            };
            addSellerProduct(p as any);
            setForm({ name:"", category:"", priceUSD:"", moq:"", unit:"", hs:"", lead:"", origin:"", incoterms:["FOB"], fobPort:"" });
          }} className="w-full">Tambah ke Katalog</Button>
        </div>
        <div className="md:col-span-2">
          <div className="font-semibold mb-2">Katalog Anda</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {sellerProducts.map(p => (
              <Card key={p.id} className="overflow-hidden">
                <img src={p.images[0]} className="h-28 w-full object-cover"/>
                <div className="p-3 text-sm space-y-1">
                  <div className="font-medium line-clamp-1">{p.name}</div>
                  <div className="text-gray-600">${p.priceUSD.toFixed(2)} / {p.unit}</div>
                  <div className="text-xs text-gray-500">MOQ {p.moq} • {p.incoterms.join(", ")}</div>
                </div>
              </Card>
            ))}
            {sellerProducts.length===0 && <div className="text-sm text-gray-500">Belum ada produk. Tambahkan di formulir sebelah kiri.</div>}
          </div>
        </div>
      </Card>
    </main>
  );
}
