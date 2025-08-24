"use client";
import { Button, Card, Pill } from "@/components/ui";
import Link from "next/link";
import { useApp } from "@/components/AppState";

export default function HomePage(){
  const { isBuyerVerified } = useApp();
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-10 flex flex-col gap-4">
            <Pill>Cross-border B2B • Export Ready</Pill>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              Hub UMKM Indonesia ↔ Buyer Internasional Terverifikasi
            </h1>
            <p className="text-gray-600">
              Kelola transaksi ekspor dengan aman: verifikasi buyer, RFQ/PO, incoterms,
              metode pembayaran (Escrow, L/C, T/T), dan pelacakan pesanan—semua dalam satu platform.
            </p>
            <div className="flex gap-2">
              <Link href="/marketplace"><Button>Jelajahi Produk</Button></Link>
              <Link href="/verification"><Button variant="ghost">Verifikasi Buyer</Button></Link>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <Pill variant="green">Secure Escrow</Pill>
              <Pill variant="orange">Incoterms 2020</Pill>
              {isBuyerVerified ? <Pill variant="green">Buyer Verified</Pill> : <Pill variant="gray">Buyer Unverified</Pill>}
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-emerald-50 p-8 md:p-10">
            <ul className="grid grid-cols-2 gap-3 text-sm">
              <li className="p-4 bg-white/70 rounded-2xl border border-gray-200"><div className="font-semibold">Pembayaran</div><div className="text-gray-600">Escrow • L/C • T/T</div></li>
              <li className="p-4 bg-white/70 rounded-2xl border border-gray-200"><div className="font-semibold">Incoterms</div><div className="text-gray-600">FOB • CIF • EXW</div></li>
              <li className="p-4 bg-white/70 rounded-2xl border border-gray-200"><div className="font-semibold">Pelabuhan</div><div className="text-gray-600">IDTPP • IDSRG • IDBIT</div></li>
              <li className="p-4 bg-white/70 rounded-2xl border border-gray-200"><div className="font-semibold">Dokumen</div><div className="text-gray-600">Invoice • BL • COO • Phyto</div></li>
            </ul>
          </div>
        </div>
      </Card>
    </section>
  );
}
