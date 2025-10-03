import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import * as React from "react"

interface HoverCardProps extends React.HTMLAttributes<HTMLDivElement> {
  shadowColor?: string;
  shadowColorDark?: string;
  children: React.ReactNode;
}

export function HoverCard({ 
  shadowColor = "rgb(185,28,28,0.3)", // default red shadow lihght mode
  shadowColorDark = "rgb(147,197,253,0.4)", // default lighter blue shadow for dark mode
  className,
  children,
  ...props 
}: HoverCardProps) {
  const [isDark, setIsDark] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return false
    const root = document.documentElement
    // Check for 'dark' class explicitly, if 'light' class exists then it's light mode
    if (root.classList.contains("light")) return false
    if (root.classList.contains("dark")) return true
    // Fallback to system preference
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches
  })

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const updateTheme = () => {
      const root = document.documentElement
      // Check for explicit light/dark classes first
      if (root.classList.contains("light")) {
        setIsDark(false)
      } else if (root.classList.contains("dark")) {
        setIsDark(true)
      } else {
        // Fallback to system preference
        setIsDark(window.matchMedia?.("(prefers-color-scheme: dark)").matches)
      }
    }

    // Listen for theme changes via media query
    const mediaQuery = window.matchMedia?.("(prefers-color-scheme: dark)")
    mediaQuery?.addEventListener?.("change", updateTheme)

    // Listen for class changes on <html> (for manual theme toggles)
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ["class"] 
    })

    return () => {
      mediaQuery?.removeEventListener?.("change", updateTheme)
      observer.disconnect()
    }
  }, [])

  const activeShadow = isDark ? shadowColorDark : shadowColor

  return (
    <Card 
      className={cn(
        "transition-all duration-300 hover:-translate-y-1",
        className
      )}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 8px 30px ${activeShadow}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '';
      }}
      {...props}
    >
      {children}
    </Card>
  )
}
