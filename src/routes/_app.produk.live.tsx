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

export const Route = createFileRoute("/_app/produk/live")({
  head: () => ({ meta: [{ title: "Live Produk — MAQIL.ERP" }] }),
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
            <BreadcrumbPage>Live Produk</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PageHeader
        title="Live Produk"
        description="Produk yang sedang tayang di marketplace."
      />
      <ProductPreviewTable
        statusLabel="Live"
        statusClass="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
      />
    </div>
  ),
});
