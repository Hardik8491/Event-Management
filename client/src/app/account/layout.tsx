"use client"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpenIcon,
  MountainIcon,
  PowerIcon,
  TrophyIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import React from "react";

const menuItems = [
  { href: "/", icon: <MountainIcon className="h-4 w-4" />, label: "Acme Inc" },
  { href: "/account", icon: <UserIcon className="h-5 w-5" />, label: "Profile" },
  { href: "/account/courses", icon: <BookOpenIcon className="h-5 w-5" />, label: "Courses" },
  { href: "/account/support", icon: <PowerIcon className="h-5 w-5" />, label: "Support" },
  { href: "/account/achievements", icon: <TrophyIcon className="h-5 w-5" />, label: "Achievements" },
  { href: "/account/community", icon: <UsersIcon className="h-5 w-5" />, label: "Community" },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen w-full bg-black">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            {menuItems.map(({ href, icon, label }, index) => {
              const isActive =pathname === href;
              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Link
                      href={href}
                      className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                        isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                      }`}
                      prefetch={false}
                    >
                      {icon}
                      <span className="sr-only">{label}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{label}</TooltipContent>
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <PowerIcon className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <main className="flex-1 ml-14 p-6 md:p-10">{children}</main>
    </div>
  );
};

export default Layout;



// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import Link from "next/link";
// import {
//   BookOpenIcon,
//   MountainIcon,
//   PowerIcon,
//   TrophyIcon,
//   UserIcon,
//   UsersIcon,
// } from "lucide-react";
// import React from "react";

// const menuItems = [
//   { href: "/", icon: <MountainIcon className="h-4 w-4" />, label: "Acme Inc" },
//   { href: "account/profile/", icon: <UserIcon className="h-5 w-5" />, label: "Profile" },
//   { href: "/account/courses", icon: <BookOpenIcon className="h-5 w-5" />, label: "Courses" },
//   { href: "/account/support", icon: <PowerIcon className="h-5 w-5" />, label: "Support" },
//   { href: "/account/achievements", icon: <TrophyIcon className="h-5 w-5" />, label: "Achievements" },
//   { href: "/account/community", icon: <UsersIcon className="h-5 w-5" />, label: "Community" },
// ];

// const Layout = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <div className="flex min-h-screen w-full bg-black">
//       <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
//         <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
//           <TooltipProvider>
//             {menuItems.map(({ href, icon, label }, index) => (
//               <Tooltip key={index}>
//                 <TooltipTrigger asChild>
//                   <Link
//                     href={href}
//                     className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
//                     prefetch={false}
//                   >
//                     {icon}
//                     <span className="sr-only">{label}</span>
//                   </Link>
//                 </TooltipTrigger>
//                 <TooltipContent side="right">{label}</TooltipContent>
//               </Tooltip>
//             ))}
//           </TooltipProvider>
//         </nav>
//         <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <Link
//                   href="#"
//                   className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
//                   prefetch={false}
//                 >
//                   <PowerIcon className="h-5 w-5" />
//                   <span className="sr-only">Settings</span>
//                 </Link>
//               </TooltipTrigger>
//               <TooltipContent side="right">Settings</TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         </nav>
//       </aside>
//       <main className="flex-1 ml-14 p-6 md:p-10">{children}</main>
//     </div>
//   );
// };

// export default Layout;
