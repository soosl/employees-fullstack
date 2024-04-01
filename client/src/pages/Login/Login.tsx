import { Card, Form, Row, Space, Typography } from 'antd';
import { MyButton } from 'components/MyButton/MyButton';
import { MyInput } from 'components/MyInput/MyInput';

import styles from './Login.module.scss';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { PathsEnum } from 'routes';
import { UserData } from 'interfaces/User.interface';
import { useLoginMutation } from 'redux/services/auth';
import { getErrorMessage } from 'utils/errorWithMessage';
import { useState } from 'react';
import { Error } from 'components/Error/Error';
import { validateEmail, validatePasswordLength } from 'utils/validations';
import { useSelector } from 'react-redux';
import { selectIsAuth } from 'redux/features/auth/auth.slice';

export const Login = () => {
    const [loginUser] = useLoginMutation();
    const [error, setError] = useState<string>();
    const navigate = useNavigate();
    const isAuth = useSelector(selectIsAuth);

    if (isAuth) {
        return <Navigate to={PathsEnum.index} />;
    }

    const handleFinishForm = async (data: UserData) => {
        try {
            await loginUser(data).unwrap();

            navigate('/');
        } catch (err) {
            console.log(err);

            setError(getErrorMessage(err));
        }
    };

    return (
        <Row align={'middle'} justify={'center'} className={styles.login}>
            <Card title="Войти" className={styles.card}>
                <Form onFinish={handleFinishForm}>
                    <MyInput type="email" name="email" placeholder="Email" rules={[validateEmail]} />
                    <MyInput type="password" name="password" placeholder="Пароль" rules={[validatePasswordLength]} />
                    <MyButton type="primary" htmlType="submit">
                        Войти
                    </MyButton>
                </Form>
                <Space direction="vertical" size={'large'}>
                    <Typography.Text>
                        Нет аккаунта? <Link to={PathsEnum.register}>Зарегистрироваться</Link>
                    </Typography.Text>
                    {error && <Error message={error} />}
                </Space>
            </Card>
        </Row>
    );
};
