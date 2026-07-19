import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/marketplace")({
  head: () => ({ meta: [{ title: "Marketplace — MAQIL.ERP" }] }),
  component: MarketplacePage,
});

const marketplaces = [
  { name: "Shopee", initial: "S", desc: "Integrasi toko Shopee" },
  { name: "Tokopedia", initial: "T", desc: "Integrasi toko Tokopedia" },
  { name: "TikTok Shop", initial: "TT", desc: "Integrasi toko TikTok Shop" },
  { name: "Lazada", initial: "L", desc: "Integrasi toko Lazada" },
];

function MarketplacePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Marketplace"
        description="Kelola koneksi ke marketplace yang terhubung."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {marketplaces.map((m) => (
          <Card key={m.name}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary font-bold">
                  {m.initial}
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10 dark:text-emerald-400">
                  Connected
                </Badge>
              </div>
              <p className="mt-4 text-base font-semibold">{m.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{m.desc}</p>
              <Button variant="outline" size="sm" className="mt-4 w-full">
                Kelola
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
