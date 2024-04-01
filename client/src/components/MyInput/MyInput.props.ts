import { InputProps } from 'antd';
import { Rule } from 'antd/es/form';
import { NamePath } from 'antd/es/form/interface';

export interface MyInputProps extends InputProps {
    dependencies?: NamePath[];
    rules?: Rule[];
    required?: boolean;
}
