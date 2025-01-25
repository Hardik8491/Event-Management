import { useState, useEffect } from "react"
import { useAuth } from "./useAuth"

interface Category {
  _id: string
  name: string
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])


  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
        credentials: "include",
      })
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      } else {
        throw new Error("Failed to fetch categories")
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const addCategory = async (name: string) => {
    console.log(name);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({name}),
      })
      if (response.ok) {
        const newCategory = await response.json()
        setCategories([...categories, newCategory])
        return newCategory
      } else {
        throw new Error("Failed to add category")
      }
    } catch (error) {
      console.error("Error adding category:", error)
      throw error
    }
  }

  return { categories, addCategory }
}

