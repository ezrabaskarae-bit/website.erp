import { createFileRoute } from "@tanstack/react-router";
import { StockPageLayout } from "@/components/common/stock-page-layout";

export const Route = createFileRoute("/_app/gudang/stock-opname")({
  head: () => ({ meta: [{ title: "Stock Opname — MAQIL.ERP" }] }),
  component: () => (
    <StockPageLayout
      title="Stock Opname"
      description="Lakukan penyesuaian stok fisik dengan sistem."
      actionLabel="Mulai Stock Opname"
      searchPlaceholder="Cari no. opname atau petugas..."
      columns={[
        { key: "no", label: "No. Opname" },
        { key: "tanggal", label: "Tanggal" },
        { key: "gudang", label: "Gudang" },
        { key: "petugas", label: "Petugas" },
        { key: "selisih", label: "Selisih", className: "text-right" },
        { key: "status", label: "Status" },
      ]}
    />
  ),
});
