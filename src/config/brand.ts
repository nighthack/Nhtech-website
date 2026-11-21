/**
 * GLOBAL BRAND CONFIGURATION
 * 
 * To rebrand or rename the company, update values in this file.
 * All components across the application consume these properties.
 */

export const brand = {
  // Brand Names
  displayName: "NHTech",
  shortName: "NHTech",
  legalName: "NightHack Technology Private Limited",
  formerName: "NightHack Labs",
  
  // Core Positioning
  heroHeadline: "We turn complex business operations into production-ready AI systems.",
  tagline: "Forward-deployed engineers building AI and product systems alongside your team.",
  subHeadline: "NHTech takes difficult business problems and converts them into production technology. We combine deep product engineering with AI implementation, with engineers working closely with your team from problem definition through deployment.",
  editorialKicker: "Forward Deployed Engineering. Deep Product Thinking. Production Systems.",
  strategicPositioning: "NHTech takes difficult business problems and converts them into production technology. We combine deep product engineering with AI implementation, with engineers working closely with the customer from problem definition through deployment.",
  
  // Contact & Location
  contact: {
    email: "info@nighthack.in",
    displayEmailPlaceholder: "info@nighthack.in",
    inquiriesUrl: "/contact",
    address: "Forward Deployed Engineering & AI Systems Pods",
    primaryRegion: "Europe & Global Enterprise",
    linkedInUrl: "https://www.linkedin.com/company/nhtech",
    githubUrl: "https://github.com/nhtech",
  },

  // Credibility & Model Ecosystem
  partnerships: {
    openai: {
      status: "OpenAI Select Partner",
      specialization: "Agent Building and AI Operations",
      tag: "Verified Select Partner"
    },
    ecosystem: {
      partner: "OpenAI Select Partner",
      technologies: ["Google", "Anthropic", "Microsoft", "Qwen", "GLM", "DeepSeek", "Open-Source Models"],
      spectrum: "SLMs ←→ Frontier Models",
      modelAgnosticNote: "Model-agnostic implementation: we select and optimize the exact intelligence layer appropriate for your latency, privacy, and reasoning requirements."
    },
    researchRoots: {
      institution: "Microsoft R&D India",
      description: "Our AI journey began through research projects with Microsoft R&D India, establishing our foundational rigor in machine learning systems."
    }
  },

  // Prototype Promise
  prototypeCommitment: "Focused prototypes move from problem statement to working validation in structured, milestone-driven sprint cycles tailored to your operational scope.",

  // Visual Tokens & Theming (Navy, Steel Blue, Cobalt)
  tokens: {
    colors: {
      background: "#0B1523",
      surface: "#132238",
      surfaceRaised: "#1B304A",
      surfaceHighlight: "#36526F",
      border: "rgba(140, 165, 189, 0.20)",
      borderSubtle: "rgba(140, 165, 189, 0.08)",
      borderActive: "rgba(140, 165, 189, 0.45)",
      textPrimary: "#F2F6FC",
      textSecondary: "#C4D1E1",
      textMuted: "#A6B8CC",
      accent: "#80A5FF",
      accentHover: "#A0BAFF",
      accentMuted: "rgba(128, 165, 255, 0.14)",
      accentBorder: "rgba(128, 165, 255, 0.35)",
      oceanAccent: "#8CA5BD",
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
