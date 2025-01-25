import React, { useState } from 'react'
import { Book, CheckCircle, Download, FileText, List, PlayCircle, Settings } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CoursePlayerPage() {
  const [currentLesson, setCurrentLesson] = useState(0)

  // In a real application, this data would come from an API or database
  const course = {
    title: "Advanced React Patterns and Best Practices",
    progress: 35,
    instructor: {
      name: "Jane Doe",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    curriculum: [
      {
        title: "Introduction to Advanced React",
        lessons: [
          { id: 0, title: "Course Overview", duration: "5:00", completed: true },
          { id: 1, title: "Setting Up the Development Environment", duration: "15:00", completed: true },
        ],
      },
      {
        title: "Higher-Order Components (HOCs)",
        lessons: [
          { id: 2, title: "Understanding HOCs", duration: "20:00", completed: false },
          { id: 3, title: "Implementing HOCs", duration: "30:00", completed: false },
          { id: 4, title: "HOC Best Practices", duration: "25:00", completed: false },
        ],
      },
      {
        title: "Render Props Pattern",
        lessons: [
          { id: 5, title: "Introduction to Render Props", duration: "15:00", completed: false },
          { id: 6, title: "Creating Reusable Components with Render Props", duration: "35:00", completed: false },
        ],
      },
    ],
    materials: [
      { title: "Course Slides", type: "PDF", size: "2.5 MB" },
      { title: "Example Code", type: "ZIP", size: "1.8 MB" },
      { title: "Additional Resources", type: "PDF", size: "500 KB" },
    ],
  }

  const currentLessonData = course.curriculum
    .flatMap(section => section.lessons)
    .find(lesson => lesson.id === currentLesson)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="mb-8">
            <CardContent className="p-0">
              <div className="aspect-video bg-black">
                {/* Replace this div with an actual video player component */}
                <div className="flex items-center justify-center h-full text-white">
                  Video Player Placeholder
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">{currentLessonData?.title}</h1>
            <div className="flex items-center space-x-4">
              <Avatar className="w-8 h-8">
                <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                <AvatarFallback>{course.instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <span className="text-muted-foreground">{course.instructor.name}</span>
            </div>
          </div>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Lesson Overview</CardTitle>
                  <CardDescription>Key points and summary of the current lesson</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This lesson covers the fundamental concepts of the current topic. You&lsquo;ll learn about the key principles, best practices, and how to apply them in real-world scenarios.</p>
                  <h3 className="font-semibold mt-4 mb-2">Learning Objectives:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Understand the core concepts of the topic</li>
                    <li>Learn how to implement the patterns in your own projects</li>
                    <li>Recognize common pitfalls and how to avoid them</li>
                    <li>Apply best practices for optimal performance and maintainability</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle>Your Notes</CardTitle>
                  <CardDescription>Take notes for this lesson</CardDescription>
                </CardHeader>
                <CardContent>
                  <textarea
                    className="w-full h-64 p-2 border rounded-md"
                    placeholder="Start typing your notes here..."
                  ></textarea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="discussions">
              <Card>
                <CardHeader>
                  <CardTitle>Lesson Discussions</CardTitle>
                  <CardDescription>Engage with your peers and instructors</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Discussion forum placeholder. In a real application, this would be populated with comments and discussions related to the current lesson.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Course Progress</CardTitle>
              <CardDescription>{course.progress}% Complete</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={course.progress} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                {course.curriculum.flatMap(s => s.lessons).filter(l => l.completed).length} of {course.curriculum.flatMap(s => s.lessons).length} lessons completed
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px]">
                {course.curriculum.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    <div className="p-4 bg-muted">
                      <h3 className="font-semibold">{section.title}</h3>
                    </div>
                    <ul>
                      {section.lessons.map((lesson) => (
                        <li key={lesson.id} className="border-b last:border-b-0">
                          <button
                            className={`flex items-center justify-between w-full p-4 text-left hover:bg-muted/50 ${currentLesson === lesson.id ? 'bg-muted' : ''}`}
                            onClick={() => setCurrentLesson(lesson.id)}
                          >
                            <div className="flex items-center">
                              {lesson.completed ? (
                                <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                              ) : (
                                <PlayCircle className="w-5 h-5 mr-2 text-primary" />
                              )}
                              <span>{lesson.title}</span>
                            </div>
                            <span className="text-muted-foreground">{lesson.duration}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Course Materials</CardTitle>
          <CardDescription>Download additional resources for this course</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {course.materials.map((material, index) => (
              <li key={index} className="flex items-center justify-between p-2 hover:bg-muted rounded-md">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-primary" />
                  <span>{material.title}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{material.type}</Badge>
                  <span className="text-sm text-muted-foreground">{material.size}</span>
                  <Button size="sm" variant="ghost">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}