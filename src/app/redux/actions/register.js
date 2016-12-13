export const REGISTER_SUCCESSFUL = 'REGISTER_SUCCESSFUL';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export function successfulRegister(email , token , id) {
	return {
		type: REGISTER_SUCCESSFUL,
		email,
		token,
		id
	};
}

export function failedRegister() {
	return {type: REGISTER_FAILED};
}