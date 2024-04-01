import { Form, Input } from 'antd';
import { MyInputProps } from './MyInput.props';
import { Rule } from 'antd/es/form';
import { validateRequired } from 'utils/validations';

export const MyInput = ({ size = 'large', rules = [], dependencies = [], required = true, ...props }: MyInputProps) => {
    const validation: Rule[] = [...rules];

    if (required) {
        validation.push(validateRequired);
    }

    if (props.type === 'password') {
        return (
            <Form.Item rules={validation} dependencies={dependencies} name={props.name} hasFeedback>
                <Input.Password {...props} size={size} />
            </Form.Item>
        );
    }

    return (
        <Form.Item rules={validation} name={props.name} hasFeedback>
            <Input {...props} size={size} />
        </Form.Item>
    );
};
