import { z } from "zod";

export const ResumeExperienceSchema = z.object({
  jobTitle: z.string().min(1).max(120),
  company: z.string().max(120).optional(),
  period: z.string().max(50).optional(),
  bullets: z.array(z.string().min(1).max(300)).min(1).max(6),
});

export const GeneratedResumeSchema = z.object({
  summary: z.string().min(10).max(800),
  experience: z.array(ResumeExperienceSchema).min(0).max(5),
  skills: z.array(z.string().min(1).max(80)).min(1).max(20),
});

export type ResumeExperience = z.infer<typeof ResumeExperienceSchema>;
export type GeneratedResume = z.infer<typeof GeneratedResumeSchema>;

/** The API response data shape — adds the provider field to GeneratedResume */
export const GeneratedResumeResponseSchema = GeneratedResumeSchema.extend({
  provider: z.enum(["gemini", "fallback"]),
});

export type GeneratedResumeResponse = z.infer<typeof GeneratedResumeResponseSchema>;
