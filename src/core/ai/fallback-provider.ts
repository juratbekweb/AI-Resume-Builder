import type { IAIProvider, AIProviderMessage } from "./ai-provider";
import type { GeneratedResume } from "./resume-generation-schema";

/**
 * Server-side deterministic fallback provider.
 * Used when GEMINI_API_KEY is not configured.
 * Produces valid GeneratedResume data from keyword analysis of the input.
 * No network calls, no timeouts.
 */
export class FallbackProvider implements IAIProvider {
  readonly name = "fallback";

  async complete(prompt: string, _options?: Record<string, unknown>): Promise<string> {
    // Extract the rawInput section from the prompt (after the last "Raw career notes:\n" marker)
    const markerIndex = prompt.lastIndexOf("Raw career notes:\n");
    const rawInput =
      markerIndex !== -1
        ? prompt.slice(markerIndex + "Raw career notes:\n".length).trim()
        : prompt.trim();

    const result = generateFromKeywords(rawInput);
    return JSON.stringify(result);
  }

  async stream(
    prompt: string,
    onChunk: (chunk: string) => void,
    _options?: Record<string, unknown>
  ): Promise<void> {
    const result = await this.complete(prompt);
    onChunk(result);
  }

  async chat(
    messages: AIProviderMessage[],
    _options?: Record<string, unknown>
  ): Promise<string> {
    const last = messages[messages.length - 1];
    return this.complete(last?.content ?? "");
  }
}

// ---------------------------------------------------------------------------
// Keyword-based structured generation
// ---------------------------------------------------------------------------

function generateFromKeywords(input: string): GeneratedResume {
  const lower = input.toLowerCase();

  // Detect job title
  const jobTitle = detectJobTitle(lower, input);

  // Detect years of experience
  const yearsMatch = lower.match(/(\d+)\+?\s*years?/);
  const years = yearsMatch ? parseInt(yearsMatch[1], 10) : null;

  // Detect skills
  const skills = detectSkills(lower);

  // Detect company
  const companyMatch = input.match(/(?:at|for|with|@)\s+([A-Z][A-Za-z0-9\s&.,-]{1,40})/);
  const company = companyMatch ? companyMatch[1].trim() : undefined;

  // Build summary
  const yearsDesc = years ? `${years}+ years of experience` : "extensive experience";
  const summary = `Accomplished ${jobTitle} with ${yearsDesc} delivering high-impact results in fast-paced environments. Proven ability to lead cross-functional initiatives, drive measurable outcomes, and collaborate with stakeholders at all levels. Committed to continuous improvement and professional excellence.`;

  // Build bullets from input sentences
  const bullets = buildBullets(input, jobTitle);

  return {
    summary,
    experience: [
      {
        jobTitle,
        company,
        bullets,
      },
    ],
    skills: skills.length >= 3 ? skills : [...skills, "Project Management", "Team Leadership", "Communication"],
  };
}

const JOB_TITLE_MAP: Array<[RegExp, string]> = [
  [/front[\s-]?end|react|vue|angular|next\.?js/i, "Frontend Developer"],
  [/back[\s-]?end|node\.?js|express|django|rails|spring/i, "Backend Developer"],
  [/full[\s-]?stack/i, "Full Stack Developer"],
  [/product\s*designer|ux|ui\s*\/\s*ux|figma|sketch/i, "Product Designer"],
  [/product\s*manager|product\s*management|roadmap/i, "Product Manager"],
  [/data\s*scientist|machine\s*learning|ml\s*engineer/i, "Data Scientist"],
  [/data\s*anal/i, "Data Analyst"],
  [/devops|kubernetes|terraform|ci[\s\/]?cd|docker/i, "DevOps Engineer"],
  [/market/i, "Marketing Manager"],
  [/content\s*writ|copywrite/i, "Content Writer"],
  [/project\s*manag/i, "Project Manager"],
  [/software\s*engineer|software\s*developer/i, "Software Engineer"],
  [/mobile|ios|android|flutter|react\s*native/i, "Mobile Developer"],
  [/security|cybersec|penetration/i, "Security Engineer"],
  [/qa|quality\s*assurance|testing|tester/i, "QA Engineer"],
];

