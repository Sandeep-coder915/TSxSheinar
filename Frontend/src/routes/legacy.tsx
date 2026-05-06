import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import heroCoutureImg from "@/assets/hero-couture.jpg";
import atelierImg from "@/assets/atelier-hands.jpg";
import founderImg from "@/assets/founder.jpg";
import productLehengaImg from "@/assets/product-lehenga.jpg";
import productSareeImg from "@/assets/product-saree.jpg";
import productKurtaImg from "@/assets/product-kurta.jpg";
import productCoutureImg from "@/assets/product-couture.jpg";

export const Route = createFileRoute("/legacy")({
  head: () => ({
    meta: [
      { title: "The Legacy of sheinar" },
      { name: "description", content: "A tribute to the hands that weave heritage, and the hearts that carry it forward." },
      { property: "og:title", content: "The Legacy of sheinar" },
    ],
  }),
  component: LegacyPage,
});

const milestones = [
  {
    year: "1985",
    title: "Where It All Began",
    desc: "A humble atelier in Jaipur started with two artisans and a singular vision — to revive the dying art of zardozi embroidery and give it a home worthy of its grandeur.",
    img: atelierImg,
    side: "left",
  },
  {
    year: "2000",
    title: "Craft Meets Couture",
    desc: "sheinar entered the couture space, blending centuries-old hand-embroidery with modern silhouettes — redefining what luxury means in Indian fashion.",
    img: productLehengaImg,
    side: "right",
  },
  {
    year: "2015",
    title: "Global Recognition",
    desc: "Our pieces graced international runways, celebrating Indian karigari on the world stage. Heritage, finally seen through a global lens.",
    img: productCoutureImg,
    side: "left",
  },
  {
    year: "2025",
    title: "Sustaining Heritage",
    desc: "sheinar now empowers over 600 artisans across India — preserving generational craftsmanship, ensuring fair wages, and inspiring the next generation of makers.",
    img: productSareeImg,
    side: "right",
  },
];

const pillars = [
  {
    word: "Humanity",
    icon: "♡",
    desc: "Every stitch is guided by respect, dignity, and love for the craft. Our artisans are not workers — they are the soul of everything we create.",
  },
  {
    word: "Excellence",
    icon: "◇",
    desc: "We pursue perfection not for fame, but for the quiet pride of artisanship. Excellence here is not a standard — it is a devotion.",
  },
  {
    word: "Heritage",
    icon: "✦",
    desc: "We safeguard India's embroidery traditions — one creation at a time. Every piece is a living archive of a culture that must never be forgotten.",
  },
];

