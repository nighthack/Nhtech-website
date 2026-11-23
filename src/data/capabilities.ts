import { Capability } from '../types';

export const capabilities: Capability[] = [
  {
    id: 'agentic-workflows',
    slug: 'agentic-ai',
    title: 'Agentic & Workflow Systems',
    headline: 'Eliminate manual handoffs across emails, approvals, and enterprise databases.',
    description:
      'When teams spend hours triaging incoming requests, re-keying records, or chasing approvals, we build deterministic state machines that execute multi-step workflows, respect role-based permissions, and pause for human sign-off whenever thresholds require review.',
    coreConcepts: [
      {
        title: 'Contextual State Construction',
        description:
          'Systems assemble live operational context from incoming communications, Enterprise Resource Planning (ERP) logs, and internal databases before proposing an action.'
      },
      {
        title: 'Explicit Tool Permissions',
        description:
          'Every Application Programming Interface (API) mutation and tool call runs under strict role-based scopes rather than unrestricted autonomy.'
      },
      {
        title: 'Human Checkpoint Gates',
        description:
          'High-consequence decisions, financial thresholds, and ambiguous exceptions automatically pause for human approval with side-by-side context.'
      },
      {
        title: 'Replayable Audit Trails',
        description:
          'Every input, model inference, tool parameter, and human sign-off is logged immutably for compliance auditing and operational debugging.'
      }
    ],
    architecturePoints: [
      'Integration example: Email (IMAP/Exchange) and Secure File Transfer Protocol (SFTP) intake routed into SAP or PostgreSQL via deterministic state machines',
      'Integration example: Sandboxed tool execution using scoped OAuth and Mutual Transport Layer Security (mTLS) tokens',
      'Concrete deliverable: Bidirectional ERP and Customer Relationship Management (CRM) adapters with dead-letter recovery queues',
      'Concrete deliverable: Operator triage workbench for inspecting, adjusting, and approving queued tasks'
    ],
    technologies: ['Open-Weight Large Language Models (LLMs)', 'FastAPI', 'Deterministic State Machines', 'Redis', 'PostgreSQL', 'Docker'],
    deliverables: [
      'Production workflow microservices',
      'Operator triage and approval workbench',
      'Immutable audit log & decision replay viewer',
      'SAP, Salesforce, SQL & internal API connectors'
    ],
    relatedRoute: '/agentic-ai'
  },
  {
    id: 'document-intelligence',
    slug: 'document-intelligence',
    title: 'Document Intelligence & Knowledge Systems',
    headline: 'Turn multi-hundred-page contracts, filings, and PDFs into verifiable, queryable data.',
    description:
      'When critical rules and figures sit trapped in scanned PDFs, complex tables, and multi-jurisdiction contracts, we build spatial parsing and Retrieval-Augmented Generation (RAG) pipelines that output structured records linked to exact source bounding boxes.',
    coreConcepts: [
      {
        title: 'Spatial & Structural Parsing',
        description:
          'Preserves multi-column layouts, table cell coordinates, footnotes, and hierarchical clauses beyond basic Optical Character Recognition (OCR).'
      },
      {
        title: 'Hybrid Semantic Retrieval',
        description:
          'Pairs dense vector embeddings with sparse keyword indexing and entity graphs to prevent fabricated answers on dense regulatory texts.'
      },
      {
        title: 'Deterministic Citation Grounding',
        description:
          'Every extracted field and summary links directly back to highlighted bounding-box coordinates inside the original source page.'
      },
      {
        title: 'Self-Hosted Fine-Tuned Models',
        description:
          'Adapts specialized open-weight models (Llama, Mistral) to your domain taxonomy inside private infrastructure with zero external leakage.'
      }
    ],
    architecturePoints: [
      'Integration example: Multi-format PDF/scan ingestion connected to Qdrant or Milvus vector databases and Neo4j knowledge graphs',
      'Integration example: Automated schema validation writing verified fields directly into downstream underwriting or compliance ERPs',
      'Concrete deliverable: High-throughput asynchronous document extraction API with bounding-box coordinate retention',
      'Concrete deliverable: Human verification workbench featuring synchronized side-by-side PDF source viewers'
    ],
    technologies: ['Fine-tuned Llama / Mistral', 'Qdrant Vector Database', 'Neo4j', 'FastAPI', 'PyTorch', 'Optical Character Recognition (OCR)'],
    deliverables: [
      'Document parsing & extraction APIs',
      'Citation-grounded RAG search service',
      'Domain knowledge graph engine',
      'Side-by-side human PDF verification UI'
    ],
    relatedRoute: '/document-intelligence'
  },
  {
    id: 'ai-first-enterprise',
    slug: 'ai-first-enterprise',
    title: 'AI-First Enterprise Applications',
    headline: 'Ship complete operational software. not disconnected wrapper scripts.',
    description:
      'When off-the-shelf SaaS tools force teams into workarounds or brittle prototypes fail in production, we engineer cohesive full-stack applications combining modern interfaces, resilient backends, and embedded AI inference with full intellectual property ownership.',
    coreConcepts: [
      {
        title: 'Unified Full-Stack Architecture',
        description:
          'Weaves web interfaces, asynchronous backends, relational and vector databases, and model routing into a single maintainable codebase.'
      },
      {
        title: 'Responsive Operator UX',
        description:
          'Streaming status updates, keyboard-friendly review queues, and optimistic interface states built for daily operational speed.'
      },
      {
        title: 'Enterprise Security & Governance',
        description:
          'Role-Based Access Control (RBAC), Single Sign-On via Security Assertion Markup Language (SSO/SAML), and multi-tenant data isolation.'
      },
      {
        title: 'Clean Team Handover',
        description:
          'Typed, tested codebases with Continuous Integration / Continuous Deployment (CI/CD) pipelines engineered for your internal team to maintain.'
      }
    ],
    architecturePoints: [
      'Integration example: Single Sign-On (SSO/SAML) identity federation paired with granular Role-Based Access Control (RBAC) across tenant boundaries',
      'Integration example: Type-safe React and TypeScript frontends backed by Python FastAPI or Node.js distributed microservices',
      'Concrete deliverable: Automated CI/CD deployment workflows with regression and model evaluation gates',
      'Concrete deliverable: Unified relational, vector, and time-series data models owned 100% in your repository'
    ],
    technologies: ['React', 'TypeScript', 'Python / FastAPI', 'Node.js', 'PostgreSQL', 'Docker', 'Kubernetes'],
    deliverables: [
      'Turnkey full-stack enterprise web & mobile apps',
      'Type-safe microservice APIs',
      'SSO/SAML & RBAC security implementation',
      'Automated CI/CD & engineering handover docs'
    ],
    relatedRoute: '/work'
  },
  {
    id: 'complex-business-systems',
    slug: 'complex-business-systems',
    title: 'Complex Business Systems: ERP, Payments, Loyalty, CRM & Compliance',
    headline: 'Modernize mission-critical business logic, ledgers, and compliance operations.',
    description:
      'When core operations depend on fragmented spreadsheets, legacy Enterprise Resource Planning (ERP) tools, high-volume payment streams, or complex multi-tier rules, we engineer reliable platforms that unify business logic and maintain auditable accuracy.',
    coreConcepts: [
      {
        title: 'ERP & Legacy Stack Orchestration',
        description:
          'Bidirectional connectors for SAP, Oracle, NetSuite, Salesforce Customer Relationship Management (CRM), and legacy SQL/SFTP backends.'
      },
      {
        title: 'Financial & Ledger Processing',
        description:
          'Idempotent transaction pipelines, Payment Card Industry (PCI)-conscious token workflows, ledger reconciliation, and real-time anomaly scoring.'
      },
      {
        title: 'Loyalty & Engagement Engines',
        description:
          'High-throughput rule engines managing multi-tier point accruals, dynamic rewards, and campaign attribution tracking.'
      },
      {
        title: 'Compliance & Audit Workbenches',
        description:
          'Automated regulatory policy verification, immutable event logs, and structured audit packet generation.'
      }
    ],
    architecturePoints: [
      'Integration example: High-throughput Apache Kafka, RabbitMQ, and Redis Streams connecting payment gateways with real-time anomaly models',
      'Integration example: Bidirectional synchronization between forecasting engines and SAP/Oracle purchase order workflows',
      'Concrete deliverable: Idempotent payment and ledger reconciliation microservices with saga transaction consistency',
      'Concrete deliverable: Compliance and procurement dashboards with explainable escalation queues'
    ],
    technologies: ['PostgreSQL', 'Apache Kafka', 'Redis', 'Node.js', 'Python / FastAPI', 'Docker', 'Kubernetes'],
    deliverables: [
      'Bidirectional ERP & CRM workflow connectors',
      'Streaming ledger & anomaly detection services',
      'Multi-tier loyalty & campaign rule platforms',
      'Regulatory compliance & audit portals'
    ],
    relatedRoute: '/work'
  },
  {
    id: 'model-engineering',
    slug: 'on-prem-ai',
    title: 'Model-Enabled Applications & On-Premises AI',
    headline: 'Select, adapt, and host models inside infrastructure you control.',
    description:
      'When external API calls violate data residency rules, exceed latency targets, or inflate token costs, we benchmark Retrieval-Augmented Generation (RAG) against fine-tuning and deploy quantised Small Language Models (SLMs) inside your private cloud or on-premises clusters.',
    coreConcepts: [
      {
        title: 'RAG vs Fine-Tuning vs Distillation',
        description:
          'Empirical evaluation to select whether retrieval, Low-Rank Adaptation (LoRA / QLoRA) tuning, or model distillation best meets cost and accuracy goals.'
      },
      {
        title: 'Task-Specific Adaptation',
        description:
          'Adapting open-weight architectures (Llama, Mistral, Qwen, DeepSeek) to domain terminology and strict JSON/SQL output schemas.'
      },
      {
        title: 'Quantised Private Hosting',
        description:
          'Compressing models via 8-bit floating point (FP8) and 4-bit integer (INT4) quantisation to cut graphics processing unit (GPU) memory and inference costs.'
      },
      {
        title: 'Full Model & Data Control',
        description:
          'Training datasets, evaluation suites, checkpoint weights, and deployment scripts stay 100% under your ownership.'
      }
    ],
    architecturePoints: [
      'Integration example: Self-hosted vLLM and NVIDIA TensorRT-LLM inference endpoints running inside customer Virtual Private Clouds (VPCs)',
      'Integration example: Automated PyTorch and Hugging Face fine-tuning pipelines calibrated on human ground-truth benchmarks',
      'Concrete deliverable: Domain evaluation harness comparing frontier APIs against fine-tuned Small Language Models (SLMs)',
      'Concrete deliverable: Exportable model checkpoint weights and Infrastructure-as-Code deployment manifests'
    ],
    technologies: ['PyTorch', 'Hugging Face', 'vLLM', 'TensorRT-LLM', 'Docker', 'AWS SageMaker', 'Kubernetes'],
    deliverables: [
      'Domain evaluation & benchmark report',
      'Exportable model checkpoints & adapters',
      'Private VPC or on-prem inference API',
      'Automated retraining & drift scripts'
    ],
    relatedRoute: '/on-prem-ai'
  },
  {
    id: 'computer-vision-edge',
    slug: 'computer-vision',
    title: 'Vision & edge AI',
    headline: 'Run real-time visual inspection and motion tracking directly on local devices.',
    description:
      'When factory floors, clinics, or field teams need sub-second visual analysis without cloud bandwidth delays or privacy exposure, we build computer vision pipelines running locally on commercial tablets, industrial cameras, and edge hardware.',
    coreConcepts: [
      {
        title: 'Low-Latency Local Inference',
        description:
          'Compiling custom Convolutional Neural Networks (CNNs) and vision models via TensorRT and ONNX for on-device frame processing.'
      },
      {
        title: 'Kinematic & Activity Tracking',
        description:
          'Extracting skeletal landmarks, counting repetitions, and classifying movement phases in real time on commercial mobile devices.'
      },
      {
        title: 'Industrial & Physical Perception',
        description:
          'Surface defect inspection, component tolerance checks, and Vision-Language-Action (OpenVLA) physical perception on production lines.'
      },
      {
        title: 'Offline-Resilient Edge Sync',
        description:
          'Local SQLite persistence, Bluetooth Low Energy (BLE) sensor coordination, and asynchronous cloud sync when connectivity returns.'
      }
    ],
    architecturePoints: [
      'Integration example: WebRTC camera streams and local Inter-Process Communication (IPC) buses feeding TensorRT/ONNX inference nodes',
      'Integration example: Tablet applications with Bluetooth Low Energy (BLE) peripheral pairing and offline SQLite synchronization',
      'Concrete deliverable: Calibrated edge vision runtime with Over-the-Air (OTA) model update management',
      'Concrete deliverable: Operator inspection station displaying live video replay and tolerance alerts'
    ],
    technologies: ['PyTorch Mobile', 'TensorRT', 'ONNX Runtime', 'OpenCV', 'WebRTC', 'FastAPI', 'React Native'],
    deliverables: [
      'On-device TensorRT / ONNX vision runtime',
      'Kinematic or defect detection pipeline',
      'Field operator tablet / web UI',
      'OTA edge fleet update tooling'
    ],
    relatedRoute: '/computer-vision'
  }
];
