export interface ErrorWithMessage {
    status: number;
    data: {
        message: string;
    };
}
