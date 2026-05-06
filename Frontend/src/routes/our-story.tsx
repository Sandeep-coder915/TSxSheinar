import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import founderImg from "@/assets/founder.jpg";
import atelierImg from "@/assets/atelier-hands.jpg";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: "Our Story — sheinar" },
      { name: "description", content: "Where heritage whispers through every thread. The story of sheinar — born from legacy, woven with purpose." },
      { property: "og:title", content: "Our Story — sheinar" },
    ],
  }),
  component: OurStory,
});

function OurStory() {
  return (
    <div className="embroidery-bg overflow-x-hidden">

      {/* ── Hero: video overlay ── */}
      <section className="relative h-[90vh] min-h-[520px] flex items-center justify-center overflow-hidden">
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
        {/* dark + gold-tinted overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, oklch(0.14 0.012 60 / 0.62), oklch(0.14 0.012 60 / 0.78))" }} />
        {/* fallback bg when no video */}
        <div className="absolute inset-0 -z-10" style={{ backgroundImage: `url(${atelierImg})`, backgroundSize: "cover", backgroundPosition: "center" }} />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <Reveal>
            <p className="text-[10px] tracking-luxe uppercase mb-5" style={{ color: "var(--gold)" }}>Our Story</p>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05]" style={{ color: "var(--ivory)" }}>
              Where heritage whispers<br />
              <em className="font-light">through every thread.</em>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* ── Born From Legacy ── */}
      <section className="max-w-3xl mx-auto px-6 lg:px-12 py-24 text-center">
        <Reveal>
          <p className="text-[10px] tracking-luxe uppercase mb-4" style={{ color: "var(--gold)" }}>Born From Legacy, Woven With Purpose</p>
          <h2 className="font-display text-4xl md:text-5xl leading-snug mb-6">
            From the heart of India's<br /><em className="font-light">artisanal soul</em>
          </h2>
          <span className="gold-line mt-2 mb-8 mx-auto block" />
          <p className="text-base md:text-lg font-light leading-relaxed opacity-80">
            From the heart of India's artisanal soul emerges sheinar — a sanctuary where tradition and innovation entwine. Each piece is a dialogue between thread and dream, sculpted by the hands of artisans who carry centuries of wisdom.
          </p>
        </Reveal>
      </section>

      {/* ── Founder ── */}
      <section className="max-w-6xl mx-auto px-6 lg:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <Reveal>
            <div className="hover-zoom aspect-[3/4] w-full max-w-sm mx-auto md:mx-0">
              <img src={founderImg} alt="The Founder of sheinar" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[10px] tracking-luxe uppercase mb-4" style={{ color: "var(--gold)" }}>Founder</p>
            <h2 className="font-display text-3xl md:text-4xl mb-6">A Note from the Founder</h2>
            <span className="gold-line mb-8 block" />
            <blockquote className="text-base md:text-lg font-light leading-relaxed opacity-85 italic mb-6">
              "At sheinar, we do not create garments — we curate heirlooms. Each thread carries patience, emotion, and devotion. My vision has always been to preserve the poetry of India's hand-embroidery traditions while reimagining them for the modern muse."
            </blockquote>
            <p className="text-xs tracking-luxe uppercase opacity-60">— The Founder, sheinar</p>
          </Reveal>
        </div>
      </section>

      {/* ── The Concept ── */}
      <section className="py-24" style={{ background: "oklch(0.14 0.012 60)" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <Reveal>
            <p className="text-[10px] tracking-luxe uppercase mb-4" style={{ color: "var(--gold)" }}>The Concept</p>
            <h2 className="font-display text-4xl md:text-5xl leading-snug mb-6" style={{ color: "var(--ivory)" }}>
              Art, Culture &amp; <em className="font-light">Couture</em>
            </h2>
            <span className="gold-line mb-8 mx-auto block" />
            <p className="text-base md:text-lg font-light leading-relaxed mb-10" style={{ color: "oklch(0.97 0.012 85 / 0.75)" }}>
              Every sheinar creation is born from the confluence of art, culture, and couture. We draw inspiration from ancient embroidery traditions — zardozi, aari, and resham — transforming them into modern poetry.
            </p>
            <blockquote className="text-lg md:text-xl font-display italic leading-relaxed" style={{ color: "var(--gold-soft)" }}>
              "From sketch to stitch — every creation is slow, deliberate, and soulful. We celebrate art over speed, soul over scale."
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ── Artisans ── */}
      <section className="max-w-6xl mx-auto px-6 lg:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <Reveal>
            <p className="text-[10px] tracking-luxe uppercase mb-4" style={{ color: "var(--gold)" }}>Our Artisans, Our Pride</p>
            <h2 className="font-display text-3xl md:text-4xl mb-6">The hands that<br /><em className="font-light">weave our magic</em></h2>
            <span className="gold-line mb-8 block" />
            <p className="text-base font-light leading-relaxed opacity-80 mb-6">
              sheinar exists to empower the hands that weave its magic. Our ateliers nurture over 400 skilled embroiderers across India, ensuring ethical wages, safe environments, and generational skill preservation.
            </p>
            <p className="text-base font-light leading-relaxed opacity-80">
              Sustainability is not our statement — it's our standard. From natural fabrics to mindful production, every creation honors both craft and conscience.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="hover-zoom aspect-[4/3] w-full">
              <img src={atelierImg} alt="Artisans at work" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <p className="text-[10px] tracking-luxe uppercase mt-3 opacity-50 text-center">Artisans at work</p>
          </Reveal>
        </div>
      </section>

      {/* ── Crafted to Perfection ── */}
      <section className="py-20 text-center px-6" style={{ background: "oklch(0.93 0.02 80)" }}>
        <Reveal>
          <p className="text-[10px] tracking-luxe uppercase mb-4" style={{ color: "var(--gold)" }}>Crafted to Perfection</p>
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            The soul of <em className="font-light">sheinar</em>
          </h2>
          <span className="gold-line mb-8 mx-auto block" />
          <p className="text-base font-light leading-relaxed opacity-75 max-w-xl mx-auto mb-10">
            Discover the soul of sheinar — where every piece is an ode to Indian karigari and global finesse.
          </p>
          <Link to="/collections/$category" params={{ category: "all" }} className="btn-luxe-dark">
            Explore Collections
          </Link>
        </Reveal>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-24 text-center px-6" style={{ background: "oklch(0.14 0.012 60)" }}>
        <Reveal>
          <p className="text-[10px] tracking-luxe uppercase mb-4" style={{ color: "var(--gold)" }}>Newsletter</p>
          <h2 className="font-display text-3xl md:text-4xl mb-3" style={{ color: "var(--ivory)" }}>
            Luxury, Tailored to Perfection
          </h2>
          <p className="text-sm font-light leading-relaxed mb-10 max-w-md mx-auto" style={{ color: "oklch(0.97 0.012 85 / 0.6)" }}>
            Every sheinar creation carries the whisper of heritage and the soul of modern couture.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              className="luxe-input flex-1"
              style={{ borderColor: "oklch(0.85 0.025 80 / 0.3)", color: "var(--ivory)" }}
            />
            <button type="submit" className="btn-luxe whitespace-nowrap">Subscribe</button>
          </form>
        </Reveal>
      </section>

    </div>
  );
}
