import Image from "next/image";

type Feature = {
  title: string;
  description: string;
};

type Template = {
  name: string;
  description: string;
  accent: string;
};

const features: Feature[] = [
  {
    title: "AI-guided writing",
    description: "Turn rough notes into sharp, tailored bullet points with confidence.",
  },
  {
    title: "ATS-ready formatting",
    description: "Stay structured, scannable, and aligned with applicant tracking systems.",
  },
  {
    title: "One-click exports",
    description: "Export polished resumes in PDF or DOCX without losing your layout.",
  },
];

const templates: Template[] = [
  {
    name: "Modern Executive",
    description: "Clean hierarchy for leadership and management roles.",
    accent: "from-cyan-500/20 to-sky-500/20",
  },
  {
    name: "Product Designer",
    description: "Built for product portfolios and creative teams.",
    accent: "from-fuchsia-500/20 to-violet-500/20",
  },
  {
    name: "Startup Operator",
    description: "Flexible, fast-moving layouts for growth-stage companies.",
    accent: "from-emerald-500/20 to-teal-500/20",
  },
];

const faqs = [
  {
    question: "Is GoPay suitable for first-time resume writers?",
    answer: "Yes. The guided builder makes it easy to create your first resume without needing design or writing experience.",
  },
  {
    question: "Can I tailor the same resume for different roles?",
    answer: "Absolutely. You can duplicate and adjust sections for each application or save multiple versions in one workspace.",
  },
  {
    question: "Do you support export to PDF and Word?",
    answer: "Yes. Your resume can be exported to PDF or DOCX for sharing with recruiters and hiring teams.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "GoPay",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "GoPay is an AI-powered resume builder that helps professionals create ATS-ready resumes with guided support and polished templates.",
  url: "https://gopay.example.com",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-slate-950">
        Skip to content
      </a>
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
          <div className="text-lg font-semibold tracking-tight">GoPay</div>
          <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
            <a className="transition hover:text-white" href="#features">
              Features
            </a>
            <a className="transition hover:text-white" href="#templates">
              Templates
            </a>
            <a className="transition hover:text-white" href="#pricing">
              Pricing
            </a>
            <a className="transition hover:text-white" href="#faq">
              FAQ
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:py-28">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-200">
              AI-powered resume builder for ambitious professionals
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Build a standout resume with clarity, speed, and confidence.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              GoPay combines AI guidance, ATS-ready formatting, and polished templates so your next application feels effortless.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#pricing" className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">
                Start building for free
              </a>
              <a href="#demo" className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                See the builder in action
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-400">
              <span>Used by 12k+ job seekers</span>
              <span>4.9/5 average satisfaction</span>
              <span>Trusted by product, design, and growth teams</span>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl">
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
              <p className="text-sm font-semibold text-cyan-200">Resume preview</p>
              <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 p-3">
                <Image
                  src="/hero-illustration.svg"
                  alt="Illustration of a polished resume builder interface"
                  width={640}
                  height={420}
                  priority
                  className="h-auto w-full rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/5 px-6 py-8 sm:px-8 lg:px-12" aria-label="Social proof">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 text-sm text-slate-300 sm:gap-8">
            <span className="rounded-full border border-white/10 px-3 py-2">Featured in Tech Careers</span>
            <span className="rounded-full border border-white/10 px-3 py-2">Trusted by remote teams</span>
            <span className="rounded-full border border-white/10 px-3 py-2">Loved by career coaches</span>
            <span className="rounded-full border border-white/10 px-3 py-2">Rated 4.9/5</span>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Key features</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Everything you need to ship a better resume faster.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="demo" className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
          <div className="grid gap-8 rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-slate-950 p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-12">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Resume builder demo</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                See how your story becomes a polished, recruiter-ready document.
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                Structured sections, smart recommendations, and instant previews make the process simple and professional.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">Professional summary</p>
                  <p className="mt-2 text-sm text-slate-400">Highlighted with AI suggestions and measurable impact.</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">Experience builder</p>
                  <p className="mt-2 text-sm text-slate-400">Craft bullet points that feel tailored and credible.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">AI features</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">Turn ideas into tailored content that sounds like you.</h3>
              <p className="mt-4 text-base leading-8 text-slate-400">
                Generate stronger summaries, sharpen bullet points, and adapt your resume for specific roles with confidence.
              </p>
            </article>
            <article className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">ATS optimization</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">Make every section recruiter-friendly and machine-readable.</h3>
              <p className="mt-4 text-base leading-8 text-slate-400">
                Keep your formatting intuitive while improving your chances of passing screening systems and human review.
              </p>
            </article>
          </div>
        </section>

        <section id="templates" className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Templates</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Choose a layout that fits your story and your target role.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {templates.map((template) => (
              <article key={template.name} className={`rounded-2xl border border-white/10 bg-gradient-to-br ${template.accent} p-[1px]`}>
                <div className="rounded-[15px] bg-slate-950/90 p-6">
                  <h3 className="text-lg font-semibold text-white">{template.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{template.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 lg:p-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Pricing preview</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Start free and upgrade when you are ready for more control.
                </h2>
              </div>
              <a href="#cta" className="rounded-full border border-cyan-400/40 px-6 py-3 font-semibold text-cyan-200 transition hover:bg-cyan-400/10">
                View plans
              </a>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold text-white">Free</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">Build and export one polished resume to get started.</p>
              </div>
              <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 p-6">
                <h3 className="text-xl font-semibold text-cyan-100">Pro</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">Unlock more templates, versioning, and advanced AI assistance.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 lg:p-12">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Testimonials</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                People trust GoPay when they need clarity under pressure.
              </h2>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <blockquote className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-300">
                “The guidance made it easy to translate my experience into a strong, modern resume.”
              </blockquote>
              <blockquote className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-300">
                “I switched from a generic template and felt immediately more confident in every application.”
              </blockquote>
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">FAQ</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Answers to the questions we hear most.
            </h2>
          </div>
          <div className="mt-10 grid gap-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
                <summary className="cursor-pointer font-semibold text-white">{faq.question}</summary>
                <p className="mt-3 text-sm leading-7 text-slate-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="cta" className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
          <div className="rounded-3xl border border-cyan-400/30 bg-cyan-400/10 p-8 text-center lg:p-12">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Ready to build a resume that works as hard as you do?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              Start with a free build, refine with AI, and export a polished resume that feels ready for the next opportunity.
            </p>
            <a href="#" className="mt-8 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-100">
              Get started today
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/80 px-6 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© 2026 GoPay. Build your next chapter.</p>
          <div className="flex gap-4">
            <a href="#features" className="transition hover:text-white">Features</a>
            <a href="#pricing" className="transition hover:text-white">Pricing</a>
            <a href="#faq" className="transition hover:text-white">FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
    
}