function detectJobTitle(lower: string, original: string): string {
  for (const [pattern, title] of JOB_TITLE_MAP) {
    if (pattern.test(lower)) return title;
  }
  // Try to extract a capitalized role phrase from the original text
  const roleMatch = original.match(
    /(?:as\s+(?:a\s+|an\s+)?)([\w\s]+?)(?:\s+for|\s+at|\s*[.,])/i
  );
  if (roleMatch) return toTitleCase(roleMatch[1].trim());
  return "Professional";
}

const SKILL_KEYWORDS: Array<[RegExp, string]> = [
  [/\breact\b/, "React"],
  [/\bvue\b/, "Vue.js"],
  [/\bangular\b/, "Angular"],
  [/\btypescript\b/, "TypeScript"],
  [/\bjavascript\b|\bjs\b/, "JavaScript"],
  [/\bnode\.?js\b/, "Node.js"],
  [/\bpython\b/, "Python"],
  [/\bjava\b/, "Java"],
  [/\bgo\b|\bgolang\b/, "Go"],
  [/\brust\b/, "Rust"],
  [/\bdocker\b/, "Docker"],
  [/\bkubernetes\b|\bk8s\b/, "Kubernetes"],
  [/\bsql\b/, "SQL"],
  [/\bpostgresql\b|\bpostgres\b/, "PostgreSQL"],
  [/\bmongodb\b/, "MongoDB"],
  [/\brest\s*(api|ful)?\b/, "REST APIs"],
  [/\bgraphql\b/, "GraphQL"],
  [/\baws\b/, "AWS"],
  [/\bgcp\b|google\s*cloud/, "Google Cloud"],
  [/\bazure\b/, "Azure"],
  [/\bfigma\b/, "Figma"],
  [/\bphotoshop\b/, "Photoshop"],
  [/\bagile\b/, "Agile"],
  [/\bscrum\b/, "Scrum"],
  [/\bgit\b/, "Git"],
  [/\bci[\s\/]cd\b/, "CI/CD"],
  [/\btailwind\b/, "Tailwind CSS"],
  [/\bnext\.?js\b/, "Next.js"],
  [/\bflutter\b/, "Flutter"],
  [/\bswift\b/, "Swift"],
  [/\bkotlin\b/, "Kotlin"],
  [/\btensorflow\b/, "TensorFlow"],
  [/\bpytorch\b/, "PyTorch"],
  [/\bpandas\b/, "Pandas"],
  [/\bexcel\b/, "Excel"],
  [/\bsalesforce\b/, "Salesforce"],
  [/\bjira\b/, "Jira"],
  [/\blinux\b/, "Linux"],
];

function detectSkills(lower: string): string[] {
  const found: string[] = [];
  for (const [pattern, skill] of SKILL_KEYWORDS) {
    if (pattern.test(lower) && !found.includes(skill)) {
      found.push(skill);
    }
  }
  return found.slice(0, 12);
}

function buildBullets(input: string, jobTitle: string): string[] {
  const sentences = input
    .split(/[.!?;]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 15);

  if (sentences.length === 0) {
    return [
      `Led key ${jobTitle} initiatives delivering measurable business impact`,
      `Collaborated with cross-functional teams to drive project success`,
      `Implemented best practices resulting in improved team efficiency`,
    ];
  }

  return sentences.slice(0, 4).map((s) => {
    // Capitalise and ensure it reads like a strong bullet
    const clean = s.charAt(0).toUpperCase() + s.slice(1);
    // If it starts with "I " remove it
    return clean.replace(/^I\s+/, "");
  });
}

function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}
