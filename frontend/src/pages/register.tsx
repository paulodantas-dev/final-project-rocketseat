import { InputLabel } from "@/components/input-label";
import { Button } from "@/components/ui/button";
import { useSignup } from "@/hooks/use-auth";
import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2, Lock, LogIn, Mail, User } from "lucide-react";
import { useState, type SubmitEvent } from "react";

export function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const signup = useSignup();
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRegister = async (event: SubmitEvent) => {
    event.preventDefault();
    setFormError(null);

    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const name = (formData.get("name") as string).trim();
    const email = (formData.get("email") as string).trim();
    const password = (formData.get("password") as string).trim();

    if (!name || !email || !password) {
      setFormError("Preencha todos os campos.");
      return;
    }

    if (password.length < 8) {
      setFormError("A senha deve ter no mínimo 8 caracteres.");
      return;
    }

    try {
      await signup.mutateAsync({
        name,
        email,
        password,
      });

      navigate({ to: "/" });
    } catch (error) {
      console.error("Signup failed:", error);
      setFormError("Não foi possível criar a conta. Tente novamente.");
    }
  };

  return (
    <div className="bg-gray-100 h-screen p-12 flex flex-col items-center justify-center gap-8">
      <div>
        <img src="/logo.svg" alt="logo" />
      </div>
      <div className="max-w-md w-full p-8 border border-gray-200 rounded-lg bg-neutral-white flex flex-col gap-8">
        <div className="text-center ">
          <h2 className="text-gray-800 font-bold text-xl">Criar Conta</h2>
          <span className="text-gray-600 font-normal text-base">
            Comece a controlar suas finanças ainda hoje
          </span>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleRegister}>
          <InputLabel.Root>
            <InputLabel.Label
              htmlFor="name"
              className="text-gray-700 text-sm font-medium leading-5"
            >
              Nome completo
            </InputLabel.Label>
            <InputLabel.Field
              id="name"
              type="text"
              name="name"
              placeholder="Seu nome completo"
              startIcon={<User size={16} />}
              disabled={signup.isPending}
            />
          </InputLabel.Root>
          <InputLabel.Root>
            <InputLabel.Label
              htmlFor="email"
              className="text-gray-700 text-sm font-medium leading-5"
            >
              E-mail
            </InputLabel.Label>
            <InputLabel.Field
              id="email"
              type="email"
              name="email"
              placeholder="mail@exemplo.com"
              startIcon={<Mail size={16} />}
              disabled={signup.isPending}
            />
          </InputLabel.Root>
          <InputLabel.Root>
            <InputLabel.Label
              htmlFor="password"
              className="text-gray-700 text-sm font-medium leading-5"
            >
              Senha
            </InputLabel.Label>
            <InputLabel.Field
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Digite sua senha"
              startIcon={<Lock size={16} />}
              endIcon={showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
              onEndIconClick={handleTogglePassword}
              endIconAriaLabel={
                showPassword ? "Ocultar senha" : "Mostrar senha"
              }
              disabled={signup.isPending}
            />
            <span className="text-xs text-gray-500">
              A senha deve ter no mínimo 8 caracteres
            </span>
          </InputLabel.Root>

          {formError ? (
            <p className="text-sm text-red-base">{formError}</p>
          ) : null}

          <div className="flex flex-col gap-6">
            <Button
              type="submit"
              className="w-full bg-brand-base hover:bg-brand-base/90 text-neutral-white h-12"
              disabled={signup.isPending}
            >
              {signup.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Cadastrar"
              )}
            </Button>
            <div className="relative flex items-center">
              <div className="grow border-t border-gray-300" />
              <span className="mx-4 text-sm text-gray-500">ou</span>
              <div className="grow border-t border-gray-300" />
            </div>
            <div className="flex flex-col items-center gap-3">
              <span className="text-sm text-gray-600">Já tem uma conta?</span>
              <Button
                asChild
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 h-12 gap-2"
                disabled={signup.isPending}
              >
                <Link to="/login">
                  <LogIn size={16} />
                  Fazer login
                </Link>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
