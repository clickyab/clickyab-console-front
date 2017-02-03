export default {
	comments: () => ({user}, ok, failed) => {
		return ok("comments");
	},
	editComments: () => ({user}, ok, failed) => {
		return ok("editComments");
	}
}