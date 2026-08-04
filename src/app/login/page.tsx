"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { FileText } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (data: {
    email: string;
    password: string;
    rememberMe?: boolean;
  }) => {
    try {
      // Fake login to bypass NextAuth/Prisma dependency in demo mode
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userStr = localStorage.getItem('gopay_user');
      // Always allow login for demo purposes
      if (!userStr) {
        localStorage.setItem('gopay_user', JSON.stringify({
          name: data.email.split('@')[0],
          email: data.email,
          phone: "+998901234567"
        }));
      }

      router.push("/");
      router.refresh();
      return {};
    } catch (error) {
      setError("Something went wrong. Please try again.");
      return { error: "Something went wrong. Please try again." };
    }
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  const handleOAuthProviderClick = (provider: string) => {
    // Fake OAuth login for demo
    localStorage.setItem('gopay_user', JSON.stringify({ 
      name: `${provider} User`, 
      email: `user@${provider.toLowerCase()}.com`, 
      phone: "+998901234567" 
    }));
    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-12 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900/0 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/0 to-transparent" />
      
      {/* Animated background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="premium-card rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/50">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-slate-400">Sign in to continue to your dashboard</p>
          </div>
          <LoginForm
            onLogin={handleLogin}
            onForgotPassword={handleForgotPassword}
            onOAuthProviderClick={handleOAuthProviderClick}
          />
        </div>
      </motion.div>
    </div>
  );
}
