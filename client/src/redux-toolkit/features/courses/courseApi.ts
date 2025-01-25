
//@ts-nocheck
import { apiSlice } from '../api/apiSlice';

export const courseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCourse: builder.mutation<void, Course>({
            query: (data) => ({
                url: 'create-course',
                method: 'POST',
                body: data,
                credentials: 'include' as const,
            }),
        }),
        getAllCourse: builder.query<Course[], void>({
            query: () => ({
                url: 'get-courses',
                method: 'GET',
                credentials: 'include' as const,
            }),
        }),
    }),
    overrideExisting: false, // Optional: to prevent overriding existing endpoints
});

export const { useCreateCourseMutation, useGetAllCourseQuery } = courseApi;
