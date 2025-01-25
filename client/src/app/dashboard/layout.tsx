"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CartesianGrid, XAxis, Line, LineChart, Bar, BarChart } from "recharts";
import {
  ChartTooltipContent,
  ChartTooltip,
  ChartContainer,
} from "@/components/ui/chart";

import React from "react";
import Sidebar from "./sidebar";
import { BookIcon, UsersIcon, BookOpenIcon, CalendarIcon, FileTextIcon, SettingsIcon, LuggageIcon, ClipboardIcon, SignalIcon, WalletIcon, LogOutIcon } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full">
   <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div className="mb-6 flex items-center gap-2">
          <BookIcon className="h-6 w-6 text-primary" />
          <h1 className="text-xl  font-bold">StudySync</h1>
        </div>
        <nav className="flex flex-col gap-2">
          <Link
            href="/dashboard/students"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <UsersIcon className="h-5 w-5 text-muted-foreground" />
            Students
          </Link>
          <Link
            href="/dashboard/courses/"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <BookOpenIcon className="h-5 w-5 text-muted-foreground" />
            Courses
          </Link>
          <Link
            href="/dashboards/enrollments"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <CalendarIcon className="h-5 w-5 text-muted-foreground" />
            Enrollments
          </Link>
          <Link
            href="/dashboards/reports"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <FileTextIcon className="h-5 w-5 text-muted-foreground" />
            Reports
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <SettingsIcon className="h-5 w-5 text-muted-foreground" />
            Settings
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <LuggageIcon className="h-5 w-5 text-muted-foreground" />
            Curriculum
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <ClipboardIcon className="h-5 w-5 text-muted-foreground" />
            Assessments
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <SignalIcon className="h-5 w-5 text-muted-foreground" />
            Notifications
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <WalletIcon className="h-5 w-5 text-muted-foreground" />
            Payments
          </Link>
          <div className="mt-auto">
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              <LogOutIcon className="h-5 w-5 text-muted-foreground" />
              Logout
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              <SettingsIcon className="h-5 w-5 text-muted-foreground" />
              Account Settings
            </Link>
          </div>
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        {children}
      </div>
    </div>
  )
};

export default Layout;
