import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Masuk — MAQIL.ERP" },
      { name: "description", content: "Halaman login MAQIL.ERP internal." },
    ],
  }),
  component: LoginPage,
});

type LoginForm = { email: string; password: string };

function LoginPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<LoginForm>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (_values: LoginForm) => {
    // Placeholder: integrasi ke backend Laravel + Sanctum dilakukan di project Next.js.
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen w-full bg-muted/30">
      <div className="mx-auto grid min-h-screen max-w-md place-items-center px-4">
        <div className="w-full">
          <div className="mb-6 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground font-bold">
              M
            </div>
            <div>
              <div className="text-lg font-semibold tracking-tight">MAQIL.ERP</div>
              <div className="text-xs text-muted-foreground">Internal ERP System</div>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <h1 className="text-xl font-semibold tracking-tight">Masuk</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Gunakan akun internal Anda untuk melanjutkan.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@perusahaan.com"
                    autoComplete="email"
                    {...register("email", { required: true })}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Kata Sandi</Label>
                    <span className="text-xs text-muted-foreground">
                      Hubungi admin jika lupa
                    </span>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    {...register("password", { required: true })}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={formState.isSubmitting}
                >
                  Masuk
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            <Link to="/dashboard" className="hover:text-foreground">
              Lewati ke Dashboard (preview)
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
