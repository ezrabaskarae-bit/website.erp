import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, TrendingUp, ShoppingCart, DollarSign } from "lucide-react";

export const Route = createFileRoute("/_app/laporan")({
  head: () => ({ meta: [{ title: "Laporan — MAQIL.ERP" }] }),
  component: () => (
    <div className="space-y-6">
      <PageHeader title="Laporan" description="Ringkasan performa bisnis." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Penjualan" value="—" icon={DollarSign} />
        <StatCard label="Pesanan" value="—" icon={ShoppingCart} />
        <StatCard label="Pertumbuhan" value="—" icon={TrendingUp} />
        <StatCard label="Rata-rata Order" value="—" icon={BarChart3} />
      </div>
      <Card>
        <CardContent className="p-6">
          <h2 className="text-base font-semibold">Grafik Penjualan</h2>
          <div className="mt-4 grid h-64 place-items-center rounded-lg border border-dashed text-xs text-muted-foreground">
            Placeholder grafik
          </div>
        </CardContent>
      </Card>
    </div>
  ),
});
