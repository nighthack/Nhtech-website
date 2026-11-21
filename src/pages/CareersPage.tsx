import { RoutePath } from '../types';
import { brand } from '../config/brand';
import { WorldCanvas } from '../components/common/WorldCanvas';
import { SpatialPageHeader } from '../components/common/SpatialPageHeader';
import { MaskedHeading, ScrollText } from '../components/common/ScrollMotion';
import { Terminal, Users, Cpu, ShieldCheck, Mail, ArrowRight, Code2, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface CareersPageProps {
  onNavigate: (path: RoutePath) => void;
}

export function CareersPage({ onNavigate }: CareersPageProps) {
  const pods = [
    {
      num: '01',
      title: 'Applied AI & State Machine Researcher',
      focus: 'Agent architectures, LLM fine-tuning, deterministic evaluation frameworks, and constrained decoding pipelines.',
      tech: ['PyTorch', 'vLLM', 'LangGraph', 'FastAPI', 'Qdrant'],
      accent: 'var(--accent-text)'
    },
    {
      num: '02',
      title: 'Distributed Systems & Inference Engineer',
      focus: 'High-throughput model serving, TensorRT compilation, GPU cluster orchestration, and low-latency streaming.',
      tech: ['C++', 'CUDA', 'Docker', 'Kubernetes', 'Kafka', 'Rust'],
      accent: 'var(--accent-secondary)'
    },
    {
      num: '03',
      title: 'Edge Computer Vision Engineer',
      focus: 'Real-time kinematic landmark extraction, pose estimation state machines, and embedded industrial IPC runtimes.',
      tech: ['OpenCV', 'TensorRT', 'ONNX Runtime', 'WebRTC', 'Python'],
      accent: 'var(--accent-ocean)'
    },
    {
      num: '04',
      title: 'Senior Product Engineer (Full-Stack)',
      focus: 'Type-safe enterprise frontends, streaming state management, and human-in-the-loop triage consoles.',
      tech: ['TypeScript', 'React', 'FastAPI', 'PostgreSQL', 'Tailwind'],
      accent: 'var(--accent-primary)'
    }
  ];

  return (
    <div id="careers-chapter" className="min-h-screen relative overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)]">
      {/* 0. Ambient Canvas */}
      <WorldCanvas mode="minimal" opacity={0.35} />

      {/* 1. Spatial Header */}
      <section className="pt-28 sm:pt-32 pb-14 sm:pb-16 border-b border-[var(--border-color)] relative z-10">
        <SpatialPageHeader
          tag="Specialist Pods & Careers"
          title="Small teams."
          titleAccent="High ownership."
          subtitle="We do not hire armies of generalists. We build compact specialist pods of senior engineers who thrive on deep technical uncertainty, distributed systems, and enterprise production standards."
          ctaText="Email Us Your Profile"
          ctaHref="mailto:info@nighthack.in?subject=Application%20-%20Engineering%20Pod"
          secondaryCtaText="Explore Internal Platforms"
          secondaryCtaRoute="/products"
          onNavigate={onNavigate}
          telemetryItems={[
            { label: 'CULTURE', value: 'DIRECT TECHNICAL OWNERSHIP' },
            { label: 'WORK STYLE', value: 'REMOTE / HYBRID CET' },
            { label: 'HIERARCHY', value: 'ZERO MIDDLE MANAGEMENT' },
          ]}
        />
      </section>

      {/* 2. Engineering Pod Tenets */}
      <section className="py-14 sm:py-20 border-b border-[var(--border-color)] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="border border-[var(--border-color)] bg-[var(--border-color)] rounded-2xl overflow-hidden grid grid-cols-1 sm:grid-cols-3 gap-px">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.45 }}
              className="p-6 sm:p-8 bg-[var(--bg-surface)] space-y-3"
            >
              <div className="text-xs font-mono text-[var(--accent-text)] font-bold tracking-wider">01 · AUTONOMY</div>
              <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">Direct Technical Ownership</h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal leading-relaxed font-sans">
                You architect, build, and deploy systems directly. No endless bureaucracy or non-technical handoffs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="p-6 sm:p-8 bg-[var(--bg-surface)] space-y-3"
            >
              <div className="text-xs font-mono text-[var(--accent-secondary)] font-bold tracking-wider">02 · RIGOR</div>
              <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">Production Standards</h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal leading-relaxed font-sans">
                We hold ourselves to mathematical evaluation, deterministic fallbacks, and high-throughput reliability.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="p-6 sm:p-8 bg-[var(--bg-surface)] space-y-3"
            >
              <div className="text-xs font-mono text-[var(--accent-secondary)] font-bold tracking-wider">03 · LABS</div>
              <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">Continuous Incubation</h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal leading-relaxed font-sans">
                Pods spend dedicated time incubating internal technology (like Talkument, Hoot, and our Ottom8 Agent Platform).
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Open Pod Roles */}
      <section className="py-14 sm:py-20 bg-[var(--bg-surface-subtle)] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
          <div className="border-b border-[var(--border-color)] pb-4">
            <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">Pod Openings</span>
            <MaskedHeading as="h2" className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] mt-1">
              Active Specialist Roles
            </MaskedHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pods.map((pod, idx) => (
              <motion.div
                key={pod.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 'some' }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--border-hover)] transition-all space-y-6 flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold tabular-nums" style={{ color: pod.accent }}>
                      Pod {pod.num}
                    </span>
                    <span className="text-[11px] font-mono px-3 py-1 rounded-md bg-[var(--bg-surface-subtle)] text-[var(--text-secondary)] border border-[var(--border-color)]">
                      REMOTE / HYBRID CET
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-[var(--text-primary)]">
                    {pod.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal leading-relaxed font-sans">
                    {pod.focus}
                  </p>

                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">Primary Stack</div>
                    <div className="flex flex-wrap gap-2">
                      {pod.tech.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[var(--bg-surface-subtle)] text-[var(--text-secondary)] border border-[var(--border-color)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--border-color)]">
                  <a
                    href={`mailto:info@nighthack.in?subject=Application%20-%20${encodeURIComponent(pod.title)}`}
                    className="inline-flex items-center gap-2 text-xs font-display font-bold text-[var(--text-primary)] hover:text-[var(--accent-text)] transition-colors cursor-pointer no-underline"
                  >
                    <Mail className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                    <span>Email us your profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Bottom CTA */}
      <section className="relative z-10 py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-ocean-depth text-[var(--text-primary)] border-t border-[var(--border-color)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.55 }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <span className="text-xs font-mono text-[var(--accent-text)] uppercase font-bold tracking-widest block">
            Join the Collective
          </span>
          <MaskedHeading as="h2" className="text-3xl sm:text-5xl font-display font-bold text-[var(--text-primary)] tracking-tight max-w-3xl mx-auto">
            Don't see your exact title?
          </MaskedHeading>
          <ScrollText className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto font-normal leading-relaxed">
            If you have built and deployed serious machine learning pipelines, distributed systems, or high-throughput runtimes, simply email your CV/profile and relevant details directly to <strong className="text-[var(--text-primary)]">info@nighthack.in</strong>.
          </ScrollText>
          <div className="pt-2">
            <a
              href="mailto:info@nighthack.in?subject=Engineering%20Background%20-%20General%20Application"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--accent-primary-text)] font-display font-bold text-sm tracking-tight transition-all cursor-pointer shadow-md no-underline"
            >
              <Mail className="w-4 h-4 text-current" />
              <span>Email Your CV &amp; Profile (info@nighthack.in)</span>
              <ArrowRight className="w-4 h-4 text-current" />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
