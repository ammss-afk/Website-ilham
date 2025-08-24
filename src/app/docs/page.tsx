"use client";
import { Card, SectionTitle, Button } from "@/components/ui";
import { useApp } from "@/components/AppState";
import { PRODUCTS } from "@/lib/products";
import { convert } from "@/lib/currency";

function Doc({ title, children }:{title:string; children:React.ReactNode}){
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-bold">{title}</div>
        <Button onClick={()=>window.print()} variant="ghost">Print</Button>
      </div>
      <div className="prose max-w-none">{children}</div>
    </Card>
  );
}

export default function DocsPage(){
  const { cart, buyer, currency } = useApp();
  const rows = cart.length ? cart : [{ id: PRODUCTS[0].id, qty: PRODUCTS[0].moq, incoterm: "FOB" }];
  const items = rows.map(r => ({...r, product: PRODUCTS.find(p=>p.id===r.id)!}));
  const totalUSD = items.reduce((s,i)=> s + i.product.priceUSD * i.qty, 0);
  const totalDisplay = convert(totalUSD, currency as any).toFixed(2);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 space-y-6">
      <SectionTitle title="Dokumen Ekspor" subtitle="Cetak Proforma Invoice / Commercial Invoice / Packing List." />
      <Doc title="Proforma / Commercial Invoice">
        <div className="text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="font-semibold">Seller:</div>
              <div>IndoTrade Global (UMKM Aggregator)</div>
              <div>Jakarta, Indonesia</div>
            </div>
            <div>
              <div className="font-semibold">Buyer:</div>
              <div>{buyer.company || "—"}</div>
              <div>{buyer.country || "—"}</div>
              <div>{buyer.email || "—"}</div>
            </div>
          </div>
          <table className="w-full mt-4 text-xs">
            <thead><tr className="text-left border-b"><th>Product</th><th>HS</th><th>Qty</th><th>Unit</th><th>Unit Price (USD)</th><th>Amount (USD)</th></tr></thead>
            <tbody>
              {items.map((i,idx)=> (
                <tr key={idx} className="border-b">
                  <td>{i.product.name}</td>
                  <td>{i.product.hs}</td>
                  <td>{i.qty}</td>
                  <td>{i.product.unit}</td>
                  <td>${i.product.priceUSD.toFixed(2)}</td>
                  <td>${(i.product.priceUSD * i.qty).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-end mt-3 text-sm">
            <div>Total: <b>USD {totalUSD.toFixed(2)}</b> ({currency} {totalDisplay})</div>
          </div>
          <div className="mt-4 text-xs text-gray-600">Incoterm: {items[0].incoterm} • Payment: Escrow / L/C / T/T</div>
        </div>
      </Doc>
    </main>
  );
}
