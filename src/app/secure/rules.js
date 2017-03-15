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
    canSeeSideBarTranslateList: () => ({user: {perm}}, ok, failed) => {
        let all_permissions = permissions(perm);
        if (god(all_permissions) || all_permissions.includes('translate_list'))
            return ok("comments");

        return failed("comments");
    },
    canSeeSideBarChannelList: () => ({user: {perm}}, ok, failed) => {
        let all_permissions = permissions(perm);
        if (god(all_permissions) || all_permissions.includes('channel_list'))
            return ok("comments");

        return failed("comments");
    },
    canSeeSideBarBillingList: () => ({user: {perm}}, ok, failed) => {
        let all_permissions = permissions(perm);
        if (god(all_permissions) || all_permissions.includes('billing_list'))
            return ok("comments");

        return failed("comments");
    },
    canSeeSideBarTelegramUserList: () => ({user: {perm}}, ok, failed) => {
        let all_permissions = permissions(perm);
        if (god(all_permissions) || all_permissions.includes('teleuser_list'))
            return ok("comments");

        return failed("comments");
    },
    canSeeCreateChannel: () => ({user: {perm}}, ok, failed) => {
        let all_permissions = permissions(perm);
        if (god(all_permissions) || all_permissions.includes('create_channel'))
            return ok("comments");

        return failed("comments");
    },
    canSeeCreateAd: () => ({user: {perm}}, ok, failed) => {
        let all_permissions = permissions(perm);
        if (god(all_permissions) || all_permissions.includes('create_ad'))
            return ok("comments");

        return failed("comments");
    },
    canSeeAdList: () => ({user: {perm}}, ok, failed) => {
        let all_permissions = permissions(perm);
        if (god(all_permissions) || all_permissions.includes('ad_list'))
            return ok("comments");

        return failed("comments");
    },
    canSeeAdvertiserPieChart: () => ({user: {perm}}, ok, failed) => {
        let all_permissions = permissions(perm);
        if (god(all_permissions) || all_permissions.includes('pie_chart_advertiser'))
            return ok("comments");

        return failed("comments");
    },
    canSeePromoteAd: () => ({user: {perm}}, ok, failed) => { //In create campaign
        let all_permissions = permissions(perm);
        if (god(all_permissions) || all_permissions.includes('promote_ad'))
            return ok("comments");

        return failed("comments");
    },


}