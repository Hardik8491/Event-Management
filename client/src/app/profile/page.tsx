'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { AlertCircle, User, Pencil, BookOpen, GraduationCap, Globe, Lock, Info, UserPlus, MapPin, Link } from 'lucide-react'
import { useLoadUserQuery } from '@/redux-toolkit/features/api/apiSlice'
import { useEditProfileMutation, useUpdateAvatarMutation } from '@/redux-toolkit/features/user/userApi'

interface AccountDetails {
  id: string
  name: string
  bio: string
  email: string
  publicName: string
  publicEmail: string
  role: 'student' | 'instructor' | 'admin' | "User"
  avatar: string
  profileDescription: string
  location: string
  website: string
  publicLocation: string
  publicWebsite: string
}

export default function Component() {
  const { user } = useSelector((state: any) => state.auth)
  const [account, setAccount] = useState<AccountDetails | null>(null)
  const [editProfile, { isSuccess: editSuccess, error: editError }] = useEditProfileMutation()
  const [updateAvatar, { isSuccess: avatarSuccess, error: avatarError }] = useUpdateAvatarMutation()
  const [loadUser, setLoadUser] = useState(false)
  const { } = useLoadUserQuery(undefined, { skip: !loadUser })
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (user && !account) {
      setAccount({
        id: user.id,
        name: user.name,
        bio: user.bio || '',
        email: user.email,
        publicName: user.publicName || user.name,
        publicEmail: user.publicEmail || user.email,
        role: user.role,
        avatar: user.avatar?.url || "/placeholder.jpg?height=100&width=100",
        profileDescription: user.profileDescription || '',
        location: user.location || '',
        website: user.website || '',
        publicLocation: user.publicLocation || '',
        publicWebsite: user.publicWebsite || ''
      })
    }
  }, [user])

  useEffect(() => {
    if (editSuccess || avatarSuccess) {
      setLoadUser(true)
      toast({
        title: "Profile updated",
        description: "Your account details have been successfully updated.",
      })
    }
    if (editError || avatarError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error updating your profile. Please try again.",
      })
    }
  }, [editSuccess, avatarSuccess, editError, avatarError])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (account) {
      setAccount({ ...account, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (account) {
      await editProfile(account)
      setIsEditing(false)
    }
  }

  const handleRoleChange = () => {
    if (account) {
      setAccount({ ...account, role: 'instructor' })
      toast({
        title: "Role updated",
        description: "Your account has been upgraded to an instructor role.",
        action: <ToastAction altText="View changes">View changes</ToastAction>,
      })
    }
  }

  const showWarning = () => {
    toast({
      variant: "destructive",
      title: "Warning",
      description: "Changing your public email may affect how students contact you.",
      action: <ToastAction altText="Understand">I understand</ToastAction>,
    })
  }

  const showNote = () => {
    toast({
      title: "Note",
      description: "Your profile description is visible to all students.",
      action: <ToastAction altText="Got it">Got it</ToastAction>,
    })
  }

  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileReader = new FileReader()
      fileReader.onload = () => {
        if (fileReader.readyState === 2 && typeof fileReader.result === 'string') {
          updateAvatar(fileReader.result)
        }
      }
      fileReader.readAsDataURL(e.target.files[0])
    }
  }

  if (!account) return null

  return (
    <div className="bg-muted/40 rounded-md shadow-sm border">
      <main className="px-4 py-6 sm:px-6">
        <div className="grid gap-4">
          <div className="grid gap-1">
            <h2 className="text-2xl font-bold">Profile</h2>
            <p className="text-muted-foreground">
              View and manage your profile information.
            </p>
          </div>
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 relative w-20">
                  <AvatarImage src={account.avatar} alt={account.publicName} />
                  <AvatarFallback>{account.publicName.charAt(0)}</AvatarFallback>
                  <Input
                    type="file"
                    onChange={imageHandler}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept="image/*"
                  />
                </Avatar>
                <div>
                  <CardTitle className="text-2xl font-bold">{account.publicName}</CardTitle>
                  <CardDescription>{account.publicEmail}</CardDescription>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <Badge variant="outline" className="text-sm font-semibold">
                  {account.role === 'admin' ? <User className="mr-1 h-3 w-3" /> :
                    account.role === 'student' ? <BookOpen className="mr-1 h-3 w-3" /> :
                      <GraduationCap className="mr-1 h-3 w-3" />}
                  {account.role.charAt(0).toUpperCase() + account.role.slice(1)}
                </Badge>
                <Button variant="outline" size="sm" className="mt-2" onClick={() => setIsEditing(!isEditing)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className='py-2'>
              <Tabs defaultValue="public" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="public">
                    <Globe className="mr-2 h-4 w-4" />
                    Public Profile
                  </TabsTrigger>
                  <TabsTrigger value="private">
                    <Lock className="mr-2 h-4 w-4" />
                    Account Details
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="public">
                  <div className="grid gap-4 mt-6">
                    {isEditing ? (
                      <form onSubmit={handleSubmit} className="grid gap-6">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="grid gap-2">
                            <Label htmlFor="publicName">Public Name</Label>
                            <Input id="publicName" name="publicName" value={account.publicName} onChange={handleInputChange} />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="publicEmail">Public Email</Label>
                            <div className="flex items-center space-x-2">
                              <Input id="publicEmail" name="publicEmail" type="email" value={account.publicEmail} onChange={handleInputChange} />
                              <Button type="button" variant="outline" size="icon" onClick={showWarning}>
                                <AlertCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="profileDescription">Profile Description</Label>
                          <div className="flex items-center space-x-2">
                            <Textarea
                              id="profileDescription"
                              name="profileDescription"
                              value={account.profileDescription}
                              onChange={handleInputChange}
                              rows={4}
                            />
                            <Button type="button" variant="outline" size="icon" onClick={showNote}>
                              <Info className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="grid gap-2">
                            <Label htmlFor="publicLocation">Public Location</Label>
                            <Input id="publicLocation" name="publicLocation" value={account.publicLocation} onChange={handleInputChange} />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="publicWebsite">Public Website</Label>
                            <Input id="publicWebsite" name="publicWebsite" value={account.publicWebsite} onChange={handleInputChange} />
                          </div>
                        </div>
                        <div className="block grid-cols-1 gap-4 sm:grid-cols-2">
                          <Button type="submit">Save Public Profile</Button>
                        </div>
                      </form>
                    ) : (
                      <div className="grid gap-4">
                        <div className="grid gap-1">
                          <Label className="text-sm text-muted-foreground">Public Name</Label>
                          <p className="text-lg font-medium">{account.publicName}</p>
                        </div>
                        <div className="grid gap-1">
                          <Label className="text-sm text-muted-foreground">Public Email</Label>
                          <p className="text-lg font-medium">{account.publicEmail}</p>
                        </div>
                        <div className="grid gap-1">
                          <Label className="text-sm text-muted-foreground">Profile Description</Label>
                          <p className="text-base">{account.profileDescription}</p>
                        </div>
                        <div className="grid gap-1">
                          <Label className="text-sm text-muted-foreground">Public Location</Label>
                          <p className="text-base flex items-center">
                            <MapPin className="mr-2 h-4 w-4" />
                            {account.publicLocation}
                          </p>
                        </div>
                        <div className="grid gap-1">
                          <Label className="text-sm text-muted-foreground">Public Website</Label>
                          <p className="text-base flex items-center">
                            <Link className="mr-2 h-4 w-4" />
                            <a href={account.publicWebsite} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                              {account.publicWebsite}
                            </a>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="private">
                  <div className="grid gap-4 mt-6">
                    {isEditing ? (
                      <form onSubmit={handleSubmit} className="grid gap-6">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="grid gap-2">
                            <Label htmlFor="name">Personal Name</Label>
                            <Input id="name" name="name" value={account.name} onChange={handleInputChange} />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="email">Personal Email</Label>
                            <Input id="email" name="email" type="email" value={account.email} onChange={handleInputChange} disabled />
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="bio">Bio</Label>
                          <div className="flex items-center space-x-2">
                            <Textarea
                              id="bio"
                              name="bio"
                              value={account.bio}
                              onChange={handleInputChange}
                              rows={4}
                            />
                            <Button type="button" variant="outline" size="icon" onClick={showNote}>
                              <Info className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="grid gap-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" name="location" value={account.location} onChange={handleInputChange} />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="website">Website</Label>
                            <Input id="website" name="website" value={account.website} onChange={handleInputChange} />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="grid gap-2">
                            <Label htmlFor="role">Role</Label>
                            <div className="flex items-center space-x-2">
                              <Input id="role" name="role" value={account.role} disabled />
                              {account.role === 'User' || "user" && (
                                <AlertDialog>
                                  
                                  <AlertDialogTrigger asChild>
                                    <Button variant="outline">
                                      <UserPlus className="mr-2 h-4 w-4" />
                                      Become Instructor
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Become an Instructor?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This will change your role from student to instructor. You will have additional responsibilities and access to teaching features. This action is reversible, but please consider it carefully.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={handleRoleChange}>Confirm</AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              )}
                            </div>
                          </div>
                        </div>
                        <div 
                       // className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                        >
                          <Button type="submit">Save Account Details</Button>
                        </div>
                      </form>
                    ) : (
                      <div className="grid gap-4">
                        <div className="grid gap-1">
                          <Label className="text-sm text-muted-foreground">Name</Label>
                          <p className="text-lg font-medium">{account.name}</p>
                        </div>
                        <div className="grid gap-1">
                          <Label className="text-sm text-muted-foreground">Email</Label>
                          <p className="text-lg font-medium">{account.email}</p>
                        </div>
                        <div className="grid gap-1">
                          <Label className="text-sm text-muted-foreground">Bio</Label>
                          <p className="text-base">{account.bio}</p>
                        </div>
                        <div className="grid gap-1">
                          <Label className="text-sm text-muted-foreground">Role</Label>
                          <p className="text-lg font-medium capitalize">{account.role}</p>
                        </div>
                        <div className="grid gap-1">
                          <Label className="text-sm text-muted-foreground">Location</Label>
                          <p className="text-base flex items-center">
                            <MapPin className="mr-2 h-4 w-4" />
                            {account.location}
                          </p>
                        </div>
                        <div className="grid gap-1">
                          <Label className="text-sm text-muted-foreground">Website</Label>
                          <p className="text-base flex items-center">
                            <Link className="mr-2 h-4 w-4" />
                            <a href={account.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                              {account.website}
                            </a>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button onClick={handleSubmit}>Save All Changes</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}