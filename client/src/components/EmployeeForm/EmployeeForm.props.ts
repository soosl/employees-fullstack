import { Employee } from 'interfaces/Employee.interface';

export interface EmployeeFormProps {
    onFinish: (values: Employee) => Promise<void>;
    btnText: string;
    title: string;
    employee?: Employee;
}
