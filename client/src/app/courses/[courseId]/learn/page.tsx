'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Book, CheckCircle, Download, FileText, List, PlayCircle, Settings } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipBack, SkipForward } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from '@/components/ui/slider'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu'
import { Toast } from "@/components/ui/toast"
import { useParams } from 'next/navigation'
import { useGetCourseQuery } from '@/redux-toolkit/features/courses/courseApi'
import { ICourse } from '@/types'

type Quality = '360p' | '480p' | '720p' | '1080p'

const videoSources: Record<Quality, string> = {
    '360p': '/ex.mp4',
    '480p': 'https://example.com/video-480p.mp4',
    '720p': 'https://example.com/video-720p.mp4',
    '1080p': 'https://example.com/video-1080p.mp4',
}

export default function CoursePlayerPage() {
    const [currentLesson, setCurrentLesson] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(1)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [playbackSpeed, setPlaybackSpeed] = useState(1)
    const [captionsEnabled, setCaptionsEnabled] = useState(false)
    const [quality, setQuality] = useState<Quality>('720p')
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const videoRef = useRef<HTMLVideoElement>(null)
    const playerRef = useRef<HTMLDivElement>(null)
    const id = useParams()?.courseId as any;
    console.log(id);
    
    const { data, error, isLoading } = useGetCourseQuery(id);
    console.log(data);
    const [course, setCourse] = useState<ICourse | null>(null);
    useEffect(() => {
        if (data) {
            setCourse(data.course);
        }
    }, [data]);

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const updateTime = () => setCurrentTime(video.currentTime)
        const updateDuration = () => setDuration(video.duration)

        video.addEventListener('timeupdate', updateTime)
        video.addEventListener('loadedmetadata', updateDuration)

        return () => {
            video.removeEventListener('timeupdate', updateTime)
            video.removeEventListener('loadedmetadata', updateDuration)
        }
    }, [])

    useEffect(() => {
        if (videoRef.current && course) {
            const currentLessonData = course.curriculum
                ?.flatMap(section => section.lessons)
                .find(lesson => lesson.id === currentLesson);
            
            if (currentLessonData) {
                videoRef.current.src = currentLessonData.videoUrl || videoSources[quality];
                if (isPlaying) {
                    videoRef.current.play();
                }
            }
        }
    }, [currentLesson, course, quality]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading course.</p>;

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const handleVolumeChange = (newVolume: number[]) => {
        const volumeValue = newVolume[0]
        setVolume(volumeValue)
        if (videoRef.current) {
            videoRef.current.volume = volumeValue
        }
    }

    const handleProgressChange = (newTime: number[]) => {
        const timeValue = newTime[0]
        setCurrentTime(timeValue)
        if (videoRef.current) {
            videoRef.current.currentTime = timeValue
        }
    }

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            playerRef.current?.requestFullscreen()
            setIsFullscreen(true)
        } else {
            document.exitFullscreen()
            setIsFullscreen(false)
        }
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const changePlaybackSpeed = (speed: number) => {
        setPlaybackSpeed(speed)
        if (videoRef.current) {
            videoRef.current.playbackRate = speed
        }
        showToastMessage(`Playback speed set to ${speed}x`)
    }

    const toggleCaptions = () => {
        setCaptionsEnabled(!captionsEnabled)
        if (videoRef.current) {
            const track = videoRef.current.textTracks[0]
            if (track) {
                track.mode = captionsEnabled ? 'hidden' : 'showing'
            }
        }
        showToastMessage(captionsEnabled ? 'Captions disabled' : 'Captions enabled')
    }

    const changeQuality = (newQuality: Quality) => {
        if (videoRef.current) {
            const currentTime = videoRef.current.currentTime
            setQuality(newQuality)
            videoRef.current.src = videoSources[newQuality]
            videoRef.current.currentTime = currentTime
            if (isPlaying) {
                videoRef.current.play()
            }
        }
        showToastMessage(`Quality changed to ${newQuality}`)
    }

    const showToastMessage = (message: string) => {
        setToastMessage(message)
        setShowToast(true)
        setTimeout(() => setShowToast(false), 3000)
    }

    const skipForward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime += 10
        }
    }

    const skipBackward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime -= 10
        }
    }

    const currentLessonData = course && course.curriculum?.flatMap((section: { lessons: any }) => section.lessons)?.find((lesson: { id: number }) => lesson.id === currentLesson)


    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-2">
                    {/* video content */}
                    <Card className="mb-8">
                        <CardContent className="p-0">
                            <div className="aspect-video bg-black">
                                <div ref={playerRef} className="relative w-full max-w-full mx-auto bg-gray-900 rounded overflow-hidden">
                                    <video
                                        ref={videoRef}
                                        className="w-full h-auto"
                                        src={currentLessonData?.videoUrl || videoSources[quality]}
                                    >
                                        <track
                                            kind="captions"
                                            src="/path-to-your-captions.vtt"
                                            srcLang="en"
                                            label="English"
                                        />
                                    </video>
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                                        <Slider
                                            value={[currentTime]}
                                            min={0}
                                            max={duration}
                                            step={1}
                                            onValueChange={handleProgressChange}
                                            className="w-full mb-4"
                                        />
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <Button variant="ghost" size="icon" onClick={skipBackward}>
                                                    <SkipBack className="h-6 w-6" />
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={togglePlay}>
                                                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={skipForward}>
                                                    <SkipForward className="h-6 w-6" />
                                                </Button>
                                                <div className="flex items-center space-x-2">
                                                    <Button variant="ghost" size="icon" onClick={() => handleVolumeChange([volume === 0 ? 1 : 0])}>
                                                        {volume === 0 ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                                                    </Button>
                                                    <Slider
                                                        value={[volume]}
                                                        min={0}
                                                        max={1}
                                                        step={0.1}
                                                        onValueChange={handleVolumeChange}
                                                        className="w-24"
                                                    />
                                                </div>
                                                <div className="text-white text-sm">
                                                    {formatTime(currentTime)} / {formatTime(duration)}
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <Settings className="h-6 w-6" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        <DropdownMenuLabel>Settings</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuSub>
                                                            <DropdownMenuSubTrigger>Quality</DropdownMenuSubTrigger>
                                                            <DropdownMenuSubContent>
                                                                {Object.keys(videoSources).map((q) => (
                                                                    <DropdownMenuItem key={q} onClick={() => changeQuality(q as Quality)}>
                                                                        {q} {q === quality && '✓'}
                                                                    </DropdownMenuItem>
                                                                ))}
                                                            </DropdownMenuSubContent>
                                                        </DropdownMenuSub>
                                                        <DropdownMenuSub>
                                                            <DropdownMenuSubTrigger>Playback Speed</DropdownMenuSubTrigger>
                                                            <DropdownMenuSubContent>
                                                                {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                                                                    <DropdownMenuItem key={speed} onClick={() => changePlaybackSpeed(speed)}>
                                                                        {speed}x {speed === playbackSpeed && '✓'}
                                                                    </DropdownMenuItem>
                                                                ))}
                                                            </DropdownMenuSubContent>
                                                        </DropdownMenuSub>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem onClick={toggleCaptions}>
                                                            {captionsEnabled ? 'Disable' : 'Enable'} Captions
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                                <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
                                                    {isFullscreen ? <Minimize className="h-6 w-6" /> : <Maximize className="h-6 w-6" />}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    {/* instructor */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold mb-2">{currentLessonData?.title}</h1>
                        <div className="flex items-center space-x-4">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src={course?.instructor?.avatar} alt={course?.instructor?.name} />
                                <AvatarFallback>{course?.instructor?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <span className="text-muted-foreground">{course?.instructor?.name}</span>
                        </div>
                    </div>
                    {/* overview */}
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
                                    <p>This lesson covers the fundamental concepts of the current topic. You&apos;ll learn about the key principles, best practices, and how to apply them in real-world scenarios.</p>
                                    <h3 className="font-semibold mt-4 mb-2">Learning Objectives:</h3>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Understand the core concepts of the topic</li>
                                        <li>Learn how to implement the patterns in your own projects</li>
                                        <li>Recognize common pitfalls and how to  avoid them</li>
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
                {/* course progress */}
                <div>
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>Course Progress</CardTitle>
                            <CardDescription>{course?.progress}% Complete</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Progress value={course?.progress} className="mb-2" />
                            <p className="text-sm text-muted-foreground">
                                {course?.curriculum?.flatMap(s => s.lessons)?.filter(l => l.completed).length} of {course?.curriculum?.flatMap(s => s.lessons).length} lessons completed
                            </p>
                        </CardContent>
                    </Card>
                    {/* course content */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Course Content</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <ScrollArea className="h-[400px]">
                                {course && course?.curriculum?.map((section, sectionIndex) => (
                                    <div key={sectionIndex}>
                                        <div className="p-4 bg-muted">
                                            <h3 className="font-semibold">{section?.title}</h3>
                                        </div>
                                        <ul>
                                            {section?.lessons.map((lesson) => (
                                                <li key={lesson?.id} className="border-b last:border-b-0">
                                                    <button
                                                        className={`flex items-center justify-between w-full p-4 text-left hover:bg-muted/50  ${currentLesson === lesson?.id ? 'bg-muted' : ''}`}
                                                        onClick={() => {
                                                            setCurrentLesson(lesson.id);
                                                            setIsPlaying(true);
                                                        }}
                                                    >
                                                        <div className="flex items-center">
                                                            {lesson?.completed ? (
                                                                <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                                                            ) : (
                                                                <PlayCircle className="w-5 h-5 mr-2 text-primary" />
                                                            )}
                                                            <span>{lesson?.title}</span>
                                                        </div>
                                                        <span className="text-muted-foreground">{lesson?.duration}</span>
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
            {/* course martials */}
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Course Materials</CardTitle>
                    <CardDescription>Download additional resources for this course</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {course && course?.materials?.map((material, index) => (
                            <li key={index} className="flex items-center justify-between p-2 hover:bg-muted rounded-md">
                                <div className="flex items-center">
                                    <FileText className="w-5 h-5 mr-2 text-primary" />
                                    <span>{material?.title}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Badge variant="secondary">{material?.type}</Badge>
                                    <span className="text-sm text-muted-foreground">{material?.size}</span>
                                    <Button size="sm" variant="ghost">
                                        <Download className="w-4 h-4" />
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
            {/* {showToast && (
        <Toast className="fixed bottom-4 right-4 bg-primary text-primary-foreground">
          {toastMessage}
        </Toast>
      )} */}
        </div>
    )
}