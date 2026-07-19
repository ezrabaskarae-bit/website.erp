import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/page-header";
import { ProductPreviewTable } from "@/components/common/product-preview-table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const Route = createFileRoute("/_app/produk/arsip")({
  head: () => ({ meta: [{ title: "Arsip Produk — MAQIL.ERP" }] }),
  component: () => (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/produk">Produk</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Arsip Produk</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PageHeader
        title="Arsip Produk"
        description="Produk yang telah diarsipkan."
      />
      <ProductPreviewTable
        statusLabel="Arsip"
        statusClass="bg-slate-500/10 text-slate-600 dark:text-slate-300 hover:bg-slate-500/10"
      />
    </div>
  ),
});
