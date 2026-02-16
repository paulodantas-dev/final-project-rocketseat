import type { router } from "@/app";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
