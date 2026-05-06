import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";

const milestones = [
  { y: "1998", t: "First Frame", d: "A single karigar, a single dupatta, eleven months of work." },
  { y: "2004", t: "The Atelier Opens", d: "Sheinar moves into its current Lutyens Delhi atelier — 64 frames, north-facing light." },
  { y: "2011", t: "First Bridal Couture", d: "Our debut bridal collection is presented privately to a circle of patrons." },
  { y: "2018", t: "Vogue India Cover", d: "A Sheinar lehenga appears on the cover of Vogue India's 10th anniversary issue." },
  { y: "2024", t: "The Karigar Trust", d: "We establish a trust funding the children of our karigars through university." },
];

export const Route = createFileRoute("/legacy")({
  head: () => ({ meta: [
    { title: "Legacy — The House of Sheinar" },
    { name: "description", content: "A timeline of The House of Sheinar — milestones in slow craft and Indian couture." },
    { property: "og:title", content: "Legacy — The House of Sheinar" },
  ]}),
  component: () => (
    <div className="pt-32 pb-24 embroidery-bg min-h-screen">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <Reveal>
          <div className="text-center mb-20">
            <p className="text-[10px] tracking-luxe uppercase mb-4" style={{ color: "var(--gold)" }}>The Sheinar Legacy</p>
            <h1 className="font-display text-5xl md:text-7xl">A house,<br /><em>still becoming.</em></h1>
            <span className="gold-line mt-6" />
          </div>
        </Reveal>
        <div className="space-y-12">
          {milestones.map((m, i) => (
            <Reveal key={m.y} delay={i * 0.1}>
              <div className="grid grid-cols-[80px_1fr] gap-8 border-t pt-8" style={{ borderColor: "var(--gold)" }}>
                <span className="font-display text-3xl" style={{ color: "var(--gold)" }}>{m.y}</span>
                <div>
                  <h3 className="font-display text-2xl mb-2">{m.t}</h3>
                  <p className="text-sm font-light opacity-80 leading-relaxed">{m.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  ),
});
