import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { RoutePath, ContactInquiry } from '../types';
import { brand } from '../config/brand';
import { SpatialPageHeader } from '../components/common/SpatialPageHeader';
import { MaskedHeading, ScrollText } from '../components/common/ScrollMotion';
import { Terminal, Send, CheckCircle2, ShieldCheck, Mail, ArrowRight, Lock } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (path: RoutePath) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState<ContactInquiry>({
    name: '',
    email: '',
    company: '',
    role: '',
    problemStatement: '',
    constraints: '',
    projectStage: 'Prototype / PoC',
    schedulingDate: '',
    schedulingTime: ''
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => new Date());

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
  const today = new Date().toISOString().split('T')[0];
  const calendarYear = calendarMonth.getFullYear();
  const calendarMonthIndex = calendarMonth.getMonth();
  const firstDayOffset = new Date(calendarYear, calendarMonthIndex, 1).getDay();
  const daysInMonth = new Date(calendarYear, calendarMonthIndex + 1, 0).getDate();
  const calendarDays = Array.from({ length: 42 }, (_, index) => {
    const day = index - firstDayOffset + 1;
    return day > 0 && day <= daysInMonth ? new Date(calendarYear, calendarMonthIndex, day) : null;
  });
  const formatDateValue = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const formatDateLabel = (dateValue: string) => dateValue ? new Date(`${dateValue}T00:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Select a date';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Unable to submit technical intake. Please try again.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected network error occurred. Please try again or email us directly at info@nighthack.in.');
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
          ctaRoute="/contact"
          secondaryCtaText="Explore Engineering Tracks"
          secondaryCtaRoute="/fde"
          onNavigate={onNavigate}
          telemetryItems={[
            { label: 'REVIEW', value: 'DIRECT SENIOR POD', color: 'var(--accent-text)' },
            { label: 'CONFIDENTIALITY', value: 'MUTUAL NDA READY', color: 'var(--text-primary)' },
            { label: 'DELIVERY', value: 'EMBEDDED POD MODEL', color: 'var(--accent-secondary)' },
          ]}
        />
      </section>

      {/* 2. Intake Form & Engineering Coordinates Grid */}
      <section className="py-14 sm:py-20 bg-[var(--bg-surface-subtle)] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Form Column (7 cols) */}
          <div className="lg:col-span-7">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 sm:p-12 rounded-2xl bg-[var(--bg-surface)] border border-[var(--accent-primary)]/40 space-y-6 text-center shadow-sm"
              >
                <div className="w-14 h-14 rounded-2xl bg-[var(--accent-primary)] text-[var(--accent-primary-text)] flex items-center justify-center mx-auto font-black shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)]">
                    Inquiry Delivered to Engineering Pod
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed font-normal">
                    Thank you, <strong className="text-[var(--text-primary)]">{formData.name}</strong>. Your technical problem dossier has been dispatched to <strong className="text-[var(--text-primary)]">info@nighthack.in</strong> and the technical-intake agent. A forward-deployed engineer will review your problem statement and technical constraints and follow up at <strong className="text-[var(--accent-text)]">{formData.email}</strong>.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-left text-xs font-mono space-y-1.5 text-[var(--text-secondary)]">
                  <div><span className="text-[var(--text-muted)]">Company:</span> {formData.company || 'Not specified'}</div>
                  <div><span className="text-[var(--text-muted)]">Engagement:</span> {formData.projectStage}</div>
                  <div><span className="text-[var(--text-muted)]">Scope:</span> {formData.problemStatement.slice(0, 100)}...</div>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 rounded-xl bg-[var(--bg-surface-elevated)] hover:bg-[var(--border-color)] text-xs font-mono text-[var(--text-primary)] border border-[var(--border-color)] transition-colors cursor-pointer"
                >
                  Submit another problem statement
                </button>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                onSubmit={handleSubmit}
                className="p-6 sm:p-10 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-6 shadow-sm text-left"
              >
                <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
                  <span className="text-xs font-mono text-[var(--accent-text)] uppercase font-bold">
                    TECHNICAL INTAKE FORM
                  </span>
                  <span className="text-[11px] font-mono text-[var(--text-muted)]">
                    DIRECT TO SENIOR ENGINEERS
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-[var(--text-secondary)] uppercase block">
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. Markus Weber"
                      className="date-picker-theme w-full px-4 py-3 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-[var(--text-secondary)] uppercase block">
                      Work Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="m.weber@enterprise.de"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-company" className="text-[var(--text-secondary)] uppercase block">
                      Company / Organization *
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Industrial Solutions GmbH"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-role" className="text-[var(--text-secondary)] uppercase block">
                      Role / Title
                    </label>
                    <input
                      id="contact-role"
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="VP Engineering / CTO / Head of AI"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 font-mono text-xs">
                  <label htmlFor="contact-stage" className="text-[var(--text-secondary)] uppercase block">
                    Engineering Track / Engagement Type
                  </label>
                  <select
                    id="contact-stage"
                    value={formData.projectStage}
                    onChange={(e) => setFormData({ ...formData, projectStage: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors cursor-pointer"
                  >
                    {stageOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5 font-mono text-xs">
                  <label className="text-[var(--text-secondary)] uppercase block">
                    Preferred Engineering Review Slot *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <button id="contact-scheduling-date" type="button" onClick={() => setIsDatePickerOpen(!isDatePickerOpen)} className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm text-left text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors" aria-label="Preferred engineering review date" aria-expanded={isDatePickerOpen}>
                        {formatDateLabel(formData.schedulingDate)}
                      </button>
                      {isDatePickerOpen && (
                        <div className="absolute z-30 top-full left-0 mt-2 w-full min-w-[280px] rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] p-4 shadow-2xl">
                          <div className="flex items-center justify-between mb-4">
                            <button type="button" onClick={() => setCalendarMonth(new Date(calendarYear, calendarMonthIndex - 1, 1))} className="w-8 h-8 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-surface-subtle)]" aria-label="Previous month">‹</button>
                            <span className="text-sm font-bold text-[var(--text-primary)]">{calendarMonth.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
                            <button type="button" onClick={() => setCalendarMonth(new Date(calendarYear, calendarMonthIndex + 1, 1))} className="w-8 h-8 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-surface-subtle)]" aria-label="Next month">›</button>
                          </div>
                          <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-[var(--text-muted)] mb-2">{['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}</div>
                          <div className="grid grid-cols-7 gap-1">
                            {calendarDays.map((day, index) => {
                              const value = day ? formatDateValue(day) : '';
                              const disabled = !day || value < today;
                              const selected = value === formData.schedulingDate;
                              return <button key={`${value}-${index}`} type="button" disabled={disabled} onClick={() => { if (day) { setFormData({ ...formData, schedulingDate: value }); setIsDatePickerOpen(false); } }} className={`h-8 rounded-lg text-xs transition-colors ${selected ? 'bg-[var(--accent-primary)] text-[var(--accent-primary-text)] font-bold' : disabled ? 'text-[var(--text-muted)]/40 cursor-not-allowed' : 'text-[var(--text-primary)] hover:bg-[var(--accent-glow)]'}`}>{day?.getDate() || ''}</button>;
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                    <select
                      id="contact-scheduling-time"
                      required
                      value={formData.schedulingTime}
                      onChange={(e) => setFormData({ ...formData, schedulingTime: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors cursor-pointer"
                      aria-label="Preferred engineering review time"
                    >
                      <option value="">Select a time (9 AM–9 PM)</option>
                      {schedulingSlots.map((slot) => {
                        const [value, label] = slot.split('|');
                        return <option key={value} value={value}>{label}</option>;
                      })}
                    </select>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] font-sans">
                    Choose a preferred time for the initial engineering review. Times shown in your local timezone.
                  </p>
                </div>

                <div className="space-y-1.5 font-mono text-xs">
                  <label htmlFor="contact-problem" className="text-[var(--text-secondary)] uppercase block">
                    What is the core technical roadblock or workflow bottleneck? *
                  </label>
                  <textarea
                    id="contact-problem"
                    rows={4}
                    required
                    value={formData.problemStatement}
                    onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
                    placeholder="Describe the latency constraint, document volume, edge camera requirement, or enterprise integration friction..."
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors font-sans leading-relaxed"
                  />
                </div>

                <div className="space-y-1.5 font-mono text-xs">
                  <label htmlFor="contact-constraints" className="text-[var(--text-secondary)] uppercase block">
                    Current Systems &amp; Infrastructure Constraints (Optional)
                  </label>
                  <textarea
                    id="contact-constraints"
                    rows={2}
                    value={formData.constraints}
                    onChange={(e) => setFormData({ ...formData, constraints: e.target.value })}
                    placeholder="e.g. Air-gapped on-premise requirement, SAP ERP, German data residency, NVIDIA Jetson hardware..."
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors font-sans leading-relaxed"
                  />
                </div>

                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-mono text-red-400">
                    {errorMessage}
                  </div>
                )}

                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--accent-primary-text)] font-display font-bold text-xs tracking-tight transition-all cursor-pointer shadow-xl flex items-center justify-center gap-2 disabled:opacity-60"
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
              </motion.form>
            )}
          </div>

          {/* Right Coordinates & Security Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-6 shadow-sm"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-text)] uppercase font-bold tracking-wider">
                <Terminal className="w-4 h-4" />
                <span>Direct Intake Channels</span>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] space-y-1">
                  <div className="text-[var(--text-muted)] text-[11px] uppercase">Primary Email Intake</div>
                  <div className="text-[var(--text-primary)] text-sm font-bold">
                    <a href={`mailto:${brand.contact.email}`} className="hover:underline text-[var(--text-primary)]">
                      {brand.contact.email}
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] space-y-1">
                  <div className="text-[var(--text-muted)] text-[11px] uppercase">Operational Geography</div>
                  <div className="text-[var(--text-primary)] font-medium">{brand.contact.primaryRegion}</div>
                  <div className="text-[11px] text-[var(--text-secondary)] font-sans font-normal">
                    Engineering pods operate across CET / European time zones.
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-4 shadow-sm"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-text)] uppercase font-bold tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Confidentiality &amp; IP Guarantee</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
                We execute mutual NDAs prior to deep architectural inspections. Client problem statements, proprietary codebases, and production telemetry remain strictly private and confidential.
              </p>
              <div className="pt-2 text-[11px] font-mono text-[var(--text-muted)]">
                ✓ 100% Client Code &amp; Weights Retention
              </div>
            </motion.div>
          </div>

        </div>
      </section>

    </div>
  );
}

