export function handleError(error) {
	if (error.recover) {
		error.recover();
	} else {
		console.log(error);
	}
}