export const LOGIN_SUCCESSFUL = "LOGIN_SUCCESSFUL";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT = "LOGOUT";

export function successfulLogin() {
	return {type: LOGIN_SUCCESSFUL};
}

export function failedLogin() {
	return {type: LOGIN_FAILED};
}

export function logout() {
	return {type: LOGOUT};
}