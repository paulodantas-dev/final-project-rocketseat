import { Link, useMatchRoute } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useMe } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { getInitials } from "@/utils/get-initials";

export function Header() {
  const matchRoute = useMatchRoute();
  const { data: me } = useMe();

  const isActive = (path: string) => matchRoute({ to: path });
  const initials = getInitials(me?.name ?? "");

  const getLinkClassName = (active: boolean) =>
    cn(
      "text-sm font-medium transition-colors",
      active
        ? "text-brand-base font-semibold"
        : "text-gray-600 hover:text-brand-base hover:font-semibold",
    );

  return (
    <header className="border-b border-gray-200 bg-neutral-white">
      <div className="container mx-auto flex items-center justify-between px-12 py-4">
        <div>
          <img src="/logo.svg" alt="Logo" className="h-6" />
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/dashboard"
            className={getLinkClassName(!!isActive("/dashboard"))}
          >
            Dashboard
          </Link>
          <Link
            to="/transactions"
            className={getLinkClassName(!!isActive("/transactions"))}
          >
            Transações
          </Link>
          <Link
            to="/categories"
            className={getLinkClassName(!!isActive("/categories"))}
          >
            Categorias
          </Link>
        </nav>

        <Link to="/profile">
          <Avatar
            size="default"
            className="hover:opacity-80 transition-opacity cursor-pointer"
          >
            <AvatarFallback className="bg-gray-100 text-gray-700">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
}
