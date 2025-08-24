# IndoTrade Global – UMKM B2B Export (Demo Production-Ready)

Versi ini memecah single-file React menjadi **Next.js + Tailwind** dengan struktur folder yang rapi dan siap dikembangkan.

## Menjalankan

```bash
npm install
npm run dev
# buka http://localhost:3000
```

## Teknologi
- Next.js (App Router)
- TypeScript
- TailwindCSS

## Catatan
- Data dan verifikasi masih **simulasi lokal**. Siap diintegrasikan ke:
  - Payment Gateway (Midtrans/Xendit/Stripe)
  - KYC (Sumsub/Trulioo/Persona/Onfido)
  - Freight api (estimasi CIF riil) & dokumentasi (BL/COO)
- State disimpan di `localStorage` agar tetap ada antar refresh.

Lisensi: MIT – Bebas digunakan & dikembangkan untuk kebutuhan usaha Anda.
