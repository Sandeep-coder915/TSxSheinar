import { Reveal } from "@/components/site/Reveal";
import type { ReactNode } from "react";

interface Section { heading: string; body: ReactNode; }

export function NarrativePage({
  eyebrow, title, italic, intro, image, sections,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  intro: string;
  image?: string;
  sections: Section[];
}) {
  return (
    <div className="pt-32 pb-24 embroidery-bg">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <Reveal>
          <p className="text-[10px] tracking-luxe uppercase mb-4" style={{ color: "var(--gold)" }}>{eyebrow}</p>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05]">
            {title}{italic && <><br /><em className="font-light">{italic}</em></>}
          </h1>
          <span className="gold-line mt-8" />
          <p className="mt-10 text-base md:text-lg font-light leading-relaxed opacity-80">{intro}</p>
        </Reveal>
      </div>

      {image && (
        <div className="max-w-5xl mx-auto px-6 lg:px-12 mt-20">
          <Reveal>
            <div className="hover-zoom aspect-[16/9]">
              <img src={image} alt={title} className="w-full h-full object-cover" loading="lazy" />
            </div>
          </Reveal>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6 lg:px-12 mt-20 space-y-16">
        {sections.map((s, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <h2 className="font-display text-3xl md:text-4xl mb-4">{s.heading}</h2>
            <span className="gold-line" />
            <div className="mt-6 text-base font-light leading-relaxed opacity-85 space-y-4">{s.body}</div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
