import { CaseStudy } from '../types';

export const caseStudies: CaseStudy[] = [
  {
    id: 'enterprise-workflow-intelligence',
    slug: 'enterprise-workflow-intelligence',
    track: 'fde',
    clientAnonymousName: 'Enterprise operations',
    title: 'One pipeline for valuation intake, review and ERP entry',
    eyebrow: 'Track 1: Forward Deployed Engineering · Agentic Workflows',
    context: 'Requests came in by email, PDF and old Excel files. Staff re-typed each one.',
    difficulty: 'Manual entry and disconnected systems made valuation review difficult to track.',
    systemDesigned: 'We built one pipeline that reads the requests, checks the numbers and sends exceptions to a person.',
    architecture: [
      'Universal intake gateway (Email IMAP/Exchange, Webhooks, SFTP, REST)',
      'Document parsing & entity mapping with spatial bounding-box verification',
      'Deterministic rule engine for valuation formulas and regulatory compliance',
      'Operator triage and human-in-the-loop workbench with inline PDF diffing',
      'Bidirectional connectors to legacy SQL backends and modern SaaS APIs',
      'Immutable audit trail recording every automated extraction and human sign-off'
    ],
    humanCheckpoints: 'Straight-through processing executes only when all syntactic, arithmetic, and confidence gates clear; exceptions automatically escalate with context-rich review packets.',
    technologies: ['FastAPI', 'React', 'PostgreSQL', 'Redis Queue', 'Docker', 'Open-Weight LLMs'],
    scaleEvidence: {
      metricLabel: 'Result',
      description: 'Replaced manual re-entry with a pipeline linking each valuation record to its source and review history.'
    },
    operationalImpact: 'Replaced manual re-entry with a pipeline linking each valuation record to its source and review history.',
    relatedCapabilities: ['Agentic Workflow Systems', 'Document Intelligence', 'AI-Native Product Engineering'],
    confidential: false,
    approvedForPublicWebsite: true
  },
  {
    id: 'document-intelligence',
    slug: 'document-intelligence',
    track: 'fde',
    clientAnonymousName: 'Legal and regulatory documents',
    title: 'Searchable legal documents with source citations',
    eyebrow: 'Track 1: Forward Deployed Engineering · Domain Models & RAG',
    context: 'Legal teams needed to search long contracts and regulatory filings and check where each answer came from.',
    difficulty: 'Nested clauses, scanned tables and conflicting terminology made keyword search unreliable.',
    systemDesigned: 'We combined layout-aware document parsing, search and private language models with a source-checking workbench.',
    architecture: [
      'Multi-modal layout parsing with bounding-box spatial retention',
      'Specialized Small Language Models (SLMs) fine-tuned for domain taxonomy',
      'Reasoning gateway for multi-clause conditional resolution',
      'High-performance Qdrant vector database with hybrid sparse-dense indexing',
      'Deterministic citation verification layer before downstream database writes',
      'High-throughput asynchronous FastAPI microservice backend'
    ],
    humanCheckpoints: 'Ambiguous cross-references and confidence scores below threshold route directly to legal subject-matter experts with highlighted source paragraphs for rapid one-click verification.',
    technologies: ['Fine-tuned Llama-family', 'Qdrant Vector DB', 'Knowledge Graphs', 'FastAPI', 'PyTorch'],
    scaleEvidence: {
      metricLabel: 'Result',
      description: 'Teams can search the document archive and review the original paragraphs alongside extracted answers.'
    },
    operationalImpact: 'Teams can search the document archive and review the original paragraphs alongside extracted answers.',
    relatedCapabilities: ['Document Intelligence', 'Agentic Workflow Systems', 'AI-Native Product Engineering'],
    confidential: false,
    approvedForPublicWebsite: true
  },
  {
    id: 'computer-vision-motion',
    slug: 'computer-vision-motion',
    track: 'vision-edge',
    clientAnonymousName: 'Movement and rehabilitation',
    title: 'Rep counting and form tracking on a tablet',
    eyebrow: 'Track 2: Vision & edge AI · On-Device Kinematic Analysis',
    context: 'Coaches and clinicians needed movement measurements using standard tablets.',
    difficulty: 'Video needed to be processed locally under changing lighting and camera positions.',
    systemDesigned: 'We built on-device pose tracking, movement-phase classification and live measurements with a local session store.',
    architecture: [
      'Custom lightweight pose estimation backbone running on-device',
      'Temporal movement phase state machine (eccentric, isometric, concentric transitions)',
      'Kinematic calculations (rep counts, tempo cadence, velocity analysis)',
      'Local SQLite & device synchronization for responsive tablet display',
      'Asynchronous sync engine for aggregated coach/trainer telemetry web dashboards',
      'Offline-first architecture functioning in bandwidth-constrained facilities'
    ],
    humanCheckpoints: 'System outputs prescriptive metrics and flags movement deviations, leaving qualitative feedback and athletic adjustments in the hands of the supervising human coach or clinician.',
    technologies: ['Computer Vision Pipelines', 'PyTorch', 'React Native', 'SQLite', 'FastAPI', 'BLE Coordination'],
    scaleEvidence: {
      metricLabel: 'Result',
      description: 'Coaches can review repetitions, tempo and movement flags on the device without a cloud round-trip.'
    },
    operationalImpact: 'Coaches can review repetitions, tempo and movement flags on the device without a cloud round-trip.',
    relatedCapabilities: ['Computer Vision & edge AI', 'AI-Native Product Engineering'],
    confidential: false,
    approvedForPublicWebsite: true
  },
  {
    id: 'vision-robotic-inspection',
    slug: 'vision-robotic-inspection',
    track: 'vision-edge',
    clientAnonymousName: 'Manufacturing',
    title: 'Surface inspection with operator review',
    eyebrow: 'Track 2: Vision & edge AI · Defect & Quality Inspection',
    context: 'Factory operators needed to inspect parts for surface defects and alignment issues.',
    difficulty: 'Lighting varied and inspection needed to fit the production line.',
    systemDesigned: 'We connected local cameras to detection and segmentation models, tolerance checks and an operator review screen.',
    architecture: [
      'High-resolution optical camera intake feeding local edge compute',
      'Object detection and surface anomaly classification models',
      'Deterministic quality tolerance evaluation engine based on client ground-truth benchmarks',
      'Local edge server running lightweight inference with minimal external cloud dependencies',
      'Operator telemetry interface for live inspection replays and threshold adjustments'
    ],
    humanCheckpoints: 'Station operators calibrate tolerance thresholds per batch and receive instant video clip replays whenever a defect flag is raised.',
    technologies: ['PyTorch', 'TensorFlow', 'Computer Vision Pipelines', 'FastAPI', 'React', 'Edge Deployment'],
    scaleEvidence: {
      metricLabel: 'Result',
      description: 'Operators can review flagged parts, adjust tolerance thresholds and inspect the history of defects.'
    },
    operationalImpact: 'Operators can review flagged parts, adjust tolerance thresholds and inspect the history of defects.',
    relatedCapabilities: ['Computer Vision & edge AI', 'Production AI Infrastructure'],
    confidential: false,
    approvedForPublicWebsite: true
  },
  {
    id: 'financial-anomaly',
    slug: 'financial-anomaly',
    track: 'complex-business',
    clientAnonymousName: 'Financial services',
    title: 'Anomaly detection for transaction streams',
    eyebrow: 'Track 3: Complex Business Solutions · Payments & Stream Anomaly',
    context: 'Financial operations teams needed to monitor continuous transaction streams.',
    difficulty: 'Distributed ledgers needed timely scoring and explainable alerts.',
    systemDesigned: 'We connected streaming ingestion, anomaly models and a review queue with an audit trail.',
    architecture: [
      'Distributed Kafka ingestion layer processing cross-region telemetry streams',
      'Custom Deep Neural Network (DNN) trained on temporal transaction patterns',
      'PyTorch inference runtime optimised for low latency',
      'AWS SageMaker distributed model management with continuous drift monitoring',
      'FastAPI async routing with circuit-breaker failover protection',
      'Immutable transaction tracing and topological risk graph visualization'
    ],
    humanCheckpoints: 'Automated policy blocks apply strictly to unambiguous fraud patterns, while high-entropy or anomalous velocity spikes trigger real-time compliance queue escalations with automated evidence packets.',
    technologies: ['PyTorch', 'Custom DNN', 'AWS SageMaker', 'FastAPI', 'Kafka', 'PostgreSQL'],
    scaleEvidence: {
      metricLabel: 'Result',
      description: 'Reviewers receive transaction context and anomaly signals together, with a record of decisions.'
    },
    operationalImpact: 'Reviewers receive transaction context and anomaly signals together, with a record of decisions.',
    relatedCapabilities: ['Predictive & Anomaly Intelligence', 'Production AI Infrastructure', 'Agentic Workflow Systems'],
    confidential: false,
    approvedForPublicWebsite: true
  },
  {
    id: 'demand-forecasting',
    slug: 'demand-forecasting',
    track: 'complex-business',
    clientAnonymousName: 'Retail and supply chain',
    title: 'Demand forecasts connected to procurement',
    eyebrow: 'Track 3: Complex Business Solutions · ERP & Workflow Modernisation',
    context: 'Retail teams needed to plan stock across many products and locations.',
    difficulty: 'Forecasts had to account for changing demand and fit existing ordering rules.',
    systemDesigned: 'We built forecasting pipelines linked to inventory, safety-stock rules and procurement systems.',
    architecture: [
      'Hierarchical probabilistic time-series models with exogenous variable conditioning',
      'Automated feature store reconciling ERP sales logs, lead times, and inventory levels',
      'Dynamic procurement and stock allocation optimisation engines',
      'Automated purchase order draft generation with safety stock constraints',
      'Model performance monitoring and retraining triggers'
    ],
    humanCheckpoints: 'Forecasts generate categorized order suggestions; procurement officers review automated purchase drafts above designated financial thresholds with explainable sensitivity breakdowns.',
    technologies: ['Scikit-learn', 'PyTorch TimeSeries', 'ARIMA Models', 'FastAPI', 'PostgreSQL'],
    scaleEvidence: {
      metricLabel: 'Result',
      description: 'Forecasts support ordering decisions across tens of thousands of SKU-location combinations.'
    },
    operationalImpact: 'Forecasts support ordering decisions across tens of thousands of SKU-location combinations.',
    relatedCapabilities: ['Predictive & Anomaly Intelligence', 'Agentic Workflow Systems', 'AI-Native Product Engineering'],
    confidential: false,
    approvedForPublicWebsite: true
  }
];

export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined => {
  return caseStudies.find(cs => cs.slug === slug && cs.approvedForPublicWebsite);
};
