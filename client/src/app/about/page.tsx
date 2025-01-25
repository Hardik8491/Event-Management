
import { ActivityIcon, BadgeIcon, CombineIcon, EqualIcon, InfoIcon, LecternIcon, MonitorCheckIcon, PenToolIcon, SchoolIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const About = () => {
  return (
    <div className="flex flex-col min-h-[100dvh] mb-2">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Empowering Educators, Inspiring Students
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    StudySync is a comprehensive educational platform that combines cutting-edge technology with
                    research-based pedagogy to transform the way students learn and teachers teach.
                  </p>
                </div>
              </div>
              <img
                src="/about.png"
                width="550"
                height="550"
                alt="Hero"
              
                className="mx-auto  object-contain overflow-hidden rounded-xl  sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Story</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  StudySync was founded in 2010 with the mission to revolutionize the way students learn and teachers
                  teach. Driven by a passion for education and a deep understanding of the challenges facing today&apos;s
                  classrooms, our team of educators and technologists has developed a comprehensive platform that
                  empowers teachers and inspires students.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Core Values</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  At the heart of StudySync are four core values that guide our work and shape our approach to
                  education:
                </p>
              </div>
              <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
                <div className="grid gap-1">
                  <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                    <CombineIcon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">Collaboration</h3>
                  <p className="text-muted-foreground">
                    We believe in the power of collaboration, both among students and between teachers and students.
                  </p>
                </div>
                <div className="grid gap-1">
                  <div className="bg-secondary rounded-md p-3 flex items-center justify-center">
                    <InfoIcon className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">Innovation</h3>
                  <p className="text-muted-foreground">
                    We are constantly exploring new ways to leverage technology and research-based pedagogy to improve
                    learning outcomes.
                  </p>
                </div>
                <div className="grid gap-1">
                  <div className="bg-accent rounded-md p-3 flex items-center justify-center">
                    <ActivityIcon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">Engagement</h3>
                  <p className="text-muted-foreground">
                    We design our platform to foster active engagement and deep learning, keeping students motivated and
                    invested in their education.
                  </p>
                </div>
                <div className="grid gap-1">
                  <div className="bg-success rounded-md p-3 flex items-center justify-center">
                    <EqualIcon className="w-6 h-6 text-success-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">Equity</h3>
                  <p className="text-muted-foreground">
                    We are committed to ensuring that all students have access to high-quality educational resources and
                    opportunities, regardless of their background or circumstances.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Key Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  StudySync&apos;s comprehensive educational platform offers a range of features designed to support teachers
                  and engage students.
                </p>
              </div>
              <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
                <div className="grid gap-1">
                  <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                    <LecternIcon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">Lesson Plans</h3>
                  <p className="text-muted-foreground">
                    Comprehensive, standards-aligned lesson plans that make lesson planning a breeze.
                  </p>
                </div>
                <div className="grid gap-1">
                  <div className="bg-secondary rounded-md p-3 flex items-center justify-center">
                    <InfoIcon className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">Interactive Content</h3>
                  <p className="text-muted-foreground">
                    Engaging, multimedia-rich content that keeps students actively involved in their learning.
                  </p>
                </div>
                <div className="grid gap-1">
                  <div className="bg-accent rounded-md p-3 flex items-center justify-center">
                    <PenToolIcon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">Assessment Tools</h3>
                  <p className="text-muted-foreground">
                    Robust assessment tools that provide real-time feedback and data-driven insights to support student
                    growth.
                  </p>
                </div>
                <div className="grid gap-1">
                  <div className="bg-success rounded-md p-3 flex items-center justify-center">
                    <CombineIcon className="w-6 h-6 text-success-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">Collaboration Features</h3>
                  <p className="text-muted-foreground">
                    Powerful collaboration tools that facilitate student-to-student and teacher-to-student interactions.
                  </p>
                </div>
                <div className="grid gap-1">
                  <div className="bg-warning rounded-md p-3 flex items-center justify-center">
                    <BadgeIcon className="w-6 h-6 text-warning-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">Professional Development</h3>
                  <p className="text-muted-foreground">
                    Comprehensive professional development resources to help teachers maximize the impact of the
                    StudySync platform.
                  </p>
                </div>
                <div className="grid gap-1">
                  <div className="bg-error rounded-md p-3 flex items-center justify-center">
                    <SchoolIcon className="w-6 h-6 text-error-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">Personalized Learning</h3>
                  <p className="text-muted-foreground">
                    Adaptive learning algorithms that personalize the educational experience for each student.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}

export default About
