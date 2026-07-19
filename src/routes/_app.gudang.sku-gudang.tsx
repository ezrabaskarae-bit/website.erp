import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Plus,
  Search,
  Upload,
  Download,
  Pencil,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ProductCell } from "@/components/common/product-cell";
import { productImageBySku } from "@/data/products";

export const Route = createFileRoute("/_app/gudang/sku-gudang")({
  head: () => ({ meta: [{ title: "SKU Gudang — MAQIL.ERP" }] }),
  component: SkuGudangPage,
});

type SkuRow = {
  id: string;
  sku: string;
  name: string;
  category: string;
  linkedStoreSku: number;
  modal: number;
  price: number;
  stock: number;
  weight: string;
  note: string;
  updatedAt: string;
};

const rows: SkuRow[] = [
  {
    id: "1",
    sku: "MSKU-000101",
    name: "Kemeja Linen Premium Hitam L",
    category: "Fashion Pria",
    linkedStoreSku: 4,
    modal: 145000,
    price: 289000,
    stock: 128,
    weight: "350 g",
    note: "Best seller Q4",
    updatedAt: "18 Jul 2026",
  },
  {
    id: "2",
    sku: "MSKU-000102",
    name: "Celana Chino Stretch Khaki 32",
    category: "Fashion Pria",
    linkedStoreSku: 3,
    modal: 120000,
    price: 245000,
    stock: 54,
    weight: "420 g",
    note: "-",
    updatedAt: "17 Jul 2026",
  },
  {
    id: "3",
    sku: "MSKU-000103",
    name: "Sneakers Kanvas Putih 41",
    category: "Sepatu",
    linkedStoreSku: 4,
    modal: 210000,
    price: 399000,
    stock: 0,
    weight: "800 g",
    note: "Restock 25 Jul",
    updatedAt: "15 Jul 2026",
  },
  {
    id: "4",
    sku: "MSKU-000104",
    name: "Tas Ransel Laptop 15\" Hitam",
    category: "Tas",
    linkedStoreSku: 2,
    modal: 175000,
    price: 349000,
    stock: 87,
    weight: "950 g",
    note: "-",
    updatedAt: "14 Jul 2026",
  },
  {
    id: "5",
    sku: "MSKU-000105",
    name: "Kaos Polos Cotton Combed Grey M",
    category: "Fashion Pria",
    linkedStoreSku: 5,
    modal: 32000,
    price: 79000,
    stock: 340,
    weight: "180 g",
    note: "Promo bundling",
    updatedAt: "12 Jul 2026",
  },
];

const idr = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

function SkuGudangPage() {
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("all");
  const [gudang, setGudang] = useState("all");
  const [status, setStatus] = useState("all");

  const filtered = rows.filter((r) => {
    if (kategori !== "all" && r.category !== kategori) return false;
    if (status === "in" && r.stock <= 0) return false;
    if (status === "out" && r.stock > 0) return false;
    if (
      search &&
      !r.name.toLowerCase().includes(search.toLowerCase()) &&
      !r.sku.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/gudang/penambahan-stok">Gudang</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>SKU Gudang</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PageHeader
        title="SKU Gudang"
        description="Master SKU untuk sinkronisasi stok lintas marketplace."
        actions={
          <>
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <Upload className="h-4 w-4" />
              Import
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              Tambah SKU Gudang
            </Button>
          </>
        }
      />

      <Card className="p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nomor atau nama SKU..."
              className="h-10 pl-9"
            />
          </div>
          <Select value={kategori} onValueChange={setKategori}>
            <SelectTrigger className="h-10 w-full sm:w-48">
              <SelectValue placeholder="Semua Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kategori</SelectItem>
              <SelectItem value="Fashion Pria">Fashion Pria</SelectItem>
              <SelectItem value="Sepatu">Sepatu</SelectItem>
              <SelectItem value="Tas">Tas</SelectItem>
            </SelectContent>
          </Select>
          <Select value={gudang} onValueChange={setGudang}>
            <SelectTrigger className="h-10 w-full sm:w-44">
              <SelectValue placeholder="Semua Gudang" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Gudang</SelectItem>
              <SelectItem value="utama">Gudang Utama</SelectItem>
              <SelectItem value="cabang">Gudang Cabang</SelectItem>
              <SelectItem value="retur">Gudang Retur</SelectItem>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="h-10 w-full sm:w-40">
              <SelectValue placeholder="Semua Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="in">Tersedia</SelectItem>
              <SelectItem value="out">Habis</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="min-w-[320px]">Produk</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead className="text-right">Hubungan SKU Toko</TableHead>
                <TableHead className="text-right">Modal</TableHead>
                <TableHead className="text-right">Harga Jual</TableHead>
                <TableHead className="text-right">Total Stok</TableHead>
                <TableHead>Berat / Ukuran</TableHead>
                <TableHead>Catatan</TableHead>
                <TableHead>Terakhir Update</TableHead>
                <TableHead className="w-20 text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="py-14 text-center text-sm text-muted-foreground"
                  >
                    Tidak ada SKU yang cocok dengan filter.
                  </TableCell>
                </TableRow>
              )}
              {filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>
                    <ProductCell
                      productName={r.name}
                      masterSku={r.sku}
                      imageUrl={productImageBySku(r.sku)}
                      marketplaceCount={r.linkedStoreSku}
                    />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {r.category}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary">{r.linkedStoreSku} toko</Badge>
                  </TableCell>
                  <TableCell className="text-right text-sm tabular-nums text-muted-foreground">
                    {idr(r.modal)}
                  </TableCell>
                  <TableCell className="text-right text-sm tabular-nums text-foreground">
                    {idr(r.price)}
                  </TableCell>
                  <TableCell className="text-right text-sm tabular-nums">
                    <span
                      className={
                        r.stock === 0
                          ? "font-medium text-rose-600 dark:text-rose-400"
                          : r.stock < 25
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-foreground"
                      }
                    >
                      {r.stock}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {r.weight}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {r.note}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {r.updatedAt}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
                          <DropdownMenuItem>Hubungkan SKU Toko</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            <Trash2 className="h-4 w-4" />
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
