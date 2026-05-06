import { createFileRoute } from "@tanstack/react-router";
import { NarrativePage } from "@/components/site/NarrativePage";

export const Route = createFileRoute("/philosophy")({
  head: () => ({ meta: [
    { title: "The Sheinar Philosophy" },
    { name: "description", content: "Three quiet pillars that define the work of The House of Sheinar." },
    { property: "og:title", content: "The Sheinar Philosophy" },
  ]}),
  component: () => (
    <NarrativePage
      eyebrow="The Sheinar Philosophy"
      title="What we believe,"
      italic="and how we work."
      intro="Three commitments shape every piece that leaves our atelier — slowness, lineage, and memory. They are not marketing language. They are operational truths."
      sections={[
        { heading: "I. Slowness", body: <p>We refuse to compress time. A bridal lehenga that requires 1,800 hours of handwork is given 1,800 hours. There is no other way to honour the craft.</p> },
        { heading: "II. Lineage", body: <p>Every karigar in the Sheinar atelier comes from a family of embroiderers. Skill is inherited, not trained — and we pay for inheritance accordingly.</p> },
        { heading: "III. Memory", body: <p>Sheinar garments are designed to be worn at the most consequential moments of a life — and to be passed on long after that life has continued.</p> },
      ]}
    />
  ),
});
