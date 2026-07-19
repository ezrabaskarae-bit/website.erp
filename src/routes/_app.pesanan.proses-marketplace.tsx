import { createFileRoute } from "@tanstack/react-router";
import { PesananList } from "@/components/common/pesanan-list";

export const Route = createFileRoute("/_app/pesanan/proses-marketplace")({
  head: () => ({ meta: [{ title: "Sedang Diproses Marketplace — MAQIL.ERP" }] }),
  component: () => (
    <PesananList
      title="Sedang Diproses Marketplace"
      description="Pesanan yang masih dalam antrean sistem marketplace."
      statusLabel="Diproses Marketplace"
      statusClass="bg-slate-500/10 text-slate-600 dark:text-slate-300 hover:bg-slate-500/10"
      actions={[
        { label: "Refresh Status", variant: "default" },
        { label: "Aksi Massal", variant: "outline" },
      ]}
    />
  ),
});
