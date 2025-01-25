"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useCategories } from "@/hooks/useCategories";

interface EventFormProps {
  event?: Event;
  onSubmit: (formData: any) => Promise<void>;
}

interface Event {
  _id?: string;
  name: string;
  surname: string;
  fatherName: string;
  village: string;
  amount: string;
  category: string;
  startTime?: string;
  endTime?: string;
}

export default function EventForm({ event, onSubmit }: EventFormProps) {
  const [formData, setFormData] = useState<Event>(
    event || {
      name: "",
      surname: "",
      fatherName: "",
      village: "",
      amount: "",
      category: "",
    }
  );
  const { toast } = useToast();

  const { categories, addCategory } = useCategories();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (value: string) => {
    setFormData({ ...formData, category: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      if (!event) {
        setFormData({
          name: "",
          surname: "",
          fatherName: "",
          village: "",
          amount: "",
          category: "",
        });
      }

      toast({
        title: event ? "Event updated" : "Event created",
        description: `Your event has been successfully ${
          event ? "updated" : "created"
        }.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${
          event ? "update" : "create"
        } event. Please try again.`,
        variant: "destructive",
      });
    }
  };

  const handleAddCategory = async () => {
    const categoryName = prompt("Enter new category name:");
    if (categoryName) {
      try {
        await addCategory(categoryName);
        toast({
          title: "Category added",
          description: "New category has been successfully added.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to add new category. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="surname"
        value={formData.surname}
        onChange={handleChange}
        placeholder="Surname"
        required
      />
      <Input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Event Name"
        required
      />

      <Input
        name="fatherName"
        value={formData.fatherName}
        onChange={handleChange}
        placeholder="Father's Name"
        required
      />
      <Input
        name="village"
        value={formData.village}
        onChange={handleChange}
        placeholder="Village"
        required
      />
      <Input
        name="amount"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Amount"
        required
      />
      <div className="flex space-x-2">
        <Select onValueChange={handleCategoryChange} value={formData.category}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category._id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="button" onClick={handleAddCategory}>
          Add Category
        </Button>
      </div>

      <Button type="submit" className="w-full">
        {event ? "Update" : "Add"} Event
      </Button>
    </form>
  );
}
