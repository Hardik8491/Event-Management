import React, { useEffect } from "react";
import Link from "next/link";
import { BookOpenText, Package2, Search } from "lucide-react";
import { Input } from "../ui/input";

import CartToggle from "./cart-toggle";
import SideHeader from "./side-header";
import ProfileToggle from "./profileToggle";
import { useSelector } from "react-redux";
import {  useSocialAuthMutation } from "@/redux-toolkit/features/auth/authApi";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import ModeToggle from "../ui/mode-toggle";

const Header = () => {
  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const [logout, setLogout] = React.useState(false);
  const { user } = useSelector((state: any) => state.auth);

useEffect(() => {
    if (!user) {
        if (data) {
            socialAuth({
                email: data?.user?.email,
                name: data?.user?.name,
                avatar: data?.user?.image,
            });
        }
        if (data === null) {
            if (isSuccess) {
                toast.success("Login Successfully");
            }
        }
        if (isSuccess) {
            if (data === null) {
                setLogout(true);
            }
        }
    }
}, [data, user]);





  return (
    // <div>
     <header className="sticky z-[99] top-0 w-full left-0 flex h-16 items-center gap-4 border/40 dark:border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60  dark:bg-gradient-to-r shadow-sm from-slate-900/10 to-stone-800/50 px-4 md:px-6">
        {/* <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"> */}
        <nav className="hidden flex-col gap-6 text-lg w-full font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/"
            className="flex text-center items-center gap-2 text-lg font-semibold md:text-base"
          >
            <span className="flex items-center justify-center">
              <BookOpenText className="text-[#43ab59]  font-bold h-6 w-6" />
            </span>
            <h2 className="flex mb-1 whitespace-nowrap  items-start text-xl font-bold text-[#43ab59]">
              <span className=" dark:text-white text-black">Study</span>
              {" "}
              Sync
            </h2>
          </Link>
          <Link
            href="/"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/courses"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Courses
          </Link>
          <Link
            href="/about"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-muted-foreground  transition-colors hover:text-foreground"
          >
            Contact Us
          </Link>
          
        </nav>
        <SideHeader />
        <div className="flex  w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <CartToggle />
          <ProfileToggle />
          <ModeToggle />
        </div>
      </header>
    // </div> 
  );
};

export default Header;
