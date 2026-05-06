import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import heroCoutureImg from "@/assets/hero-couture.jpg";
import atelierImg from "@/assets/atelier-hands.jpg";
import productLehengaImg from "@/assets/product-lehenga.jpg";
import productSareeImg from "@/assets/product-saree.jpg";
import productKurtaImg from "@/assets/product-kurta.jpg";
import founderImg from "@/assets/founder.jpg";

export const Route = createFileRoute("/philosophy")({
  head: () => ({
    meta: [
      { title: "The sheinar Philosophy" },
      { name: "description", content: "Where heritage meets heart, and craftsmanship becomes a language of devotion." },
      { property: "og:title", content: "The sheinar Philosophy" },
    ],
  }),
  component: PhilosophyPage,
});

const tenets = [
  {
    word: "Grace",
    icon: "✦",
    desc: "The essence of subtlety — every silhouette flows like poetry in motion. Grace is not decoration; it is the quiet confidence of a garment that knows exactly what it is.",
    img: productSareeImg,
  },
  {
    word: "Soul",
    icon: "◈",
    desc: "Crafted not in haste, but in heart. Each thread holds emotion, care, and devotion. A sheinar piece carries the breath of the artisan who made it — you can feel it when you wear it.",
    img: atelierImg,
  },
  {
    word: "Timelessness",
    icon: "◇",
    desc: "Fashion fades, but artistry endures. We create heirlooms, not garments. Every piece is designed to outlive the season it was born in — and to be passed down as a memory.",
    img: productLehengaImg,
  },
  {
    word: "Divinity",
    icon: "❋",
    desc: "Every piece embodies divine craftsmanship — the hand of an artisan guided by spirit. There is a reverence in the making that the wearer inherits. Clothing as devotion.",
    img: productKurtaImg,
  },
];

const beliefs = [
  {
    heading: "Luxury is Intention",
    body: "At sheinar, luxury is not defined by excess — it is defined by intention. Every creation is an act of reverence — to tradition, time, and touch. We see clothing as emotion, not product.",
  },
  {
    heading: "Slowness is Strength",
    body: "We refuse to compress time. A bridal lehenga that requires 1,800 hours of handwork is given 1,800 hours. There is no other way to honour the craft. Speed is the enemy of soul.",
  },
  {
    heading: "Lineage is Currency",
    body: "Every karigar in the sheinar atelier comes from a family of embroiderers. Skill is inherited, not trained — and we pay for inheritance accordingly. Their knowledge is irreplaceable.",
  },
  {
    heading: "Memory is the Purpose",
    body: "sheinar garments are designed to be worn at the most consequential moments of a life — and to be passed on long after. We do not make clothes. We make the things people keep forever.",
  },
];

