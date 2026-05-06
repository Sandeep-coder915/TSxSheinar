import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer style={{ background: "var(--noir)", color: "var(--ivory)" }} className="pt-20 pb-8">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
          <div>
            <h3 className="font-display text-3xl mb-2" style={{ color: "var(--gold)" }}>Sheinar</h3>
            <p className="text-[10px] tracking-luxe mb-6 opacity-80">THE HOUSE OF</p>
            <p className="text-sm leading-relaxed opacity-70 font-light">
              A timeless atelier devoted to the slow craft of Indian couture — where every thread carries memory, and every garment is an heirloom in the making.
            </p>
            <div className="flex gap-4 mt-6">
              <Instagram className="w-4 h-4 opacity-70 hover:text-[color:var(--gold)] hover:opacity-100 cursor-pointer transition" />
              <Facebook className="w-4 h-4 opacity-70 hover:text-[color:var(--gold)] hover:opacity-100 cursor-pointer transition" />
              <Youtube className="w-4 h-4 opacity-70 hover:text-[color:var(--gold)] hover:opacity-100 cursor-pointer transition" />
            </div>
          </div>

          <div>
            <h4 className="text-[11px] tracking-luxe uppercase mb-6" style={{ color: "var(--gold)" }}>The House</h4>
            <ul className="space-y-3 text-sm font-light opacity-80">
              <li><Link to="/our-story">Our Story</Link></li>
              <li><Link to="/founders-vision">Founder's Vision</Link></li>
              <li><Link to="/philosophy">The Sheinar Philosophy</Link></li>
              <li><Link to="/embroidery">Art of Embroidery</Link></li>
              <li><Link to="/legacy">Legacy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] tracking-luxe uppercase mb-6" style={{ color: "var(--gold)" }}>Collections</h4>
            <ul className="space-y-3 text-sm font-light opacity-80">
              <li><Link to="/collections/couture">Couture</Link></li>
              <li><Link to="/collections/lehenga">Lehenga</Link></li>
              <li><Link to="/collections/kurta">Kurta</Link></li>
              <li><Link to="/collections/saree">Saree</Link></li>
              <li><Link to="/collections/separates">Separates</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] tracking-luxe uppercase mb-6" style={{ color: "var(--gold)" }}>Atelier</h4>
            <ul className="space-y-4 text-sm font-light opacity-80">
              <li className="flex gap-3"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /> The Sheinar Atelier, Lutyens,Chandigarh</li>
              <li className="flex gap-3"><Phone className="w-4 h-4 mt-0.5 shrink-0" /> +91 98 1000 0000</li>
              <li className="flex gap-3"><Mail className="w-4 h-4 mt-0.5 shrink-0" /> atelier@houseofsheinar.com</li>
            </ul>
          </div>
        </div>

        <div className="gold-divider" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 text-[10px] tracking-wide-luxe uppercase opacity-60">
          <p>© {new Date().getFullYear()} The House of Sheinar — All Rights Reserved</p>
          <div className="flex gap-6">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Shipping</a>
            <a href="#">Returns</a>
          </div>
          <div className="flex gap-3 opacity-80">
            <span className="px-2 py-1 border border-[color:var(--ivory)]/20 text-[9px]">VISA</span>
            <span className="px-2 py-1 border border-[color:var(--ivory)]/20 text-[9px]">MC</span>
            <span className="px-2 py-1 border border-[color:var(--ivory)]/20 text-[9px]">AMEX</span>
            <span className="px-2 py-1 border border-[color:var(--ivory)]/20 text-[9px]">UPI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
