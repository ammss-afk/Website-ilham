"use client";
import { useMemo } from "react";
import { Card, SectionTitle, Button, Pill } from "@/components/ui";
import { useApp } from "@/components/AppState";
import { PRODUCTS, PAYMENTS } from "@/lib/products";
import { convert } from "@/lib/currency";

export default function RFQPage(){
  const { cart, updateCart, removeFromCart, buyer, isBuyerVerified, currency } = useApp();
  const totalFOBUSD = useMemo(()=> cart.reduce((sum,i)=>{
    const p = PRODUCTS.find(x=>x.id===i.id);
    return sum + (p?.priceUSD || 0) * i.qty;
  },0), [cart]);
  const totalDisplay = convert(totalFOBUSD, currency as any).toFixed(2);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 space-y-6">
      <SectionTitle title="RFQ & Purchase Order" subtitle="Buat permintaan penawaran (RFQ), negosiasi, dan lanjutkan ke PO dengan metode pembayaran yang aman." />
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="p-4 lg:col-span-2">
          {cart.length===0 ? <div className="text-gray-500 text-sm">Keranjang RFQ kosong. Tambahkan produk dari marketplace.</div> : (
            <div className="space-y-3">
              {cart.map(i => {
                const p = PRODUCTS.find(x=>x.id===i.id)!;
                const unitPrice = convert(p.priceUSD, currency as any).toFixed(2);
                return (
                  <div key={i.id} className="grid grid-cols-12 gap-3 items-center border-b pb-3">
                    <div className="col-span-7">
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-gray-500">{currency} {unitPrice}/{p.unit} • HS {p.hs}</div>
                    </div>
                    <div className="col-span-2">
                      <input type="number" min={p.moq} value={i.qty} onChange={e=>updateCart(i.id,{qty:Number(e.target.value)})} className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"/>
                      <div className="text-[10px] text-gray-500">MOQ {p.moq} {p.unit}</div>
                    </div>
                    <div className="col-span-2">
                      <select value={i.incoterm} onChange={e=>updateCart(i.id,{incoterm:e.target.value})} className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm">
                        {p.incoterms.map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className="col-span-1 text-right">
                      <button onClick={()=>removeFromCart(i.id)} className="text-rose-600 text-sm">Hapus</button>
                    </div>
                  </div>
                )
              })}
              <div className="flex items-center justify-between pt-2">
                <div className="text-sm text-gray-600">Estimasi total FOB</div>
                <div className="text-lg font-bold">{currency} {totalDisplay}</div>
              </div>
            </div>
          )}
        </Card>
        <Card className="p-4 space-y-3">
          <div className="font-semibold">Detail Buyer</div>
          <div className="text-sm">Status: {" "}
            {buyer.status === "Verified" ? <Pill variant="green">Verified</Pill> : buyer.status === "In Review" ? <Pill variant="orange">In Review</Pill> : <Pill variant="gray">Unverified</Pill>}
          </div>
          <div className="text-xs text-gray-500">{buyer.company ? `${buyer.company} • ${buyer.country}` : "Lengkapi verifikasi untuk memesan."}</div>
          <div className="pt-2">
            <div className="font-semibold mb-1">Metode Pembayaran</div>
            <ul className="space-y-2">
              {PAYMENTS.map(p => (
                <li key={p.key} className="rounded-xl border border-gray-200 p-3">
                  <div className="font-medium">{p.label}</div>
                  <div className="text-sm text-gray-600">{p.desc}</div>
                </li>
              ))}
            </ul>
          </div>
          <Button onClick={()=>{
            if (!isBuyerVerified){ alert("Buyer belum terverifikasi. Selesaikan verifikasi dulu."); return; }
            if (cart.length===0){ alert("RFQ kosong."); return; }
            alert("RFQ dikirim ke penjual. Terima kasih!");
          }} disabled={cart.length===0} className="w-full">Kirim RFQ</Button>
          <div className="text-[11px] text-gray-500">Dengan mengirim RFQ, Anda menyetujui Syarat & Kebijakan dan memberikan izin menghubungkan Anda dengan penjual terkait.</div>
        </Card>
      </div>
    </main>
  );
}
