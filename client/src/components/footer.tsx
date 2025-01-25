// import { BookIcon, BookOpenText, DoorOpen, FacebookIcon, InstagramIcon,  LinkedinIcon, TwitterIcon } from "lucide-react";
// import Link from "next/link";
// import React from "react";

// const Footer = () => {
//   return (
//     // <div className=" p-16 pb-0  bg-[#f6fafb] text-black flex flex-col ">
//     //   <div className=" container grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 xl:col-span-4">
//     //     <div className="gird">
//     //       <h2 className="text-xl py-2 font-semibold">StudySync</h2>
//     //       <p className="text-gray-500 text-sm  font-mono">
//     //         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis mi
//     //         suscipit bibendum sit amet, consectetur.
//     //       </p>
//     //     </div>
//     //     <div className="gird">
//     //       <h2 className="text-xl py-2 font-semibold">Quick Link</h2>
//     //       <div className="flex flex-col gap-2 text-gray-500 text-sm  font-mono ">
//     //         <span>Courses</span>
//     //         <span>About Us</span>
//     //         <span>Terms & Conditions</span>
//     //       </div>
//     //     </div>
//     //     <div className="gird">
//     //       <h2 className="text-xl py-2 font-semibold">Help Center</h2>
//     //       <div className="flex flex-col gap-2 text-gray-500 text-sm  font-mono ">
//     //         <span>Support</span>
//     //         <span>Get Help</span>
//     //         <span>Privacy Policy</span>
//     //       </div>
//     //     </div>
//     //     <div className="gird flex flex-col ">
//     //       <h2 className="text-xl  py-2 font-semibold">Contact Info</h2>
//     //       <div className="flex flex-col gap-2 text-gray-500 text-sm  font-mono ">
//     //         <span>Call Us: 
//     //             <span>70-7046478268</span>
//     //         </span>
//     //         <span>Address:
//     //             <span>+70111 hardik gooke hiuernew </span>
//     //         </span>
//     //         <span>MailUs:
//     //             <span>hello@gmail.com</span>
//     //         </span>
//     //       </div>
//     //     </div>
//     //   </div>

//     //   <div className="container mx-auto border-t px-6 py-4 mt-10">
//     //     <p className="text-center font-semibold text-sm text-gray-500">
//     //       © 2021 StudySync. All rights reserved.
//     //     </p>
//     //   </div>
//     // </div>
//     <footer className="bg-muted/50 black:bg-gradient-to-r  from-slate-900/10 to-stone-800/50 py-12 text-muted-foreground">
//     <div className="container mx-auto grid grid-cols-1 gap-10 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//       <div className="flex flex-col items-start gap-4">
//       <Link
//             href="/"
//             className="flex text-center items-center gap-2 text-lg font-semibold md:text-base"
//           >
//             <span className="flex items-center justify-center">
//             <BookOpenText className="text-[#43ab59]  font-bold h-6 w-6" />
//             </span>
//             <h2 className="flex mb-1 whitespace-nowrap  items-start text-xl font-bold text-[#43ab59]">
//               <span className=" dark:text-white text-black">Study</span>
//               Sync
//             </h2>
//           </Link>
//         <p className="text-sm">
//           StudySync is an innovative education platform that provides high-quality learning resources and tools to
//           help students succeed.
//         </p>
//       </div>
//       <div className="grid gap-2">
//         <h4 className="text-lg font-semibold">Courses</h4>
//         <Link href="#" className="text-sm hover:underline" prefetch={false}>
//           Browse Courses
//         </Link>
//         <Link href="#" className="text-sm hover:underline" prefetch={false}>
//           Enroll Now
//         </Link>
//         <Link href="#" className="text-sm hover:underline" prefetch={false}>
//           Pricing
//         </Link>
//       </div>
//       <div className="grid gap-2">
//         <h4 className="text-lg font-semibold">About</h4>
//         <Link href="#" className="text-sm hover:underline" prefetch={false}>
//           Our Mission
//         </Link>
//         <Link href="#" className="text-sm hover:underline" prefetch={false}>
//           Our Team
//         </Link>
//         <Link href="#" className="text-sm hover:underline" prefetch={false}>
//           Careers
//         </Link>
//       </div>
//       <div className="grid gap-2">
//         <h4 className="text-lg font-semibold">Contact</h4>
//         <Link href="#" className="text-sm hover:underline" prefetch={false}>
//           Get in Touch
//         </Link>
//         <Link href="#" className="text-sm hover:underline" prefetch={false}>
//           Support
//         </Link>
//         <Link href="#" className="text-sm hover:underline" prefetch={false}>
//           Privacy Policy
//         </Link>
//       </div>
//     </div>
//     <div className="mt-12 border-t border-muted-foreground/20 pt-6">
//       <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row">
//         <p className="text-sm">&copy; 2024 StudySync. All rights reserved.</p>
//         <div className="flex items-center gap-4">
//           <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
//             <TwitterIcon className="h-6 w-6" />
//           </Link>
//           <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
//             <FacebookIcon className="h-6 w-6" />
//           </Link>
//           <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
//             <InstagramIcon className="h-6 w-6" />
//           </Link>
//           <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
//             <LinkedinIcon className="h-6 w-6" />
//           </Link>
//         </div>
//       </div>
//     </div>
//   </footer>
//   );
// };

// export default Footer;


import { FacebookIcon, TwitterIcon, InstagramIcon, Map, PhoneCall } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RiEmpathizeLine } from "react-icons/ri"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-white rounded-full mr-2"></div>
              <span className="text-xl font-bold text-white">Cart Crush</span>
            </div>
            <p className="text-sm mb-4">Part of the Sumo family with SendFox and Tidy Cal. Learn how to start an online business. What is the creator economy?</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <TwitterIcon size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FacebookIcon size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <InstagramIcon size={20} />
              </a>
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-white font-semibold mb-4">Account</h3>
            <ul className="space-y-2">
              {["Overview", "Join Plus", "Help", "Terms", "Privacy"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm hover:text-white">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* CartCrush */}
          <div>
            <h3 className="text-white font-semibold mb-4">CartCrush</h3>
            <ul className="space-y-2">
              {["About", "Blog", "Careers", "CartCrush Select"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm hover:text-white">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sell */}
          <div>
            <h3 className="text-white font-semibold mb-4">Sell</h3>
            <ul className="space-y-2">
              {["CartCrush Select", "Your List", "Own Product", "Affiliates", "Case Studies", "Creator Economy"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm hover:text-white">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <p className="text-sm mb-2 flex">
              <span><Map /></span> 6391 Elgin St. Celina, Delaware 10299</p>
            <p className="text-sm flex mb-2">
              <span><PhoneCall /></span> (303) 555-0105</p>
            <p className="text-sm flex mb-4"> <span>
              <RiEmpathizeLine /></span> ttodigitalagency@gmail.com</p>
            <form className="flex flex-col space-y-2">
              <Input type="email" placeholder="Email Address" className="bg-gray-800 border-gray-700 text-white" />
              <Button type="submit" className="bg-primary hover:bg-green-600 text-white">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}