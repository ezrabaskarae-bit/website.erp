import { createFileRoute } from "@tanstack/react-router";
import { Package, ShoppingCart, Boxes, Store } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — MAQIL.ERP" },
      { name: "description", content: "Ringkasan operasional MAQIL.ERP." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Selamat Datang di MAQIL ERP"
        description="Ringkasan singkat operasional Anda hari ini."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Produk" value="—" hint="Placeholder" icon={Package} />
        <StatCard label="Pesanan Hari Ini" value="—" hint="Placeholder" icon={ShoppingCart} />
        <StatCard label="Stok Rendah" value="—" hint="Placeholder" icon={Boxes} />
        <StatCard label="Marketplace Aktif" value="4" hint="Shopee, Tokopedia, TikTok, Lazada" icon={Store} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h2 className="text-base font-semibold">Aktivitas Terbaru</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Belum ada data. Bagian ini akan menampilkan aktivitas terbaru dari sistem.
            </p>
            <div className="mt-6 grid h-40 place-items-center rounded-lg border border-dashed text-xs text-muted-foreground">
              Placeholder area
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-base font-semibold">Status Sinkronisasi</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {["Shopee", "Tokopedia", "TikTok Shop", "Lazada"].map((m) => (
                <li key={m} className="flex items-center justify-between">
                  <span>{m}</span>
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
                    Connected
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
