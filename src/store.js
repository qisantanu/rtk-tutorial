import { configureStore } from '@reduxjs/toolkit'
import { employeeApi } from './services/employeesApi'

export const store = configureStore({
    reducer: {
        [employeeApi.reducerPath]: employeeApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(employeeApi.middleware)
})