import { createSlice } from '@reduxjs/toolkit';
import { Employee } from 'interfaces/Employee.interface';
import { employeesApi } from 'redux/services/employees';
import { RootState } from 'redux/store';

interface InitialState {
    employees: Employee[];
}

const initialState: InitialState = {
    employees: [],
};

const employees = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        logOut: () => initialState,
    },
    extraReducers: builder => {
        builder.addMatcher(employeesApi.endpoints.getAllEmployees.matchFulfilled, (state, action) => {
            state.employees = action.payload;
        });
        builder.addMatcher(employeesApi.endpoints.addEmployee.matchFulfilled, (state, action) => {
            state.employees.push(action.payload);
        });
    },
});

export const selectEmployees = (state: RootState) => state.employees.employees;

export default employees.reducer;
