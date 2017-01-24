export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_PERSONAL_INFO = 'UPDATE_PERSONAL_INFO';
export const UPDATE_CORPORATION_INFO = 'UPDATE_CORPORATION_INFO';
export const DETELE_PERSONAL_INFO = 'DETELE_PERSONAL_INFO';
export const DETELE_CORPORATION_INFO = 'DETELE_CORPORATION_INFO';

export function updateUserInformation(user) {
	return {type: UPDATE_USER, user};
}

export function updatePersonalInformation(personal) {
	return {type: UPDATE_PERSONAL_INFO, personal};
}

export function deletePersonalInformation() {
	return {type: DETELE_PERSONAL_INFO};
}

export function updateCorporationInformation(corporation) {
	return {type: UPDATE_CORPORATION_INFO, corporation};
}

export function deleteCorporationInformation() {
	return {type: DETELE_CORPORATION_INFO};
}