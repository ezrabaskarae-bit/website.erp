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

export const Route = createFileRoute("/_app/produk/draft")({
  head: () => ({ meta: [{ title: "Draft Produk — MAQIL.ERP" }] }),
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
            <BreadcrumbPage>Draft Produk</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PageHeader
        title="Draft Produk"
        description="Produk yang belum dipublikasikan."
      />
      <ProductPreviewTable
        statusLabel="Draft"
        statusClass="bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
      />
    </div>
  ),
});
