import { Form, Button } from 'antd';
import { MyButtonProps } from './MyButton.props';

export const MyButton = ({ children, insideForm = false, ...props }: MyButtonProps) => {
    if (insideForm) {
        return (
            <Form.Item>
                <Button {...props}>{children}</Button>
            </Form.Item>
        );
    }

    return <Button {...props}>{children}</Button>;
};
