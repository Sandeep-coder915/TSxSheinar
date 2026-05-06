import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, MapPin, Phone, Mail, Clock, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  open: boolean;
  onClose: () => void;
  productName?: string;
  productSlug?: string;
}

const TIME_SLOTS = [
  '10:00 AM', '11:00 AM', '12:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
];

const OCCASIONS = [
  'Bridal Consultation', 'Wedding Guest', 'Festive Wear',
  'Corporate Event', 'General Enquiry', 'Other',
];

const LOCATIONS = [
  'Delhi Atelier — Lutyens Delhi',
  'Mumbai Studio — Bandra West',
  'Virtual Consultation',
];

const API = '/api';

export function AppointmentModal({ open, onClose, productName, productSlug }: Props) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    occasion: '',
    preferredLocation: '',
    date: '',
    time: '',
    message: '',
  });

  const set = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }));

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = productSlug
        ? `${API}/products/${productSlug}/appointments`
        : `${API}/products/appointments/general`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, productName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to book');
      setStep('success');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setStep('form'); setForm({ firstName: '', lastName: '', email: '', phone: '', occasion: '', preferredLocation: '', date: '', time: '', message: '' }); }, 400);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto"
            style={{ background: 'var(--ivory)' }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 border-b" style={{ background: 'var(--noir)', borderColor: 'oklch(0.72 0.12 78 / 0.2)' }}>
              <div>
                <p className="text-[10px] tracking-luxe uppercase" style={{ color: 'var(--gold)' }}>✦ The House of Sheinar</p>
                <h2 className="font-display text-2xl mt-0.5" style={{ color: 'var(--ivory)' }}>
                  {step === 'success' ? 'Appointment Requested' : 'Book a Private Appointment'}
                </h2>
              </div>
              <button onClick={handleClose} className="w-9 h-9 flex items-center justify-center transition-colors hover:opacity-70" style={{ color: 'var(--ivory)' }}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {step === 'success' ? (
              <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: 'var(--gold)' }}>
                  <Calendar className="w-7 h-7" style={{ color: 'var(--noir)' }} />
                </div>
                <h3 className="font-display text-3xl mb-3">Thank you, {form.firstName}.</h3>
                <span className="gold-line mb-6" />
                <p className="text-sm font-light opacity-70 max-w-md leading-relaxed">
                  Your appointment request has been received. Our team will reach out to you at <strong>{form.email}</strong> or <strong>{form.phone}</strong> within 24 hours to confirm your slot.
                </p>
                <p className="mt-4 text-xs opacity-50 tracking-wide">
                  {form.date} &nbsp;·&nbsp; {form.time} &nbsp;·&nbsp; {form.preferredLocation}
                </p>
                <button onClick={handleClose} className="btn-luxe-dark mt-10">Close</button>
              </div>
            ) : (
              <div className="grid lg:grid-cols-5">
                {/* Form — 3 cols */}
                <form onSubmit={handleSubmit} className="lg:col-span-3 px-8 py-8 space-y-5">
                  {productName && (
                    <div className="px-4 py-3 text-xs font-light border-l-2" style={{ borderColor: 'var(--gold)', background: 'oklch(0.72 0.12 78 / 0.06)' }}>
                      Enquiring about: <span className="font-medium">{productName}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="First Name" required>
                      <input required value={form.firstName} onChange={e => set('firstName', e.target.value)} className="luxe-input" placeholder="Aanya" />
                    </Field>
                    <Field label="Last Name" required>
                      <input required value={form.lastName} onChange={e => set('lastName', e.target.value)} className="luxe-input" placeholder="Mehta" />
                    </Field>
                  </div>

                  <Field label="Email Address" required>
                    <input required type="email" value={form.email} onChange={e => set('email', e.target.value)} className="luxe-input" placeholder="you@example.com" />
                  </Field>

                  <Field label="Phone Number" required>
                    <input required type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} className="luxe-input" placeholder="+91 98100 00000" />
                  </Field>

                  <Field label="Occasion" required>
                    <select required value={form.occasion} onChange={e => set('occasion', e.target.value)} className="luxe-input">
                      <option value="">Select occasion</option>
                      {OCCASIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </Field>

                  <Field label="Preferred Location" required>
                    <select required value={form.preferredLocation} onChange={e => set('preferredLocation', e.target.value)} className="luxe-input">
                      <option value="">Select location</option>
                      {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </Field>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Preferred Date" required>
                      <input required type="date" min={minDateStr} value={form.date} onChange={e => set('date', e.target.value)} className="luxe-input" />
                    </Field>
                    <Field label="Preferred Time" required>
                      <select required value={form.time} onChange={e => set('time', e.target.value)} className="luxe-input">
                        <option value="">Select time</option>
                        {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </Field>
                  </div>

                  <Field label="Message (Optional)">
                    <textarea rows={3} value={form.message} onChange={e => set('message', e.target.value)} className="luxe-input resize-none" placeholder="Tell us about your vision, occasion, or any specific requirements..." />
                  </Field>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 text-xs tracking-luxe uppercase transition-all duration-500 disabled:opacity-50"
                    style={{ background: 'var(--noir)', color: 'var(--ivory)', border: '1px solid var(--noir)' }}
                  >
                    {loading ? 'Requesting...' : 'Request Appointment'}
                  </button>

                  <p className="text-[10px] text-center opacity-40 tracking-wide">Our team will confirm within 24 hours</p>
                </form>

                {/* Info panel — 2 cols */}
                <div className="lg:col-span-2 px-8 py-8 space-y-8" style={{ background: 'var(--noir)', color: 'var(--ivory)' }}>
                  <div>
                    <p className="text-[10px] tracking-luxe uppercase mb-4" style={{ color: 'var(--gold)' }}>Our Locations</p>

                    <div className="space-y-6">
                      <Location
                        name="Delhi Atelier"
                        address="14, Prithviraj Road, Lutyens Delhi, New Delhi — 110011"
                        mapUrl="https://maps.google.com/?q=Prithviraj+Road+Lutyens+Delhi"
                        embedSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.2!2d77.2090!3d28.5985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM1JzU0LjYiTiA3N8KwMTInMzIuNCJF!5e0!3m2!1sen!2sin!4v1"
                      />
                      <Location
                        name="Mumbai Studio"
                        address="Linking Road, Bandra West, Mumbai — 400050"
                        mapUrl="https://maps.google.com/?q=Linking+Road+Bandra+West+Mumbai"
                      />
                    </div>
                  </div>

                  <div className="border-t pt-6 space-y-3" style={{ borderColor: 'oklch(0.72 0.12 78 / 0.2)' }}>
                    <p className="text-[10px] tracking-luxe uppercase mb-3" style={{ color: 'var(--gold)' }}>Contact</p>
                    <ContactRow icon={<Phone className="w-3.5 h-3.5" />} text="+91 98100 00000" />
                    <ContactRow icon={<Mail className="w-3.5 h-3.5" />} text="atelier@sheinar.com" />
                    <ContactRow icon={<Clock className="w-3.5 h-3.5" />} text="Mon – Sat, 10 AM – 6 PM" />
                  </div>

                  <div className="border-t pt-6" style={{ borderColor: 'oklch(0.72 0.12 78 / 0.2)' }}>
                    <p className="text-[10px] tracking-luxe uppercase mb-3" style={{ color: 'var(--gold)' }}>What to Expect</p>
                    <ul className="space-y-2 text-xs font-light opacity-75 leading-relaxed">
                      <li>✦ &nbsp;One-on-one session with our design team</li>
                      <li>✦ &nbsp;Fabric and embroidery samples presented</li>
                      <li>✦ &nbsp;Custom measurements and silhouette discussion</li>
                      <li>✦ &nbsp;Complimentary refreshments served</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] tracking-luxe uppercase mb-1.5 opacity-60">
        {label}{required && <span className="ml-0.5" style={{ color: 'var(--maroon)' }}>*</span>}
      </label>
      {children}
    </div>
  );
}

function Location({ name, address, mapUrl, embedSrc }: { name: string; address: string; mapUrl: string; embedSrc?: string }) {
  return (
    <div>
      <p className="text-sm font-display mb-1">{name}</p>
      <p className="text-xs font-light opacity-60 leading-relaxed mb-2">{address}</p>
      {embedSrc && (
        <div className="w-full h-28 overflow-hidden mb-2 opacity-80">
          <iframe src={embedSrc} width="100%" height="100%" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={name} />
        </div>
      )}
      <a href={mapUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-[10px] tracking-wide uppercase transition-opacity hover:opacity-100 opacity-60" style={{ color: 'var(--gold)' }}>
        <MapPin className="w-3 h-3" /> View on Maps
      </a>
    </div>
  );
}

function ContactRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-xs font-light opacity-70">
      <span style={{ color: 'var(--gold)' }}>{icon}</span>
      {text}
    </div>
  );
}
