'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CourseCreationForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    estimatedPrice: '',
    tag: '',
    level: '',
    demoUrl: '',
    thumbnail: null,
    benefits: '',
    prerequisites: '',
    videoUrl: '',
    videoSectionTitle: '',
    videoLinks: '',
    suggestions: ''
  })

  const handleInputChange = (e:any) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleFileChange = (e:any) => {
    setFormData(prevData => ({ ...prevData, thumbnail: e.target.files[0] }))
  }

  const handleSelectChange = (value:any) => {
    setFormData(prevData => ({ ...prevData, level: value }))
  }

  const handleNext = () => {
    setStep(prevStep => prevStep + 1)
  }

  const handlePrevious = () => {
    setStep(prevStep => prevStep - 1)
  }

  const handleSubmit = (e:any) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would typically send the data to your backend
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Create a New Course</CardTitle>
        <CardDescription>Fill in the details to create your course. Current step: {step} of 4</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Course Title</Label>
                <Input id="title" name="title" placeholder="Enter course title" value={formData.title} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="description">Course Description</Label>
                <Textarea id="description" name="description" placeholder="Enter course description" value={formData.description} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input id="price" name="price" type="number" placeholder="Enter price" value={formData.price} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="estimatedPrice">Estimated Price</Label>
                <Input id="estimatedPrice" name="estimatedPrice" type="number" placeholder="Enter estimated price" value={formData.estimatedPrice} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="tag">Course Tag</Label>
                <Input id="tag" name="tag" placeholder="Enter course tag" value={formData.tag} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="level">Course Level</Label>
                <Select name="level" value={formData.level} onValueChange={handleSelectChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="demoUrl">Demo URL</Label>
                <Input id="demoUrl" name="demoUrl" placeholder="Enter demo URL" value={formData.demoUrl} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="thumbnail">Course Thumbnail</Label>
                <Input id="thumbnail" name="thumbnail" type="file" onChange={handleFileChange} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <Label htmlFor="benefits">Course Benefits</Label>
              <Textarea id="benefits" name="benefits" placeholder="Enter course benefits" value={formData.benefits} onChange={handleInputChange} />
            </div>
          )}

          {step === 3 && (
            <div>
              <Label htmlFor="prerequisites">Course Prerequisites</Label>
              <Textarea id="prerequisites" name="prerequisites" placeholder="Enter prerequisites" value={formData.prerequisites} onChange={handleInputChange} />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="videoUrl">Video URL</Label>
                <Input id="videoUrl" name="videoUrl" placeholder="Enter video URL" value={formData.videoUrl} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="videoSectionTitle">Video Section Title</Label>
                <Input id="videoSectionTitle" name="videoSectionTitle" placeholder="Enter video section title" value={formData.videoSectionTitle} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="videoLinks">Video Links</Label>
                <Input id="videoLinks" name="videoLinks" placeholder="Enter video links (comma-separated)" value={formData.videoLinks} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="suggestions">Course Suggestions</Label>
                <Textarea id="suggestions" name="suggestions" placeholder="Enter course suggestions" value={formData.suggestions} onChange={handleInputChange} />
              </div>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 && (
          <Button onClick={handlePrevious}>Previous</Button>
        )}
        {step < 4 ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button onClick={handleSubmit}>Submit</Button>
        )}
      </CardFooter>
    </Card>
  )
}