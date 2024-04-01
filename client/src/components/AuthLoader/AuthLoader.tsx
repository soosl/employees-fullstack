import { useCurrentQuery } from 'redux/services/auth';
import { AuthProps } from './AuthLoader.props';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import styles from './AuthLoader.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { PathsEnum } from 'routes';
import { useSelector } from 'react-redux';
import { selectIsAuth } from 'redux/features/auth/auth.slice';
import { useEffect } from 'react';

export const AuthLoader = ({ children }: AuthProps) => {
    const { isLoading } = useCurrentQuery();
    const isAuth = useSelector(selectIsAuth);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading) return;

        if (!isAuth) {
            if (location.pathname !== PathsEnum.login && location.pathname !== PathsEnum.register) {
                navigate(PathsEnum.login);
            }
        }
    }, [isAuth, location.pathname, navigate, isLoading]);

    if (isLoading) {
        return (
            <Spin className={styles.authLoader} indicator={<LoadingOutlined className={styles.authSpinner} spin />} />
        );
    }

    return children;
};
