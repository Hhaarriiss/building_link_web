'use client';

import { LoginForm } from "@/components/login-form"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LoginPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10 relative">
      {/* Theme Toggle in top right */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6">
        <div className="bg-card border border-border rounded-lg p-2 shadow-sm">
          <ThemeToggle />
        </div>
      </div>
      
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  )
}
