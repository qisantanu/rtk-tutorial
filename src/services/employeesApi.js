import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const employeeApi = createApi({
    reducerPath: 'employeeApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://dummy.restapiexample.com/' }),
    endpoints: (builder) => ({
        getEmployees: builder.query({
            query:() => '/api/v1/employees'
        }),
        getEmployee: builder.query({
            query:(id) => `/api/v1/employee/${id}`
        }),
        //addEmployee: createMutation(builder, 'api/v1/create'),
        addEmployee: builder.mutation({
            query:(requestBody) => ({
                url: 'api/v1/create',
                method: 'POST',
                body: requestBody
            })
        }),
        updateEmployee: builder.mutation({
            query:(requestBody, id) => ({
                url: `api/v1/update/${id}`,
                method: 'PUT',
                body: requestBody
            })
        })
    })
});

const createMutation = (builder, path) => {
    return builder.mutation({
        query: (requestBody) => ({
        url: path,
        method: "POST",
        body: requestBody,
        }),
    });
};

const updateMutation = (builder, path) => {
    return builder.mutation({
        query: ({ id, ...requestBody }) => ({
        url: `${path}/${id}`,
        method: "PATCH",
        body: requestBody,
        }),
    });
};

const deleteMutation = (builder, path) => {
    return builder.mutation({
        query: (id) => ({
        url: `${path}/${id}`,
        method: "DELETE",
        }),
    });
};

export const {
    useGetEmployeesQuery, useGetEmployeeQuery, 
    useAddEmployeeMutation, useUpdateEmployeeMutation,
} = employeeApi;