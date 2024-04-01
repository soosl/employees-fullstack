import { Employee } from 'interfaces/Employee.interface';
import { api } from './api';

export const employeesApi = api.injectEndpoints({
    endpoints: builder => ({
        getAllEmployees: builder.query<Employee[], void>({
            query: () => ({
                url: '/employees',
                method: 'GET',
            }),
        }),
        getOneEmployee: builder.query<Employee, string>({
            query: id => ({
                url: `/employees/${id}`,
                method: 'GET',
            }),
        }),
        addEmployee: builder.mutation<Employee, Employee>({
            query: employee => ({
                url: `/employees/add`,
                method: 'POST',
                body: employee,
            }),
        }),
        updateEmployee: builder.mutation<Employee, Employee>({
            query: employee => ({
                url: `/employees/update/${employee.id}`,
                method: 'PUT',
                body: employee,
            }),
        }),
        deleteEmployee: builder.mutation<{ message: string; id: string }, string>({
            query: id => ({
                url: `/employees/delete/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useAddEmployeeMutation,
    useDeleteEmployeeMutation,
    useGetAllEmployeesQuery,
    useGetOneEmployeeQuery,
    useUpdateEmployeeMutation,
} = employeesApi;

export const { addEmployee, deleteEmployee, getAllEmployees, getOneEmployee, updateEmployee } = employeesApi.endpoints;
