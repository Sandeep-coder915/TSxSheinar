import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { useProducts } from "@/hooks/useProducts";

export const Route = createFileRoute("/collections/$category")({
  component: CollectionPage,
});

function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }

function CollectionPage() {
  const { category } = useParams({ from: "/collections/$category" });
  const { products, loading } = useProducts();
  const items = products.filter((p) => p.category.toLowerCase() === category.toLowerCase());

  if (loading) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex items-center justify-center">
        <p className="text-sm opacity-60">Loading collection...</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 embroidery-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Reveal>
          <div className="text-center mb-20">
            <p className="text-[10px] tracking-luxe uppercase mb-4" style={{ color: "var(--gold)" }}>The Sheinar Collection</p>
            <h1 className="font-display text-5xl md:text-7xl">{cap(category)}</h1>
            <span className="gold-line mt-6" />
            <p className="mt-8 max-w-xl mx-auto text-sm font-light opacity-80">
              Each piece in our {category.toLowerCase()} archive is a quiet meditation in cloth — slowly drawn, slowly stitched, slowly loved.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {items.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <p className="text-sm opacity-60">No products found in this category yet.</p>
              <Link to="/" className="btn-luxe-dark mt-6 inline-block">Return Home</Link>
            </div>
          ) : (
            items.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link to="/product/$slug" params={{ slug: p.slug }} className="block group">
                  <div className="hover-zoom aspect-[3/4] mb-5">
                    <img src={p.images[0]?.url || ''} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <p className="text-[10px] tracking-luxe uppercase mb-2" style={{ color: "var(--gold)" }}>{p.category}</p>
                  <h3 className="font-display text-xl mb-2 group-hover:text-[color:var(--maroon)] transition-colors">{p.name}</h3>
                  <p className="text-xs font-light opacity-70">{p.price ? `₹ ${p.price.toLocaleString()}` : 'Price on request'}</p>
                </Link>
              </Reveal>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
