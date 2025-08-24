"use client";
import Image from "next/image";
import { Product } from "@/lib/types";
import { Button, Card, Pill } from "./ui";
import { useApp } from "./AppState";
import { convert } from "@/lib/currency";

export default function ProductCard({p}:{p:Product}){
  const { addToRFQ, currency } = useApp();
  const price = convert(p.priceUSD, currency as any).toFixed(2);
  return (
    <Card className="overflow-hidden flex flex-col">
      <div className="relative">
        <Image src={p.images[0]} alt={p.name} width={800} height={320} className="h-40 w-full object-cover"/>
        <div className="absolute top-2 left-2 flex gap-1">
          <Pill>{p.category}</Pill>
          <Pill variant="green">HS {p.hs}</Pill>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold line-clamp-2 pr-2">{p.name}</h3>
          {p.seller.verified ? <span title="Verified seller" className="text-emerald-600">✓</span> : <span className="text-gray-400">•</span>}
        </div>
        <div className="text-sm text-gray-600">{currency}: <span className="font-semibold text-gray-900">{price}</span> / {p.unit}</div>
        <div className="text-xs text-gray-500">MOQ: {p.moq.toLocaleString()} {p.unit} • Lead time: {p.leadTimeDays} hari</div>
        <div className="text-xs text-gray-500">Origin: {p.origin}</div>
        <div className="mt-auto flex gap-2 pt-2">
          <Button onClick={()=>addToRFQ(p)} className="flex-1">Tambah RFQ</Button>
        </div>
      </div>
    </Card>
  );
}
