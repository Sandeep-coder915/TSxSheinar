import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function RootComponent() {
  return (
    <>
      <HeadContent />
      <Scripts />
      <Navbar />
      <Outlet />
      <Footer />
      <WhatsAppButton />
      <Toaster />
    </>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "The House of Sheinar — Indian Couture Atelier" },
      { name: "description", content: "An ultra-luxury Indian couture house. Bespoke lehengas, sarees, sherwanis and gowns crafted by master karigars." },
      { name: "author", content: "The House of Sheinar" },
      { property: "og:title", content: "The House of Sheinar — Indian Couture Atelier" },
      { property: "og:description", content: "Heirloom couture, slow craft, embroidery as memory." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

// Export rootRoute for child routes to reference
export const rootRoute = Route;
