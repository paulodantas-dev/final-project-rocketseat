import { useEffect, useMemo, useState, type SubmitEvent } from "react";
import { LogOut, Mail, User } from "lucide-react";
import { InputLabel } from "@/components/input-label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLogout, useMe, useUpdateProfile } from "@/hooks/use-auth";
import { getInitials } from "@/utils/get-initials";

export function ProfilePage() {
  const { data: me, isLoading } = useMe();
  const updateProfile = useUpdateProfile();
  const logout = useLogout();

  const [name, setName] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (me?.name) {
      setName(me.name);
    }
  }, [me?.name]);

  const initials = useMemo(() => getInitials(me?.name ?? ""), [me?.name]);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    setFormError(null);

    const normalizedName = name.trim();

    if (!normalizedName) {
      setFormError("Informe o nome completo.");
      return;
    }

    await updateProfile.mutateAsync({ name: normalizedName });
  }

  return (
    <div className="h-full bg-gray-100">
      <div className="container mx-auto p-6 flex flex-col items-center gap-8">
        <section className="max-w-md w-full rounded-xl border border-gray-200 bg-neutral-white p-8">
          <header className="flex flex-col items-center gap-6 text-center">
            <Avatar className="size-16">
              <AvatarFallback className="bg-gray-300 text-gray-800 text-2xl font-normal">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <h1 className="text-xl font-semibold text-gray-800">
                {me?.name}
              </h1>
              <p className="text-base text-gray-500">{me?.email}</p>
            </div>
          </header>

          <div className="my-6 h-px w-full bg-gray-200" />

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <InputLabel.Root>
              <InputLabel.Label htmlFor="profile-name">
                Nome completo
              </InputLabel.Label>
              <InputLabel.Field
                id="profile-name"
                name="profile-name"
                placeholder="Seu nome completo"
                value={name}
                onChange={(event) => setName(event.target.value)}
                startIcon={<User size={16} />}
                disabled={isLoading || updateProfile.isPending}
              />
            </InputLabel.Root>

            <InputLabel.Root>
              <InputLabel.Label htmlFor="profile-email">
                E-mail
              </InputLabel.Label>
              <InputLabel.Field
                id="profile-email"
                name="profile-email"
                value={me?.email ?? ""}
                startIcon={<Mail size={16} />}
                disabled
              />
              <p className="text-xs text-gray-500">
                O e-mail não pode ser alterado
              </p>
            </InputLabel.Root>

            {formError ? (
              <p className="text-xs text-red-base">{formError}</p>
            ) : null}

            <Button
              type="submit"
              size="lg"
              className="mt-1 w-full bg-brand-base hover:bg-brand-base/90 text-neutral-white"
              disabled={isLoading || updateProfile.isPending}
            >
              {updateProfile.isPending ? "Salvando..." : "Salvar alterações"}
            </Button>

            <Button
              type="button"
              size="lg"
              variant="outline"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={logout}
            >
              <LogOut size={16} className="text-red-base" />
              Sair da conta
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
}
