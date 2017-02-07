export default {
    comments: () => ({user}, ok, failed) => {
        if (user.rules.comments === true)
            return ok("comments");

        return failed("comments");
    },
    editComments: () => ({user}, ok, failed) => {
        if (user.rules.editComments === true)
            return ok("editComments");

        return failed("editComments");
    }
}