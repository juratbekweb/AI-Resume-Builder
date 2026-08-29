"use client";

import React, { useState } from "react";
import { Check, X, CreditCard, Sparkles, Zap, Building2, ChevronRight, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "FREE",
      price: "0",
      period: "",
      billingDetails: "Umrbod bepul",
      description: "Asosiy imkoniyatlar bilan tanishish uchun.",
      features: [
        { name: "1-2 ta standart resume shablonlari", included: true },
        { name: "Kuniga 3 marta AI orqali generatsiya", included: true },
        { name: "Asosiy PDF eksport asboblari", included: true },
        { name: "AI CV Analyzer", included: false },
        { name: "Cover Letter (Motivatsion xat) generatori", included: false },
        { name: "IELTS Mock testlar va AI Feedback", included: false },
      ],
      cta: "Boshlash",
      ctaHref: "/register",
      popular: false,
    },
    {
      name: "PRO",
      price: isYearly ? "39,000" : "59,000",
      period: "/oyiga",
      billingDetails: isYearly ? "Yiliga 468,000 so'm to'lanadi" : "Har oy to'lanadi",
      description: "Ish izlovchilar va talabalar uchun maxsus.",
      features: [
        { name: "Cheksiz ATS premium shablonlar", included: true },
        { name: "Kuniga cheksiz AI orqali generatsiya", included: true },
        { name: "Kengaytirilgan PDF asboblari", included: true },
        { name: "AI CV Analyzer (Resume tahlili)", included: true },
        { name: "To'liq Cover Letter generatori", included: true },
        { name: "IELTS Mock testlar va AI Feedback", included: false },
      ],
      cta: "Pro'ga o'tish",
      ctaHref: "/checkout?plan=pro",
      popular: true,
    },
    {
      name: "PREMIUM",
      price: isYearly ? "45,000" : "79,000",
      period: "/oyiga",
      billingDetails: isYearly ? "Yiliga 540,000 so'm to'lanadi" : "Har oy to'lanadi",
      description: "To'liq professional xizmatlar to'plami.",
      features: [
        { name: "Barcha PRO imkoniyatlar", included: true },
        { name: "To'liq IELTS Mock + AI Score & Feedback", included: true },
        { name: "OCR (Rasmdan matn ajratib olish)", included: true },
        { name: "Ustuvor texnik qo'llab-quvvatlash", included: true },
        { name: "Umuman reklamasiz toza interfeys", included: true },
        { name: "Erta yangilanishlarga kirish", included: true },
      ],
      cta: "Premium olish",
      ctaHref: "/checkout?plan=premium",
      popular: false,
    }
  ];

  return (
    <div className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute top-1/3 -left-40 w-[400px] h-[400px] bg-accent/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Oddiy va shaffof <span className="text-primary">tariflar</span>
          </h1>
          <p className="text-lg text-foreground-secondary mb-8">
            Faoliyatingizga mos keladigan tarifni tanlang. Yashirin to'lovlar yo'q. Istalgan vaqtda bekor qilishingiz mumkin.
          </p>

          {/* Toggle Switch */}
          <div className="flex items-center justify-center gap-3">
            <span className={cn("text-sm font-medium transition-colors", !isYearly ? "text-foreground" : "text-foreground-secondary")}>Oylik</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-7 w-14 items-center rounded-full bg-surface-elevated border border-border transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            >
              <span className={cn("inline-block h-5 w-5 transform rounded-full bg-primary transition-transform", isYearly ? "translate-x-8" : "translate-x-1")} />
            </button>
            <div className="flex items-center gap-2">
              <span className={cn("text-sm font-medium transition-colors", isYearly ? "text-foreground" : "text-foreground-secondary")}>Yillik</span>
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-400 border border-emerald-500/20">
                Save 30%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={cn(
                "relative rounded-3xl p-8 flex flex-col h-full transition-all duration-300",
                plan.popular
                  ? "bg-surface-elevated border-2 border-primary shadow-[0_0_40px_-15px_rgba(56,189,248,0.3)] hover:shadow-[0_0_50px_-15px_rgba(56,189,248,0.4)] scale-105 z-10"
                  : "bg-surface border border-border hover:border-border-hover hover:-translate-y-1"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-lg flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-sm text-foreground-secondary min-h-[40px]">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                  {plan.price !== "0" && <span className="text-lg text-foreground-secondary">so'm</span>}
                  {plan.period && <span className="text-lg text-foreground-secondary">{plan.period}</span>}
                </div>
                {plan.billingDetails && (
                  <p className="text-sm font-medium text-primary/80 mt-2">
                    {plan.billingDetails}
                  </p>
                )}
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    {feature.included ? (
                      <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                    ) : (
                      <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-surface-elevated flex items-center justify-center border border-border">
                        <X className="h-3 w-3 text-foreground-muted" />
                      </div>
                    )}
                    <span className={cn("text-sm leading-tight", feature.included ? "text-foreground" : "text-foreground-muted")}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.ctaHref}
                className={cn(
                  "w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center transition-all duration-300",
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] shadow-lg shadow-primary/25"
                    : "bg-surface-elevated text-foreground border border-border hover:bg-border/50 hover:text-foreground"
                )}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Payment Systems Placeholder */}
        <div className="mt-20 pt-10 border-t border-border">
          <p className="text-center text-sm font-medium text-foreground-secondary mb-6">
            Quyidagi to'lov tizimlari orqali ishonchli va xavfsiz to'lang
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Click Placeholder */}
            <div className="flex items-center gap-2 font-bold text-xl text-foreground">
              <div className="w-8 h-8 rounded bg-blue-500 flex items-center justify-center text-white">C</div>
              Click
            </div>
            {/* Payme Placeholder */}
            <div className="flex items-center gap-2 font-bold text-xl text-foreground">
              <div className="w-8 h-8 rounded bg-teal-500 flex items-center justify-center text-white">P</div>
              Payme
            </div>
            {/* Uzum Bank Placeholder */}
            <div className="flex items-center gap-2 font-bold text-xl text-foreground">
              <div className="w-8 h-8 rounded bg-purple-600 flex items-center justify-center text-white">U</div>
              Uzum Bank
            </div>
            {/* Stripe Placeholder */}
            <div className="flex items-center gap-2 font-bold text-xl text-foreground">
              <div className="w-8 h-8 rounded bg-indigo-500 flex items-center justify-center text-white">S</div>
              Stripe
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
