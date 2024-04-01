import { Layout as AntLayout, Row, Space, Typography } from 'antd';
import styles from './Header.module.scss';
import { TeamOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { PathsEnum } from 'routes';
import { UserLoginControllers } from 'components/UserLoginControllers/UserLoginControllers';

export const Header = () => {
    return (
        <AntLayout.Header className={styles.header}>
            <div className="container">
                <Row align={'middle'} justify={'space-between'} wrap={false}>
                    <Link to={PathsEnum.index} className={styles.link}>
                        {/* <MyButton type="ghost"> */}
                        <Space align="center">
                            <TeamOutlined className={styles.teamIcon} />
                            <Typography.Title level={1} className={styles.title}>
                                Сотрудники
                            </Typography.Title>
                        </Space>
                        {/* </MyButton> */}
                    </Link>
                    <UserLoginControllers />
                </Row>
            </div>
        </AntLayout.Header>
    );
};
