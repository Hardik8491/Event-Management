"use client"
import React from 'react'

import { BadgeCheck, Book,  CalendarIcon,  LineChart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useSelector } from 'react-redux'


const Overview = () => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <main className="flex-1">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              Welcome back, {user.name}!
            </h1>
            <p className="text-lg text-muted-foreground">
              Here&lsquo;s an overview of your academic progress and upcoming tasks.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
                    <Book className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">6</div>
                    <p className="text-xs text-muted-foreground">4 in progress, 2 completed</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Assessments</CardTitle>
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4</div>
                    <p className="text-xs text-muted-foreground">Next: Data Structures (in 2 days)</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Overall GPA</CardTitle>
                    <LineChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3.8</div>
                    <p className="text-xs text-muted-foreground">+0.2 from last semester</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Achievements</CardTitle>
                    <BadgeCheck className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">3 new this month</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Course Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <CourseProgress />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                    <CardDescription>Your latest academic activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentActivities />
                  </CardContent>
                </Card>
              </div>
          </section>
          </main>

  )
}

export default Overview



function CourseProgress() {
  return (
    <div className="space-y-8">
      {courses.map((course) => (
        <div key={course.id} className="flex items-center">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className={`w-2 h-2 rounded-full ${course.progress === 100 ? 'bg-green-500' : 'bg-orange-500'}`} />
            <div className="grid gap-1 min-w-0">
              <p className="text-sm font-medium leading-none truncate">{course.name}</p>
              <p className="text-sm text-muted-foreground">{course.code}</p>
            </div>
          </div>
          <div className="ml-auto font-medium">{course.progress}%</div>
        </div>
      ))}
    
    </div>
  )
}

function RecentActivities() {
  return (
    <div className="space-y-8">
      {recentActivities.map((activity, index) => (
        <div key={index} className="flex items-center">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className={`w-2 h-2 rounded-full ${activityColors[activity.type]}`} />
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">{activity.description}</p>
              <p className="text-sm text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const courses = [
  { id: 1, name: "Data Structures", code: "CS201", progress: 75, description: "Advanced data structures and algorithms" },
  { id: 2, name: "Web Development", code: "CS301", progress: 60, description: "Full-stack web application development" },
  { id: 3, name: "Machine Learning", code: "CS401", progress: 40, description: "Introduction to machine learning concepts" },
  { id: 4, name: "Database Systems", code: "CS302", progress: 90, description: "Design and implementation of database systems" },
  { id: 5, name: "Computer Networks", code: "CS303", progress: 50, description: "Fundamentals of computer networking" },
  { id: 6, name: "Software Engineering", code: "CS304", progress: 100, description: "Software development lifecycle and best practices" },
]

const assessments = [
  { id: 1, name: "Data Structures Midterm", course: "CS201", date: "2023-05-15", type: "Exam", description: "Covers topics from weeks 1-7" },
  { id: 2, name: "Web Dev Project", course: "CS301", date: "2023-05-20", type: "Project", description: "Build a full-stack web application" },
  { id: 3, name: "ML Algorithm Implementation", course: "CS401", date: "2023-05-25", type: "Assignment", description: "Implement a basic neural network" },
  { id: 4, name: "Database Design Quiz", course: "CS302", date: "2023-05-30", type: "Quiz", description: "ER diagrams and normalization" },
]

const recentActivities = [
  { type: "submission", description: "Submitted Web Dev Project", time: "2 hours ago" },
  { type: "grade", description: "Received grade for ML Quiz: 95%", time: "1 day ago" },
  { type: "comment", description: "New comment on your DB assignment", time: "2 days ago" },
  { type: "enrollment", description: "Enrolled in Computer Networks", time: "3 days ago" },
]

const activityColors:any = {
  submission: "bg-green-500",
  grade: "bg-blue-500",
  comment: "bg-yellow-500",
  enrollment: "bg-purple-500",
}