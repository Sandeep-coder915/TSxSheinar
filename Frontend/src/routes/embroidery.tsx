import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import atelierImg from "@/assets/atelier-hands.jpg";
import heroCoutureImg from "@/assets/hero-couture.jpg";
import heroImg from "@/assets/hero.png";
import productCoutureImg from "@/assets/product-couture.jpg";
import productKurtaImg from "@/assets/product-kurta.jpg";
import productLehengaImg from "@/assets/product-lehenga.jpg";
import productSareeImg from "@/assets/product-saree.jpg";
import founderImg from "@/assets/founder.jpg";

export const Route = createFileRoute("/embroidery")({
  head: () => ({
    meta: [
      { title: "The Art of Embroidery — sheinar" },
      { name: "description", content: "Where threads speak the language of soul — zardozi, aari, and resham at sheinar." },
      { property: "og:title", content: "The Art of Embroidery — sheinar" },
    ],
  }),
  component: EmbroideryPage,
});

const techniques = [
  {
    name: "Zardozi",
    subtitle: "Gold & Silver Thread",
    desc: "A royal embroidery technique using gold and silver threads, evoking Mughal grandeur. Originating in Persia and perfected in the Mughal courts, metallic thread, dabka, and gemstones are worked over stretched fabric on an adda frame.",
    img: productLehengaImg,
  },
  {
    name: "Aari",
    subtitle: "Chain-Stitch Mastery",
    desc: "Delicate chain-stitch art perfected through centuries, capturing intricate beauty and rhythm. A hooked needle capable of extraordinary three-dimensional detail, used in our couture pieces for sculptural floral motifs.",
    img: productCoutureImg,
  },
  {
    name: "Resham",
    subtitle: "Silken Poetry",
    desc: "Silken threads flowing like rivers of light — pure finesse, pure poetry. Resham embroidery brings a luminous softness to every creation, its sheen catching the light like whispered verses on fabric.",
    img: productSareeImg,
  },
];

const steps = [
  { num: "01", label: "Concept & Design", desc: "Every piece begins as a sketch — motifs drawn by hand, inspired by Mughal miniatures, nature, and the artisan's own imagination." },
  { num: "02", label: "Thread & Bead Selection", desc: "Threads are chosen by hand — silk, zari, resham — each selected for its weight, sheen, and how it will carry light across the finished fabric." },
  { num: "03", label: "Hand Embroidery", desc: "The needle meets the fabric. Weeks, sometimes months, of patient stitching — each motif built stitch by stitch, breath by breath." },
];

const gallery = [
  { src: heroCoutureImg, label: "Zardozi Bridal" },
  { src: productLehengaImg, label: "Lehenga Embroidery" },
  { src: productSareeImg, label: "Resham Saree" },
  { src: productCoutureImg, label: "Couture Detail" },
  { src: productKurtaImg, label: "Aari Kurta" },
  { src: atelierImg, label: "Atelier Hands" },
  { src: heroImg, label: "Heritage Craft" },
  { src: founderImg, label: "Master Karigar" },
];

