import { Layout } from 'layout/Layout';
import { Home } from './pages/Home';
import { RouteObject } from 'react-router-dom';
import { Employees } from './pages/Employees';
import { EmployeesSingle } from './pages/EmployeesSingle';
import { EmployeesAdd } from './pages/EmployeesAdd';
import { EmployeesEdit } from './pages/EmployeesEdit';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { StatusCode } from 'pages/StatusCode/StatusCode';
import { NotFound } from 'pages/NotFound';

export enum PathsEnum {
    index = '/',
    employees = '/employees',
    employeesId = '/employees/:id',
    employeesAdd = '/employees/add',
    employeesEdit = '/employees/edit/:id',
    status = '/status',
    statusCode = '/status/:code',
    login = '/login',
    register = '/register',
    notFound = '/notFound',
}

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: PathsEnum.index,
                element: <Home />,
            },
            {
                path: PathsEnum.employees,
                element: <Employees />,
            },

            { path: PathsEnum.employeesId, element: <EmployeesSingle /> },
            { path: PathsEnum.employeesAdd, element: <EmployeesAdd /> },
            { path: PathsEnum.employeesEdit, element: <EmployeesEdit /> },
            { path: PathsEnum.statusCode, element: <StatusCode /> },
            { path: PathsEnum.login, element: <Login /> },
            { path: PathsEnum.register, element: <Register /> },
            { path: '*', element: <NotFound /> },
        ],
    },
];
