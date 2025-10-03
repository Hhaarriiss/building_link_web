'use client';

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartAreaLegend } from "@/components/chart-line-legend"
import { HoverCard } from "@/components/hover-card-shadow"

export const iframeHeight = "800px"

export const description = "A sidebar with a header and a search form."

export default function Page() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");

  // Dummy chart data with multiple series
  const chartData = [
    { month: "January", desktop: 186, mobile: 80, tablet: 90, other: 45 },
    { month: "February", desktop: 305, mobile: 200, tablet: 150, other: 75 },
    { month: "March", desktop: 237, mobile: 120, tablet: 110, other: 55 },
    { month: "April", desktop: 73, mobile: 190, tablet: 140, other: 88 },
    { month: "May", desktop: 209, mobile: 130, tablet: 100, other: 60 },
    { month: "June", desktop: 214, mobile: 140, tablet: 125, other: 70 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "var(--chart-1)",
    },
    mobile: {
      label: "Mobile",
      color: "var(--chart-2)",
    },
    tablet: {
      label: "Tablet",
      color: "var(--chart-3)",
    },
    other: {
      label: "Other",
      color: "var(--chart-4)",
    },
  };

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const role = localStorage.getItem("userRole");
    const email = localStorage.getItem("userEmail");

    if (!isAuthenticated || role !== "admin") {
      router.push("/login");
      return;
    }

    setUserEmail(email || "");
    setUserRole(role || "");
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    router.push("/login");
  };

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4">

              <div className="grid auto-rows-min gap-4 md:grid-cols-3 min-h-[40vh] items-stretch">
                <HoverCard 
                  shadowColor="rgb(59,130,246,0.3)" 
                  shadowColorDark="rgb(147,197,253,0.4)"
                >
                  <CardHeader>
                    <CardTitle>Visitor Statistics</CardTitle>
                    <CardDescription>Last 6 months overview</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartAreaLegend data={chartData} config={chartConfig} />
                  </CardContent>
                </HoverCard>
                <HoverCard 
                  shadowColor="rgb(168,85,247,0.3)" 
                  shadowColorDark="rgb(196,181,253,0.4)"
                >
                  <CardHeader>
                    <CardTitle>Card 2</CardTitle>
                    <CardDescription>Card description</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Card content goes here</p>
                  </CardContent>
                </HoverCard>
                <HoverCard 
                  shadowColor="rgb(236,72,153,0.3)" 
                  shadowColorDark="rgb(249,168,212,0.4)"
                >
                  <CardHeader>
                    <CardTitle>Card 3</CardTitle>
                    <CardDescription>Card description</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Card content goes here</p>
                  </CardContent>
                </HoverCard>
              </div>
              <div className="flex-1 grid gap-4 md:grid-cols-2 items-stretch ">
                <HoverCard className="flex flex-col">
                  <CardHeader>
                    <CardTitle>Main Content</CardTitle>
                    <CardDescription>Your main content area</CardDescription>
                  </CardHeader>
                <CardContent className="flex-1">
                  <p>Add your content here</p>
                </CardContent>
              </HoverCard>

              <HoverCard className="flex flex-col">
                  <CardHeader>
                    <CardTitle>Main Content</CardTitle>
                    <CardDescription>Your main content area</CardDescription>
                  </CardHeader>
                <CardContent className="flex-1">
                  <p>Add your content here</p>
                </CardContent>
              </HoverCard>
              </div>
             
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
