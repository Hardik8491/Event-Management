import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function LearningPlatform() {
  const courses = [
    {
      title: "AWS Certified Solutions Architect",
      image: "/placeholder.svg?height=200&width=300",
      duration: "3 Month",
      instructor: "Lina",
      price: 80,
      originalPrice: 100,
    },
    // Add more courses here...
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Banner Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h1 className="text-2xl font-bold mb-4">Know about learning platform</h1>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center">
                <div className="w-4 h-4 bg-teal-500 rounded-full mr-2"></div>
                Free E-book, video & consultation
              </li>
              <li className="flex items-center">
                <div className="w-4 h-4 bg-teal-500 rounded-full mr-2"></div>
                Top instructors from around world
              </li>
              <li className="flex items-center">
                <div className="w-4 h-4 bg-teal-500 rounded-full mr-2"></div>
                Top courses from your team
              </li>
            </ul>
            <Button className="bg-teal-500 text-white">Start learning now</Button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64">
              <Image
                src="/placeholder.svg?height=256&width=256"
                alt="Main instructor"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
              <div className="absolute -top-4 -left-4">
                <Avatar className="w-16 h-16 border-4 border-white">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Instructor 1" />
                  <AvatarFallback>I1</AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute -bottom-4 -right-4">
                <Avatar className="w-16 h-16 border-4 border-white">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Instructor 2" />
                  <AvatarFallback>I2</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Courses Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Recommended for you</h2>
            <Button variant="link" className="text-teal-500">See all</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <Card key={index} className="overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover"
                />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Design</span>
                    <span className="text-sm text-gray-500">{course.duration}</span>
                  </div>
                  <h3 className="font-bold mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  </p>
                </CardContent>
                <CardFooter className="p-4 bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="w-8 h-8 mr-2">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt={course.instructor} />
                      <AvatarFallback>{course.instructor[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{course.instructor}</span>
                  </div>
                  <div>
                    <span className="text-lg font-bold text-teal-500">${course.price}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">${course.originalPrice}</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}