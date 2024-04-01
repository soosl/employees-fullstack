import { Card, Form, Space } from 'antd';
import { EmployeeFormProps } from './EmployeeForm.props';
import { MyInput } from 'components/MyInput/MyInput';
import { MyButton } from 'components/MyButton/MyButton';

import styles from './EmployeeForm.module.scss';
import { Error as ErrorComponent } from 'components/Error/Error';
import { Employee } from 'interfaces/Employee.interface';
import { useState } from 'react';
import { validateAgeMax, validateAgeMin } from 'utils/validations';
import { getErrorMessage } from 'utils/errorWithMessage';

export const EmployeeForm = ({ btnText, onFinish, title, employee }: EmployeeFormProps) => {
    const [error, setError] = useState<string>();

    const handleFinish = async (values: Employee) => {
        try {
            await onFinish(values);
        } catch (err) {
            console.log(err);

            setError(getErrorMessage(err));
        }
    };

    return (
        <Card title={title} className={styles.employeeFormWrap}>
            <Form onFinish={handleFinish} initialValues={employee}>
                <MyInput type="text" name="firstName" placeholder="Имя" />
                <MyInput type="text" name="lastName" placeholder="Фамилия" />
                <MyInput type="number" name="age" placeholder="Возраст" rules={[validateAgeMax, validateAgeMin]} />
                <MyInput type="text" name="address" placeholder="Адрес" />
                <Space>
                    {error && <ErrorComponent message={error} />}
                    <MyButton type="primary" htmlType="submit">
                        {btnText}
                    </MyButton>
                </Space>
            </Form>
        </Card>
    );
};
