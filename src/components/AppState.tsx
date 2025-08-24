"use client";
import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import {CartItem, Buyer, Product} from "@/lib/types";
import {PRODUCTS} from "@/lib/products";

type AppState = {
  role: "buyer"|"seller"|"guest";
  setRole: (r: "buyer"|"seller"|"guest")=>void;

  currency: "USD"|"EUR"|"IDR"|"JPY"|"AUD";
  setCurrency: (c: any)=>void;

  products: Product[];
  sellerProducts: Product[];
  addSellerProduct: (p: Product)=>void;

  cart: CartItem[];
  addToRFQ: (p: Product)=>void;
  updateCart: (id:string, patch: Partial<CartItem>)=>void;
  removeFromCart: (id:string)=>void;

  buyer: Buyer;
  setBuyer: (b: Buyer)=>void;
  runKYC: ()=>void;
  isBuyerVerified: boolean;
};

const Ctx = createContext<AppState | null>(null);

export function AppStateProvider({children}:{children:React.ReactNode}){
  const [role, setRole] = useState<"buyer"|"seller"|"guest">("buyer");
  const [currency, setCurrency] = useState<"USD"|"EUR"|"IDR"|"JPY"|"AUD">("USD");
  const [sellerProducts, setSellerProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [buyer, setBuyer] = useState<Buyer>({company:"",country:"",email:"",website:"",status:"Unverified",infoConsent:false});

  useEffect(()=>{
    // hydrate from localStorage
    try {
      const s = localStorage.getItem("itg_state");
      if (s){
        const parsed = JSON.parse(s);
        setRole(parsed.role || "buyer");
        setCurrency(parsed.currency || "USD");
        setSellerProducts(parsed.sellerProducts || []);
        setCart(parsed.cart || []);
        setBuyer(parsed.buyer || {company:"",country:"",email:"",website:"",status:"Unverified",infoConsent:false});
      }
    } catch {}
  }, []);

  useEffect(()=>{
    // persist
    const state = {role, currency, sellerProducts, cart, buyer};
    localStorage.setItem("itg_state", JSON.stringify(state));
  }, [role, currency, sellerProducts, cart, buyer]);

  const products = useMemo(()=>[...sellerProducts, ...PRODUCTS], [sellerProducts]);

  function addSellerProduct(p: Product){
    setSellerProducts(prev => [p, ...prev]);
  }

  function addToRFQ(p: Product){
    setCart(prev => prev.find(x=>x.id===p.id) ? prev : [...prev, {id:p.id, qty:p.moq, incoterm:p.incoterms[0]}]);
  }
  function updateCart(id:string, patch: Partial<CartItem>){
    setCart(prev => prev.map(i => i.id===id ? {...i, ...patch} : i));
  }
  function removeFromCart(id:string){ setCart(prev => prev.filter(i => i.id!==id)); }

  function runKYC(){
    if (!buyer.company || !buyer.country || !buyer.email || !buyer.infoConsent){
      alert("Lengkapi data & centang persetujuan privasi terlebih dahulu.");
      return;
    }
    setBuyer({...buyer, status:"In Review"});
    setTimeout(()=> setBuyer(b => ({...b, status:"Verified"})), 1000);
  }

  const isBuyerVerified = buyer.status === "Verified";

  return <Ctx.Provider value={{role,setRole,currency,setCurrency,products,sellerProducts,addSellerProduct,cart,addToRFQ,updateCart,removeFromCart,buyer,setBuyer,runKYC,isBuyerVerified}}>{children}</Ctx.Provider>
}

export function useApp(){ const ctx = useContext(Ctx); if(!ctx) throw new Error("useApp must be used within AppStateProvider"); return ctx; }
