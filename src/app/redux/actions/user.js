export const UPDATE_USER = "UPDATE_USER";

export function updateUserInformation(user) {
	return {type: UPDATE_USER, user};
}