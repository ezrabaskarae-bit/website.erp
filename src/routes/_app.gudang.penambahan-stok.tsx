import { createFileRoute } from "@tanstack/react-router";
import { StockPageLayout } from "@/components/common/stock-page-layout";

export const Route = createFileRoute("/_app/gudang/penambahan-stok")({
  head: () => ({ meta: [{ title: "Penambahan Stok — MAQIL.ERP" }] }),
  component: () => (
    <StockPageLayout
      title="Penambahan Stok"
      description="Catat penambahan stok masuk ke gudang."
      actionLabel="Tambah Penambahan Stok"
      searchPlaceholder="Cari no. dokumen atau SKU..."
      columns={[
        { key: "no", label: "No. Dokumen" },
        { key: "tanggal", label: "Tanggal" },
        { key: "gudang", label: "Gudang" },
        { key: "sku", label: "Total SKU" },
        { key: "qty", label: "Total Qty", className: "text-right" },
        { key: "catatan", label: "Catatan" },
      ]}
    />
  ),
});
