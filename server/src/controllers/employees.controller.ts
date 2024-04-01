import { prisma } from '@db/prisma-client';
import { Request, Response } from 'express';

export class EmployeesController {
    static getAll = async (req: Request, res: Response) => {
        try {
            const employees = await prisma.employees.findMany();

            return res.status(200).json(employees);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Не удалось получить сотрудников' });
        }
    };

    static getOne = async (req: Request, res: Response) => {
        try {
            const employee = await prisma.employees.findFirst({ where: { id: req.params.id } });

            return res.status(200).json(employee);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Не удалось получить сотрудника' });
        }
    };

    static add = async (req: Request, res: Response) => {
        try {
            const { firstName, lastName, age, address } = req.body;

            if (!firstName || !lastName || !age || !address) {
                return res.status(400).json({ message: 'Заполните все поля' });
            }

            if (!req.user?.id) {
                throw new Error('Отстутствует user в req');
            }

            const employee = await prisma.employees.create({
                data: {
                    firstName,
                    lastName,
                    age,
                    address,
                    userId: req.user.id,
                },
            });

            return res.status(200).json(employee);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Не удалось добавить сотрудника' });
        }
    };

    static delete = async (req: Request, res: Response) => {
        try {
            // const { id } = req.body;
            const { id } = req.params;

            const employee = await prisma.employees.delete({ where: { id } });

            return res.status(204).json({
                message: `Данные сотрудника ${employee.firstName} ${employee.lastName} успешно удалены`,
                id,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Не удалось удалить данные сотрудника' });
        }
    };

    static update = async (req: Request, res: Response) => {
        try {
            // const { id, ...data } = req.body;
            const { id } = req.params;
            const data = req.body;

            if (!id) {
                res.status(400).json({ message: 'Не указан id' });
            }

            const employee = await prisma.employees.update({
                where: { id },
                data: data,
            });

            if (!employee) {
                res.status(400).json({ message: 'Сотрудник не найден' });
            }

            return res.status(200).json(employee);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Не удалось обновить данные сотрудника' });
        }
    };
}