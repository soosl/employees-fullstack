import { PlusCircleOutlined } from '@ant-design/icons';
import { Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { MyButton } from 'components/MyButton/MyButton';
import { Employee } from 'interfaces/Employee.interface';
import { useNavigate } from 'react-router-dom';
import { useGetAllEmployeesQuery } from 'redux/services/employees';
import { PathsEnum } from 'routes';

const NAME_INDEX = 'firstName';
const AGE_INDEX = 'age';
const ADDR_INDEX = 'address';

const columns: ColumnsType<Employee> = [
    {
        title: 'Имя',
        dataIndex: NAME_INDEX,
        key: NAME_INDEX,
    },
    {
        title: 'Возраст',
        dataIndex: AGE_INDEX,
        key: AGE_INDEX,
    },
    {
        title: 'Адрес',
        dataIndex: ADDR_INDEX,
        key: ADDR_INDEX,
    },
];

export const Home = () => {
    const { isLoading, data } = useGetAllEmployeesQuery();
    const navigate = useNavigate();

    const handleAddBtn = () => {
        navigate(PathsEnum.employeesAdd);
    };

    return (
        <Space direction="vertical" style={{ width: '100%' }} size={'middle'}>
            <MyButton type="primary" icon={<PlusCircleOutlined />} onClick={handleAddBtn}>
                Добавить
            </MyButton>
            <Table
                loading={isLoading}
                dataSource={data}
                columns={columns}
                rowKey={employee => employee.id}
                onRow={employee => {
                    return {
                        onClick: () => navigate(`${PathsEnum.employees}/${employee.id}`),
                    };
                }}
                pagination={false}
            />
        </Space>
    );
};
