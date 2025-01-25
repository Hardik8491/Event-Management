"use client"
import React from 'react'

import { BadgeCheck, Book, CalendarIcon, ChevronDown, GraduationCap, LineChart, Settings, User } from "lucide-react"
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'



export default function AdvancedStudentDashboard() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (

        <main className="flex-1">
            <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">



                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Your Courses</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {courses.map((course) => (
                            <Card key={course.id}>
                                <CardHeader>
                                    <CardTitle>{course.name}</CardTitle>
                                    <CardDescription>{course.code}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm font-medium">Progress</span>
                                        <span className="text-sm font-medium">{course.progress}%</span>
                                    </div>
                                    <Progress value={course.progress} className="w-full" />
                                    <p className="mt-2 text-sm text-muted-foreground">{course.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>


            </section>
        </main>

    )
}

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