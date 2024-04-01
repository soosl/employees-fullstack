import { LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { MyButton } from 'components/MyButton/MyButton';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectIsAuth } from 'redux/features/auth/auth.slice';
import { useCurrentQuery, useLogoutMutation } from 'redux/services/auth';
import { PathsEnum } from 'routes';

export const UserLoginControllers = () => {
    const { isLoading } = useCurrentQuery();
    const isAuth = useSelector(selectIsAuth);

    if (isLoading) {
        return null;
    }    

    return isAuth ? <LogOutBtn /> : <LogInBtns />;
};

const LogInBtns = () => {
    return (
        <Space>
            <Link to={PathsEnum.register}>
                <MyButton type="ghost" icon={<UserOutlined />}>
                    Зарегистрироваться
                </MyButton>
            </Link>
            <Link to={PathsEnum.login}>
                <MyButton type="ghost" icon={<LoginOutlined />}>
                    Войти
                </MyButton>
            </Link>
        </Space>
    );
};

const LogOutBtn = () => {
    const [logoutUser] = useLogoutMutation();

    const handleLogoutBtn = async () => {
        await logoutUser().unwrap();
    };

    return (
        <Link to={PathsEnum.login}>
            <MyButton type="ghost" icon={<LogoutOutlined />} onClick={handleLogoutBtn}>
                Выйти
            </MyButton>
        </Link>
    );
};
