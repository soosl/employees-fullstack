import { Row, Space } from 'antd';
import { MyButton } from 'components/MyButton/MyButton';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Row>
            <Space>
                <h1>Страница не найдена</h1>
                <MyButton type="primary" onClick={handleGoBack}>
                    Вернуться назад
                </MyButton>
            </Space>
        </Row>
    );
};
