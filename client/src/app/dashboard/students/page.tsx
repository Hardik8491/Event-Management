// @ts-nocheck

"use client";

import { useState, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Import a types file if you have custom types defined
import {
  BarChart,
  Bell,
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Moon,
  Search,
  Settings,
  Sun,
  Users
} from "lucide-react";
import { Student } from "@/types";

// Define the types for the data
const studentsData: Student[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", course: "Computer Science", gpa: 3.8, enrollmentDate: "2021-09-01", avatar: "/placeholder.svg?height=40&width=40" },
  // Add other student data here
];

const Students = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<"name" | "gpa" | "enrollmentDate">("name");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const itemsPerPage = 6;

  const filteredAndSortedStudents = useMemo(() => {
    return studentsData
      .filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.course.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "gpa") return b.gpa - a.gpa;
        if (sortBy === "enrollmentDate") return new Date(b.enrollmentDate).getTime() - new Date(a.enrollmentDate).getTime();
        return 0;
      });
  }, [searchTerm, sortBy]);

  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedStudents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedStudents, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedStudents.length / itemsPerPage);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      <main className="flex-1 overflow-y-auto p-4">
        <h2 className="text-2xl py-4 font-bold">Students List</h2>
        <ScrollArea className="h-full">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {paginatedStudents.map(student => (
              <Card key={student.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{student.name}</CardTitle>
                  <Avatar className="h-9 w-9">
                    <AvatarImage alt={`${student.name}'s avatar`} src={student.avatar} />
                    <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">{student.email}</div>
                  <div className="text-sm font-semibold mt-1">{student.course}</div>
                  <div className="text-xs mt-1">GPA: {student.gpa}</div>
                  <div className="text-xs mt-1">Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}</div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full mt-2" variant="outline" onClick={() => setSelectedStudent(student)}>
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{selectedStudent?.name}</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Avatar className="h-20 w-20 col-span-1">
                            <AvatarImage alt={`${selectedStudent?.name}'s avatar`} src={selectedStudent?.avatar} />
                            <AvatarFallback>{selectedStudent?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="col-span-3">
                            <p><strong>Email:</strong> {selectedStudent?.email}</p>
                            <p><strong>Course:</strong> {selectedStudent?.course}</p>
                            <p><strong>GPA:</strong> {selectedStudent?.gpa}</p>
                            <p><strong>Enrolled:</strong> {new Date(selectedStudent?.enrollmentDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Subject</TableHead>
                              <TableHead>Grade</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>Mathematics</TableCell>
                              <TableCell>A</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Science</TableCell>
                              <TableCell>B+</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>History</TableCell>
                              <TableCell>A-</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </main>

      <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 border-t">
        <div>
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedStudents.length)} of {filteredAndSortedStudents.length} students
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default Students;
