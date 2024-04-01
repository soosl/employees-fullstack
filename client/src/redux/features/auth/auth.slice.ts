import { createSlice } from '@reduxjs/toolkit';
import { ResponseUser } from 'interfaces/User.interface';
import { authApi } from 'redux/services/auth';
import { RootState } from 'redux/store';

interface InitialState {
    user: ResponseUser | null;
    isAuth: boolean;
}

const initialState: InitialState = {
    user: null,
    isAuth: false,
};

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuth = true;
        });
        builder.addMatcher(authApi.endpoints.register.matchFulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuth = true;
        });
        builder.addMatcher(authApi.endpoints.current.matchFulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuth = true;
        });
        builder.addMatcher(authApi.endpoints.logout.matchFulfilled, state => {
            state.user = null;
            state.isAuth = false;
        });
    },
});

export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export const selectUser = (state: RootState) => state.auth.user;

export default auth.reducer;
