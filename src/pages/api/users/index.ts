// pages/api/users/index.ts
import { createUser, getUsers } from '@/pages/libs/db';
import { CreateUserRequest } from '@/pages/types/user';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	switch (method) {
		case 'GET':
			const users = getUsers();
			res.status(200).json(users);
			break;
		case 'POST':
			const createUserRequest: CreateUserRequest = req.body;
			if (!createUserRequest.name) {
				return res.status(400).json({ error: 'Name is required' });
			}
			const newUser = createUser(createUserRequest.name);
			res.status(201).json(newUser);
			break;
		default:
			res.setHeader('Allow', ['GET', 'POST']);
			res.status(405).end(`Method ${method} Not Allowed`);
			break;
	}
}
