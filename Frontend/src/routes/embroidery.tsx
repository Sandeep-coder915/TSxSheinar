import { createFileRoute } from "@tanstack/react-router";
import { NarrativePage } from "@/components/site/NarrativePage";
import img from "@/assets/atelier-hands.jpg";

export const Route = createFileRoute("/embroidery")({
  head: () => ({ meta: [
    { title: "The Art of Embroidery — Sheinar" },
    { name: "description", content: "A guide to the embroidery techniques practiced at the Sheinar atelier — zardozi, dabka, mukaish, aari, chikankari." },
    { property: "og:title", content: "The Art of Embroidery — Sheinar" },
  ]}),
  component: () => (
    <NarrativePage
      eyebrow="The Art of Embroidery"
      title="The grammar"
      italic="of our craft."
      intro="Five embroidery traditions form the language of Sheinar. Each is centuries old, each carries its own discipline, and each is practiced in our atelier by master karigars whose families have kept these arts alive."
      image={img}
      sections={[
        { heading: "Zardozi", body: <p>Originating in Persia and perfected in the Mughal courts of India — metallic thread, dabka, and gemstones worked over stretched fabric on an adda frame. A signature of bridal Sheinar.</p> },
        { heading: "Mukaish", body: <p>From Lucknow — twisting fine metallic strips through fabric to form tiny gleaming dots. A vanishing art; only a handful of master mukaish-karigars remain in India.</p> },
        { heading: "Aari", body: <p>Hooked needle embroidery, capable of extraordinary three-dimensional detail. Used in our couture gowns for sculptural floral motifs.</p> },
        { heading: "Chikankari & Kantha", body: <p>The whisper-quiet arts: white thread on white cloth, running stitch as meditation. Used in our daywear and resortwear separates.</p> },
      ]}
    />
  ),
});
