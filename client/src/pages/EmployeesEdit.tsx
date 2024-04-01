import { LoadingOutlined } from '@ant-design/icons';
import { Row, Spin } from 'antd';
import { EmployeeForm } from 'components/EmployeeForm/EmployeeForm';
import { Employee } from 'interfaces/Employee.interface';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { selectUser } from 'redux/features/auth/auth.slice';
import { useGetOneEmployeeQuery, useUpdateEmployeeMutation } from 'redux/services/employees';
import { PathsEnum } from 'routes';

export const EmployeesEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useGetOneEmployeeQuery(id || '');
    const [updateEmployee] = useUpdateEmployeeMutation();
    const user = useSelector(selectUser);

    if (isLoading) {
        return <Spin indicator={<LoadingOutlined spin />} />;
    }

    if (!data || data?.userId !== user?.id) {
        return <Navigate to={PathsEnum.index} />;
    }

    const handleUpdateEmployee = async (employee: Employee) => {
        await updateEmployee({ ...data, ...employee }).unwrap();
        navigate(PathsEnum.status + '/updated');
    };
    
    return (
        <Row align={'middle'} justify={'center'}>
            <EmployeeForm
                title="Редактировать сотрудника"
                btnText="Редактировать"
                onFinish={handleUpdateEmployee}
                employee={data}
            />
        </Row>
    );
};
