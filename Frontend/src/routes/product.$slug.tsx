import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useProducts } from "@/hooks/useProducts";
import { AppointmentModal } from "@/components/site/AppointmentModal";
import atelierImg from "@/assets/atelier-hands.jpg";

export const Route = createFileRoute("/product/$slug")({
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const { products, loading } = useProducts();
  const product = products.find((p) => p.slug === slug);
  const [activeIndex, setActiveIndex] = useState(0);
  const [apptOpen, setApptOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const prev = () => setActiveIndex((i) => (i === 0 ? (product!.images.length - 1) : i - 1));
  const next = () => setActiveIndex((i) => (i === product!.images.length - 1 ? 0 : i + 1));

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
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
  const images = product.images;

  return (
    <div className="pt-28 pb-20 embroidery-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <p className="text-[10px] tracking-luxe uppercase mb-8 opacity-70">
          <Link to="/">Home</Link> &nbsp;/&nbsp;
          <Link to="/collections/$category" params={{ category: product.category }}>{product.category}</Link>
          &nbsp;/&nbsp; <span style={{ color: "var(--gold)" }}>{product.name}</span>
        </p>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <Reveal y={20}>
            {/* Main image with arrows */}
            <div
              className="aspect-[4/5] overflow-hidden bg-muted relative select-none"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <img
                src={images[activeIndex]?.url || ''}
                alt={images[activeIndex]?.alt || product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
                width={1024}
                height={1280}
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/80 hover:bg-white transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/80 hover:bg-white transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className="w-1.5 h-1.5 rounded-full transition-colors"
                        style={{ background: i === activeIndex ? 'var(--gold)' : 'rgba(255,255,255,0.6)' }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2 mt-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className="aspect-square overflow-hidden"
                    style={{ outline: i === activeIndex ? '2px solid var(--gold)' : '2px solid transparent', outlineOffset: '2px' }}
                  >
                    <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                  </button>
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
                  <a href="#" className="btn-luxe-dark flex items-center gap-2" onClick={e => { e.preventDefault(); setApptOpen(true); }}><Calendar className="w-4 h-4" /> Book Appointment</a>
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
            <TabsList className="bg-transparent border-b w-full justify-start gap-8 rounded-none h-auto pb-0 flex-wrap" style={{ borderColor: "var(--gold)" }}>
              {["description", "specifications", "manufacturers", "shipping"].map((t) => (
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
                {/* <div className="aspect-[4/5]">
                  <img src={atelierImg} alt="Atelier" className="w-full h-full object-cover" loading="lazy" />
                </div> */}
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
                {!product.metadata?.material && !product.metadata?.care && !product.metadata?.dimensions && !product.metadata?.weight && (
                  <p className="opacity-50 text-xs">No specifications available.</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="manufacturers" className="pt-12">
              <div className="max-w-2xl space-y-4 text-sm font-light">
                {[
                  ["Manufacturer", (product as any).manufacturers?.name],
                  ["Origin", (product as any).manufacturers?.origin],
                  ["Artisan", (product as any).manufacturers?.artisan],
                  ["Workshop", (product as any).manufacturers?.workshop],
                  ["Craft Tradition", (product as any).manufacturers?.craftTradition],
                ].filter(([, v]) => v).map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b py-3" style={{ borderColor: "var(--border)" }}>
                    <span className="text-[11px] tracking-wide-luxe uppercase opacity-60">{k}</span>
                    <span>{v}</span>
                  </div>
                ))}
                {!(product as any).manufacturers?.name && (
                  <p className="opacity-50 text-xs">No manufacturer information available.</p>
                )}
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
                  <div className="aspect-[3/4] mb-4 overflow-hidden">
                    <img src={p.images[0]?.url || ''} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  </div>
                  <h3 className="font-display text-lg">{p.name}</h3>
                  <p className="text-xs opacity-70">{p.price ? `₹ ${p.price.toLocaleString()}` : 'Price on request'}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <AppointmentModal
        open={apptOpen}
        onClose={() => setApptOpen(false)}
        productName={product.name}
        productSlug={product.slug}
      />
    </div>
  );
}
