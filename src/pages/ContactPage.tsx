import { ArrowUpRight, CheckCircle2, Send } from 'lucide-react';
import type { FormEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { SpatialPageHeader } from '../components/common/SpatialPageHeader';
import { brand } from '../config/brand';
import type { ContactInquiry, RoutePath } from '../types';

const emptyInquiry: ContactInquiry = { name: '', email: '', company: '', role: '', problemStatement: '', constraints: '', projectStage: 'Not sure yet' };
const options = ['Embedded team', 'Vision & edge AI', 'Private AI', 'Document processing', 'AI agents', 'Not sure yet'];

export function ContactPage({ onNavigate }: { onNavigate: (path: RoutePath) => void }) {
  const [formData, setFormData] = useState(emptyInquiry);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLInputElement>(null);
  useEffect(() => { if (submitted) successRef.current?.focus(); }, [submitted]);
  const submit = async (event: FormEvent) => {
    event.preventDefault(); if (sending) return; setSending(true); setError(null);
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success) throw new Error(result?.error || 'Your enquiry could not be sent. Please try again.');
      setSubmitted(true);
    } catch (error) { setError(error instanceof Error && !(error instanceof TypeError) ? error.message : `We could not connect. Please try again or email ${brand.contact.email}.`); }
    finally { setSending(false); }
  };
  return <div id="contact-chapter">
    <section className="border-b border-[var(--border-color)] pb-12 pt-28 sm:pt-32"><SpatialPageHeader title="Tell us what you need help with." subtitle="Share the workflow, the problem or the idea. We’ll help you work out where to start." ctaText="" onNavigate={onNavigate} /></section>
    <section id="contact-intake" className="bg-[var(--bg-surface-subtle)] py-12 sm:py-16">
      <div className="site-container grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        {submitted ? <div className="space-y-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-8">
          <CheckCircle2 aria-hidden="true" className="size-9 text-[var(--status-success-text)]" />
          <h2 ref={successRef} tabIndex={-1} className="text-card-display">Thanks, {formData.name}. We’ve received your enquiry.</h2>
          <p className="leading-relaxed text-[var(--text-secondary)]">We’ll reply to {formData.email} within 48 hours.</p>
          {brand.bookingUrl && <a href={brand.bookingUrl} className="site-button button-primary">Choose an available time <ArrowUpRight aria-hidden="true" className="size-4" /></a>}
          <button type="button" className="site-button button-secondary" onClick={() => { setFormData(emptyInquiry); setSubmitted(false); requestAnimationFrame(() => formRef.current?.focus()); }}>Send another enquiry</button>
        </div> : <form onSubmit={submit} className="space-y-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 sm:p-8">
          <h2 className="text-card-display">Send an enquiry</h2><p className="text-sm text-[var(--text-muted)]">Fields marked * are required.</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm">Name *<input ref={formRef} id="contact-name" name="name" autoComplete="name" required maxLength={150} placeholder="Your name" className="site-field" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></label>
            <label className="grid gap-1.5 text-sm">Work email *<input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com" className="site-field" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} /></label>
            <label className="grid gap-1.5 text-sm">Company (optional)<input id="contact-company" name="company" autoComplete="organization" maxLength={200} className="site-field" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} /></label>
            <label className="grid gap-1.5 text-sm">Role (optional)<input id="contact-role" name="role" autoComplete="organization-title" maxLength={150} className="site-field" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} /></label>
          </div>
          <label className="grid gap-1.5 text-sm">What are you interested in? (optional)<select id="contact-project-stage" name="projectStage" className="site-field" value={formData.projectStage} onChange={(e) => setFormData({ ...formData, projectStage: e.target.value })}>{options.map((option) => <option key={option}>{option}</option>)}</select></label>
          <label className="grid gap-1.5 text-sm">What do you need help with? *<textarea id="contact-problem" name="problemStatement" rows={5} required minLength={10} maxLength={10000} placeholder="Tell us about the problem or workflow." className="site-field" value={formData.problemStatement} onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })} /></label>
          <label className="grid gap-1.5 text-sm">Existing systems or constraints (optional)<textarea id="contact-constraints" name="constraints" rows={2} maxLength={5000} placeholder="For example, your current software or data hosting requirements." className="site-field" value={formData.constraints} onChange={(e) => setFormData({ ...formData, constraints: e.target.value })} /></label>
          <p className="text-xs leading-relaxed text-[var(--text-muted)]">Please leave out passwords and sensitive client or personal records. Read our <a href="/privacy-policy" onClick={(event) => { if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); onNavigate('/privacy-policy'); }} className="text-[var(--accent-orange-text)] underline">privacy policy</a> to understand how we handle your enquiry.</p>
          {error && <p role="alert" className="rounded-xl border border-[var(--status-error-text)] p-4 text-sm text-[var(--status-error-text)]">{error}</p>}
          <button id="contact-submit-btn" type="submit" disabled={sending} className="site-button button-primary w-full">{sending ? 'Sending…' : 'Send'}<Send aria-hidden="true" className="size-4" /></button>
          <p className="text-sm text-[var(--text-muted)]">We reply within 48 hours.</p><span role="status" className="sr-only">{sending ? 'Sending your enquiry' : ''}</span>
        </form>}
        <aside className="space-y-8">
          <div className="space-y-3"><h2 className="text-card-display">Talk directly to us</h2><a href={`mailto:${brand.contact.email}`} className="break-all text-[var(--accent-orange-text)] underline underline-offset-4">{brand.contact.email}</a><p className="text-sm leading-relaxed text-[var(--text-secondary)]">{brand.regionLine}</p><p className="text-sm text-[var(--text-secondary)]">{brand.contact.address}</p></div>
          <div className="space-y-3 border-t border-[var(--border-color)] pt-6"><h2 className="text-card-display">Before sharing sensitive details</h2><p className="text-sm leading-relaxed text-[var(--text-secondary)]">We can arrange a mutual NDA before reviewing confidential project information.</p></div>
        </aside>
      </div>
    </section>
  </div>;
}
