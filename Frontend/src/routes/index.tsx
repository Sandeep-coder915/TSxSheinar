import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { useProducts } from "@/hooks/useProducts";
import { AppointmentModal } from "@/components/site/AppointmentModal";
import heroImg from "@/assets/hero-couture.jpg";
import founderImg from "@/assets/founder.jpg";
import atelierImg from "@/assets/atelier-hands.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The House of Sheinar — Heirloom Indian Couture" },
      { name: "description", content: "Bespoke lehengas, sarees, sherwanis and couture gowns hand-crafted in our Chandigarh atelier." },
    ],
  }),
  component: Index,
});

function Hero({ onBook }: { onBook: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden" style={{ background: "var(--noir)" }}>
      <motion.div style={{ y }} className="absolute inset-0">
        <img src={heroImg} alt="Sheinar bridal couture" className="w-full h-full object-cover opacity-70" width={1920} height={1280} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6" >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.3 }}
          className="text-[10px] md:text-xs tracking-luxe uppercase mb-6"
          style={{ color: "var(--gold)" }}
        >
          ✦  Est. An Atelier of Memory  ✦
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.5 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-balance leading-[1.05]"
          style={{ color: "var(--ivory)" }}
        >
          Where every thread<br /><em className="font-light">remembers a story.</em>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.4, delay: 0.9 }}
          className="my-8= w-32 h-px"
          style={{ background: "var(--gold)" }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.1 }}
          className="max-w-xl text-sm md:text-base font-light opacity-80 mb-10"
          style={{ color: "var(--ivory)" }}
        >
          The House of Sheinar is a slow couture atelier — devoted to the disappearing arts of Indian embroidery, woven into garments meant to outlive us.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a href="#appointment" className="btn-luxe" onClick={e => { e.preventDefault(); onBook(); }}>Book Appointment</a>
          <Link to="/collections/couture" className="btn-luxe">Explore Collections</Link>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.4, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-luxe"
        style={{ color: "var(--ivory)" }}
      >
        SCROLL
      </motion.div>
    </section>
  );
}

