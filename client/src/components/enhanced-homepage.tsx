import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  BarChartIcon,
  BookIcon,
  BookOpenText,
  BrushIcon,
  CodeIcon,
  CompassIcon,
  CpuIcon,
  LayersIcon,
  MenuIcon,
  SettingsIcon,
  SparkleIcon,
  XIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import PricingPlans from "./pricing-plans"

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

export default function EnhancedHomepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
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
          <div className="hidden md:flex space-x-4">
            <Link href="#courses" className="hover:text-primary transition-colors">
              Courses
            </Link>
            <Link href="#categories" className="hover:text-primary transition-colors">
              Categories
            </Link>
            <Link href="#testimonials" className="hover:text-primary transition-colors">
              Testimonials
            </Link>
            <Link href="#features" className="hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="hover:text-primary transition-colors">
              Pricing
            </Link>
          </div>
          <Button className="hidden md:inline-flex">Get Started</Button>
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </nav>
      </header>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-gray-800 p-4"
        >
          <Link href="#courses" className="block py-2 hover:text-primary transition-colors">
            Courses
          </Link>
          <Link href="#categories" className="block py-2 hover:text-primary transition-colors">
            Categories
          </Link>
          <Link href="#testimonials" className="block py-2 hover:text-primary transition-colors">
            Testimonials
          </Link>
          <Link href="#features" className="block py-2 hover:text-primary transition-colors">
            Features
          </Link>
          <Button className="w-full mt-4">Get Started</Button>
        </motion.div>
      )}

      <main>
        <section className="container mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center">
          <motion.div
            className="md:w-1/2 mb-10 md:mb-0"
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
          >
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-bold mb-6">
              Unlock Your Potential with StudySync
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl mb-8">
              Discover a world of knowledge and opportunities with our cutting-edge education platform.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex space-x-4">
              <Button size="lg">Get Started</Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <img
              src="/hero-img.png"
              alt="Students learning"
              className="rounded-lg shadow-2xl"
              width={600}
              height={400}
            />
          </motion.div>
        </section>

        <section id="courses" className="bg-gray-800 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((course) => (
                <motion.div key={course} variants={fadeInUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Title {course}</CardTitle>
                      <CardDescription>Brief description of the course</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <img
                        src={`/placeholder.svg?height=200&width=400`}
                        alt={`Course ${course}`}
                        className="w-full h-48 object-cover rounded-md mb-4"
                      />
                      <p>Learn the fundamentals and advanced techniques in this comprehensive course.</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Enroll Now</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="categories" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Course Categories</h2>
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
              variants={staggerChildren}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              ref={ref}
            >
              {[
                { icon: CodeIcon, name: "Programming" },
                { icon: BarChartIcon, name: "Data Science" },
                { icon: BrushIcon, name: "Design" },
                { icon: BookIcon, name: "Business" },
                { icon: LayersIcon, name: "Marketing" },
                { icon: CpuIcon, name: "Technology" },
              ].map((category, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-gray-700 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-gray-600 transition-colors"
                >
                  <category.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="text-lg font-medium">{category.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="testimonials" className="bg-gray-800 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Students Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "The courses on this platform have been a game-changer for me. The content is engaging, and I've learned so much.",
                  author: "John Doe, Software Engineer",
                },
                {
                  quote:
                    "I've been able to advance my career and gain new skills thanks to the wide range of courses offered. Highly recommended!",
                  author: "Jane Smith, Marketing Manager",
                },
                {
                  quote:
                    "The platform's user-friendly interface and interactive learning materials have made my educational journey truly enjoyable.",
                  author: "Michael Johnson, Graphic Designer",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                >
                  <Card>
                    <CardContent className="pt-6">
                      <blockquote className="text-lg mb-4">{testimonial.quote}</blockquote>
                      <cite className="text-sm font-medium text-gray-400">- {testimonial.author}</cite>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Our Platform?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: CompassIcon,
                  title: "Comprehensive Curriculum",
                  description: "Explore a wide range of courses across various disciplines to expand your knowledge.",
                },
                {
                  icon: SettingsIcon,
                  title: "Personalized Learning",
                  description:
                    "Tailor your learning experience with personalized recommendations and progress tracking.",
                },
                {
                  icon: SparkleIcon,
                  title: "Expert Instructors",
                  description:
                    "Learn from industry-leading experts who are passionate about sharing their knowledge.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="flex flex-col items-center text-center"
                >
                  <feature.icon className="w-16 h-16 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
     <div id="pricing">
     <PricingPlans />
     </div>

    </div>
  )
}