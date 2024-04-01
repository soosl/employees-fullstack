import { configureStore } from '@reduxjs/toolkit';
import { api } from './services/api';

import auth from './features/auth/auth.slice';
import employees from './features/employees/employees.slice';
import { authMiddleware } from 'middlewares/auth';

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth,
        employees,
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(authMiddleware.middleware, api.middleware);
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
