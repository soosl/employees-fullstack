import { Request, Response } from 'express';
import { prisma } from '@db/prisma-client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UsersController {
    private static JWT_SECRET = process.env.JWT_SECRET;

    static login = async (req: Request, res: Response) => {
        try {
            if (!this.JWT_SECRET) {
                throw new Error('Нет секрета в енвах');
            }

            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Заполните обязательные поля' });
            }

            const user = await prisma.user.findFirst({
                where: { email },
            });

            const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));

            if (isPasswordCorrect) {
                return res.status(200).json({
                    email: user.email,
                    name: user.name,
                    id: user.id,
                    token: jwt.sign({ id: user.id }, this.JWT_SECRET, { expiresIn: '10 h' }),
                });
            } else {
                return res.status(400).json({ message: 'Неверный логин или пароль' });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Не удалось залогиниться' });
        }
    };

    static logout = async (req: Request, res: Response) => {
        try {
            return res.status(200).json({ message: 'Выход выполнен успешно' });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Не удалось выйти из аккаунта' });
        }
    };

    static register = async (req: Request, res: Response) => {
        try {
            const { email, password, name } = req.body;

            if (!email || !password || !name) {
                return res.status(400).json({ message: 'Заполните обязательные поля' });
            }

            const registeredUser = await prisma.user.findFirst({
                where: { email },
            });

            if (registeredUser) {
                return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await prisma.user.create({
                data: {
                    email,
                    name,
                    password: hashedPassword,
                },
            });

            if (newUser && this.JWT_SECRET) {
                return res.status(201).json({
                    email: newUser.email,
                    name: newUser.name,
                    id: newUser.id,
                    token: jwt.sign({ id: newUser.id }, this.JWT_SECRET, { expiresIn: '10 h' }),
                });
            } else {
                return res.status(500).json({ message: 'Не удалось создать пользователя' });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Не удалось зарегистрироваться' });
        }
    };

    static current = async (req: Request, res: Response) => {
        try {
            return res.status(200).json(req.user);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Не удалось получить текущего пользователя' });
        }
    };
}
