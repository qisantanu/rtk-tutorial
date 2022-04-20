import { configureStore } from '@reduxjs/toolkit'
import { employeeApi } from './services/employeesApi'
import { movieApi } from './services/moviesApi'

export const store = configureStore({
    reducer: {
        [movieApi.reducerPath]: movieApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(movieApi.middleware)
})
