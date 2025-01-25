import { UsersIcon, BookOpenIcon, CalendarIcon, FileTextIcon, SettingsIcon, LuggageIcon, ClipboardIcon, SignalIcon, WalletIcon } from "lucide-react";

interface NavLink {
    href: string;
    label: string;
  }

  interface SidebarItem {
    href: string;
    label: string;
    icon: React.ComponentType<{ className: string }>;
  }
  
    // Define the sidebarItems links
  const sidebarItems: SidebarItem[] = [
    { href: "/dashboard/students", label: "Students", icon: UsersIcon },
    { href: "/dashboard/courses/", label: "Courses", icon: BookOpenIcon },
    { href: "/dashboards/enrollments", label: "Enrollments", icon: CalendarIcon },
    { href: "/dashboards/reports", label: "Reports", icon: FileTextIcon },
    { href: "#", label: "Settings", icon: SettingsIcon },
    { href: "#", label: "Curriculum", icon: LuggageIcon },
    { href: "#", label: "Assessments", icon: ClipboardIcon },
    { href: "#", label: "Notifications", icon: SignalIcon },
    { href: "#", label: "Payments", icon: WalletIcon },
  ];
  
    // Define the navigation links
    export const navLinks: NavLink[] = [
        { href: "/", label: "Home" },
        { href: "/courses", label: "Courses" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact Us" },
      ];

