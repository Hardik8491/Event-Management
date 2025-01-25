"use client"
import React, { use, useState } from 'react'
import { Book, Calendar, Clock, DollarSign, GraduationCap, PlayCircle, Star, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { useCheckoutMutation } from '@/redux-toolkit/features/checkout/checkoutApi'
import { useRouter } from 'next/navigation'
import { addItem } from '@/redux-toolkit/features/cart/cartSlice'

export default function PerfectCoursePage() {
  const router=useRouter();
  const dispatch = useDispatch();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [checkout, { isLoading, isSuccess, isError }] = useCheckoutMutation()
  // In a real application, this data would come from an API or database
  const course = {
    _id:"66c1f75b12c1e3e759a9afd6",
    title: "Advanced React Patterns and Best Practices",
    description: "Master the art of building scalable and maintainable React applications with advanced patterns and industry best practices.",
    rating: 4.8,
    students: 15234,
    lastUpdated: "June 2023",
    language: "English",
    price: 99.99,
    discountPrice: 79.99,
    thumbnail: "/placeholder.svg?height=400&width=600",
    instructor: {
      name: "Jane Doe",
      title: "Senior React Developer",
      avatar: "/placeholder.svg?height=100&width=100",
      courses: 12,
      students: 50000,
      rating: 4.9,
    },
    
    features: [
      { icon: Clock, text: "40 hours of video content" },
      { icon: Book, text: "120 lessons" },
      { icon: GraduationCap, text: "Certificate of completion" },
      { icon: Calendar, text: "Lifetime access" },
    ],
    curriculum: [
      {
        title: "Introduction to Advanced React",
        lessons: [
          { title: "Course Overview", duration: "5:00" },
          { title: "Setting Up the Development Environment", duration: "15:00" },
        ],
      },
      {
        title: "Higher-Order Components (HOCs)",
        lessons: [
          { title: "Understanding HOCs", duration: "20:00" },
          { title: "Implementing HOCs", duration: "30:00" },
          { title: "HOC Best Practices", duration: "25:00" },
        ],
      },
      {
        title: "Render Props Pattern",
        lessons: [
          { title: "Introduction to Render Props", duration: "15:00" },
          { title: "Creating Reusable Components with Render Props", duration: "35:00" },
        ],
      },
    ],
  }
  const handleCart = (item: any) => {

    dispatch(addItem({ ...item, quantity: 1 }));

    // Show success message
    toast.success("Course added to cart");

    // Disable button
    setIsButtonDisabled(true);

    // Re-enable button after 3 seconds
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 3000);
  };

  const handleCheckout=async (e:any)=>{
    e.preventDefault();
    const data:any={
        items:[{
          id:course?._id
        }]
    }
    
    try {
      const response = await checkout(data);
      if ('error' in response) {
        throw new Error('Checkout failed')
      }
      // Redirect to Stripe Checkout
      if (response.data && response.data.url) {
        router.push(response.data.url)
      }
      
    } catch (error) {
      console.error('Checkout error:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-lg text-muted-foreground mb-4">{course.description}</p>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="ml-1 font-semibold">{course.rating}</span>
            </div>
            <span className="text-muted-foreground">({course.students.toLocaleString()} students)</span>
            <span className="text-muted-foreground">Last updated {course.lastUpdated}</span>
            <Badge>{course.language}</Badge>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">What you&apos;ll learn</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {course.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <feature.icon className="w-5 h-5 mr-2 text-primary" />
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <Tabs defaultValue="curriculum" className="mb-8">
            <TabsList>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
            </TabsList>
            <TabsContent value="curriculum">
              <Card>
                <CardHeader>
                  <CardTitle>Course Curriculum</CardTitle>
                  <CardDescription>
                    {course.curriculum.reduce((total, section) => total + section.lessons.length, 0)} lessons
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {course.curriculum.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mb-4">
                      <h3 className="font-semibold mb-2">{section.title}</h3>
                      <ul className="space-y-2">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <li key={lessonIndex} className="flex justify-between items-center">
                            <div className="flex items-center">
                              <PlayCircle className="w-4 h-4 mr-2 text-primary" />
                              <span>{lesson.title}</span>
                            </div>
                            <span className="text-muted-foreground">{lesson.duration}</span>
                          </li>
                        ))}
                      </ul>
                      {sectionIndex < course.curriculum.length - 1 && <Separator className="my-4" />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="instructor">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                      <AvatarFallback>{course.instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{course.instructor.name}</CardTitle>
                      <CardDescription>{course.instructor.title}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Star className="w-5 h-5 text-yellow-400 fill-current inline-block mr-1" />
                      <span className="font-semibold">{course.instructor.rating} Instructor Rating</span>
                    </div>
                    <div>
                      <User className="w-5 h-5 text-primary inline-block mr-1" />
                      <span>{course.instructor.students.toLocaleString()} Students</span>
                    </div>
                    <div>
                      <PlayCircle className="w-5 h-5 text-primary inline-block mr-1" />
                      <span>{course.instructor.courses} Courses</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    {course.instructor.name} is a passionate educator with years of experience in React development.
                    She has helped thousands of students master advanced React concepts and build production-ready applications.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover rounded-t-lg" />
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <span className="text-3xl font-bold">${course.discountPrice}</span>
                <span className="text-xl text-muted-foreground line-through">${course.price}</span>
              </div>
              <Button onClick={handleCheckout} className="w-full mb-4">Enroll Now</Button>
              <p className="text-center text-sm text-muted-foreground mb-4">30-Day Money-Back Guarantee</p>
              <h3 className="font-semibold mb-2">This course includes:</h3>
              <ul className="space-y-2">
                {course.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <feature.icon className="w-5 h-5 mr-2 text-primary" />
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full"   onClick={() => handleCart(course)} 
      disabled={isButtonDisabled}>Add to Cart</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}