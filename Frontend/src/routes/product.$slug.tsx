import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Calendar } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useProducts, Product } from "@/hooks/useProducts";
import atelierImg from "@/assets/atelier-hands.jpg";

export const Route = createFileRoute("/product/$slug")({
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const { products, loading } = useProducts();
  const product = products.find((p) => p.slug === slug);
  const [zoom, setZoom] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-sm opacity-60">Loading...</p></div>;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl">Piece not found</h1>
          <Link to="/" className="btn-luxe-dark mt-6 inline-block">Return Home</Link>
        </div>
      </div>
    );
  }

  const descriptionText = product.description.content.find(b => b.type === 'text')?.content || '';
  const mainImage = product.images[0]?.url || '';

  return (
    <div className="pt-28 pb-20 embroidery-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <p className="text-[10px] tracking-luxe uppercase mb-8 opacity-70">
          <Link to="/">Home</Link> &nbsp;/&nbsp; <Link to="/collections/$category" params={{ category: product.category }}>{product.category}</Link> &nbsp;/&nbsp; <span style={{ color: "var(--gold)" }}>{product.name}</span>
        </p>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <Reveal y={20}>
            <div
              className="aspect-[4/5] overflow-hidden cursor-zoom-in bg-muted relative"
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
              onMouseMove={handleMove}
            >
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500"
                style={zoom ? { transform: `scale(2)`, transformOrigin: `${pos.x}% ${pos.y}%` } : undefined}
                width={1024}
                height={1280}
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {product.images.slice(1).map((img, i) => (
                  <img key={i} src={img.url} alt={img.alt} className="aspect-square object-cover" />
                ))}
              </div>
            )}
          </Reveal>

          <div>
            <Reveal>
              <p className="text-[10px] tracking-luxe uppercase mb-3" style={{ color: "var(--gold)" }}>{product.category}</p>
              <h1 className="font-display text-4xl md:text-5xl leading-tight">{product.name}</h1>
              <span className="gold-line mt-6" />
              <p className="mt-8 text-2xl font-display" style={{ color: "var(--maroon)" }}>
                {product.price ? `₹ ${product.price.toLocaleString()}` : 'Price on request'}
              </p>
              <p className="text-[10px] tracking-luxe uppercase opacity-60 mt-1">By Private Appointment</p>
              <p className="mt-8 text-sm leading-relaxed font-light opacity-80">{descriptionText}</p>

              <div className="mt-10 p-6 border" style={{ borderColor: "var(--gold)", background: "var(--ivory)" }}>
                <p className="font-display text-lg mb-1">A bespoke experience</p>
                <p className="text-xs opacity-70 mb-5 font-light">All Sheinar pieces are made-to-measure. Reserve an audience with our atelier to begin.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="#" className="btn-luxe-dark flex items-center gap-2"><Calendar className="w-4 h-4" /> Book Appointment</a>
                  <a href="https://wa.me/919810000000" target="_blank" rel="noopener" className="btn-luxe-dark flex items-center gap-2"><MessageCircle className="w-4 h-4" /> WhatsApp Chat</a>
                </div>
              </div>

              {product.metadata && (
                <div className="mt-6 space-y-2 text-sm font-light">
                  {product.metadata.material && <p><span className="opacity-60">Material:</span> {product.metadata.material}</p>}
                  {product.metadata.care && <p><span className="opacity-60">Care:</span> {product.metadata.care}</p>}
                </div>
              )}
            </Reveal>
          </div>
        </div>

        <div className="mt-24">
          <Tabs defaultValue="description">
            <TabsList className="bg-transparent border-b w-full justify-start gap-8 rounded-none h-auto pb-0" style={{ borderColor: "var(--gold)" }}>
              {["description", "specifications", "shipping"].map((t) => (
                <TabsTrigger
                  key={t}
                  value={t}
                  className="text-[11px] tracking-luxe uppercase rounded-none border-b-2 border-transparent data-[state=active]:border-[color:var(--maroon)] data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-4 capitalize"
                >
                  {t}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="description" className="pt-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="font-display text-3xl md:text-4xl mb-6">An ode to slow craft.</h3>
                  <span className="gold-line" />
                  <div className="mt-6 space-y-4">
                    {product.description.content.map((block, i) => (
                      block.type === 'text' ? (
                        <p key={i} className="text-sm leading-relaxed font-light opacity-85">{block.content}</p>
                      ) : block.type === 'image' ? (
                        <img key={i} src={block.content} alt={block.alt || ''} className="w-full" />
                      ) : null
                    ))}
                  </div>
                </div>
                <div className="hover-zoom aspect-[4/5]">
                  <img src={atelierImg} alt="Atelier" className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="pt-12">
              <div className="max-w-2xl space-y-4 text-sm font-light">
                {[
                  ["Material", product.metadata?.material],
                  ["Care", product.metadata?.care],
                  ["Dimensions", product.metadata?.dimensions],
                  ["Weight", product.metadata?.weight],
                ].filter(([, v]) => v).map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b py-3" style={{ borderColor: "var(--border)" }}>
                    <span className="text-[11px] tracking-wide-luxe uppercase opacity-60">{k}</span>
                    <span>{v}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="pt-12 max-w-2xl space-y-4 text-sm font-light leading-relaxed opacity-85">
              <p>All Sheinar pieces are made-to-measure and delivered in our signature heirloom trunk, hand-finished in raw silk and brass.</p>
              <p>Worldwide white-glove delivery within 14–22 weeks of confirmation. Complimentary alterations for life.</p>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-32">
          <Reveal>
            <p className="text-[10px] tracking-luxe uppercase text-center mb-3" style={{ color: "var(--gold)" }}>You may also love</p>
            <h2 className="font-display text-3xl md:text-4xl text-center mb-12">From the same hands</h2>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {products.filter((p) => p.slug !== product.slug).slice(0, 4).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link to="/product/$slug" params={{ slug: p.slug }} className="block group">
                  <div className="hover-zoom aspect-[3/4] mb-4">
                    <img src={p.images[0]?.url || ''} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <h3 className="font-display text-lg">{p.name}</h3>
                  <p className="text-xs opacity-70">{p.price ? `₹ ${p.price.toLocaleString()}` : 'Price on request'}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
