import { createRoute } from "@tanstack/react-router";
import { adminRoute } from "./index";
import { ProductManager } from "../../components/admin/ProductManager";

export const Route = createRoute({
  getParentRoute: () => adminRoute,
  path: "/products",
  component: AdminProducts,
});

function AdminProducts() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">Product Management</h2>
        <p className="mt-2 text-muted-foreground">
          Create, edit, and manage your products with rich content and media.
        </p>
      </div>
      <ProductManager />
    </div>
  );
}