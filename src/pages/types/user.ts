export interface UserResponse {
	id: number;
	name: string;
	address: string;
	hobbies: Array<string>;
}

export type User = {
	id: number;
	name: string;
};

export interface APIUserResponse {
	message: string;
	statusCode: number;
	data?: Array<any>;
}

export type CreateUserRequest = {
	name: string;
};

export type UpdateUserRequest = {
	newName: string;
};
