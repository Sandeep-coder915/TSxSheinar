import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import atelier from "@/assets/atelier-hands.jpg";
import lehenga from "@/assets/product-lehenga.jpg";
import founder from "@/assets/founder.jpg";

const entries = [
  { title: "On the patience of gold", date: "Spring Volume — 2026", img: atelier, excerpt: "Why one of our master karigars takes three days to finish a single peacock motif — and would not have it any other way." },
  { title: "A bride's grandmother's wedding sari", date: "Winter Volume — 2025", img: lehenga, excerpt: "How a single faded photograph from 1962 became the design key for an entire bridal trousseau." },
  { title: "Letters from the atelier", date: "Autumn Volume — 2025", img: founder, excerpt: "An evening with our founder, on what it means to refuse trend in an industry built on it." },
];

export const Route = createFileRoute("/journal")({
  head: () => ({ meta: [
    { title: "Journal — The House of Sheinar" },
    { name: "description", content: "Long-form essays from the Sheinar atelier — on craft, memory, and slow couture." },
    { property: "og:title", content: "Journal — The House of Sheinar" },
  ]}),
  component: () => (
    <div className="pt-32 pb-24 embroidery-bg">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <Reveal>
          <div className="text-center mb-20">
            <p className="text-[10px] tracking-luxe uppercase mb-4" style={{ color: "var(--gold)" }}>The Sheinar Journal</p>
            <h1 className="font-display text-5xl md:text-7xl">Letters from<br /><em>the atelier.</em></h1>
            <span className="gold-line mt-6" />
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-10">
          {entries.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.1}>
              <Link to="/" className="block group">
                <div className="hover-zoom aspect-[4/5] mb-5"><img src={e.img} alt={e.title} className="w-full h-full object-cover" loading="lazy" /></div>
                <p className="text-[10px] tracking-luxe uppercase mb-2" style={{ color: "var(--gold)" }}>{e.date}</p>
                <h3 className="font-display text-xl mb-2 group-hover:text-[color:var(--maroon)] transition-colors">{e.title}</h3>
                <p className="text-sm font-light opacity-75">{e.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  ),
});
