import { createFileRoute } from "@tanstack/react-router";
import { NarrativePage } from "@/components/site/NarrativePage";
import img from "@/assets/founder.jpg";

export const Route = createFileRoute("/founders-vision")({
  head: () => ({ meta: [
    { title: "Founder's Vision — Sheinar" },
    { name: "description", content: "The vision behind The House of Sheinar — couture as memory, craft as devotion." },
    { property: "og:title", content: "Founder's Vision — Sheinar" },
  ]}),
  component: () => (
    <NarrativePage
      eyebrow="Founder's Vision"
      title="Couture as"
      italic="cultural memory."
      intro="To wear Sheinar is to wear something that remembers. Our founder's vision has always been to keep the disappearing arts of Indian embroidery alive — not as nostalgia, but as living, modern luxury."
      image={img}
      sections={[
        { heading: "A Discipline of Slowness", body: <p>"In a world that rewards speed, I chose the opposite. A garment is not finished when the last stitch is tied. It is finished when it has earned its silence — when nothing more can be added, and nothing taken away."</p> },
        { heading: "On the Karigar", body: <p>"My karigars are not labour. They are co-authors. Their names are stitched into the inside seam of every piece — because a garment without its maker is only cloth."</p> },
        { heading: "On the Future", body: <p>"I want Sheinar to be a house that, fifty years from now, brides will inherit from their grandmothers and still wear without alteration. That is luxury. Anything else is fashion."</p> },
      ]}
    />
  ),
});
