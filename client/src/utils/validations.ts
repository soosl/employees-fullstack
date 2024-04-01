import { RuleObject, RuleRender } from 'antd/es/form';

export const validateConfirmPassword: RuleRender = form => ({
    validator(_, value) {
        if (!value || form.getFieldValue('password') === value) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Пароли должны совпадать'));
    },
});

export const validateRequired: RuleObject = { required: true, message: 'Обязательное поле' };

export const validatePasswordLength: RuleObject = {
    min: 6,
    message: 'Пароль должен быть не короче 6 символов',
};

export const validateEmail: RuleObject = {
    type: 'email',
    message: 'Введите корректный E-mail',
};

export const validateAgeMin: RuleObject = {
    validator(rule, value) {
        if (Number(value) < 18) {
            return Promise.reject('Работник не может быть младше 18 лет');
        } else {
            return Promise.resolve();
        }
    },
};

export const validateAgeMax: RuleObject = {
    validator(rule, value) {
        if (Number(value) > 65) {
            return Promise.reject('Работник не может быть старше 65 лет');
        } else {
            return Promise.resolve();
        }
    },
};
