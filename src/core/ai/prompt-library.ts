export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  template: string; // Use {{variable}} syntax for replacements
  requiredVariables: string[];
}

export class PromptLibrary {
  private static templates: Record<string, PromptTemplate> = {
    "generate-resume": {
      id: "generate-resume",
      name: "Generate Resume",
      description: "Generates structured resume content from raw career notes.",
      template: `You are a professional resume writer. Transform the following raw career notes into polished resume content.

Return ONLY a valid JSON object. Do NOT include markdown code fences, explanations, or any text outside the JSON.

The JSON must exactly match this structure:
{
  "summary": "A 2-3 sentence professional summary (string, 50-300 words)",
  "experience": [
    {
      "jobTitle": "Job title (string)",
      "company": "Company name if mentioned (string, optional)",
      "period": "Time period if mentioned (string, optional)",
      "bullets": ["Achievement bullet 1", "Achievement bullet 2", "Achievement bullet 3"]
    }
  ],
  "skills": ["Skill 1", "Skill 2", "Skill 3"]
}

Rules:
- experience array: 0-5 entries, each with 2-5 bullet points using strong action verbs and quantifiable results
- skills array: 3-15 concise technical or professional skills mentioned or implied by the input
- summary: professional tone, no first-person pronouns, highlight seniority and impact
- If the input is vague, make reasonable professional inferences
- Never add fictional companies or dates not implied by the input

Raw career notes:
{{rawInput}}`,
      requiredVariables: ["rawInput"],
    },
    "rewrite-section": {
      id: "rewrite-section",
      name: "Rewrite Section",
      description: "Rewrites a document section for better professional tone.",
      template: "Rewrite the following professional {{sectionType}} to be more impactful, using action verbs and quantifiable results where possible:\n\n{{content}}",
      requiredVariables: ["sectionType", "content"],
    },
    "grammar-check": {
      id: "grammar-check",
      name: "Grammar Check",
      description: "Checks and fixes grammar and spelling errors.",
      template: "Fix any grammar, spelling, and phrasing errors in the following text. Preserve the original meaning and professional tone:\n\n{{content}}",
      requiredVariables: ["content"],
    },
    "ats-optimize": {
      id: "ats-optimize",
      name: "ATS Optimize",
      description: "Optimizes resume content for a specific job description.",
      template: "Optimize the following resume content for the provided job description. Naturally integrate keywords and highlight relevant experience.\n\nJob Description:\n{{jobDescription}}\n\nResume Content:\n{{content}}",
      requiredVariables: ["jobDescription", "content"],
    }
  };

  static getPrompt(templateId: string, variables: Record<string, string>): string {
    const templateDef = this.templates[templateId];
    if (!templateDef) {
      throw new Error(`Prompt template '${templateId}' not found.`);
    }

    let prompt = templateDef.template;
    for (const variable of templateDef.requiredVariables) {
      if (!(variable in variables)) {
        throw new Error(`Missing required variable '${variable}' for prompt template '${templateId}'.`);
      }
      prompt = prompt.replace(new RegExp(`{{${variable}}}`, 'g'), variables[variable]);
    }

    return prompt;
  }
}
