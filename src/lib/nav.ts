import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Warehouse,
  Store,
  RefreshCw,
  BarChart3,
  Users,
  Settings,
  Clock,
  Printer,
  PackageCheck,
  Truck,
  Loader2,
  PackagePlus,
  PackageMinus,
  ListChecks,
  ClipboardCheck,
  Layers,
  Radio,
  FileEdit,
  Archive,
  CheckCircle2,
  XCircle,
  Boxes,
  type LucideIcon,
} from "lucide-react";

export type NavChild = {
  title: string;
  url: string;
  icon: LucideIcon;
};

export type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  children?: NavChild[];
};

export const navItems: NavItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  {
    title: "Produk",
    url: "/produk",
    icon: Package,
    children: [
      { title: "Semua Produk", url: "/produk", icon: Layers },
      { title: "Live Produk", url: "/produk/live", icon: Radio },
      { title: "Draft Produk", url: "/produk/draft", icon: FileEdit },
      { title: "Arsip Produk", url: "/produk/arsip", icon: Archive },
    ],
  },
  {
    title: "Pesanan",
    url: "/pesanan",
    icon: ShoppingCart,
    children: [
      { title: "Menunggu Diproses", url: "/pesanan/menunggu-diproses", icon: Clock },
      { title: "Menunggu Dicetak", url: "/pesanan/menunggu-dicetak", icon: Printer },
      { title: "Menunggu Pickup", url: "/pesanan/menunggu-pickup", icon: PackageCheck },
      { title: "Sedang Diproses Marketplace", url: "/pesanan/proses-marketplace", icon: Loader2 },
      { title: "Dikirim", url: "/pesanan/dikirim", icon: Truck },
      { title: "Selesai", url: "/pesanan/selesai", icon: CheckCircle2 },
      { title: "Dibatalkan", url: "/pesanan/dibatalkan", icon: XCircle },
    ],
  },
  {
    title: "Gudang",
    url: "/gudang",
    icon: Warehouse,
    children: [
      { title: "Penambahan Stok", url: "/gudang/penambahan-stok", icon: PackagePlus },
      { title: "Pengurangan Stok", url: "/gudang/pengurangan-stok", icon: PackageMinus },
      { title: "Rincian Stok", url: "/gudang/rincian-stok", icon: ListChecks },
      { title: "Stock Opname", url: "/gudang/stock-opname", icon: ClipboardCheck },
      { title: "SKU Gudang", url: "/gudang/sku-gudang", icon: Boxes },
    ],
  },
  { title: "Marketplace", url: "/marketplace", icon: Store },
  { title: "Sinkronisasi", url: "/sinkronisasi", icon: RefreshCw },
  { title: "Laporan", url: "/laporan", icon: BarChart3 },
  { title: "Pengguna", url: "/pengguna", icon: Users },
  { title: "Pengaturan", url: "/pengaturan", icon: Settings },
];
