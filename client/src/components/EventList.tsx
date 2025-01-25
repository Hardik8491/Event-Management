"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import type { DateRange } from "react-day-picker"
import io from "socket.io-client"
import { useAuth } from "@/hooks/useAuth"
import { useCategories } from "@/hooks/useCategories"
import EventForm from "./EventForm"
import { DateRangePicker } from "./date-range-picker"

interface Event {
  _id: string
  name: string
  surname: string
  fatherName: string
  village: string
  amount: number
  category: string
  startTime?: string
  endTime?: string
  duration?: number
}

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([])
  const [category, setCategory] = useState("All")
  const [search, setSearch] = useState("")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { toast } = useToast()
  const { categories } = useCategories()

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL as string)

    socket.on("newEvent", (newEvent: Event) => {
      setEvents((prevEvents) => [...prevEvents, newEvent])
    })

    socket.on("updateEvent", (updatedEvent: Event) => {
      setEvents((prevEvents) => prevEvents.map((event) => (event._id === updatedEvent._id ? updatedEvent : event)))
    })

    socket.on("deleteEvent", (deletedId: string) => {
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== deletedId))
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    fetchEvents()
  }, [category, search, dateRange, page])

  const fetchEvents = async () => {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: "10",
      })
      if (category !== "All") {
        queryParams.append("category", category)
      }
      if (search) {
        queryParams.append("search", search)
      }
      if (dateRange?.from && dateRange?.to) {
        queryParams.append("startDate", dateRange.from.toISOString())
        queryParams.append("endDate", dateRange.to.toISOString())
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events?${queryParams}` ,{
        credentials: "include"
      })
      if (response.ok) {
        const data = await response.json()
        setEvents(data.events)
        setTotalPages(data.totalPages)
      } else {
        throw new Error("Failed to fetch events")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch events. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
      if (response.ok) {
        setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id))
        toast({
          title: "Event deleted",
          description: "Event has been successfully deleted.",
        })
      } else {
        throw new Error("Failed to delete event")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete event. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUpdate = async (updatedEvent: Event) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${updatedEvent._id}`, {
        method: "PUT",
        body: JSON.stringify(updatedEvent),
        credentials: "include",
      })
      if (response.ok) {
        setEvents((prevEvents) => prevEvents.map((event) => (event._id === updatedEvent._id ? updatedEvent : event)))
        toast({
          title: "Event updated",
          description: "Event has been successfully updated.",
        })
      } else {
        throw new Error("Failed to update event")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update event. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          placeholder="Search by name, surname or village"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow"
        />
        <Select onValueChange={setCategory} value={category}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat._id} value={cat.name}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DateRangePicker value={dateRange} onValueChange={setDateRange} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Surname</TableHead>
            <TableHead>Father's Name</TableHead>
            <TableHead>Village</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event._id}>
              <TableCell>{event.name}</TableCell>
              <TableCell>{event.surname}</TableCell>
              <TableCell>{event.fatherName}</TableCell>
              <TableCell>{event.village}</TableCell>
              <TableCell>{event.amount}</TableCell>
              <TableCell>{event.category}</TableCell>
              <TableCell>{event.duration ? `${event.duration} minutes` : "N/A"}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Edit</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Event</DialogTitle>
                    </DialogHeader>
                    <EventForm event={event} onSubmit={handleUpdate} />
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" onClick={() => handleDelete(event._id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <Button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          Previous
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
          Next
        </Button>
      </div>
    </div>
  )
}

