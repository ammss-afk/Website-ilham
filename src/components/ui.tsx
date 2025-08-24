"use client";
import React from "react";

export const cls = (...xs: (string | undefined | null | false)[]) => xs.filter(Boolean).join(" ");

export function Pill({ children, variant = "primary" }:{children:React.ReactNode; variant?: "primary"|"green"|"gray"|"orange"|"red"}){
  const v = {
    primary: "bg-blue-600/10 text-blue-700 border border-blue-600/20",
    green: "bg-emerald-600/10 text-emerald-700 border border-emerald-600/20",
    gray: "bg-gray-600/10 text-gray-700 border border-gray-600/20",
    orange: "bg-orange-600/10 text-orange-700 border border-orange-600/20",
    red: "bg-red-600/10 text-red-700 border border-red-600/20",
  }[variant];
  return <span className={cls("inline-flex items-center px-2 py-1 rounded-full text-xs font-medium", v)}>{children}</span>;
}

export function Button({ children, onClick, variant = "primary", className = "", type = "button", disabled }:
{children:React.ReactNode; onClick?:()=>void; variant?:"primary"|"ghost"|"danger"|"success"|"subtle"; className?:string; type?:"button"|"submit"; disabled?:boolean}){
  const v = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    ghost: "bg-white hover:bg-gray-50 text-gray-900 border border-gray-200",
    danger: "bg-rose-600 hover:bg-rose-700 text-white",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white",
    subtle: "bg-gray-100 hover:bg-gray-200 text-gray-900",
  }[variant];
  return <button type={type} disabled={disabled} onClick={onClick} className={cls("inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed", v, className)}>{children}</button>;
}

export function Card({ children, className = "" }:{children:React.ReactNode; className?:string}){
  return <div className={cls("rounded-2xl border border-gray-200 bg-white shadow-sm", className)}>{children}</div>;
}

export function SectionTitle({ title, subtitle, right }:{title:string; subtitle?:string; right?:React.ReactNode}){
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}
