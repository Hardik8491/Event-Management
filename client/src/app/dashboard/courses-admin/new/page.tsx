'use client'

import { useState } from 'react'
import { Badge } from "@/components/ui/badge"

import { CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, PlayCircle, AlertCircle } from "lucide-react"

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { CardTitle, CardFooter } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import toast from 'react-hot-toast'
import { useCreateCourseMutation } from '@/redux-toolkit/features/courses/courseApi'

export default function Component() {
  const [currentStep, setCurrentStep] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: '',
    description: '',
    price: '',
    estimatePrice: '',
    tag: '',
    level: '',
    demoUrl: '',
    thumbnail: '',
  });

  const [pageError, setPageError] = useState(false);

  const [benefits, setBenefits] = useState([{ title: '' }]);
  const [prerequisites, setPrerequisites] = useState([{ title: '' }]);
  const [courseContentData, setCourseContentData] = useState({
    videoUrl: '',
    title: '',
    description: '',
    videoSection: 'Getting Started',
    links: [{ title: '', url: '' }],
    suggestion: '',
  });
  console.log(courseInfo, benefits, prerequisites, courseContentData); 9
  const steps = ['Course Information', 'Course Benefits', 'Prerequisites', 'Content', 'Preview'];
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCourseInfo(prev => ({ ...prev, [name]: value }));
  };
  const handleCheckboxChange = (name: string) => {
    setCourseInfo(prev => ({ ...prev, [name]: !prev[name as keyof typeof prev] }))
  }


  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  const handleAddField = (type: 'benefit' | 'prerequisite') => {
    if (type === 'benefit') {
      setBenefits([...benefits, { title: '' }]);
    } else {
      setPrerequisites([...prerequisites, { title: '' }]);
    }
  };

  // Integrate with Redux API mutation
  const [createCourse, { isLoading, error }] = useCreateCourseMutation();

  const handleSaveCourse = async () => {
    try {
      const payload = {
        ...courseInfo,
        benefits,
        prerequisites,
        courseContentData,
      };
      const response: any = await createCourse(payload).unwrap();
      if (response.success) {
        toast.success("success");
      }
      // Handle success (e.g., navigate to course list, show a success message, etc.)
    } catch (error: any) {
      console.log(error)
      toast.error(error.data.message);

      setPageError(true);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Course Name</Label>
              <Input
                id="name"
                name="name"
                value={courseInfo.name}
                onChange={handleInputChange}
                placeholder="Enter course name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Course Description</Label>
              <Textarea
                id="description"
                name="description"
                value={courseInfo.description}
                onChange={handleInputChange}
                placeholder="Enter course description"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                value={courseInfo.price}
                onChange={handleInputChange}
                placeholder="Enter course price"
                type="number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatePrice">Estimated Price</Label>
              <Input
                id="estimatePrice"
                name="estimatePrice"
                value={courseInfo.estimatePrice}
                onChange={handleInputChange}
                placeholder="Enter estimated price (if applicable)"
                type="number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tag">Course Tag</Label>
              <Input
                id="tag"
                name="tag"
                value={courseInfo.tag}
                onChange={handleInputChange}
                placeholder="Add tags (e.g., programming, design)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="level">Course Level</Label>
              <select
                id="level"
                name="level"
                value={courseInfo.level}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 w-full"
              >
                <option value="">Select course level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="demoUrl">Demo URL</Label>
              <Input
                id="demoUrl"
                name="demoUrl"
                value={courseInfo.demoUrl}
                onChange={handleInputChange}
                placeholder="Enter demo URL"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnail">Course Thumbnail</Label>
              <Input
                id="thumbnail"
                name="thumbnail"
                type="file"
                onChange={handleInputChange}
                accept="image/*"
                className="w-full border rounded"
              />
            </div>
          </div>


        )
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Course Benefits</h3>
            {benefits.map((benefit, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={`benefit-${index}`}>Benefit {index + 1}</Label>
                <Input
                  id={`benefit-${index}`}
                  value={benefit.title}
                  onChange={(e) => {
                    const updatedBenefits = [...benefits];
                    updatedBenefits[index].title = e.target.value;
                    setBenefits(updatedBenefits);
                  }}
                  placeholder="Enter benefit"
                />
              </div>
            ))}
            <Button onClick={() => handleAddField('benefit')}>Add Benefit</Button>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Course Prerequisites</h3>
            {prerequisites.map((prerequisite, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={`prerequisite-${index}`}>Prerequisite {index + 1}</Label>
                <Input
                  id={`prerequisite-${index}`}
                  value={prerequisite.title}
                  onChange={(e) => {
                    const updatedPrerequisites = [...prerequisites];
                    updatedPrerequisites[index].title = e.target.value;
                    setPrerequisites(updatedPrerequisites);
                  }}
                  placeholder="Enter prerequisite"
                />
              </div>
            ))}
            <Button onClick={() => handleAddField('prerequisite')}>Add Prerequisite</Button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
          <h3 className="text-lg font-semibold">Course Content</h3>
          
          <div className="space-y-2">
            <Label htmlFor="videoUrl">Video URL</Label>
            <Input
              id="videoUrl"
              name="videoUrl"
              value={courseContentData.videoUrl}
              onChange={(e) =>
                setCourseContentData((prev) => ({ ...prev, videoUrl: e.target.value }))
              }
              placeholder="Enter video URL"
            />
          </div>
        
          <div className="space-y-2">
            <Label htmlFor="videoSectionTitle">Video Section Title</Label>
            <Input
              id="videoSectionTitle"
              name="videoSectionTitle"
              value={courseContentData.videoSection}
              onChange={(e) =>
                setCourseContentData((prev) => ({ ...prev, videoSectionTitle: e.target.value }))
              }
              placeholder="Enter video section title"
            />
          </div>
        
          <div className="space-y-2">
            <Label htmlFor="courseTitle">Course Title</Label>
            <Input
              id="courseTitle"
              name="courseTitle"
              value={courseContentData.title}
              onChange={(e) =>
                setCourseContentData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Enter course title"
            />
          </div>
        
          <div className="space-y-2">
            <Label htmlFor="courseDescription">Course Description</Label>
            <Input
              id="courseDescription"
              name="courseDescription"
              value={courseContentData.description}
              onChange={(e) =>
                setCourseContentData((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Enter course description"
            />
          </div>
        
          <div className="space-y-2">
            <Label htmlFor="courseSuggestions">Course Suggestions</Label>
            <Input
              id="courseSuggestions"
              name="courseSuggestions"
              value={courseContentData.suggestion}
              onChange={(e) =>
                setCourseContentData((prev) => ({ ...prev, suggestion: e.target.value }))
              }
              placeholder="Enter course suggestions"
            />
          </div>
        
        
  <div className="space-y-2">
    <Label htmlFor="courseMaterials">Course Materials</Label>
    
    {courseContentData.links.map((link, index) => (
      <div key={index} className="flex items-center space-x-2">
        <Input
          id={`courseMaterialsTitle${index}`}
          name={`courseMaterialsTitle${index}`}
          value={link.title}
          onChange={(e) =>
            setCourseContentData((prev) => {
              const newLinks = [...prev.links];
              newLinks[index] = { ...newLinks[index], title: e.target.value };
              return { ...prev, links: newLinks };
            })
          }
          placeholder="Enter course material title"
        />
        <Input
          id={`courseMaterialsUrl${index}`}
          name={`courseMaterialsUrl${index}`}
          value={link.url}
          onChange={(e) =>
            setCourseContentData((prev) => {
              const newLinks = [...prev.links];
              newLinks[index] = { ...newLinks[index], url: e.target.value };
              return { ...prev, links: newLinks };
            })
          }
          placeholder="Enter course material URL"
        />
        <button
          type="button"
          onClick={() =>
            setCourseContentData((prev) => ({
              ...prev,
              links: prev.links.filter((_, i) => i !== index), // Remove link by index
            }))
          }
          className="text-red-500"
        >
          Remove
        </button>
      </div>
    ))}

    <button
      type="button"
      onClick={() =>
        setCourseContentData((prev) => ({
          ...prev,
          links: [...prev.links, { title: '', url: '' }], // Add new empty link
        }))
      }
      className="text-blue-500"
    >
      Add Material
    </button>
  </div>
        </div>
        
        );

      case 4:
        return (
          <div className="container mx-auto px-4 py-8">
            <Card className="overflow-hidden">
              <CardHeader className="relative">
                <img
                  src={courseInfo.thumbnail}
                  alt={courseInfo.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="relative z-10 bg-black bg-opacity-60 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="mb-2">
                      {courseInfo.tag}
                    </Badge>
                    <Badge variant="outline" className="border-white text-white">
                      {courseInfo.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-3xl font-bold">{courseInfo.name}</CardTitle>
                  <CardDescription className="mt-2 text-gray-200">
                    {courseInfo.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="grid gap-6 p-6 md:grid-cols-2">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Course Benefits</h3>
                  <ul className="space-y-2">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span>{benefit.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Prerequisites</h3>
                  <ul className="space-y-2">
                    {prerequisites.map((prerequisite, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                        <span>{prerequisite.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <Separator />
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Course Content Preview</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold">{courseContentData.videoSection}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{courseContentData.title}</p>
                  <p className="mt-2">{courseContentData.description}</p>
                  <div className="mt-4 flex items-center space-x-2">
                    <PlayCircle className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">Watch intro video</span>
                  </div>
                </div>
                {courseContentData.links.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Additional Resources</h4>
                    <ul className="list-disc pl-5">
                      {courseContentData.links.map((link, index) => (
                        <li key={index}>
                          <a href={link.url} className="text-primary hover:underline">
                            {link.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {courseContentData.suggestion && (
                  <p className="mt-4 text-sm text-muted-foreground">{courseContentData.suggestion}</p>
                )}
              </CardContent>
              <Separator />
              <CardFooter className="flex justify-between items-center p-6">
                <div>
                  <p className="text-2xl font-bold">${courseInfo.price}</p>
                  {courseInfo.estimatePrice && (
                    <p className="text-sm text-muted-foreground line-through">
                      ${courseInfo.estimatePrice}
                    </p>
                  )}
                </div>
                <div className="space-x-2">
                  {courseInfo.demoUrl && (
                    <Button variant="outline">Watch Demo</Button>
                  )}
                  <Button>Enroll Now</Button>
                </div>
              </CardFooter>
            </Card>
            {pageError && (
              <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded" role="alert">
                <p className="font-bold">Error</p>
                <p>There was an error loading the course preview. Please try again later.</p>
              </div>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className='flex-1'>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <h2 className="text-2xl font-bold">Create Courses</h2>
        <Card className="">
          <CardHeader>
            <CardTitle>Create a New Course</CardTitle>
          </CardHeader>
          <CardContent className=''>
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                {steps.map((step, index) => (
                  <div
                    key={step}
                    className={`flex-1 z-10 text-center ${index <= currentStep ? 'text-primary' : 'text-muted-foreground'
                      }`}
                  >
                    <div className="relative">
                      <div className={`w-6 h-6 mx-auto rounded-full relative z-10 ${index <= currentStep ? 'bg-primary ' : 'bg-muted'} flex items-center justify-center text-white text-sm`} >
                        {index + 1}
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`absolute z-0 top-3 left-1/2 w-full h-0.5 ${index < currentStep ? 'bg-primary' : 'bg-muted'}`}></div>
                      )}
                    </div>
                    <div className="mt-2 text-xs sm:text-sm">{step}</div>
                  </div>
                ))}
              </div>
            </div>
            {renderStepContent()}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button
              onClick={currentStep === steps.length - 1 ? handleSaveCourse : handleNext}
            // disabled={pageError===true}
            >
              {currentStep === steps.length - 1 ? 'Submit' : 'Next'} <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  )
}