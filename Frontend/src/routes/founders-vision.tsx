import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "@/components/site/Reveal";
import img from "@/assets/founder.jpg";

export const Route = createFileRoute("/founders-vision")({
  head: () => ({ 
    meta: [
      { title: "Founder's Vision — Sheinar" },
      { name: "description", content: "Where every thread breathes life into a story of heritage, heart, and modern grace." },
      { property: "og:title", content: "Founder's Vision — Sheinar" },
    ]
  }),
  component: FoundersVision,
});

function FoundersVision() {
  const pillars = [
    {
      title: "Artistry",
      description: "Every creation begins with emotion — a spark that transforms fabric into poetry.",
      icon: "✦"
    },
    {
      title: "Authenticity",
      description: "We honor our roots, celebrating Indian craftsmanship while reimagining it for global elegance.",
      icon: "✦"
    },
    {
      title: "Empathy",
      description: "Our artisans are the soul of sheinar. Every creation supports their dreams, dignity, and legacy.",
      icon: "✦"
    }
  ];

  return (
    <div className="pt-24 pb-20 embroidery-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Hero Section */}
        <Reveal>
          <div className="text-center mb-16 md:mb-20">
            <p className="text-[10px] tracking-luxe uppercase mb-4" style={{ color: "var(--gold)" }}>
              The Vision
            </p>
            <h1 className="font-display text-4xl md:text-6xl leading-tight mb-6">
              Where every thread breathes life
            </h1>
            <p className="font-display italic text-xl md:text-2xl mb-6" style={{ color: "var(--maroon)" }}>
              into a story of heritage, heart, and modern grace.
            </p>
            <span className="gold-line mx-auto mb-8" />
            <p className="text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-light opacity-85">
              "To weave heritage into the fabric of tomorrow."
            </p>
          </div>
        </Reveal>

        {/* Founder's Story */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 mb-20 items-center">
          <Reveal y={20}>
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={img}
                alt="The Founder"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal y={20}>
            <div>
              <p className="text-[10px] tracking-luxe uppercase mb-6" style={{ color: "var(--gold)" }}>
                The Beginning
              </p>
              <p className="text-sm md:text-base leading-relaxed font-light opacity-85 mb-6">
                The founder of sheinar envisioned a world where fashion transcends time — where every piece whispers stories of India's golden past, while embracing the pulse of the modern muse.
              </p>
              <p className="text-sm md:text-base leading-relaxed font-light opacity-85 mb-6">
                The dream began not in a boardroom, but in an ancestral atelier — where silks rustled, threads shimmered, and generations of artisans spoke in the language of stitches.
              </p>
              <span className="gold-line block mb-6" />
              <blockquote className="border-l-2 pl-6 py-4 text-sm md:text-base italic font-light" style={{ borderColor: "var(--gold)" }}>
                "Couture, to me, is not merely about design — it's a philosophy. It's about preserving the intangible — the patience of a craftsman, the rhythm of tradition, the soul of a stitch."
              </blockquote>
            </div>
          </Reveal>
        </div>

        {/* Pillars of Philosophy */}
        <div className="mb-20">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-[10px] tracking-luxe uppercase mb-4" style={{ color: "var(--gold)" }}>
                Our Foundation
              </p>
              <h2 className="font-display text-3xl md:text-4xl mb-4">
                The Pillars of Our Philosophy
              </h2>
              <span className="gold-line mx-auto" />
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="p-6 md:p-8 border"
                style={{ borderColor: "var(--gold)" }}
              >
                <p className="text-3xl mb-4" style={{ color: "var(--gold)" }}>{pillar.icon}</p>
                <h3 className="font-display text-xl mb-4" style={{ color: "var(--maroon)" }}>
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed font-light opacity-80">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vision in Action */}
        <div className="bg-opacity-50 p-8 md:p-12 border mb-20" style={{ borderColor: "var(--gold)" }}>
          <Reveal>
            <div>
              <p className="text-[10px] tracking-luxe uppercase mb-4" style={{ color: "var(--gold)" }}>
                Philosophy
              </p>
              <h2 className="font-display text-3xl md:text-4xl mb-6">
                Vision in Action
              </h2>
              <span className="gold-line mb-8" />
              <p className="text-sm md:text-base leading-relaxed font-light opacity-85 mb-6">
                Our founder's vision thrives in every atelier — where artisans blend the finesse of old-world embroidery with modern silhouettes.
              </p>
              <p className="text-sm md:text-base leading-relaxed font-light opacity-85 mb-8">
                Each stitch becomes a testament to India's legacy — not frozen in time, but evolving with elegance and authenticity.
              </p>
              <blockquote className="text-base md:text-lg italic font-light" style={{ color: "var(--maroon)" }}>
                "A creation should feel alive — it should carry whispers of history and promises of tomorrow."
              </blockquote>
            </div>
          </Reveal>
        </div>

        {/* Legacy Section */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          <Reveal y={20}>
            <div>
              <p className="text-[10px] tracking-luxe uppercase mb-6" style={{ color: "var(--gold)" }}>
                Our Legacy
              </p>
              <h2 className="font-display text-3xl md:text-4xl mb-6">
                "Sheinar is not a label — it's a legacy."
              </h2>
              <span className="gold-line mb-6" />
              <p className="text-sm md:text-base leading-relaxed font-light opacity-85 mb-6">
                Each collection is a reflection of the founder's dream: to create pieces that outlive seasons, trends, and time — garments that become heirlooms.
              </p>
              <p className="text-sm md:text-base leading-relaxed font-light opacity-85">
                When you wear Sheinar, you become part of a lineage. A lineage of beauty, resilience, and timeless grace.
              </p>
            </div>
          </Reveal>
          <Reveal y={20}>
            <div className="bg-opacity-30 p-8 md:p-12 border text-center" style={{ borderColor: "var(--gold)" }}>
              <p className="text-[10px] tracking-luxe uppercase mb-6" style={{ color: "var(--gold)" }}>
                Get Inspired
              </p>
              <a
                href="/collections/couture"
                className="inline-block px-8 py-3 border text-sm tracking-luxe uppercase transition-all hover:bg-opacity-10"
                style={{
                  borderColor: "var(--gold)",
                  color: "var(--gold)",
                }}
              >
                Explore Our Collections
              </a>
            </div>
          </Reveal>
        </div>

        {/* Closing Quote */}
        <Reveal>
          <div className="text-center py-12 border-t border-b" style={{ borderColor: "var(--gold)" }}>
            <blockquote className="font-display text-2xl md:text-3xl italic leading-relaxed" style={{ color: "var(--maroon)" }}>
              "In a world that rewards speed, I chose the opposite. A garment is not finished when the last stitch is tied. It is finished when it has earned its silence — when nothing more can be added, and nothing taken away."
            </blockquote>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