function Artistry() {
  return (
    <section className="py-32 px-6 lg:px-12 embroidery-bg">
      <div className="max-w-5xl mx-auto text-center">
        <Reveal>
          <p className="text-[10px] tracking-luxe uppercase mb-4" style={{ color: "var(--gold)" }}>
            ✦  The Artistry Behind Sheinar  ✦
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="font-display text-4xl md:text-6xl text-balance leading-tight mb-8">
            A garment that is not made.<br /><em>It is composed.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <span className="gold-line" />
        </Reveal>
        <Reveal delay={0.4}>
          <p className="mt-8 text-base md:text-lg leading-relaxed font-light max-w-3xl mx-auto" style={{ color: "var(--muted-foreground)" }}>
            At Sheinar, an heirloom begins not with cloth but with conversation. Months are spent in the studio listening — to a bride's grandmother, to the colour of a memory, to the way light falls through a particular window. Only then do we draw, dye, and embroider, layering thousands of hours of zardozi, mukaish, and aari into a single piece.
          </p>
        </Reveal>
        <Reveal delay={0.5}>
          <p className="mt-6 italic font-display text-xl" style={{ color: "var(--maroon)" }}>
            "Couture is the architecture of feeling."
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function FounderNote() {
  return (
    <section className="py-32 px-6 lg:px-12" style={{ background: "var(--noir)", color: "var(--ivory)" }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <Reveal y={40}>
          <div className="hover-zoom aspect-[4/5] overflow-hidden">
            <img src={founderImg} alt="Founder of Sheinar" className="w-full h-full object-cover" loading="lazy" width={1024} height={1280} />
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-[10px] tracking-luxe uppercase mb-4" style={{ color: "var(--gold)" }}>A Note from the Founder</p>
          <h2 className="font-display text-4xl md:text-5xl mb-6 leading-tight">
            "I do not design clothes.<br /><em>I gather memory.</em>"
          </h2>
          <span className="gold-line" />
          <div className="mt-8 space-y-5 text-sm md:text-base font-light leading-relaxed opacity-85">
            <p>
              Sheinar was born in a small room in  Chandigarh, with a roll of unbleached muslin and the murmur of a sewing machine my mother had carried across the partition. The first dupatta I designed took 11 months. It was not for sale.
            </p>
            <p>
              Today, our atelier is larger, our karigars are 64, and our brides come from every corner of the world. But the discipline remains the same: nothing leaves these walls until it has earned its place in someone's wardrobe — and someone's life.
            </p>
            <p className="font-display text-2xl italic pt-4" style={{ color: "var(--gold)" }}>— Sheinar</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Vision() {
  return (
    <section className="py-32 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
        <Reveal>
          <p className="text-[10px] tracking-luxe uppercase" style={{ color: "var(--gold)" }}>The Sheinar Philosophy</p>
          <h2 className="font-display text-4xl md:text-5xl mt-4">Three pillars,<br /><em>one discipline.</em></h2>
        </Reveal>
        {[
          { n: "I", t: "Slowness", d: "We measure our work in seasons, not calendars. A single bridal lehenga takes between 800 and 1,800 hours of handwork." },
          { n: "II", t: "Lineage", d: "Every karigar in our atelier comes from a family of embroiderers — second, third, sometimes fifth generation. We pay the craft its due." },
        ].map((p, i) => (
          <Reveal key={p.n} delay={0.15 * (i + 1)}>
            <div className="border-t pt-8" style={{ borderColor: "var(--gold)" }}>
              <span className="font-display text-5xl" style={{ color: "var(--gold)" }}>{p.n}</span>
              <h3 className="font-display text-2xl mt-4 mb-3">{p.t}</h3>
              <p className="text-sm font-light leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{p.d}</p>
            </div>
          </Reveal>
        ))}
        <Reveal delay={0.45} className="md:col-start-2 md:col-span-2 lg:col-start-3 lg:col-span-1">
          <div className="border-t pt-8" style={{ borderColor: "var(--gold)" }}>
            <span className="font-display text-5xl" style={{ color: "var(--gold)" }}>III</span>
            <h3 className="font-display text-2xl mt-4 mb-3">Memory</h3>
            <p className="text-sm font-light leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              Our garments are designed to be worn at the most consequential moments of life — and to be passed on long after.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Atelier({ onBook }: { onBook: () => void }) {
  return (
    <section className="relative py-32 overflow-hidden" style={{ background: "var(--maroon)", color: "var(--ivory)" }}>
      <div className="absolute inset-0 opacity-30">
        {/* <img src={atelierImg} alt="Atelier embroidery" className="w-full h-full object-cover" loading="lazy" width={1920} height={1080} /> */}
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
      </div>
      <div className="relative max-w-4xl mx-auto text-center px-6">
        <Reveal>
          <p className="text-[10px] tracking-luxe uppercase mb-4" style={{ color: "var(--gold)" }}>Inside Our Atelier</p>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="font-display text-4xl md:text-6xl leading-tight">
            Sixty-four hands.<br /><em>One quiet rhythm.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mt-8 max-w-2xl mx-auto font-light text-base opacity-85 leading-relaxed">
            Step into the Sheinar atelier in Lutyens Chandigarh — where master karigars work side-by-side under daylight, embroidering on adda frames passed down for generations.
          </p>
        </Reveal>
        <Reveal delay={0.45}>
          <button onClick={onBook} className="mt-10 btn-luxe inline-block">Visit the Atelier</button>
        </Reveal>
      </div>
    </section>
  );
}

function Showcase() {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm opacity-60">Loading collection...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm opacity-60">Unable to load collection. Please try again later.</p>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm opacity-60">No pieces available yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-luxe uppercase mb-4" style={{ color: "var(--gold)" }}>The Collection</p>
            <h2 className="font-display text-4xl md:text-6xl">Pieces in residence</h2>
            <span className="gold-line mt-6" />
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1}>
              <Link to="/product/$slug" params={{ slug: p.slug }} className="block group">
                <div className="hover-zoom aspect-[3/4] mb-5 bg-muted">
                  <img src={p.images[0]?.url || ''} alt={p.name} className="w-full h-full object-cover" loading="lazy" width={1024} height={1280} />
                </div>
                <p className="text-[10px] tracking-luxe uppercase mb-2" style={{ color: "var(--gold)" }}>{p.category}</p>
                <h3 className="font-display text-xl mb-2 group-hover:text-[color:var(--maroon)] transition-colors">{p.name}</h3>
                <p className="text-xs font-light opacity-70">{p.price ? `₹ ${p.price.toLocaleString()}` : 'Price on request'}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { q: "Wearing Sheinar on my wedding day was like being held by every woman who came before me.", a: "— Aanya M., Bride, Udaipur" },
    { q: "The detailing is operatic. I have never owned anything so quietly extraordinary.", a: "— Tara K., Patron, London" },
    { q: "It is not couture. It is autobiography stitched in gold.", a: "— Vogue India" },
  ];
  return (
    <section className="py-32 px-6 lg:px-12 embroidery-bg">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-20">
            <p className="text-[10px] tracking-luxe uppercase mb-4" style={{ color: "var(--gold)" }}>Voices of Appreciation</p>
            <h2 className="font-display text-4xl md:text-5xl">In the words of those<br /><em>who have worn us.</em></h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-12">
          {items.map((t, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div className="text-center px-4">
                <span className="font-display text-6xl" style={{ color: "var(--gold)" }}>"</span>
                <p className="font-display text-xl italic leading-relaxed mt-2 mb-6" style={{ color: "var(--maroon)" }}>{t.q}</p>
                <span className="gold-line" />
                <p className="text-[11px] tracking-wide-luxe uppercase mt-4 opacity-70">{t.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Appointment({ onBook }: { onBook: () => void }) {
  return (
    <section id="appointment" className="py-32 px-6 lg:px-12" style={{ background: "var(--noir)", color: "var(--ivory)" }}>
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <p className="text-[10px] tracking-luxe uppercase mb-4" style={{ color: "var(--gold)" }}>By Appointment Only</p>
          <h2 className="font-display text-4xl md:text-6xl mb-6">A private audience<br /><em>with the atelier.</em></h2>
          <p className="font-light opacity-80 max-w-xl mx-auto mb-10">
            Each piece begins with conversation. Reserve a one-on-one consultation with our design team in Chandigarh, Mumbai, or virtually — and let your story take form.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={onBook} className="btn-luxe">Book Appointment</button>
            <a href="https://wa.me/916239315288" target="_blank" rel="noopener" className="btn-luxe">WhatsApp the Atelier</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Index() {
  const [apptOpen, setApptOpen] = useState(false);
  return (
    <>
      <Hero onBook={() => setApptOpen(true)} />
      <Artistry />
      <FounderNote />
      <Vision />
      <Atelier onBook={() => setApptOpen(true)} />
      <Showcase />
      <Testimonials />
      <Appointment onBook={() => setApptOpen(true)} />
      <AppointmentModal open={apptOpen} onClose={() => setApptOpen(false)} />
    </>
  );
}
