import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../__root";
import { Outlet } from "@tanstack/react-router";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminLayout,
});

// Export adminRoute for child routes to reference
export const adminRoute = Route;

function AdminLayout() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
            </div>
            <nav className="flex space-x-8">
              <a href="/admin/products" className="text-foreground hover:text-primary">
                Products
              </a>
              <a href="/admin/categories" className="text-foreground hover:text-primary">
                Categories
              </a>
            </nav>
          </div>
        </div>
      </div>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}