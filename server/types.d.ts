import { User } from '@interfaces/User.interface';

declare module 'express-serve-static-core' {
    export interface Request {
        user?: User;
    }
}
