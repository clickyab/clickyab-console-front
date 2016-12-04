export const REGISTER_SUCCESSFUL = 'REGISTER_SUCCESSFUL';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export function successfulRegister() {
	return {type: REGISTER_SUCCESSFUL};
}

export function failedRegister() {
	return {type: REGISTER_FAILED};
}