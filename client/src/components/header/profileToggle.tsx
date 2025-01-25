import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  CircleUser,
  User,
  Settings,
  BookOpen,
  HelpCircle,
  LogOut,
  Home,
} from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { useLogoutMutation } from "@/redux-toolkit/features/auth/authApi";

const ProfileToggle = () => {
  const [logoutUser] = useLogoutMutation();
  const dispatch = useDispatch();
  const { data } = useSession();
  const { user } = useSelector((state: any) => state.auth);
  const router = useRouter();
 

  useEffect(() => {
    if (!user) {
      if (data) {
        // Handle logic if needed
      }
      if (data === null) {
        // Handle logic if needed
      }
    }
  }, [data, user]);

  const handleLogout = async () => {
    try {
     const res = await logoutUser(); 
      await signOut();
      console.log(res)
      // router.push("/");
    // This triggers the logout and handles everything
      console.log("User logged out");
      toast.success("User logged out")
  } catch (error:any) {
      console.error("Error during logout:", error);

  }
   
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {user ? (
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full"
            aria-label="Toggle user menu"
          >
            {user.image ? (
              <img
                src={user.image}
                alt="User Avatar"
                className="h-5 w-5 rounded-full object-cover"
              />
            ) : (
              <CircleUser className="h-5 w-5" />
            )}
          </Button>
        ) : (
          <Link href="/auth/login" passHref>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full"
              disabled
              aria-label="Login"
            >
              <User className="h-5 w-5" />
            </Button>
          </Link>
        )}
      </DropdownMenuTrigger>
      {user && (
        <DropdownMenuContent align="end" className="z-[999]">
          <DropdownMenuLabel className="flex items-center space-x-2">
            {/* {user.image ? (
              <img
                src={user.image}
                alt="User Avatar"
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <User className="h-8 w-8" />
            )} */}
            <div className="flex flex-col">
              <span className="font-bold">{user.firstName} {user.lastName}</span>
              <span className="text-sm text-gray-500">{user.email}</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          {user.isAdmin && (
            <DropdownMenuItem>
              <Link href="/admin/dashboard" className="flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <Link href="/courses" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Courses</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/dashboard" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/support" className="flex items-center space-x-2">
              <HelpCircle className="h-4 w-4" />
              <span>Support</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="flex items-center space-x-2">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default ProfileToggle;