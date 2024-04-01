import { Layout as AntLayout, ConfigProvider, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { Header } from './Header/Header';
import styles from './Layout.module.scss';
import { AuthLoader } from 'components/AuthLoader/AuthLoader';

export const Layout = () => {
    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
            }}
        >
            <Header />
            <AntLayout className={styles.section}>
                <AntLayout.Content>
                    <div className="container">
                        <AuthLoader>
                            <Outlet />
                        </AuthLoader>
                    </div>
                </AntLayout.Content>
            </AntLayout>
        </ConfigProvider>
    );
};
