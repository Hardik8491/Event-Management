import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { FacebookIcon, InstagramIcon, LinkedinIcon, MailIcon, PhoneIcon, ShapesIcon, TwitterIcon } from 'lucide-react'
import Link from 'next/link'

import React from 'react'

const Contact = () => {
  return (
    <div className="flex flex-col min-h-[100dvh]">
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-slate-900/10 to-stone-800/50">
      <div className="container px-4 md:px-6 flex flex-col items-center text-center gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl">
            Get in Touch
          </h1>
          <p className="max-w-[700px] text-white md:text-xl">
            Have a question, comment, or just want to say hello? We&apos;re here to help.
          </p>
        </div>
        <Link
          href="#"
          className="inline-flex h-12 items-center justify-center rounded-md bg-primary text-black px-8 text-sm font-medium  shadow transition-colors hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Contact Us
        </Link>
      </div>
    </section>
    <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12 md:py-24 lg:py-32 px-4 md:px-6">
      <div className="group rounded-lg bg-background shadow-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
        <div className="p-6 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-primary rounded-full p-3 flex items-center justify-center">
              <MailIcon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold">Email Us</h3>
          </div>
          <p className="text-muted-foreground">
            Send us a message at{" "}
            <Link href="#" className="font-medium text-primary hover:underline" prefetch={false}>
              support@studysync.com
            </Link>
          </p>
          <Link
            href="#"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Email Us
          </Link>
        </div>
      </div>
      <div className="group rounded-lg bg-background shadow-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
        <div className="p-6 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-primary rounded-full p-3 flex items-center justify-center">
              <PhoneIcon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold">Call Us</h3>
          </div>
          <p className="text-muted-foreground">
            Reach us at <span className="font-medium">+1 (555) 123-4567</span>
          </p>
          <Link
            href="#"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Call Us
          </Link>
        </div>
      </div>
      <div className="group rounded-lg bg-background shadow-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
        <div className="p-6 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-primary rounded-full p-3 flex items-center justify-center">
              <FacebookIcon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold">Follow Us</h3>
          </div>
          <p className="text-muted-foreground">Connect with us on social media for updates and more.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-primary hover:underline" prefetch={false}>
              <TwitterIcon className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-primary hover:underline" prefetch={false}>
              <FacebookIcon className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-primary hover:underline" prefetch={false}>
              <InstagramIcon className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-primary hover:underline" prefetch={false}>
              <LinkedinIcon className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
      <div className="group rounded-lg bg-background shadow-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl col-span-1 md:col-span-2 lg:col-span-3">
        <div className="p-6 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-primary rounded-full p-3 flex items-center justify-center">
              <ShapesIcon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold">Contact Form</h3>
          </div>
          <p className="text-muted-foreground">
            Fill out the form below and we&apos;ll get back to you as soon as possible.
          </p>
          <form className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="John Doe" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" rows={4} placeholder="How can we help you?" />
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Contact
