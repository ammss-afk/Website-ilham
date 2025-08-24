"use client";
import { Card, SectionTitle, Button } from "@/components/ui";
import { PAYMENTS } from "@/lib/products";

export default function PaymentsPage(){
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 space-y-6">
      <SectionTitle title="Pembayaran Ekspor" subtitle="Pilih metode pembayaran yang aman untuk transaksi lintas negara." />
      <div className="grid md:grid-cols-3 gap-4">
        {PAYMENTS.map(p => (
          <Card key={p.key} className="p-4 space-y-2">
            <div className="font-semibold">{p.label}</div>
            <div className="text-sm text-gray-600">{p.desc}</div>
            <Button className="w-full" onClick={()=>alert(`Simulasi memilih metode: ${p.label}`)}>Pilih</Button>
          </Card>
        ))}
      </div>
    </main>
  );
}
