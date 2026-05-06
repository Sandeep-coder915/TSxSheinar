import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const url = "https://wa.me/916239315288?text=Hello%20Sheinar%2C%20I%20would%20love%20to%20enquire%20about%20a%20custom%20piece.";
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring" }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
      style={{ background: "var(--maroon)", color: "var(--gold)", border: "1px solid var(--gold)" }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ background: "var(--gold)" }} />
    </motion.a>
  );
}
