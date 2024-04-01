import { createListenerMiddleware } from '@reduxjs/toolkit';
import { authApi } from 'redux/services/auth';

export const authMiddleware = createListenerMiddleware();

authMiddleware.startListening({
    matcher: authApi.endpoints.login.matchFulfilled,
    effect: (action, listenerApi) => {
        listenerApi.cancelActiveListeners();

        if (action.payload.token) {
            localStorage.setItem('token', action.payload.token);
        }
    },
});

authMiddleware.startListening({
    matcher: authApi.endpoints.register.matchFulfilled,
    effect: (action, listenerApi) => {
        listenerApi.cancelActiveListeners();

        if (action.payload.token) {
            localStorage.setItem('token', action.payload.token);
        }
    },
});

authMiddleware.startListening({
    matcher: authApi.endpoints.logout.matchFulfilled,
    effect: (action, listenerApi) => {
        listenerApi.cancelActiveListeners();

        localStorage.removeItem('token');
    },
});
