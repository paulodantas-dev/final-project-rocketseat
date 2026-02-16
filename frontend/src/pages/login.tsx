import { InputLabel } from "@/components/input-label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, Mail, UserPlus } from "lucide-react";
import { useState } from "react";

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="bg-gray-100 p-12 flex flex-col items-center justify-center gap-8">
      <div>
        <img src="/logo.svg" alt="logo" />
      </div>
      <div className="max-w-md w-full p-8 border border-gray-200 rounded-lg bg-neutral-white flex flex-col gap-8">
        <div className="text-center ">
          <h2 className="text-gray-800 font-bold text-xl">Fazer Login</h2>
          <span className="text-gray-600 font-normal text-base">
            Entre na sua conta para continuar
          </span>
        </div>
        <div className="flex flex-col gap-4">
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
              placeholder="mail@exemplo.com"
              startIcon={<Mail size={16} />}
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
              placeholder="Digite sua senha"
              startIcon={<Lock size={16} />}
              endIcon={showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
              onEndIconClick={handleTogglePassword}
              endIconAriaLabel={
                showPassword ? "Ocultar senha" : "Mostrar senha"
              }
            />
          </InputLabel.Root>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label
                htmlFor="remember"
                className="text-sm font-normal text-gray-700 cursor-pointer"
              >
                Lembrar-me
              </Label>
            </div>
            <Link
              to="/login"
              className="text-sm font-medium text-brand-base hover:underline"
            >
              Recuperar senha
            </Link>
          </div>
          <div className="flex flex-col gap-6">
            <Button className="w-full bg-brand-base hover:bg-brand-base/90 text-neutral-white h-12">
              Entrar
            </Button>
            <div className="relative flex items-center">
              <div className="grow border-t border-gray-300" />
              <span className="mx-4 text-sm text-gray-500">ou</span>
              <div className="grow border-t border-gray-300" />
            </div>
            <div className="flex flex-col items-center gap-3">
              <span className="text-sm text-gray-600">
                Ainda não tem uma conta?
              </span>
              <Button
                asChild
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 h-12 gap-2"
              >
                <Link to="/register">
                  <UserPlus size={16} />
                  Criar conta
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
