import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ActivityIcon, AnvilIcon, BookIcon, BookOpenIcon, CalculatorIcon, CheckIcon, ChevronRightIcon, ContainerIcon, CopyIcon, FlagIcon, LibraryIcon, MessageCircleIcon, MonitorIcon, PlayIcon, PowerIcon, SettingsIcon, SignalIcon, UsersIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
   
    <nav className="flex flex-col gap-2">
      <Collapsible className="grid gap-2">
        <CollapsibleTrigger className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground">
          <UsersIcon className="h-5 w-5 text-muted-foreground" />
          User Management
          <ChevronRightIcon className="ml-auto h-5 w-5 text-muted-foreground" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="grid gap-2 pl-6">
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              <UsersIcon className="h-5 w-5 text-muted-foreground" />
              Users
            </Link>
            <Link
              href="/users"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              <ActivityIcon className="h-5 w-5 text-muted-foreground" />
              User Activity
            </Link>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible className="grid gap-2">
        <CollapsibleTrigger className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground">
          <BookOpenIcon className="h-5 w-5 text-muted-foreground" />
          Course Management
          <ChevronRightIcon className="ml-auto h-5 w-5 text-muted-foreground" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="grid gap-2 pl-6">
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              <BookOpenIcon className="h-5 w-5 text-muted-foreground" />
              Courses
            </Link>
            <Link
              href="/courses"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              <BookIcon className="h-5 w-5 text-muted-foreground" />
              Course Modules
            </Link>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible className="grid gap-2">
        <CollapsibleTrigger className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground">
          <ActivityIcon className="h-5 w-5 text-muted-foreground" />
          Assignments and Assessments
          <ChevronRightIcon className="ml-auto h-5 w-5 text-muted-foreground" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="grid gap-2 pl-6">
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              <ActivityIcon className="h-5 w-5 text-muted-foreground" />
              Assignments
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              <CheckIcon className="h-5 w-5 text-muted-foreground" />
              Assessments
            </Link>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible className="grid gap-2">
        <CollapsibleTrigger className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground">
          <SignalIcon className="h-5 w-5 text-muted-foreground" />
          Communication Tools
          <ChevronRightIcon className="ml-auto h-5 w-5 text-muted-foreground" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="grid gap-2 pl-6">
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              <AnvilIcon className="h-5 w-5 text-muted-foreground" />
              Announcements
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              <MessageCircleIcon className="h-5 w-5 text-muted-foreground" />
              Messages
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              <FlagIcon className="h-5 w-5 text-muted-foreground" />
              Discussion Forums
            </Link>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible className="grid gap-2">
        <CollapsibleTrigger className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground">
          <PlayIcon className="h-5 w-5 text-muted-foreground" />
          Analytics and Reporting
          <ChevronRightIcon className="ml-auto h-5 w-5 text-muted-foreground" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="grid gap-2 pl-6">
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              <PlayIcon className="h-5 w-5 text-muted-foreground" />
              Student Performance
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              <CalculatorIcon className="h-5 w-5 text-muted-foreground" />
              Course Analytics
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              <MonitorIcon className="h-5 w-5 text-muted-foreground" />
              System Usage
            </Link>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible className="grid gap-2">
        <CollapsibleTrigger className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground">
          <LibraryIcon className="h-5 w-5 text-muted-foreground" />
          Content Management
          <ChevronRightIcon className="ml-auto h-5 w-5 text-muted-foreground" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="grid gap-2 pl-6">
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              <LibraryIcon className="h-5 w-5 text-muted-foreground" />
              Media Library
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              <CopyIcon className="h-5 w-5 text-muted-foreground" />
              Content Creation
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              <ContainerIcon className="h-5 w-5 text-muted-foreground" />
              Content Organization
            </Link>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible className="grid gap-2">
        <CollapsibleTrigger className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground">
          <SettingsIcon className="h-5 w-5 text-muted-foreground" />
          System Settings
          <ChevronRightIcon className="ml-auto h-5 w-5 text-muted-foreground" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="grid gap-2 pl-6">
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              <SettingsIcon className="h-5 w-5 text-muted-foreground" />
              General Settings
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              <PowerIcon className="h-5 w-5 text-muted-foreground" />
              User Roles and Permissions
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              <SettingsIcon className="h-5 w-5 text-muted-foreground" />
              Integration Settings
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              <SettingsIcon className="h-5 w-5 text-muted-foreground" />
              Security Settings
            </Link>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </nav>
    </aside>
  )
}

export default Sidebar
