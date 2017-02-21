function permissions(permissions) {
    let options = [];

    if (!permissions)
        return options;

    if (permissions.self)
        for (let permission in permissions.self) {
            options.push(permissions.self[permission]);
        }

    if (permissions.parent)
        for (let permission in permissions.parent) {
            options.push(permissions.parent[permission]);
        }


    if (permissions.global)
        for (let permission in permissions.global) {
            options.push(permissions.global[permission]);
        }


    return options;
}

function god(permissions) {
    return permissions.includes('god');
}

export default {
    canSeeSidebarRoleList: () => ({user: {perm}}, ok, failed) => {
        let all_permissions = permissions(perm);
        if (god(all_permissions) || all_permissions.includes('get_all_roles'))
            return ok("comments");

        return failed("comments");
    },
    canSeeSidebarManageUser: () => ({user: {perm}}, ok, failed) => {
        let all_permissions = permissions(perm);
        if (god(all_permissions) || all_permissions.includes('user_list'))
            return ok("comments");

        return failed("comments");
    },


}