import { Request } from 'express';
import { User } from '@interfaces/User.interface';

export interface AuthRequest extends Request {
	user: User
}