import { Card, Form, Row, Space, Typography } from 'antd';
import styles from './Register.module.scss';
import { MyInput } from 'components/MyInput/MyInput';
import { MyButton } from 'components/MyButton/MyButton';
import { Link, Navigate } from 'react-router-dom';
import { PathsEnum } from 'routes';
import { useRegisterMutation } from 'redux/services/auth';
import { useState } from 'react';
import { UserData } from 'interfaces/User.interface';
import { getErrorMessage } from 'utils/errorWithMessage';
import { validateConfirmPassword, validateEmail, validatePasswordLength } from 'utils/validations';
import { Error } from 'components/Error/Error';
import { useSelector } from 'react-redux';
import { selectIsAuth } from 'redux/features/auth/auth.slice';

export const Register = () => {
    const [regUser] = useRegisterMutation();
    const [error, setError] = useState<string>();
    const isAuth = useSelector(selectIsAuth);        

    if (isAuth) {
        return <Navigate to={PathsEnum.index} />;
    }

    const handleFinishForm = async (data: UserData) => {
        try {
            await regUser(data).unwrap();
        } catch (err) {
            setError(getErrorMessage(err));
        }
    };

    return (
        <Row align={'middle'} justify={'center'} className={styles.register}>
            <Card title="Зарегистрироваться" className={styles.card}>
                <Form onFinish={handleFinishForm}>
                    <MyInput type="text" name="name" placeholder="Имя" />
                    <MyInput type="email" name="email" placeholder="Email" rules={[validateEmail]} />
                    <MyInput type="password" name="password" placeholder="Пароль" rules={[validatePasswordLength]} />
                    <MyInput
                        type="password"
                        name="confirmPassword"
                        placeholder="Повторите пароль"
                        rules={[validateConfirmPassword]}
                        dependencies={['password']}
                    />
                    <MyButton type="primary" htmlType="submit">
                        Зарегистрироваться
                    </MyButton>
                </Form>
                <Space direction="vertical" size={'large'}>
                    <Typography.Text>
                        Уже есть аккаунт? <Link to={PathsEnum.login}>Войти</Link>
                    </Typography.Text>
                </Space>
                {error && <Error message={error} />}
            </Card>
        </Row>
    );
};
