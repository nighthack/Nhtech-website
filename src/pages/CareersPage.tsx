import { ArrowRight, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { MaskedHeading, ScrollText } from '../components/common/ScrollMotion';
import { SpatialPageHeader } from '../components/common/SpatialPageHeader';
import { WorldCanvas } from '../components/common/WorldCanvas';
import { brand } from '../config/brand';
import { RoutePath } from '../types';

interface CareersPageProps {
  onNavigate: (path: RoutePath) => void;
}

export function CareersPage({ onNavigate }: CareersPageProps) {
  const pods = [
    {
      num: '01',
      title: 'Applied AI & state machine researcher',
      focus: 'Agent architectures, LLM fine-tuning, deterministic evaluation frameworks, and constrained decoding pipelines.',
      tech: ['PyTorch', 'vLLM', 'LangGraph', 'FastAPI', 'Qdrant'],
      accent: 'var(--accent-orange-text)'
    },
    {
      num: '02',
      title: 'Distributed systems & inference engineer',
      focus: 'High-throughput model serving, TensorRT compilation, GPU cluster orchestration, and low-latency streaming.',
      tech: ['C++', 'CUDA', 'Docker', 'Kubernetes', 'Kafka', 'Rust'],
      accent: 'var(--accent-secondary)'
    },
    {
      num: '03',
      title: 'Edge computer vision engineer',
      focus: 'Real-time kinematic landmark extraction, pose estimation state machines, and embedded industrial IPC runtimes.',
      tech: ['OpenCV', 'TensorRT', 'ONNX Runtime', 'WebRTC', 'Python'],
      accent: 'var(--accent-ocean)'
    },
    {
      num: '04',
      title: 'Senior product engineer (full-stack)',
      focus: 'Type-safe enterprise frontends, streaming state management, and human-in-the-loop triage consoles.',
      tech: ['TypeScript', 'React', 'FastAPI', 'PostgreSQL', 'Tailwind'],
      accent: 'var(--accent-orange-text)'
    }
  ];

  return (
    <div id="careers-chapter" className="min-h-screen relative overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)]">
      {/* 0. Ambient Canvas */}
      <WorldCanvas mode="minimal" opacity={0.35} />

      {/* 1. Spatial Header */}
      <section className="pt-28 sm:pt-32 pb-14 sm:pb-16 border-b border-[var(--border-color)] relative z-10">
        <SpatialPageHeader

          title="Small teams."
          titleAccent="High ownership."
          subtitle="We’re a small team of senior engineers. Everyone owns what they build, from design to production."
          ctaText="Email us your profile"
          ctaHref={`mailto:${brand.contact.email}?subject=Engineering%20application`}
          secondaryCtaText="See our products"
          secondaryCtaRoute="/products"
          onNavigate={onNavigate}
          telemetryItems={[
            { label: 'Culture', value: 'DIRECT TECHNICAL OWNERSHIP' },
            { label: 'Location', value: brand.regionLine },
            { label: 'Hierarchy', value: 'Flat team, no middle managers' },
          ]}
        />
      </section>

      {/* 2. Engineering Pod Tenets */}
      <section className="py-14 sm:py-20 border-b border-[var(--border-color)] relative z-10">
        <div className="site-container text-left">
          <div className="border border-[var(--border-color)] bg-[var(--border-color)] rounded-2xl overflow-hidden grid grid-cols-1 sm:grid-cols-3 gap-px">
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.45 }}
              className="p-6 sm:p-8 bg-[var(--bg-surface)] space-y-3"
            >
              <div className="text-xs font-mono text-[var(--accent-orange-text)] font-bold tracking-wider">01 · AUTONOMY</div>
              <h2 className="text-xl font-display font-bold text-[var(--text-primary)]">Direct technical ownership</h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal leading-relaxed font-sans">
                You architect, build, and deploy systems directly. No endless bureaucracy or non-technical handoffs.
              </p>
            </motion.div>

            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="p-6 sm:p-8 bg-[var(--bg-surface)] space-y-3"
            >
              <div className="text-xs font-mono text-[var(--accent-secondary)] font-bold tracking-wider">02 · RIGOR</div>
              <h2 className="text-xl font-display font-bold text-[var(--text-primary)]">Production standards</h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal leading-relaxed font-sans">
                We hold ourselves to mathematical evaluation, deterministic fallbacks, and high-throughput reliability.
              </p>
            </motion.div>

            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="p-6 sm:p-8 bg-[var(--bg-surface)] space-y-3"
            >
              <div className="text-xs font-mono text-[var(--accent-secondary)] font-bold tracking-wider">03 · LABS</div>
              <h2 className="text-xl font-display font-bold text-[var(--text-primary)]">Continuous incubation</h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal leading-relaxed font-sans">
                Pods spend dedicated time incubating internal technology (like Talkument, Hoot, and our Ottom8 Agent Platform).
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Open Pod Roles */}
      <section className="py-14 sm:py-20 bg-[var(--bg-surface-subtle)] relative z-10">
        <div className="site-container space-y-8 text-left">
          <div className="border-b border-[var(--border-color)] pb-4">
            <span className="text-xs font-mono text-[var(--text-muted)] tracking-wider">Pod Openings</span>
            <MaskedHeading as="h2" className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] mt-1">
              Active Specialist Roles
            </MaskedHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pods.map((pod, idx) => (
              <motion.div
                key={pod.num}
                initial={false}
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
                    <span className="text-xs font-mono px-3 py-1 rounded-md bg-[var(--bg-surface-subtle)] text-[var(--text-secondary)] border border-[var(--border-color)]">
                      Discuss location with us
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-[var(--text-primary)]">
                    {pod.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal leading-relaxed font-sans">
                    {pod.focus}
                  </p>
                  <details className="space-y-3 text-sm text-[var(--text-secondary)]">
                    <summary className="min-h-11 cursor-pointer py-3 font-semibold text-[var(--accent-orange-text)]">Role details</summary>
                    <p>Senior level. Location and working hours are discussed for each role.</p>
                    <ul className="list-disc space-y-2 pl-5"><li>Design and build the systems described above with customer teams.</li><li>Evaluate reliability and performance using representative workloads.</li><li>Own deployment, documentation and handover of your work.</li></ul>
                    <a href={`mailto:${brand.contact.email}?subject=${encodeURIComponent(`Application: ${pod.title}`)}`} className="site-button button-secondary">Apply for this role</a>
                  </details>


                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-mono text-[var(--text-muted)] tracking-wider">Primary Stack</div>
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
                    className="inline-flex items-center gap-2 text-xs font-display font-bold text-[var(--text-primary)] hover:text-[var(--accent-orange-text)] transition-colors cursor-pointer no-underline"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#FF4800]" />
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
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.55 }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <span className="text-xs font-mono text-[var(--accent-orange-text)] font-bold tracking-widest block">
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
              className="button-primary inline-flex items-center gap-3 px-8 py-4 rounded-xl font-display font-bold text-sm tracking-tight cursor-pointer shadow-md no-underline"
            >
              <Mail className="w-4 h-4 text-[#061421]" />
              <span>Email Your CV &amp; Profile (info@nighthack.in)</span>
              <ArrowRight className="w-4 h-4 text-[#061421]" />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
