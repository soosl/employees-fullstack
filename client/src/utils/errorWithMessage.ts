import { ErrorWithMessage } from 'interfaces/ErrorWithMessage.interface';

export const isErrorWithMessage = (err: unknown): err is ErrorWithMessage => {
    if (
        err &&
        typeof err === 'object' &&
        'status' in err &&
        typeof (err as ErrorWithMessage).data === 'object' &&
        'message' in (err as ErrorWithMessage).data
    ) {
        return true;
    } else {
        return false;
    }
};

export const getErrorMessage = (err: unknown) => {
    if (err instanceof Error) {
        return err.message;
    } else if (isErrorWithMessage(err)) {
        return err.data.message;
    } else {
        return 'Произошла неизвестная ошибка';
    }
};
