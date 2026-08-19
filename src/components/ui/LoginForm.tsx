"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, KeyRound, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useDemoSession } from "@/context/DemoSessionContext";

export function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const { loginDemo } = useDemoSession();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setStatus("error");
      setErrorMsg("Please fill in all fields.");
      return;
    }
    
    setStatus("loading");
    
    // Simulate network request
    setTimeout(() => {
      if (email === "error@example.com") {
        setStatus("error");
        setErrorMsg("Invalid credentials. Please try again.");
      } else {
        setStatus("success");
        loginDemo(email);
        setTimeout(() => {
          onSuccess?.();
        }, 1200);
      }
    }, 1500);
  };

  if (status === "success") {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-8 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-highlight/10 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8 text-highlight" />
        </div>
        <h3 className="text-2xl font-display text-foreground mb-2">Welcome Back</h3>
        <p className="text-muted-foreground">Redirecting to your ritual dashboard...</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="login-email" className="text-xs uppercase tracking-wider text-muted-foreground font-medium ml-1">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/70" />
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder="you@example.com"
            className="w-full h-12 bg-secondary/50 border border-white/10 rounded-xl pl-10 pr-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-highlight/50 focus:border-highlight/50 transition-all"
            disabled={status === "loading"}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between ml-1">
          <label htmlFor="login-password" className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
            Password
          </label>
          <a href="#" className="text-xs text-highlight hover:underline">Forgot?</a>
        </div>
        <div className="relative">
          <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/70" />
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder="••••••••"
            className="w-full h-12 bg-secondary/50 border border-white/10 rounded-xl pl-10 pr-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-highlight/50 focus:border-highlight/50 transition-all"
            disabled={status === "loading"}
          />
        </div>
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-3 text-center"
          >
            {errorMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <Button 
        type="submit" 
        className="w-full h-12 mt-2 bg-highlight hover:bg-highlight/90 text-primary font-medium flex items-center justify-center gap-2 group"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Authenticating...
          </>
        ) : (
          <>
            Enter Dashboard
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground mt-4">
        Don&apos;t have an account? <a href="#join" className="text-highlight hover:underline">Join the Circle</a>
      </p>
    </form>
  );
}