function LegacyPage() {
  return (
    <div className="overflow-x-hidden embroidery-bg">

      {/* ── 01 · HERO — video + text overlay ── */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={heroCoutureImg}
        >
          <source src="" type="video/mp4" />
        </video>
        {/* fallback bg */}
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroCoutureImg})` }}
        />
        {/* overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(170deg, oklch(0.14 0.012 60 / 0.5) 0%, oklch(0.14 0.012 60 / 0.78) 55%, oklch(0.14 0.012 60 / 0.95) 100%)",
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <Reveal>
            <p className="text-[10px] tracking-luxe uppercase mb-6" style={{ color: "var(--gold)" }}>
              The Legacy of sheinar
            </p>
            <h1
              className="font-display text-5xl sm:text-6xl md:text-8xl leading-[1.02] mb-8"
              style={{ color: "var(--ivory)" }}
            >
              A tribute to<br />
              <em className="font-light">the hands.</em>
            </h1>
            <span className="gold-line mx-auto block mb-8" />
            <p
              className="text-base md:text-xl font-light leading-relaxed max-w-2xl mx-auto"
              style={{ color: "oklch(0.97 0.012 85 / 0.68)" }}
            >
              A tribute to the hands that weave heritage, and the hearts that carry it forward.
            </p>
          </Reveal>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-35">
          <span className="text-[9px] tracking-luxe uppercase" style={{ color: "var(--ivory)" }}>Scroll</span>
          <div className="w-px h-10" style={{ background: "var(--gold)" }} />
        </div>
      </section>

      {/* ── 02 · FOUNDER LEGACY ── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-24 items-center">
            <Reveal>
              <div className="hover-zoom aspect-[3/4] max-w-sm mx-auto md:mx-0">
                <img src={founderImg} alt="Founder Legacy" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[10px] tracking-luxe uppercase mb-4" style={{ color: "var(--gold)" }}>
                Founder Legacy
              </p>
              <h2 className="font-display text-4xl md:text-5xl mb-6">
                A Dream<br />
                <em className="font-light">Woven in Gold.</em>
              </h2>
              <span className="gold-line mb-8 block" />
              <p className="text-base font-light leading-relaxed opacity-80 mb-5">
                Born from India's timeless artistry, sheinar was founded with a single purpose — to preserve the poetry of hand embroidery and elevate it into a language of global couture.
              </p>
              <p className="text-base font-light leading-relaxed opacity-80">
                Every collection carries the whispers of heritage — stories sewn in silk and sequins, passed from one generation of artisans to the next, and finally to you.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 03 · TIMELINE ── */}
      <section className="py-24" style={{ background: "oklch(0.14 0.012 60)" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <Reveal>
            <p className="text-[10px] tracking-luxe uppercase mb-4 text-center" style={{ color: "var(--gold)" }}>
              Our Journey Through Time
            </p>
            <h2
              className="font-display text-4xl md:text-5xl text-center mb-20"
              style={{ color: "var(--ivory)" }}
            >
              Four decades of<br />
              <em className="font-light">devotion.</em>
            </h2>
          </Reveal>

          {/* vertical timeline */}
          <div className="relative">
            {/* centre line — hidden on mobile */}
            <div
              className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{ background: "oklch(0.72 0.12 78 / 0.25)" }}
            />

            <div className="space-y-16 md:space-y-0">
              {milestones.map((m, i) => (
                <Reveal key={m.year} delay={i * 0.08}>
                  <div className={`md:grid md:grid-cols-2 md:gap-16 items-center mb-16 ${m.side === "right" ? "" : ""}`}>

                    {/* LEFT CELL */}
                    <div className={`${m.side === "right" ? "md:order-2" : "md:order-1"} mb-8 md:mb-0`}>
                      <div className="hover-zoom aspect-[4/3]">
                        <img src={m.img} alt={m.title} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    </div>

                    {/* RIGHT CELL */}
                    <div className={`${m.side === "right" ? "md:order-1 md:text-right" : "md:order-2"} relative`}>
                      {/* dot on the centre line */}
                      <div
                        className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 ${m.side === "right" ? "-right-[calc(2rem+6px)]" : "-left-[calc(2rem+6px)]"}`}
                        style={{ background: "var(--gold)", borderColor: "oklch(0.14 0.012 60)" }}
                      />
                      <p
                        className="font-display text-5xl md:text-6xl mb-2 leading-none"
                        style={{ color: "oklch(0.72 0.12 78 / 0.22)" }}
                      >
                        {m.year}
                      </p>
                      <h3
                        className="font-display text-2xl md:text-3xl mb-3"
                        style={{ color: "var(--gold)" }}
                      >
                        {m.title}
                      </h3>
                      <p
                        className="text-sm font-light leading-relaxed"
                        style={{ color: "oklch(0.97 0.012 85 / 0.65)" }}
                      >
                        {m.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 · ARTISAN HERITAGE — full-bleed image + text ── */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${atelierImg})` }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "oklch(0.14 0.012 60 / 0.84)" }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="text-[10px] tracking-luxe uppercase mb-4" style={{ color: "var(--gold)" }}>
              Artisan Heritage
            </p>
            <h2
              className="font-display text-4xl md:text-6xl leading-snug mb-6"
              style={{ color: "var(--ivory)" }}
            >
              Our Artisans,<br />
              <em className="font-light">Our Legacy.</em>
            </h2>
            <span className="gold-line mb-8 mx-auto block" />
            <p
              className="text-base md:text-lg font-light leading-relaxed mb-10"
              style={{ color: "oklch(0.97 0.012 85 / 0.68)" }}
            >
              Behind every sheinar creation stands the heart of India — its artisans. We honour their mastery, ensuring fair wages, safe workshops, and generational skill preservation. Their hands transform dreams into heirlooms.
            </p>
            {/* stat row */}
            <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mb-12">
              {[["600+", "Artisans"], ["40+", "Years"], ["∞", "Heirlooms"]].map(([num, label]) => (
                <div key={label} className="text-center">
                  <p className="font-display text-3xl md:text-4xl mb-1" style={{ color: "var(--gold)" }}>{num}</p>
                  <p className="text-[10px] tracking-luxe uppercase opacity-55" style={{ color: "var(--ivory)" }}>{label}</p>
                </div>
              ))}
            </div>
            <blockquote
              className="font-display text-xl md:text-2xl italic"
              style={{ color: "var(--gold-soft)" }}
            >
              "Legacy is not what we leave behind —<br />
              it is what we weave into the world."
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ── 05 · THREE PILLARS ── */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <Reveal>
            <p className="text-[10px] tracking-luxe uppercase mb-4 text-center" style={{ color: "var(--gold)" }}>
              The Pillars of Our Legacy
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-center mb-16">
              What we stand on
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {pillars.map((p, i) => (
              <Reveal key={p.word} delay={i * 0.08}>
                <div className="text-center px-4">
                  <p
                    className="font-display text-5xl mb-4"
                    style={{ color: "oklch(0.72 0.12 78 / 0.3)" }}
                  >
                    {p.icon}
                  </p>
                  <h3 className="font-display text-2xl mb-3" style={{ color: "var(--gold)" }}>
                    {p.word}
                  </h3>
                  <span className="gold-line mb-5 mx-auto block" />
                  <p className="text-sm font-light leading-relaxed opacity-75">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 06 · GALLERY STRIP ── */}
      <section className="pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {[productKurtaImg, productLehengaImg, productCoutureImg, productSareeImg].map((src, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="hover-zoom aspect-square">
                <img src={src} alt={`Legacy ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 07 · CLOSING CTA ── */}
      <section className="py-24 text-center px-6" style={{ background: "oklch(0.14 0.012 60)" }}>
        <Reveal>
          <p className="text-[10px] tracking-luxe uppercase mb-4" style={{ color: "var(--gold)" }}>
            Continuing the Legacy
          </p>
          <h2
            className="font-display text-4xl md:text-5xl mb-6"
            style={{ color: "var(--ivory)" }}
          >
            A bridge between<br />
            <em className="font-light">past and future.</em>
          </h2>
          <span className="gold-line mb-8 mx-auto block" />
          <p
            className="text-base font-light leading-relaxed max-w-xl mx-auto mb-10"
            style={{ color: "oklch(0.97 0.012 85 / 0.6)" }}
          >
            Every sheinar creation is a legacy stitched in gold, carried by those who cherish artistry over speed. Explore the journey — and become part of it.
          </p>
          <Link to="/collections/$category" params={{ category: "all" }} className="btn-luxe">
            Explore the Journey
          </Link>
        </Reveal>
      </section>

    </div>
  );
}