function PhilosophyPage() {
  return (
    <div className="embroidery-bg overflow-x-hidden">

      {/* ── 01 · VIDEO HERO with text overlay ── */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Video — swap src when a real file is available */}
       <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={atelierImg}
        >
          {/* swap src for a real video when available */}
          <source src="/journal-hero.mp4" type="video/mp4" />
        </video>

        {/* Fallback image when no video */}
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroCoutureImg})` }}
        />

        {/* Layered overlay — dark vignette + subtle gold tint at bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, oklch(0.14 0.012 60 / 0.55) 0%, oklch(0.14 0.012 60 / 0.75) 60%, oklch(0.14 0.012 60 / 0.92) 100%)",
          }}
        />

        {/* Centered text overlay */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <Reveal>
            <p
              className="text-[10px] tracking-luxe uppercase mb-6"
              style={{ color: "var(--gold)" }}
            >
              The sheinar Philosophy
            </p>

            <h1
              className="font-display text-5xl sm:text-6xl md:text-8xl leading-[1.02] mb-8"
              style={{ color: "var(--ivory)" }}
            >
              Where heritage<br />
              meets <em className="font-light">heart.</em>
            </h1>

            <span className="gold-line mx-auto block mb-8" />

            <p
              className="text-base md:text-xl font-light leading-relaxed max-w-2xl mx-auto"
              style={{ color: "oklch(0.97 0.012 85 / 0.72)" }}
            >
              And craftsmanship becomes a language of devotion.
            </p>
          </Reveal>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[9px] tracking-luxe uppercase" style={{ color: "var(--ivory)" }}>Scroll</span>
          <div className="w-px h-10" style={{ background: "var(--gold)" }} />
        </div>
      </section>

      {/* ── 02 · OPENING STATEMENT ── */}
      <section className="max-w-3xl mx-auto px-6 lg:px-12 py-28 text-center">
        <Reveal>
          <p className="text-[10px] tracking-luxe uppercase mb-4" style={{ color: "var(--gold)" }}>
            The Essence of sheinar
          </p>
          <h2 className="font-display text-4xl md:text-5xl leading-snug mb-6">
            A poetic dialogue between<br />
            <em className="font-light">artisan and wearer.</em>
          </h2>
          <span className="gold-line mb-8 mx-auto block" />
          <p className="text-base md:text-lg font-light leading-relaxed opacity-80">
            At sheinar, luxury is not defined by excess — it is defined by intention. Every creation is an act of reverence — to tradition, time, and touch. We see clothing as emotion, not product.
          </p>
        </Reveal>
      </section>

      {/* ── 03 · FOUR TENETS — alternating image + text ── */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <Reveal>
            <p className="text-[10px] tracking-luxe uppercase mb-3 text-center" style={{ color: "var(--gold)" }}>
              The Four Tenets of sheinar
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-center mb-20">
              What we stand for
            </h2>
          </Reveal>

          <div className="space-y-28">
            {tenets.map((t, i) => (
              <Reveal key={t.word} delay={i * 0.06}>
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center ${
                    i % 2 === 1 ? "md:[direction:rtl]" : ""
                  }`}
                >
                  {/* Image */}
                  <div className={i % 2 === 1 ? "md:[direction:ltr]" : ""}>
                    <div className="hover-zoom aspect-[4/3]">
                      <img
                        src={t.img}
                        alt={t.word}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Text */}
                  <div className={i % 2 === 1 ? "md:[direction:ltr]" : ""}>
                    <p
                      className="font-display text-6xl md:text-7xl mb-1 leading-none"
                      style={{ color: "oklch(0.72 0.12 78 / 0.15)" }}
                    >
                      {t.icon}
                    </p>
                    <h3 className="font-display text-4xl md:text-5xl mb-4">{t.word}</h3>
                    <span className="gold-line mb-6 block" />
                    <p className="text-base font-light leading-relaxed opacity-80">{t.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 · PULL QUOTE ── */}
      <section
        className="py-28 px-6 text-center"
        style={{ background: "oklch(0.14 0.012 60)" }}
      >
        <Reveal>
          <span
            className="font-display text-7xl md:text-9xl leading-none block mb-6"
            style={{ color: "oklch(0.72 0.12 78 / 0.12)" }}
          >
            "
          </span>
          <blockquote
            className="font-display text-2xl md:text-4xl italic leading-relaxed max-w-3xl mx-auto"
            style={{ color: "var(--ivory)" }}
          >
            In every thread lies a prayer,<br />
            in every creation —<br />
            <span style={{ color: "var(--gold)" }}>a story waiting to be worn.</span>
          </blockquote>
        </Reveal>
      </section>

      {/* ── 05 · CRAFT MEETS MODERNITY — split image ── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <Reveal>
              <div className="hover-zoom aspect-[3/4] max-w-sm mx-auto md:mx-0">
                <img
                  src={founderImg}
                  alt="Craft meets modernity"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[10px] tracking-luxe uppercase mb-4" style={{ color: "var(--gold)" }}>
                Craft Meets Modernity
              </p>
              <h2 className="font-display text-3xl md:text-4xl mb-6">
                Two worlds,<br />
                <em className="font-light">one soul.</em>
              </h2>
              <span className="gold-line mb-8 block" />
              <p className="text-base font-light leading-relaxed opacity-80 mb-6">
                sheinar bridges the heritage of Indian embroidery and the precision of contemporary couture. Each design reinterprets age-old techniques for a global gaze while retaining its soul in every stitch.
              </p>
              <p className="text-base font-light leading-relaxed opacity-80">
                We do not choose between tradition and innovation. We believe the most powerful things are born at their intersection — where the ancient and the modern breathe together.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 06 · FOUR BELIEFS — dark grid ── */}
      <section
        className="py-24"
        style={{ background: "oklch(0.14 0.012 60)" }}
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <Reveal>
            <p className="text-[10px] tracking-luxe uppercase mb-4 text-center" style={{ color: "var(--gold)" }}>
              A Legacy Woven with Purpose
            </p>
            <h2
              className="font-display text-4xl md:text-5xl text-center mb-4"
              style={{ color: "var(--ivory)" }}
            >
              What we truly believe
            </h2>
            <p
              className="text-center text-base font-light opacity-55 mb-16 max-w-xl mx-auto"
              style={{ color: "var(--ivory)" }}
            >
              Our philosophy is an ode to patience, precision, and passion. Luxury is not in excess — it is in essence.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {beliefs.map((b, i) => (
              <Reveal key={b.heading} delay={i * 0.07}>
                <div
                  className="p-8 border"
                  style={{ borderColor: "oklch(0.72 0.12 78 / 0.2)" }}
                >
                  <p
                    className="font-display text-3xl mb-1"
                    style={{ color: "oklch(0.72 0.12 78 / 0.2)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3
                    className="font-display text-xl mb-4"
                    style={{ color: "var(--gold)" }}
                  >
                    {b.heading}
                  </h3>
                  <p
                    className="text-sm font-light leading-relaxed"
                    style={{ color: "oklch(0.97 0.012 85 / 0.65)" }}
                  >
                    {b.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 07 · EMOTIONAL CLOSING BANNER ── */}
      <section className="relative py-32 px-6 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${atelierImg})` }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "oklch(0.14 0.012 60 / 0.82)" }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <Reveal>
            <p className="text-[10px] tracking-luxe uppercase mb-6" style={{ color: "var(--gold)" }}>
              Our Craftsmanship
            </p>
            <h2
              className="font-display text-4xl md:text-6xl leading-snug mb-6"
              style={{ color: "var(--ivory)" }}
            >
              Discover the soul<br />
              <em className="font-light">of sheinar.</em>
            </h2>
            <span className="gold-line mb-8 mx-auto block" />
            <p
              className="text-base font-light leading-relaxed mb-10 max-w-lg mx-auto"
              style={{ color: "oklch(0.97 0.012 85 / 0.65)" }}
            >
              Where every piece is an ode to Indian karigari and global finesse. Explore our collections and feel the philosophy in every thread.
            </p>
            <Link
              to="/collections/$category"
              params={{ category: "all" }}
              className="btn-luxe"
            >
              Explore Our Craftsmanship
            </Link>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
