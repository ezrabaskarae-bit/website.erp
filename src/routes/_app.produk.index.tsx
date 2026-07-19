import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  Copy,
  Trash2,
  MoreHorizontal,
  Download,
  Upload,
  RefreshCw,
  Sparkles,
  Settings2,
} from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ProductCell } from "@/components/common/product-cell";
import { CreateMasterSkuDialog } from "@/components/common/create-master-sku-dialog";
import { masterProducts, productImageBySku, type MasterProduct } from "@/data/products";

export const Route = createFileRoute("/_app/produk/")({
  head: () => ({ meta: [{ title: "Produk — MAQIL.ERP" }] }),
  component: ProdukPage,
});

type ProductStatus = "Aktif" | "Draft" | "Habis" | "Arsip";

type Product = {
  id: string;
  productId: string;
  name: string;
  parentSku: string;
  variantSku: string;
  marketplace: "Shopee" | "Tokopedia" | "TikTok Shop" | "Lazada";
  store: string;
  price: number;
  promoPrice: number | null;
  stock: number;
  status: ProductStatus;
  syncStatus: "created" | "not_activated";
};

const products: Product[] = [
  {
    id: "1",
    productId: "PRD-000112",
    name: "Kemeja Linen Premium Lengan Panjang Slim Fit",
    parentSku: "KLP-001",
    variantSku: "KLP-001-BLK-L",
    marketplace: "Shopee",
    store: "Maqil Official Store",
    price: 289000,
    promoPrice: 219000,
    stock: 128,
    syncStatus: "created",
    status: "Aktif",
  },
  {
    id: "2",
    productId: "PRD-000113",
    name: "Celana Chino Stretch Regular Fit",
    parentSku: "CCS-014",
    variantSku: "CCS-014-KHK-32",
    marketplace: "Tokopedia",
    store: "Maqil Fashion",
    price: 245000,
    promoPrice: null,
    stock: 54,
    syncStatus: "not_activated",
    status: "Aktif",
  },
  {
    id: "3",
    productId: "PRD-000114",
    name: "Sepatu Sneakers Kanvas Low Top Unisex",
    parentSku: "SSK-208",
    variantSku: "SSK-208-WHT-41",
    marketplace: "TikTok Shop",
    store: "Maqil Sport",
    price: 399000,
    promoPrice: 349000,
    stock: 0,
    syncStatus: "created",
    status: "Habis",
  },
  {
    id: "4",
    productId: "PRD-000115",
    name: "Jaket Bomber Waterproof Musim Hujan",
    parentSku: "JBW-032",
    variantSku: "JBW-032-NAV-XL",
    marketplace: "Lazada",
    store: "Maqil Outdoor",
    price: 525000,
    promoPrice: 459000,
    stock: 22,
    syncStatus: "not_activated",
    status: "Draft",
  },
  {
    id: "5",
    productId: "PRD-000116",
    name: "Tas Ransel Laptop 15 Inch Anti Air",
    parentSku: "TRL-077",
    variantSku: "TRL-077-BLK-STD",
    marketplace: "Shopee",
    store: "Maqil Official Store",
    price: 349000,
    promoPrice: null,
    stock: 87,
    syncStatus: "not_activated",
    status: "Aktif",
  },
  {
    id: "6",
    productId: "PRD-000117",
    name: "Kaos Polos Cotton Combed 30s Basic",
    parentSku: "KPC-004",
    variantSku: "KPC-004-GRY-M",
    marketplace: "Tokopedia",
    store: "Maqil Fashion",
    price: 79000,
    promoPrice: 59000,
    stock: 340,
    syncStatus: "not_activated",
    status: "Aktif",
  },
  {
    id: "7",
    productId: "PRD-000118",
    name: "Jam Tangan Analog Kulit Klasik",
    parentSku: "JTA-091",
    variantSku: "JTA-091-BRN-STD",
    marketplace: "TikTok Shop",
    store: "Maqil Accessories",
    price: 459000,
    promoPrice: null,
    stock: 15,
    syncStatus: "created",
    status: "Arsip",
  },
  {
    id: "8",
    productId: "PRD-000119",
    name: "Topi Baseball Adjustable Embroidery",
    parentSku: "TBA-045",
    variantSku: "TBA-045-BLK-STD",
    marketplace: "Lazada",
    store: "Maqil Accessories",
    price: 89000,
    promoPrice: 69000,
    stock: 210,
    syncStatus: "not_activated",
    status: "Aktif",
  },
];

