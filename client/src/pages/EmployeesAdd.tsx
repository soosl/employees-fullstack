import { Row } from 'antd';
import { EmployeeForm } from 'components/EmployeeForm/EmployeeForm';
import { Employee } from 'interfaces/Employee.interface';
import { useNavigate } from 'react-router-dom';
import { useAddEmployeeMutation } from 'redux/services/employees';
import { PathsEnum } from 'routes';

export const EmployeesAdd = () => {
    const [addEmployee] = useAddEmployeeMutation();
    const navigate = useNavigate();

    const handleAddEmployee = async (data: Employee) => {
        await addEmployee(data);
        navigate(`${PathsEnum.status}/created`);
    };

    return (
        <Row align={'middle'} justify={'center'}>
            <EmployeeForm title="Добавить сотрудника" btnText="Добавить" onFinish={handleAddEmployee} />
        </Row>
    );
};
