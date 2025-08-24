"use client";
import { Card, SectionTitle, Button, Pill } from "@/components/ui";
import { useApp } from "@/components/AppState";
import { COUNTRIES } from "@/lib/products";

export default function VerificationPage(){
  const { buyer, setBuyer, runKYC } = useApp();
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 space-y-6">
      <SectionTitle title="Verifikasi Buyer Internasional" subtitle="Kurangi risiko penipuan dengan proses KYC (Know Your Customer) dan AML screening." />
      <Card className="p-4 grid md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600">Perusahaan</label>
            <input value={buyer.company} onChange={e=>setBuyer({...buyer, company:e.target.value})} className="w-full rounded-xl border border-gray-300 px-3 py-2" placeholder="Company Ltd."/>
          </div>
          <div>
            <label className="text-sm text-gray-600">Negara</label>
            <select value={buyer.country} onChange={e=>setBuyer({...buyer, country:e.target.value})} className="w-full rounded-xl border border-gray-300 px-3 py-2">
              <option value="">Pilih negara</option>
              {COUNTRIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-600">Email Kerja</label>
            <input value={buyer.email} onChange={e=>setBuyer({...buyer, email:e.target.value})} className="w-full rounded-xl border border-gray-300 px-3 py-2" placeholder="name@company.com"/>
          </div>
          <div>
            <label className="text-sm text-gray-600">Website/LinkedIn</label>
            <input value={buyer.website} onChange={e=>setBuyer({...buyer, website:e.target.value})} className="w-full rounded-xl border border-gray-300 px-3 py-2" placeholder="https://…"/>
          </div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={buyer.infoConsent} onChange={e=>setBuyer({...buyer, infoConsent:e.target.checked})}/> Saya menyetujui pemrosesan data untuk keperluan KYC.</label>
          <div className="flex items-center gap-3 pt-2">
            <Button onClick={runKYC}>Jalankan KYC</Button>
            {buyer.status !== "Unverified" && <Pill variant={buyer.status==="Verified"?"green":"orange"}>{buyer.status}</Pill>}
          </div>
        </div>
        <div className="space-y-3">
          <div className="font-semibold">Apa yang kami cek</div>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            <li>Validasi domain email perusahaan (bukan freemail).</li>
            <li>Screening sanksi dan PEP (Politically Exposed Person).</li>
            <li>Verifikasi registrasi bisnis dan alamat.</li>
            <li>Deteksi anomali & skor risiko transaksi.</li>
          </ul>
          <div className="pt-2">
            <div className="font-semibold">Lencana Buyer</div>
            <div className="flex items-center gap-2 text-sm"><span className="text-emerald-600">✓</span> Verified Buyer • batas transaksi lebih tinggi dan akses RFQ cepat</div>
          </div>
        </div>
      </Card>
    </main>
  );
}
