import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const movieApi = createApi({
    reducerPath: 'movieApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
    tagTypes: ['Movie'],

    endpoints: (builder) => ({
        getMovies: builder.query({
            query:() => '/movies.json',
            providesTags: ['Movie']
            
        }),
        getMovie: builder.query({
            query:(id) => `/movies/${id}.json`,
            providesTags: ['Movie']
        }),
        addMovie: builder.mutation({
            query:(requestBody) => ({
                url: '/movies.json',
                method: 'POST',
                body: requestBody
            }),
            invalidatesTags: ['Movie']
        }),
        udpateMovie: builder.mutation({
            query:(requestBody, id) => ({
                url: `/movies/${id}.json`,
                method: 'PUT',
                body: requestBody
            }),
            invalidatesTags: ['Movie']
        })
    })
});

export const {
    useGetMoviesQuery, useGetMovieQuery,
    useAddMovieMutation,
} = movieApi;