const tabs: { value: string; label: string; count: number }[] = [
  { value: "all", label: "Semua", count: products.length },
  { value: "active", label: "Aktif", count: products.filter((p) => p.status === "Aktif").length },
  { value: "draft", label: "Draft", count: products.filter((p) => p.status === "Draft").length },
  { value: "out", label: "Habis", count: products.filter((p) => p.status === "Habis").length },
  { value: "archived", label: "Arsip", count: products.filter((p) => p.status === "Arsip").length },
];

const statusStyle: Record<ProductStatus, string> = {
  Aktif: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10",
  Draft: "bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10",
  Habis: "bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10",
  Arsip: "bg-slate-500/10 text-slate-600 dark:text-slate-300 hover:bg-slate-500/10",
};

const marketplaceStyle: Record<Product["marketplace"], string> = {
  Shopee: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  Tokopedia: "bg-green-500/10 text-green-600 dark:text-green-400",
  "TikTok Shop": "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400",
  Lazada: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
};

const marketplaceInitial: Record<Product["marketplace"], string> = {
  Shopee: "S",
  Tokopedia: "T",
  "TikTok Shop": "TT",
  Lazada: "L",
};

const idr = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

function ProdukPage() {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [marketplace, setMarketplace] = useState("all");
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = products.filter((p) => {
    if (tab === "active" && p.status !== "Aktif") return false;
    if (tab === "draft" && p.status !== "Draft") return false;
    if (tab === "out" && p.status !== "Habis") return false;
    if (tab === "archived" && p.status !== "Arsip") return false;
    if (marketplace !== "all" && p.marketplace !== marketplace) return false;
    if (
      search &&
      !p.name.toLowerCase().includes(search.toLowerCase()) &&
      !p.productId.toLowerCase().includes(search.toLowerCase()) &&
      !p.parentSku.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  const allChecked = filtered.length > 0 && filtered.every((p) => selected.includes(p.id));
  const someChecked = filtered.some((p) => selected.includes(p.id)) && !allChecked;

  const toggleAll = () => {
    if (allChecked) {
      setSelected((s) => s.filter((id) => !filtered.some((p) => p.id === id)));
    } else {
      setSelected((s) => Array.from(new Set([...s, ...filtered.map((p) => p.id)])));
    }
  };

  const toggleOne = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const [dialogProduct, setDialogProduct] = useState<MasterProduct | null>(null);
  const [dialogMode, setDialogMode] = useState<"create" | "manage">("create");

  const openMasterSkuDialog = (p: Product) => {
    const source =
      masterProducts.find((m) => m.id === p.id) ?? masterProducts[0];
    setDialogProduct({ ...source, name: p.name, imageUrl: productImageBySku(p.parentSku) });
    setDialogMode(p.syncStatus === "created" ? "manage" : "create");
  };

  return (
    <TooltipProvider delayDuration={150}>
      <div className="space-y-6">
        <PageHeader
          title="Produk"
          description="Produk yang tersinkronisasi dari marketplace. Aktifkan menjadi Master SKU untuk mulai mengelola stok."
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
              <Button size="sm" onClick={() => toast.success("Sinkronisasi dijadwalkan (mock)")}>
                <RefreshCw className="h-4 w-4" />
                Sinkron dari Marketplace
              </Button>
            </>
          }
        />


        {/* Toolbar */}
        <Card className="p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama produk, ID, atau SKU..."
                className="h-10 pl-9"
              />
            </div>
            <Select value={marketplace} onValueChange={setMarketplace}>
              <SelectTrigger className="h-10 w-full sm:w-52">
                <SelectValue placeholder="Semua Marketplace" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Marketplace</SelectItem>
                <SelectItem value="Shopee">Shopee</SelectItem>
                <SelectItem value="Tokopedia">Tokopedia</SelectItem>
                <SelectItem value="TikTok Shop">TikTok Shop</SelectItem>
                <SelectItem value="Lazada">Lazada</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Tabs + Table */}
        <Card className="overflow-hidden">
          <Tabs value={tab} onValueChange={setTab}>
            <div className="border-b px-2 sm:px-4">
              <TabsList className="h-auto w-full justify-start gap-1 rounded-none bg-transparent p-0">
                {tabs.map((t) => (
                  <TabsTrigger
                    key={t.value}
                    value={t.value}
                    className="relative rounded-none border-b-2 border-transparent bg-transparent px-3 py-3 text-sm font-medium text-muted-foreground shadow-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
                  >
                    {t.label}
                    <span className="ml-2 rounded-full bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                      {t.count}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {selected.length > 0 && (
              <div className="flex items-center justify-between border-b bg-primary/5 px-4 py-2 text-sm">
                <span className="text-foreground">
                  {selected.length} produk dipilih
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Aktifkan</Button>
                  <Button variant="outline" size="sm">Arsipkan</Button>
                  <Button variant="outline" size="sm" className="text-destructive">
                    Hapus
                  </Button>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="w-10">
                      <Checkbox
                        checked={allChecked ? true : someChecked ? "indeterminate" : false}
                        onCheckedChange={toggleAll}
                      />
                    </TableHead>
                    <TableHead className="min-w-[320px]">Produk</TableHead>
                    <TableHead>SKU Induk</TableHead>
                    <TableHead>SKU Varian</TableHead>
                    <TableHead>Marketplace / Toko</TableHead>
                    <TableHead className="text-right">Harga</TableHead>
                    <TableHead className="text-right">Harga Promo</TableHead>
                    <TableHead className="text-right">Stok</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sinkronisasi</TableHead>
                    <TableHead className="w-64 text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={11} className="py-14 text-center text-sm text-muted-foreground">
                        Tidak ada produk yang cocok dengan filter.
                      </TableCell>
                    </TableRow>
                  )}
                  {filtered.map((p) => {
                    const checked = selected.includes(p.id);
                    return (
                      <TableRow key={p.id} data-state={checked ? "selected" : undefined}>
                        <TableCell>
                          <Checkbox
                            checked={checked}
                            onCheckedChange={() => toggleOne(p.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <ProductCell
                            productName={p.name}
                            masterSku={p.parentSku}
                            imageUrl={productImageBySku(p.parentSku)}
                          />
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{p.parentSku}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{p.variantSku}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className={cn(
                                "grid h-7 w-7 shrink-0 place-items-center rounded-md text-[10px] font-bold",
                                marketplaceStyle[p.marketplace],
                              )}
                            >
                              {marketplaceInitial[p.marketplace]}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-foreground">{p.marketplace}</p>
                              <p className="truncate text-xs text-muted-foreground max-w-[160px]">
                                {p.store}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right text-sm text-foreground tabular-nums">
                          {idr(p.price)}
                        </TableCell>
                        <TableCell className="text-right text-sm tabular-nums">
                          {p.promoPrice ? (
                            <span className="font-medium text-emerald-600 dark:text-emerald-400">
                              {idr(p.promoPrice)}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right text-sm tabular-nums">
                          <span
                            className={cn(
                              p.stock === 0
                                ? "text-rose-600 dark:text-rose-400 font-medium"
                                : p.stock < 25
                                  ? "text-amber-600 dark:text-amber-400"
                                  : "text-foreground",
                            )}
                          >
                            {p.stock}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge className={cn("font-medium", statusStyle[p.status])}>
                            {p.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {p.syncStatus === "created" ? (
                            <Badge className="gap-1.5 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10 dark:text-emerald-400">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                              Master SKU Dibuat
                            </Badge>
                          ) : (
                            <Badge className="gap-1.5 bg-rose-500/10 text-rose-600 hover:bg-rose-500/10 dark:text-rose-400">
                              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                              Belum Aktif
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-1">
                            {p.syncStatus === "created" ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openMasterSkuDialog(p)}
                              >
                                <Settings2 className="h-4 w-4" />
                                Kelola Master SKU
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() => openMasterSkuDialog(p)}
                              >
                                <Sparkles className="h-4 w-4" />
                                Buat Master SKU
                              </Button>
                            )}
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Salin</TooltipContent>
                            </Tooltip>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
                                <DropdownMenuItem>Arsipkan</DropdownMenuItem>
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
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            <div className="flex flex-col gap-2 border-t px-4 py-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <span>
                Menampilkan <span className="font-medium text-foreground">{filtered.length}</span> dari{" "}
                <span className="font-medium text-foreground">{products.length}</span> produk
              </span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Sebelumnya
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Berikutnya
                </Button>
              </div>
            </div>
          </Tabs>
        </Card>
      </div>
      <CreateMasterSkuDialog
        product={dialogProduct}
        mode={dialogMode}
        open={!!dialogProduct}
        onOpenChange={(o) => !o && setDialogProduct(null)}
      />
    </TooltipProvider>
  );
}
