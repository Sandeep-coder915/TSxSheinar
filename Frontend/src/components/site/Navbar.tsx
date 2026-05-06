import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCategories } from "@/hooks/useProducts";

const navLinks = [
  { label: "Our Story", to: "/our-story" },
  { label: "Founder's Vision", to: "/founders-vision" },
  { label: "The Sheinar Philosophy", to: "/philosophy" },
  { label: "Art of Embroidery", to: "/embroidery" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const { categories } = useCategories();
  const { location } = useRouterState();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On home: transparent until scrolled. On all other pages: always solid dark.
  const solid = !isHome || scrolled;

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      style={{
        background: solid ? "var(--noir)" : "transparent",
        backdropFilter: solid ? "blur(12px)" : "none",
        padding: solid ? "12px 0" : "24px 0",
        color: "var(--ivory)",
        borderBottom: solid ? "1px solid oklch(0.72 0.12 78 / 0.15)" : "none",
      }}
    >
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          <Link
          to="/"
          className="text-xl lg:text-2xl font-semibold text-primary tracking-wide w-30 h-10 "
        >
          <img
            src="/logo (1).svg"
            alt="Sheinar"
          
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-[11px] tracking-wide-luxe uppercase">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="hover:text-[color:var(--gold)] transition-colors">
              {l.label}
            </Link>
          ))}
          {categories.length > 0 && (
            <div
              className="relative"
              onMouseEnter={() => setCollectionsOpen(true)}
              onMouseLeave={() => setCollectionsOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-[color:var(--gold)] transition-colors">
                Collections <ChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {collectionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 min-w-[200px]"
                  >
                    <div className="bg-noir/95 backdrop-blur border border-[color:var(--gold)]/20 py-3">
                      {categories.map((cat) => (
                        <Link
                          key={cat}
                          to="/collections/$category"
                          params={{ category: cat.toLowerCase() }}
                          onClick={() => setCollectionsOpen(false)}
                          className="block px-6 py-2 text-[11px] tracking-wide-luxe hover:text-[color:var(--gold)] transition-colors capitalize"
                        >
                          {cat}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          <Link to="/journal" className="hover:text-[color:var(--gold)] transition-colors">Journal</Link>
          <Link to="/legacy" className="hover:text-[color:var(--gold)] transition-colors">Legacy</Link>
        </nav>

        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden"
            style={{ background: "var(--noir)" }}
          >
            <div className="px-6 py-6 flex flex-col gap-4 text-sm tracking-wide-luxe uppercase">
              {navLinks.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>{l.label}</Link>
              ))}
              {categories.length > 0 && (
                <>
                  <div className="text-[color:var(--gold)] mt-2 text-xs">Collections</div>
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      to="/collections/$category"
                      params={{ category: cat.toLowerCase() }}
                      onClick={() => setOpen(false)}
                      className="pl-4 capitalize"
                    >
                      {cat}
                    </Link>
                  ))}
                </>
              )}
              <Link to="/journal" onClick={() => setOpen(false)}>Journal</Link>
              <Link to="/legacy" onClick={() => setOpen(false)}>Legacy</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
