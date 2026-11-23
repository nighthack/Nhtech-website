/**
 * GLOBAL BRAND CONFIGURATION
 *
 * To rebrand or rename the company, update values in this file.
 * All components across the application consume these properties.
 */

export const brand = {
  siteUrl: 'https://nighthack.in',
  bookingUrl: '',
  regionLine: 'Based in Bengaluru. Working with customers worldwide.',
  // Brand Names
  displayName: "NHTech",
  shortName: "NHTech",
  legalName: "NightHack Technology Private Limited",
  formerName: "NightHack Labs",

  // Core Positioning
  heroHeadline: "We build AI that runs inside complex operations.",
  tagline: "Forward-deployed engineers building AI and product systems alongside your team.",
  subHeadline: "NHTech takes difficult business problems and converts them into production technology. We combine deep product engineering with AI implementation, with engineers working closely with your team from problem definition through deployment.",
  editorialKicker: "Forward Deployed Engineering. Deep Product Thinking. Production Systems.",
  strategicPositioning: "NHTech takes difficult business problems and converts them into production technology. We combine deep product engineering with AI implementation, with engineers working closely with the customer from problem definition through deployment.",

  // Contact & Location
  contact: {
    email: "info@nighthack.in",
    displayEmailPlaceholder: "info@nighthack.in",
    inquiriesUrl: "/contact",
    address: "Bengaluru, Karnataka, India",
    primaryRegion: "Global customers, based in Bengaluru",
    linkedInUrl: "https://www.linkedin.com/company/nhtech",
    githubUrl: "https://github.com/nhtech",
  },

  // Credibility & Model Ecosystem
  partnerships: {
    openai: {
      confirmed: false,
      status: "OpenAI Select Partner",
      specialization: "Agent Building and AI Operations",
      tag: "Verified Select Partner"
    },
    ecosystem: {
      partner: "OpenAI Select Partner",
      technologies: ["Google", "Anthropic", "Microsoft", "Qwen", "GLM", "DeepSeek", "Open-Source Models"],
      spectrum: "SLMs ←→ Frontier Models",
      modelAgnosticNote: "Model-agnostic implementation: we select and optimise the exact intelligence layer appropriate for your latency, privacy, and reasoning requirements."
    },
    researchRoots: {
      confirmed: false,
      institution: "Microsoft R&D India",
      description: "Our AI journey began through research projects with Microsoft R&D India, establishing our foundational rigor in machine learning systems."
    }
  },

  // Prototype Promise
  prototypeCommitment: "Focused prototypes move from problem statement to working validation in structured, milestone-driven sprint cycles tailored to your operational scope.",

  // Visual Tokens & Theming (Deep Ocean, Graphite, Signal Orange)
  tokens: {
    colors: {
      background: "#061421",
      surface: "#0B2030",
      surfaceRaised: "#173D5B",
      surfaceHighlight: "#24536F",
      border: "rgba(166, 195, 206, 0.16)",
      borderSubtle: "rgba(166, 195, 206, 0.08)",
      borderActive: "rgba(117, 164, 181, 0.36)",
      textPrimary: "#F5F8FA",
      textSecondary: "#D1E0E6",
      textMuted: "#A6C3CE",
      accent: "#FF4800",
      accentHover: "#FF7A45",
      accentMuted: "rgba(255, 90, 31, 0.14)",
      accentBorder: "rgba(255, 90, 31, 0.35)",
      oceanAccent: "#47849B",
      success: "#22A06B",
      warning: "#D99A18",
      info: "#2786C7",
      error: "#D64545"
    },
    radius: {
      card: "16px",
      button: "12px",
      pill: "9999px"
    }
  }
} as const;

export const brandConfig = brand;
export type BrandConfig = typeof brand;
