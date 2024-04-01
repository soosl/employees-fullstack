import { ButtonProps } from 'antd';
import { ReactNode } from 'react';

export interface MyButtonProps extends ButtonProps {
    children: ReactNode;
    insideForm?: boolean;
}
