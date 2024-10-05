import { deleteUser, getUserById, updateUser } from '@/pages/libs/db';
import { UpdateUserRequest } from '@/pages/types/user';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;
	const { id } = req.query;
	console.log(req.query);
	switch (method) {
		case 'GET':
			const user = getUserById(Number(id));

			if (!user) {
				return res.status(404).json({ error: 'User not found' });
			}

			res.status(200).json(user);
			break;
		case 'PUT':
			const updateUserRequest: UpdateUserRequest = req.body;

			if (!updateUserRequest.newName) {
				return res.status(400).json({ error: 'New name is required' });
			}

			const updatedUser = updateUser(Number(id), updateUserRequest.newName);

			if (!updatedUser) {
				return res.status(404).json({ error: 'User not found' });
			}

			res.status(200).json(updatedUser);
			break;
		case 'DELETE':
			const deletedUser = deleteUser(Number(id));

			if (!deletedUser) {
				return res.status(404).json({ error: 'User not found' });
			}

			res.status(200).json(deletedUser);
			break;
		default:
			res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
			res.status(405).end(`Method ${method} Not Allowed`);
			break;
	}
}
