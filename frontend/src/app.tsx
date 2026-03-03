import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Header } from "./components/header";
import { CategoriesPage } from "./pages/categories";
import { DashboardPage } from "./pages/dashboard";
import { LoginPage } from "./pages/login";
import { ProfilePage } from "./pages/profile";
import { RegisterPage } from "./pages/register";
import { TransactionsPage } from "./pages/transactions";

const isAuthenticated = true;

function RootLayout() {
  return (
    <div className="min-h-dvh w-full max-w-screen">
      <Outlet />
    </div>
  );
}

function AuthenticatedLayout() {
  return (
    <div className="h-dvh w-full max-w-screen">
      <Header />
      <Outlet />
    </div>
  );
}

const requireAuth = () => {
  if (!isAuthenticated) {
    throw redirect({ to: "/login" });
  }
};

const rootRoute = createRootRoute({
  component: RootLayout,
});

const authenticatedRoute = createRoute({
  id: "authenticated",
  getParentRoute: () => rootRoute,
  beforeLoad: requireAuth,
  component: AuthenticatedLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/",
  component: DashboardPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/dashboard",
  component: DashboardPage,
});

const transactionsRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/transactions",
  component: TransactionsPage,
});

const categoriesRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/categories",
  component: CategoriesPage,
});

const profileRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/profile",
  component: ProfilePage,
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  registerRoute,
  authenticatedRoute.addChildren([
    indexRoute,
    dashboardRoute,
    transactionsRoute,
    categoriesRoute,
    profileRoute,
  ]),
]);

export const router = createRouter({
  routeTree,
});

export function App() {
  return <RouterProvider router={router} />;
}
