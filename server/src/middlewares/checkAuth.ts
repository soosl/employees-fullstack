import { prisma } from '@db/prisma-client';
import { JWT_SECRET } from 'bin/www';
import { Response, NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new Error('Нет токена в запросе');
        }

        if (!JWT_SECRET) {
            throw new Error('Нет секрета в енвах');
        }

        const decodedToken = jwt.verify(token, JWT_SECRET) as { id: string };

        const user = await prisma.user.findFirst({
            where: {
                id: decodedToken.id,
            },
        });

        if (user) {
            req.user = user;
            next();
        } else {
            throw new Error('Пользователь не найден');
        }
    } catch (err) {
        console.log(err);

        res.status(401).json({ message: 'Ошибка авторизации' });
    }
};
