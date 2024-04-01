import { ErrorProps } from './Error.props';
import { Alert } from 'antd';

export const Error = ({ message }: ErrorProps) => {
    return <Alert message={message} type="error" />;
};
