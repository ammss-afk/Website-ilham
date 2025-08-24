import "./../styles/globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { AppStateProvider } from "@/components/AppState";

export const metadata: Metadata = {
  title: "IndoTrade Global – UMKM Export B2B",
  description: "Marketplace ekspor B2B untuk UMKM Indonesia dan buyer internasional terverifikasi.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <AppStateProvider>
          <Navbar />
          {children}
          <footer className="border-t border-gray-200 bg-white/60 mt-10">
            <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-gray-600 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              <div>© {new Date().getFullYear()} IndoTrade Global • Made for UMKM Indonesia</div>
              <div className="flex flex-wrap gap-3">
                <a className="hover:underline" href="#">Compliance & KYC</a>
                <a className="hover:underline" href="#">Terms</a>
                <a className="hover:underline" href="#">Privacy</a>
                <a className="hover:underline" href="#">Help Center</a>
              </div>
            </div>
          </footer>
        </AppStateProvider>
      </body>
    </html>
  );
}
