import { DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Descriptions, Divider, Modal, Space, Spin } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { selectUser } from 'redux/features/auth/auth.slice';
import { useDeleteEmployeeMutation, useGetOneEmployeeQuery } from 'redux/services/employees';
import { PathsEnum } from 'routes';
import { Error } from 'components/Error/Error';
import { useModal } from 'hooks/useModal';
import { getErrorMessage } from 'utils/errorWithMessage';

export const EmployeesSingle = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string>();
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useGetOneEmployeeQuery(id || '');
    const [removeEmployee] = useDeleteEmployeeMutation();
    const user = useSelector(selectUser);
    const { closeModal, isModal, openModal } = useModal();

    if (isLoading) {
        return <Spin indicator={<LoadingOutlined spin />} />;
    }

    if (!data) {
        return <Navigate to={PathsEnum.index} />;
    }

    const handleRemoveEmployee = async () => {
        closeModal();

        try {
            await removeEmployee(data.id).unwrap();

            navigate(`${PathsEnum.status}/deleted`);
        } catch (err) {
            console.log(err);

            setError(getErrorMessage(err));
        }
    };

    console.log(data);

    return (
        <>
            <Descriptions title="Информация о сотруднике" bordered>
                <Descriptions.Item label="Имя" span={3}>
                    {data.firstName} {data.lastName}
                </Descriptions.Item>
                <Descriptions.Item label="Возраст" span={3}>
                    {data.age}
                </Descriptions.Item>
                <Descriptions.Item label="Адрес" span={3}>
                    {data.address}
                </Descriptions.Item>
            </Descriptions>
            {data?.userId === user?.id && (
                <>
                    <Divider orientation="left">Действия</Divider>
                    <Space>
                        <Link to={`${PathsEnum.employees}/edit/${id}`}>
                            <Button shape="round" type="default" icon={<EditOutlined />}>
                                Редактировать
                            </Button>
                        </Link>
                        <Button shape="round" danger onClick={openModal} icon={<DeleteOutlined />}>
                            Удалить
                        </Button>
                    </Space>
                </>
            )}
            {error && <Error message={error} />}
            <Modal
                title="Подтвердите удаление"
                open={isModal}
                onOk={handleRemoveEmployee}
                onCancel={closeModal}
                okText="Подтвердить"
                cancelText="Отменить"
            >
                Вы действительно хотите удалить данные сотрудника?
            </Modal>
        </>
    );
};
