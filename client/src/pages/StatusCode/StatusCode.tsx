import { Button, Result, Row } from 'antd';
import { Link, Navigate, useParams } from 'react-router-dom';

import styles from './StatusCode.module.scss';
import { PathsEnum } from 'routes';

const statusMap = {
    created: 'Информация о работнике успешно добавлена',
    updated: 'Информация о работнике успешно обновлена',
    deleted: 'Информация о работнике успешно удалена',
};

export const StatusCode = () => {
    const { code } = useParams();

    const title = statusMap[code as keyof typeof statusMap];

    if (!title) {
        return <Navigate to={PathsEnum.index} />;
    }

    return (
        <Row align={'middle'} justify={'center'} className={styles.statusCode}>
            <Result
                status={code ? 'success' : 404}
                title={title || 'Не найдено'}
                extra={
                    <Link to={PathsEnum.index}>
                        <Button>На главную</Button>
                    </Link>
                }
            />
        </Row>
    );
};
