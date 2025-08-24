"use client";
import Link from "next/link";
import { Button, cls } from "./ui";
import { useApp } from "./AppState";

export default function Navbar(){
  const { role, setRole, currency, setCurrency } = useApp();
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-blue-600 grid place-content-center text-white font-black">ID</div>
          <div>
            <div className="text-lg font-extrabold tracking-tight">IndoTrade Global</div>
            <div className="text-[11px] text-gray-500 -mt-0.5">Trusted B2B Export for UMKM</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          <Link href="/marketplace"><Button variant="ghost">Marketplace</Button></Link>
          <Link href="/rfq"><Button variant="ghost">RFQ / Order</Button></Link>
          <Link href="/verification"><Button variant="ghost">Buyer Verification</Button></Link>
          <Link href="/dashboard"><Button variant="ghost">Seller Dashboard</Button></Link>
          <Link href="/docs"><Button variant="ghost">Docs</Button></Link>
        </nav>
        <div className="flex items-center gap-2">
          <select value={role} onChange={e=>setRole(e.target.value as any)} className="rounded-xl border border-gray-300 text-sm px-3 py-2">
            <option value="buyer">Buyer</option>
            <option value="seller">Seller (UMKM)</option>
            <option value="guest">Guest</option>
          </select>
          <select value={currency} onChange={e=>setCurrency(e.target.value as any)} className="rounded-xl border border-gray-300 text-sm px-3 py-2">
            <option>USD</option><option>EUR</option><option>IDR</option><option>JPY</option><option>AUD</option>
          </select>
        </div>
      </div>
    </header>
  );
}
