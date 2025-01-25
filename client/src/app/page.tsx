"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import EventForm from "@/components/EventForm";
import EventList from "@/components/EventList";
import Dashboard from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();



  const handleCreateEvent = async (formData: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      if (response.ok) {
        toast({
          title: "Event Created",
          description: "The event has been successfully created.",
        });
      } else if (response.status === 401 || response.status === 403) {
        toast({
          title: "Authentication Error",
          description: "Your session has expired. Please log in again.",
          variant: "destructive",
        });
        logout();
      } else {
        throw new Error("Failed to create event");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      toast({
        title: "Error",
        description: "Failed to create event. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Event Management</h1>
        <Button onClick={logout}>Logout</Button>
      </div>
      <Tabs defaultValue="dashboard">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="add-event">Add Event</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <Dashboard />
        </TabsContent>
        <TabsContent value="events">
          <EventList />
        </TabsContent>
        <TabsContent value="add-event">
          <EventForm onSubmit={handleCreateEvent} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
