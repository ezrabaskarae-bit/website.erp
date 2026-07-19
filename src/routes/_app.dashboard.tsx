import { createFileRoute } from "@tanstack/react-router";
import { Package, ShoppingCart, Boxes, Store, Truck, CalendarDays, Zap, Layers, Activity, Clock3 } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getDashboardData } from "@/lib/dashboard-store";
import { DashboardCardAction } from "@/lib/dashboard-navigation.tsx";

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
  const data = getDashboardData();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Selamat Datang di MAQIL ERP"
        description="Ringkasan singkat operasional Anda hari ini."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCardAction action="totalProducts">
          <StatCard
            label="Total Produk"
            value={data.totalProducts.toString()}
            hint="Jumlah produk hasil sinkronisasi"
            icon={Package}
          />
        </DashboardCardAction>
        <DashboardCardAction action="totalMasterSkus">
          <StatCard
            label="Total Master SKU"
            value={data.totalMasterSkus.toString()}
            hint="Jumlah Master SKU ERP"
            icon={Layers}
          />
        </DashboardCardAction>
        <DashboardCardAction action="totalUnmappedSkus">
          <StatCard
            label="Total SKU Belum Mapping"
            value={data.totalUnmappedSkus.toString()}
            hint="SKU marketplace tanpa Master SKU"
            icon={Zap}
          />
        </DashboardCardAction>
        <DashboardCardAction action="ordersToday">
          <StatCard
            label="Total Pesanan Hari Ini"
            value={data.totalOrdersToday.toString()}
            hint="Pesanan dengan tanggal hari ini"
            icon={CalendarDays}
          />
        </DashboardCardAction>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCardAction action="ordersPendingProcessing">
          <StatCard
            label="Pesanan Menunggu Diproses"
            value={data.ordersPendingProcessing.toString()}
            icon={ShoppingCart}
          />
        </DashboardCardAction>
        <DashboardCardAction action="ordersPendingPickup">
          <StatCard
            label="Pesanan Menunggu Pickup"
            value={data.ordersPendingPickup.toString()}
            icon={Truck}
          />
        </DashboardCardAction>
        <DashboardCardAction action="totalWarehouseStock">
          <StatCard
            label="Total Stok Gudang"
            value={data.totalWarehouseStock.toLocaleString("id-ID")}
            hint="Total stock pada gudang mock"
            icon={Boxes}
          />
        </DashboardCardAction>
        <DashboardCardAction action="skusLowStock">
          <StatCard
            label="SKU Hampir Habis"
            value={data.skusLowStock.toString()}
            hint="Stok di bawah batas minimum"
            icon={Activity}
          />
        </DashboardCardAction>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCardAction action="activeMarketplaces">
          <StatCard
            label="Marketplace Aktif"
            value={data.activeMarketplaces.toString()}
            hint={data.marketplaceList.join(", ")}
            icon={Store}
          />
        </DashboardCardAction>
        <DashboardCardAction action="lastSyncAt">
          <StatCard
            label="Sinkronisasi Terakhir"
            value={data.lastSyncAt}
            icon={Clock3}
          />
        </DashboardCardAction>
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
