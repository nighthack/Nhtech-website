import { EngineeringTrackMeta } from '../types';

export const engineeringTracks: EngineeringTrackMeta[] = [
  {
    id: 'fde',
    title: 'Embedded teams',
    shortTitle: 'Embedded teams',
    tagline: 'Forward deployed engineers working alongside your team to turn complex business problems into production systems.',
    description: 'We embed senior product and AI engineers directly into your domain to deconstruct difficult requirements, select and evaluate optimal models, and deliver resilient, production-ready software.',
    badge: 'CORE TRACK 01',
    accent: '#FF5A1F',
    subCapabilities: [
      'Agentic AI & state machine orchestration',
      'Small Language Models (SLMs) & low-latency runtimes',
      'Frontier models & multi-step reasoning',
      'Fine-tuning, quantisation & model distillation',
      'Custom enterprise AI products & modern UX',
      'Empirical model selection & evaluation benchmarks',
      'Bi-directional enterprise workflow integrations'
    ]
  },
  {
    id: 'vision-edge',
    title: 'Vision & edge AI',
    shortTitle: 'Vision & edge AI',
    tagline: 'Physical-world perception, kinematic tracking, and on-device inference with local processing.',
    description: 'High-frequency computer vision, open-weight vision-language-action (OpenVLA) models, and edge silicon optimisation engineered for factory floors, biomechanics, robotics, and mobile devices.',
    badge: 'CORE TRACK 02',
    accent: '#47849B',
    subCapabilities: [
      'Computer vision & defect classification',
      'OpenVLA / vision-language-action models',
      'On-device inference on TensorRT & ONNX',
      'On-device models & local memory IPC',
      'Industrial & manufacturing vision systems',
      'Physical-world AI & real-time pose estimation'
    ]
  },
  {
    id: 'complex-business',
    title: 'Private AI',
    shortTitle: 'Private AI',
    tagline: 'Translating intricate domain rules, compliance mandates, and legacy silos into resilient systems.',
    description: 'Building bespoke enterprise software for high-stakes operational environments where the challenge is deconstructing messy business logic, regulatory rules, and legacy architectures into bulletproof platforms.',
    badge: 'CORE TRACK 03',
    accent: '#75A4B5',
    subCapabilities: [
      'High-volume payments & streaming ledger telemetry',
      'Enterprise loyalty & dynamic reward architectures',
      'ERP & core operational workflow modernisation',
      'Regulatory compliance & immutable audit logs',
      'Productivity systems & context automation',
      'Bespoke enterprise applications with ownership of your code and models'
    ]
  }
];
