import { number } from "yup";

export type Student = {
    id: number;
    name: string;
    email: string;
    course: string;
    gpa: number;
    enrollmentDate: string ;
    avatar: string;
  };
  