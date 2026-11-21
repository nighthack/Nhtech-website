import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'motion/react';
import { RoutePath, ContactInquiry } from '../types';
import { brand } from '../config/brand';
import { SpatialPageHeader } from '../components/common/SpatialPageHeader';
import { Terminal, Send, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (path: RoutePath) => void;
}

const emptyInquiry: ContactInquiry = {
  name: '',
  email: '',
  company: '',
  role: '',
  problemStatement: '',
  constraints: '',
  projectStage: 'Exploring technical feasibility',
  schedulingDate: '',
  schedulingTime: ''
};

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState(emptyInquiry);
  const focusForm = useRef(false);
  const formHeadingRef = useRef<HTMLHeadingElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    if (submitted) successHeadingRef.current?.focus();
    if (!submitted && focusForm.current) {
      focusForm.current = false;
      formHeadingRef.current?.focus();
    }
  }, [submitted]);

  const stageOptions = [
    'Exploring technical feasibility',
    'Forward Deployed Engineering Pod',
    'AI Implementation / Agentic Systems',
    'Vision & Edge AI Pipeline',
    'Complex Business Architecture / Modernization',
    'Document Intelligence / OCR',
    'Other Technical Roadblock'
  ];

  const schedulingSlots = Array.from({ length: 49 }, (_, index) => {
    const totalMinutes = (9 * 60) + (index * 15);
    const hour = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const labelHour = hour > 12 ? hour - 12 : hour;
    const period = hour >= 12 ? 'PM' : 'AM';
    const value = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return `${value}|${labelHour}:${minutes.toString().padStart(2, '0')} ${period}`;
  });
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json().catch(() => null);
      if (!res.ok || !result?.success) {
        throw new Error(result?.error || 'Unable to submit technical intake. Please try again.');
      }

      setSubmitted(true);
    } catch (error) {
      setErrorMessage(error instanceof Error && !(error instanceof TypeError) ? error.message : 'An unexpected network error occurred. Please try again or email us directly at info@nighthack.in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact-chapter" className="min-h-screen relative overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)]">
      
      {/* 1. Spatial Page Header */}
      <section className="pt-28 sm:pt-32 pb-14 sm:pb-16 border-b border-[var(--border-color)] relative z-10">
        <SpatialPageHeader
          tag="Forward Deployed Engineering Intake"
          title="Bring us the"
          titleAccent="difficult problem."
          subtitle="Tell us what is blocked, manual, fragmented, or technically uncertain. We review every problem statement directly with our forward-deployed systems and AI engineers."
          ctaText="Submit Technical Problem"
          ctaHref="#contact-intake"
          secondaryCtaText="Explore Engineering Tracks"
          secondaryCtaRoute="/fde"
          onNavigate={onNavigate}
          telemetryItems={[
            { label: 'REVIEW', value: 'DIRECT SENIOR POD', color: 'var(--accent-orange-text)' },
            { label: 'CONFIDENTIALITY', value: 'MUTUAL NDA READY', color: 'var(--text-primary)' },
            { label: 'DELIVERY', value: 'EMBEDDED POD MODEL', color: 'var(--accent-secondary)' },
          ]}
        />
      </section>

      {/* 2. Intake Form & Engineering Coordinates Grid */}
      <section id="contact-intake" tabIndex={-1} aria-labelledby="contact-intake-title" className="relative z-10 bg-[var(--bg-surface-subtle)] py-12 sm:py-16 focus-visible:outline-none">
        <div className="site-container grid gap-8 lg:grid-cols-12 lg:gap-10">
          
          {/* Form Column (7 cols) */}
          <div className="min-w-0 lg:col-span-7">
            {submitted ? (
              <motion.div
                initial={false}
                animate={{ opacity: 1, scale: 1 }}
                className="p-5 sm:p-10 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-6 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-[var(--accent-primary)] text-[var(--accent-primary-text)] flex items-center justify-center mx-auto font-black shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2 wrap-anywhere">
                  <h2 id="contact-intake-title" ref={successHeadingRef} tabIndex={-1} className="text-card-display">
                    Inquiry Delivered to Engineering Pod
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed font-normal">
                    Thank you, <strong className="text-[var(--text-primary)]">{formData.name}</strong>. Your technical problem dossier has been dispatched to <strong className="text-[var(--text-primary)]">info@nighthack.in</strong> and the technical-intake agent. A forward-deployed engineer will review your problem statement and technical constraints and follow up at <strong className="text-[var(--accent-orange-text)]">{formData.email}</strong>.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-left text-sm wrap-anywhere space-y-1.5 text-[var(--text-secondary)]">
                  <div><span className="text-[var(--text-muted)]">Company:</span> {formData.company || 'Not specified'}</div>
                  <div><span className="text-[var(--text-muted)]">Engagement:</span> {formData.projectStage}</div>
                  <div><span className="text-[var(--text-muted)]">Scope:</span> {formData.problemStatement.slice(0, 100)}...</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    focusForm.current = true;
                    setFormData(emptyInquiry);
                    setSubmitted(false);
                  }}
                  className="site-button button-secondary"
                >
                  Submit another problem statement
                </button>
              </motion.div>
            ) : (
              <motion.form
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                onSubmit={handleSubmit}
                className="p-4 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-6 text-left"
              >
                <div className="border-b border-[var(--border-color)] pb-4">
                  <h2 id="contact-intake-title" ref={formHeadingRef} tabIndex={-1} className="text-card-display">
                    Technical intake form
                  </h2>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">Fields marked * are required.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="block font-medium text-[var(--text-secondary)]">
                      Your name *
                    </label>
                    <input
                      id="contact-name"
                      autoComplete="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. Markus Weber"
                      className="site-field"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="block font-medium text-[var(--text-secondary)]">
                      Work email *
                    </label>
                    <input
                      id="contact-email"
                      autoComplete="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="m.weber@enterprise.de"
                      className="site-field"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-company" className="block font-medium text-[var(--text-secondary)]">
                      Company / organization *
                    </label>
                    <input
                      id="contact-company"
                      autoComplete="organization"
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Industrial Solutions GmbH"
                      className="site-field"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-role" className="block font-medium text-[var(--text-secondary)]">
                      Role / title
                    </label>
                    <input
                      id="contact-role"
                      autoComplete="organization-title"
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="VP Engineering / CTO / Head of AI"
                      className="site-field"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-sm">
                  <label htmlFor="contact-stage" className="block font-medium text-[var(--text-secondary)]">
                    Engineering track / engagement type
                  </label>
                  <select
                    id="contact-stage"
                    value={formData.projectStage}
                    onChange={(e) => setFormData({ ...formData, projectStage: e.target.value })}
                    className="site-field"
                  >
                    {stageOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <fieldset className="min-w-0">
                  <legend className="mb-2 text-sm font-semibold text-[var(--text-primary)]">
                    Preferred engineering review slot
                  </legend>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid min-w-0 gap-1.5 text-sm font-medium text-[var(--text-secondary)]">
                      Date *
                      <input
                        id="contact-scheduling-date"
                        type="date"
                        required
                        min={today}
                        value={formData.schedulingDate}
                        onChange={(event) => setFormData({ ...formData, schedulingDate: event.target.value })}
                        aria-describedby="contact-time-zone"
                        className="site-field"
                      />
                    </label>
                    <label className="grid min-w-0 gap-1.5 text-sm font-medium text-[var(--text-secondary)]">
                      Time *
                      <select
                        id="contact-scheduling-time"
                        required
                        value={formData.schedulingTime}
                        onChange={(event) => setFormData({ ...formData, schedulingTime: event.target.value })}
                        aria-describedby="contact-time-zone"
                        className="site-field"
                      >
                        <option value="">Select a time</option>
                        {schedulingSlots.map((slot) => {
                          const [value, label] = slot.split('|');
                          return <option key={value} value={value}>{label}</option>;
                        })}
                      </select>
                    </label>
                  </div>
                  <p id="contact-time-zone" className="mt-2 text-sm text-[var(--text-muted)]">
                    Times are shown in your local timezone.
                  </p>
                </fieldset>

                <div className="space-y-1.5 text-sm">
                  <label htmlFor="contact-problem" className="block font-medium text-[var(--text-secondary)]">
                    What is the core technical roadblock or workflow bottleneck? *
                  </label>
                  <textarea
                    id="contact-problem"
                    rows={4}
                    required
                    value={formData.problemStatement}
                    onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
                    placeholder="Describe the latency constraint, document volume, edge camera requirement, or enterprise integration friction..."
                    className="site-field"
                  />
                </div>

                <div className="space-y-1.5 text-sm">
                  <label htmlFor="contact-constraints" className="block font-medium text-[var(--text-secondary)]">
                    Current systems &amp; infrastructure constraints (optional)
                  </label>
                  <textarea
                    id="contact-constraints"
                    rows={2}
                    value={formData.constraints}
                    onChange={(e) => setFormData({ ...formData, constraints: e.target.value })}
                    placeholder="e.g. Air-gapped on-premise requirement, SAP ERP, German data residency, NVIDIA Jetson hardware..."
                    className="site-field"
                  />
                </div>

                {errorMessage && (
                  <div role="alert" className="rounded-xl border border-[var(--status-error-text)] bg-[var(--bg-surface-subtle)] p-4 text-sm text-[var(--status-error-text)]">
                    {errorMessage}
                  </div>
                )}

                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="site-button button-primary w-full"
                >
                  {isSubmitting ? (
                    <span>Transmitting to Engineering Pod...</span>
                  ) : (
                    <>
                      <span>Transmit Problem Statement</span>
                      <Send className="w-4 h-4 text-current" />
                    </>
                  )}
                </button>
                <span role="status" className="sr-only">{isSubmitting ? 'Sending your inquiry…' : ''}</span>
              </motion.form>
            )}
          </div>

          {/* Right Coordinates & Security Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-6 shadow-sm"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-orange-text)] uppercase font-bold tracking-wider">
                <Terminal className="w-4 h-4" />
                <span>Direct Intake Channels</span>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] space-y-1">
                  <div className="text-[var(--text-muted)] text-xs uppercase">Primary Email Intake</div>
                  <div className="text-[var(--text-primary)] text-sm font-bold">
                    <a href={`mailto:${brand.contact.email}`} className="text-[var(--text-primary)] underline underline-offset-4 hover:text-[var(--accent-orange-text)]">
                      {brand.contact.email}
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] space-y-1">
                  <div className="text-[var(--text-muted)] text-xs uppercase">Operational Geography</div>
                  <div className="text-[var(--text-primary)] font-medium">{brand.contact.primaryRegion}</div>
                  <div className="text-xs text-[var(--text-secondary)] font-sans font-normal">
                    Engineering pods operate across CET / European time zones.
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-4 shadow-sm"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-orange-text)] uppercase font-bold tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Confidentiality &amp; IP Guarantee</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
                We execute mutual NDAs prior to deep architectural inspections. Client problem statements, proprietary codebases, and production telemetry remain strictly private and confidential.
              </p>
              <div className="pt-2 text-xs font-mono text-[var(--text-muted)]">
                ✓ 100% Client Code &amp; Weights Retention
              </div>
            </motion.div>
          </div>

        </div>
      </section>

    </div>
  );
}

