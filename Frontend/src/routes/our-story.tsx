import { createFileRoute } from "@tanstack/react-router";
import { NarrativePage } from "@/components/site/NarrativePage";
import img from "@/assets/atelier-hands.jpg";

export const Route = createFileRoute("/our-story")({
  head: () => ({ meta: [
    { title: "Our Story — The House of Sheinar" },
    { name: "description", content: "The origin and evolution of Sheinar — an Indian couture atelier devoted to slow craft." },
    { property: "og:title", content: "Our Story — The House of Sheinar" },
  ]}),
  component: () => (
    <NarrativePage
      eyebrow="Our Story"
      title="A house built"
      italic="thread by thread."
      intro="The House of Sheinar began with a single dupatta, one karigar, and a refusal to hurry. Today, our story is the story of every garment we have made — and every life it has touched."
      image={img}
      sections={[
        { heading: "Beginnings", body: <><p>It started in 1998 in a quiet lane of Old Delhi — a single artisan, a frame, and a roll of unbleached khadi. There was no plan, only patience.</p><p>The first dupatta took eleven months to complete. It was never sold. It was given to the artisan's daughter on her wedding day. That dupatta still hangs in our atelier, framed in walnut.</p></> },
        { heading: "The Years Between", body: <p>From that single frame, the atelier slowly grew. Karigars came from Lucknow, Murshidabad, Banaras — drawn not by promise of speed but by the rare permission to take their time. Today, sixty-four hands work side-by-side, lit by the same north-facing windows.</p> },
        { heading: "Today", body: <p>Sheinar dresses brides in Udaipur and London, mothers in Mumbai and Manhattan. But every garment, no matter where it is destined, begins the same way — with a conversation, a sketch, and a thread pulled slowly through silk.</p> },
      ]}
    />
  ),
});