function EmbroideryPage() {
  return (
    <div className="embroidery-bg overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative h-[92vh] min-h-[540px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroCoutureImg})` }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, oklch(0.14 0.012 60 / 0.92) 0%, oklch(0.14 0.012 60 / 0.35) 60%, transparent 100%)" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 pb-20 w-full">
          <Reveal>
            <p className="text-[10px] tracking-luxe uppercase mb-4" style={{ color: "var(--gold)" }}>The Art of Embroidery</p>
            <h1 className="font-display text-5xl sm:text-6xl md:text-8xl leading-[1.02]" style={{ color: "var(--ivory)" }}>
              Every thread<br />
              <em className="font-light">a verse.</em>
            </h1>
            <span className="gold-line mt-8 block" />
            <p className="mt-6 text-base md:text-lg font-light max-w-xl leading-relaxed" style={{ color: "oklch(0.97 0.012 85 / 0.72)" }}>
              Every stitch a whisper — where heritage dances with artistry.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="max-w-3xl mx-auto px-6 lg:px-12 py-24 text-center">
        <Reveal>
          <p className="text-[10px] tracking-luxe uppercase mb-4" style={{ color: "var(--gold)" }}>Where Threads Speak the Language of Soul</p>
          <h2 className="font-display text-4xl md:text-5xl leading-snug mb-6">
            More than embellishment —<br /><em className="font-light">it is storytelling.</em>
          </h2>
          <span className="gold-line mb-8 mx-auto block" />
          <p className="text-base md:text-lg font-light leading-relaxed opacity-80">
            Embroidery at sheinar is rooted in ancient techniques like zardozi, aari, and resham. Each piece is hand-spun poetry. The artisan's needle carries generations of emotion, rhythm, and grace — woven into every inch of fabric.
          </p>
        </Reveal>
      </section>

      {/* ── Techniques ── */}
      <section className="py-4 pb-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <Reveal>
            <p className="text-[10px] tracking-luxe uppercase mb-3 text-center" style={{ color: "var(--gold)" }}>The Heritage of Indian Embroidery</p>
            <h2 className="font-display text-3xl md:text-4xl text-center mb-16">Three sacred traditions</h2>
          </Reveal>

          <div className="space-y-24">
            {techniques.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.06}>
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}>
                  <div className={i % 2 === 1 ? "md:[direction:ltr]" : ""}>
                    <div className="hover-zoom aspect-[4/3]">
                      <img src={t.img} alt={t.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  </div>
                  <div className={i % 2 === 1 ? "md:[direction:ltr]" : ""}>
                    <p className="text-[10px] tracking-luxe uppercase mb-2" style={{ color: "var(--gold)" }}>{t.subtitle}</p>
                    <h3 className="font-display text-4xl md:text-5xl mb-4">{t.name}</h3>
                    <span className="gold-line mb-6 block" />
                    <p className="text-base font-light leading-relaxed opacity-80">{t.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-24" style={{ background: "oklch(0.14 0.012 60)" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <Reveal>
            <p className="text-[10px] tracking-luxe uppercase mb-4 text-center" style={{ color: "var(--gold)" }}>The Process of Creation</p>
            <h2 className="font-display text-4xl md:text-5xl text-center mb-4" style={{ color: "var(--ivory)" }}>
              Weeks. Sometimes <em className="font-light">months.</em>
            </h2>
            <p className="text-center text-base font-light opacity-60 mb-16 max-w-xl mx-auto" style={{ color: "var(--ivory)" }}>
              Each sheinar piece comes alive through a deliberate, unhurried process — our ateliers hum with the rhythm of artistry, not urgency.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.08}>
                <div className="border-t pt-8" style={{ borderColor: "oklch(0.72 0.12 78 / 0.3)" }}>
                  <p className="font-display text-5xl mb-4" style={{ color: "oklch(0.72 0.12 78 / 0.25)" }}>{s.num}</p>
                  <h3 className="font-display text-xl mb-3" style={{ color: "var(--gold)" }}>{s.label}</h3>
                  <p className="text-sm font-light leading-relaxed" style={{ color: "oklch(0.97 0.012 85 / 0.65)" }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <blockquote className="mt-20 text-center font-display text-xl md:text-2xl italic leading-relaxed" style={{ color: "var(--gold-soft)" }}>
              "True embroidery is not stitched with needle and thread —<br className="hidden md:block" />
              it's woven with patience, poetry, and purpose."
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Reveal>
            <p className="text-[10px] tracking-luxe uppercase mb-4 text-center" style={{ color: "var(--gold)" }}>A Gallery of Craftsmanship</p>
            <h2 className="font-display text-4xl md:text-5xl text-center mb-16">
              The art, <em className="font-light">up close.</em>
            </h2>
          </Reveal>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {gallery.map((item, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className={`hover-zoom overflow-hidden ${i === 0 || i === 5 ? "md:row-span-2" : ""}`}>
                  <div className={`w-full ${i === 0 || i === 5 ? "aspect-[3/4] md:aspect-auto md:h-full" : "aspect-square"}`}>
                    <img
                      src={item.src}
                      alt={item.label}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-[9px] tracking-luxe uppercase mt-2 opacity-40 text-center">{item.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 text-center px-6" style={{ background: "oklch(0.93 0.02 80)" }}>
        <Reveal>
          <p className="text-[10px] tracking-luxe uppercase mb-4" style={{ color: "var(--gold)" }}>Discover the Legacy</p>
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            Handcrafted <em className="font-light">beauty.</em>
          </h2>
          <span className="gold-line mb-8 mx-auto block" />
          <p className="text-base font-light opacity-70 max-w-md mx-auto mb-10">
            Discover the soul of sheinar — where every piece is an ode to Indian karigari and global finesse.
          </p>
          <Link to="/collections/$category" params={{ category: "all" }} className="btn-luxe-dark">
            Discover the Legacy of Handcrafted Beauty
          </Link>
        </Reveal>
      </section>

    </div>
  );
}
