import { APIUserResponse, User, UserResponse } from '../types/user';

let users: User[] = [
	{ id: 1, name: 'John Doe' },
	{ id: 2, name: 'Jane Doe' },
];

export function getUsers(): APIUserResponse {
	return {
		message: 'users data retrieved successfully',
		statusCode: 200,
		data: users,
	};
}

export function getUserById(id: number): APIUserResponse | undefined {
	const user = users.find((user) => user.id === id);

	if (user) {
		return {
			message: 'user data retrieved successfully',
			statusCode: 200,
			data: [user],
		};
	} else {
		return {
			message: 'user not found',
			statusCode: 404,
		};
	}
}

export function createUser(name: string): User {
	const newUser: User = {
		id: users.length + 1,
		name,
	};
	users.push(newUser);
	return newUser;
}

export function updateUser(id: number, newName: string): APIUserResponse | null {
	const user = users.find((user) => user.id === id);
	if (user) {
		user.name = newName;
		return {
			message: 'users data updated successfully',
			statusCode: 200,
			data: [user],
		};
	}
	return null;
}

export function deleteUser(id: number): APIUserResponse | null {
	const index = users.findIndex((user) => user.id === id);

	if (index !== -1) {
		const userDeleted = users.splice(index, 1);
		console.log(userDeleted);
		return {
			message: 'users data deleted successfully',
			statusCode: 200,
			data: userDeleted,
		};
	}
	return null;
}
