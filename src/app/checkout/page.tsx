'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, ShieldCheck, CheckCircle, ArrowLeft, Loader2, Lock } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/language-provider';

function CheckoutContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const plan = searchParams?.get('plan') === 'premium' ? 'premium' : 'pro';
  
  const isPremium = plan === 'premium';
  const planName = isPremium ? t.premiumPlan : t.proPlan;
  const planPrice = isPremium ? t.pricePremium : t.pricePro;
  const planDesc = isPremium ? t.premiumPlanDesc : t.proPlanDesc;

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setIsError(false);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check for insufficient funds mock condition
    const cleanCard = cardNumber.replace(/\s+/g, '');
    if (cleanCard.endsWith('0000') || cvv === '000') {
      setIsProcessing(false);
      setIsError(true);
      return;
    }
    
    // Update local storage subscription status
    localStorage.setItem('gopay_subscription', plan);
    // Reset usage limits
    localStorage.removeItem('gopay_ai_usage');
    
    setIsProcessing(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full relative z-10 text-center"
        >
          <div className="mx-auto w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20 mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle className="w-12 h-12 text-emerald-400" />
            </motion.div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">{t.paymentSuccess}</h1>
          <p className="text-slate-400 mb-8 leading-relaxed">
            {t.paymentSuccessDesc}
          </p>
          <Link 
            href="/"
            className="inline-flex items-center justify-center w-full px-6 py-4 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-100 transition-colors"
          >
            {t.backToDashboard}
          </Link>
        </motion.div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/20 blur-[100px] rounded-full pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full relative z-10 text-center"
        >
          <div className="mx-auto w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20 mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <div className="w-12 h-12 text-red-400 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"/><path d="M3 16.2V21m0 0h4.8M3 21l6-6"/><path d="M21 7.8V3m0 0h-4.8M21 3l-6 6"/><path d="M3 7.8V3m0 0h4.8M3 3l6 6"/></svg>
              </div>
            </motion.div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">{t.paymentFailed}</h1>
          <p className="text-slate-400 mb-8 leading-relaxed">
            {t.insufficientFunds}
          </p>
          <button 
            onClick={() => setIsError(false)}
            className="inline-flex items-center justify-center w-full px-6 py-4 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-100 transition-colors"
          >
            {t.tryAgain}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500/30">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Header */}
      <header className="px-6 py-4 border-b border-white/5 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center">
          <Link href="/#pricing" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {t.backToHome}
          </Link>
          <div className="ml-auto flex items-center gap-2 text-sm text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            {t.checkoutTitle}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-24">
        <div className="mb-12">
          <h1 className="text-3xl font-bold sm:text-4xl">{t.checkoutTitle}</h1>
          <p className="mt-4 text-slate-400 max-w-2xl">{t.checkoutDesc}</p>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-24">
          {/* Payment Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-cyan-400" />
              {t.paymentMethod}
            </h2>
            
            <form onSubmit={handlePayment} className="space-y-6 bg-slate-900/50 p-6 sm:p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">{t.cardNumber}</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      required
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3.5 pl-12 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    />
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">{t.cardHolder}</label>
                  <input 
                    type="text" 
                    required
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">{t.expiryDate}</label>
                    <input 
                      type="text" 
                      required
                      placeholder="MM/YY"
                      maxLength={5}
                      value={expiry}
                      onChange={(e) => {
                        let val = e.target.value.replace(/[^0-9]/g, '');
                        if (val.length > 2) val = val.substring(0,2) + '/' + val.substring(2,4);
                        setExpiry(val);
                      }}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">{t.cvv}</label>
                    <input 
                      type="text" 
                      required
                      placeholder="123"
                      maxLength={4}
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ''))}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isProcessing}
                className="w-full mt-8 relative group overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 p-px font-semibold text-white transition-all hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.5)] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 rounded-xl">
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t.processing}
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      {t.payNow} — {planPrice}
                    </>
                  )}
                </div>
              </button>
              <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Payments are secure and encrypted
              </p>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className={`relative p-8 rounded-3xl border overflow-hidden ${isPremium ? 'bg-gradient-to-b from-violet-900/20 to-slate-900/50 border-violet-500/30' : 'bg-gradient-to-b from-cyan-900/20 to-slate-900/50 border-cyan-500/30'}`}>
              <div className={`absolute top-0 right-0 w-64 h-64 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none ${isPremium ? 'bg-violet-500/10' : 'bg-cyan-500/10'}`} />
              
              <h2 className="text-xl font-semibold mb-6 relative z-10">{t.orderSummary}</h2>
              
              <div className="relative z-10 pb-6 border-b border-white/10 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg text-slate-300">{planName} {t.goPayFeatures.split(' ')[0]}</span>
                  <span className="text-2xl font-bold text-white">{planPrice}</span>
                </div>
                <p className="text-sm text-slate-400">{planDesc}</p>
              </div>

              <ul className="space-y-4 relative z-10">
                {[
                  t.featAiWritingTitle,
                  t.featAtsTitle,
                  t.featExportTitle,
                  t.featPreviewTitle,
                  t.featTemplatesTitle,
                  t.featVersionsTitle
                ].map((feat, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className={`w-5 h-5 shrink-0 ${isPremium ? 'text-violet-400' : 'text-cyan-400'}`} />
                    <span className="text-slate-300 text-sm">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <CheckoutContent />
    </Suspense>
  );
}
