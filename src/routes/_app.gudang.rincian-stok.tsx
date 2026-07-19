import { createFileRoute } from "@tanstack/react-router";
import { MarketplaceFilter, StockPageLayout } from "@/components/common/stock-page-layout";

export const Route = createFileRoute("/_app/gudang/rincian-stok")({
  head: () => ({ meta: [{ title: "Rincian Stok — MAQIL.ERP" }] }),
  component: () => (
    <StockPageLayout
      title="Rincian Stok"
      description="Rincian stok per SKU di setiap gudang."
      searchPlaceholder="Cari nama produk atau SKU..."
      showDateFilter={false}
      extraFilter={<MarketplaceFilter />}
      columns={[
        { key: "sku", label: "SKU" },
        { key: "produk", label: "Nama Produk" },
        { key: "gudang", label: "Gudang" },
        { key: "marketplace", label: "Marketplace" },
        { key: "tersedia", label: "Tersedia", className: "text-right" },
        { key: "dipesan", label: "Dipesan", className: "text-right" },
        { key: "total", label: "Total Stok", className: "text-right" },
      ]}
    />
  ),
});
