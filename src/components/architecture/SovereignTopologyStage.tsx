import { Activity, Box, CheckCircle2, Cloud, Cpu, Layers, Lock, Server } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { StageGroup } from '../home/StageGroup';

export type SovereignMode = 'cloud-ml' | 'kubernetes-docker' | 'custom-api';

interface SovereignTopologyStageProps {
  initialMode?: SovereignMode;
  onModeChange?: (mode: SovereignMode) => void;
  className?: string;
  showCardDetails?: boolean;
}

export function SovereignTopologyStage({
  initialMode = 'cloud-ml',
  onModeChange,
  className = '',
  showCardDetails = true
}: SovereignTopologyStageProps) {
  const [activeMode, setActiveMode] = useState<SovereignMode>(initialMode);

  const handleModeSelect = (mode: SovereignMode) => {
    setActiveMode(mode);
    if (onModeChange) onModeChange(mode);
  };

  const topologies = {
    'cloud-ml': {
      id: 'cloud-ml',
      name: 'Managed Cloud ML Platforms',
      badge: 'AWS SAGEMAKER / GOOGLE AI / AZURE ML',
      description: 'Deploy fine-tuned models on enterprise cloud infrastructure using managed ML runtimes, autoscaling endpoints, and secure VPC access.',
      specs: [
        { label: 'Platforms', value: 'AWS SageMaker, Vertex AI, Azure ML', icon: Cloud },
        { label: 'Model artifacts', value: 'PyTorch / Hugging Face Checkpoints', icon: Cpu },
        { label: 'Security & access', value: 'Role-Based Access Control & SSL/TLS', icon: Lock },
        { label: 'Monitoring', value: 'Logging, Metrics & Drift Tracking', icon: Activity }
      ],
      nodes: [
        { id: 'registry', title: 'Model registry', desc: 'Version-controlled fine-tuned checkpoints and evaluation metadata.' },
        { id: 'endpoint', title: 'Managed inference endpoint', desc: 'Autoscaling GPU/CPU instances serving low-latency model predictions.' },
        { id: 'vpc', title: 'Secure vpc networking', desc: 'Private routing between internal application services and model endpoints.' },
        { id: 'logging', title: 'Cloud observability', desc: 'Centralized request logging, latency metrics, and error alerting.' }
      ]
    },
    'kubernetes-docker': {
      id: 'kubernetes-docker',
      name: 'Containerized & Kubernetes Deployment',
      badge: 'DOCKER / DOCKER COMPOSE / KUBERNETES',
      description: 'Containerized ML workloads designed for portability and scale across customer-hosted clusters and cloud environments.',
      specs: [
        { label: 'Containerization', value: 'Docker & Docker Compose', icon: Box },
        { label: 'Orchestration', value: 'Kubernetes where appropriate', icon: Server },
        { label: 'Environment', value: 'Environment Isolation & CI/CD', icon: Layers },
        { label: 'Automation', value: 'GitHub Actions / GitLab CI / Jenkins', icon: CheckCircle2 }
      ],
      nodes: [
        { id: 'image', title: 'Hardened container image', desc: 'Minimal base images bundled with Python, PyTorch, and optimised model runtimes.' },
        { id: 'k8s', title: 'Kubernetes cluster', desc: 'Declarative pod scaling, rolling updates, and resource allocation.' },
        { id: 'ci', title: 'CI/CD pipeline', desc: 'Automated test suite execution and container deployment via GitHub Actions/GitLab.' },
        { id: 'isolation', title: 'Environment separation', desc: 'Strict separation between development, staging, and production clusters.' }
      ]
    },
    'custom-api': {
      id: 'custom-api',
      name: 'Custom Inference APIs & Workflows',
      badge: 'FASTAPI / ASYNC QUEUES / SYSTEM INTEGRATION',
      description: 'Production-ready inference microservices integrated directly into existing databases, ERPs, CRM workflows, and operational dashboards.',
      specs: [
        { label: 'API framework', value: 'Python / FastAPI / Async Workers', icon: Server },
        { label: 'Databases', value: 'PostgreSQL, Redis, Qdrant Vector DB', icon: Cloud },
        { label: 'Authentication', value: 'JWT, OAuth2, OpenID Connect', icon: Lock },
        { label: 'Data pipelines', value: 'ETL/ELT Workflows & Batch Ingestion', icon: Activity }
      ],
      nodes: [
        { id: 'fastapi', title: 'FastAPI microservice', desc: 'High-throughput async endpoints handling payload validation and batching.' },
        { id: 'queue', title: 'Redis task queue', desc: 'Decoupled queue workers for long-running document analysis and inference.' },
        { id: 'storage', title: 'Database integration', desc: 'Writing structured predictions directly to PostgreSQL, MongoDB, or Redis.' },
        { id: 'workflow', title: 'Product ui & handoffs', desc: 'Delivering actionable outputs to admin dashboards with human-in-the-loop controls.' }
      ]
    }
  };

  const current = topologies[activeMode];

  return (
    <div className={`space-y-6 ${className}`}>

      {/* Mode Selectors */}
      <StageGroup label="Deployment environments" className="flex flex-wrap gap-2">
        {(Object.keys(topologies) as SovereignMode[]).map((modeKey) => {
          const topo = topologies[modeKey];
          const isSelected = activeMode === modeKey;
          return (
            <button
              key={modeKey}
              onClick={() => handleModeSelect(modeKey)}
              aria-pressed={isSelected}
              aria-controls="deployment-detail"
              data-suggested={Object.keys(topologies).indexOf(modeKey) === (Object.keys(topologies).indexOf(activeMode) + 1) % Object.keys(topologies).length}
              className={`stage-control px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--accent-orange-text)] font-bold shadow-sm'
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
              }`}
            >
              <span>{topo.name}</span>
            </button>
          );
        })}
      </StageGroup>

      {/* Main Architectural Container */}
      <AnimatePresence mode="wait">
        <motion.div id="deployment-detail" role="region" aria-label="Deployment environments detail"
          key={current.id}
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="p-6 sm:p-8 rounded-2xl detail-panel bg-[var(--bg-surface)]/80 border border-[var(--border-color)] space-y-6"
        >

          {/* Topology Overview Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
            <div className="space-y-1 text-left">
              <div className="text-xs text-[var(--accent-orange-text)] tracking-wider font-bold">
                {current.badge}
              </div>
              <div className="text-xl sm:text-2xl font-display font-bold text-[var(--text-primary)]">
                {current.name}
              </div>
            </div>

          </div>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] text-left font-normal leading-relaxed">
            {current.description}
          </p>

          {/* Schematic Nodes */}
          <div className="p-4 sm:p-6 rounded-2xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] space-y-3 text-left">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {current.nodes.map((node) => (
                <div
                  key={node.id}
                  className="p-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[var(--text-primary)]">{node.title}</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] font-normal leading-relaxed">
                    {node.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Specifications Matrix */}
          {showCardDetails && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1 text-left">
              {current.specs.map((spec, i) => {
                const Icon = spec.icon;
                return (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] space-y-1.5"
                  >
                    <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                      <Icon className="w-3.5 h-3.5 text-[var(--accent-orange-text)]" />
                      <span>{spec.label}</span>
                    </div>
                    <div className="text-xs font-medium text-[var(--text-primary)]">
                      {spec.value}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </motion.div>
      </AnimatePresence>

    </div>
  );
}
