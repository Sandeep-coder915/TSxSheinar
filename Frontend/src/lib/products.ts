import lehenga from "@/assets/product-lehenga.jpg";
import saree from "@/assets/product-saree.jpg";
import kurta from "@/assets/product-kurta.jpg";
import couture from "@/assets/product-couture.jpg";

export interface Product {
  slug: string;
  title: string;
  category: string;
  price: string;
  image: string;
  tagline: string;
  description: string;
}

export const products: Product[] = [
  {
    slug: "marigold-bridal-lehenga",
    title: "The Marigold Bridal Lehenga",
    category: "Lehenga",
    price: "₹ 4,85,000 — ₹ 6,20,000",
    image: lehenga,
    tagline: "A heirloom in deep crimson and antique gold",
    description: "Hand-embroidered over 1,400 hours by our master karigars in Lucknow, the Marigold lehenga marries velvet sheen with the slow poetry of zardozi. Each motif is inspired by the Mughal gardens of Shalimar — pomegranates, vines, and bursting florals — rendered in real metallic threads, dabka, and Swarovski.",
  },
  {
    slug: "ivory-meher-saree",
    title: "The Meher Ivory Saree",
    category: "Saree",
    price: "₹ 1,85,000",
    image: saree,
    tagline: "Pure mulberry silk, threaded with restraint",
    description: "Woven in Banaras by a single artisan family across three generations, the Meher saree is an ode to the quietness of ivory. Subtle gold buttis bloom across its drape, paired with a hand-finished selvedge that takes nine days to perfect.",
  },
  {
    slug: "noor-sherwani",
    title: "The Noor Sherwani",
    category: "Kurta",
    price: "₹ 2,40,000",
    image: kurta,
    tagline: "Tonal regality for the modern groom",
    description: "Tailored in raw tussar silk and self-embroidered with chikankari and mukaish, the Noor sherwani is a masterclass in restraint. Each button is hand-cast in brass and finished with antique gold electroplating.",
  },
  {
    slug: "kohinoor-couture-gown",
    title: "Kohinoor Couture Gown",
    category: "Couture",
    price: "₹ 7,50,000",
    image: couture,
    tagline: "An evening sculpted in noir and aurum",
    description: "Carved out of duchess satin and overlaid with three-dimensional aari embroidery, the Kohinoor gown is our tribute to twilight. Over 220 hours of hand-stitching, with a corseted bodice constructed entirely on the form.",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
