'use client';

import { Dashboard } from "@/components/MainDashboard"
import { TooltipProvider } from "@radix-ui/react-tooltip";

export default function Home() {
  return (
    <TooltipProvider>
      <Dashboard></Dashboard>
    </TooltipProvider>
  );
}
