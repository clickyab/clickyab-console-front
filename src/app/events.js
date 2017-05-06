let $ = require("jquery");
let Ladda = require('ladda/js/ladda');
import {logout} from "./redux/actions/login";
import {navigate} from "./functions/navigate";
import {dispatch} from "./functions/dispatch";
import {
    addNotificationAction, asyncRemoveLocalStorageAction
} from "./redux/actions/index";
import getVersion from "./functions/getVersion";
import checkSubmitProfile from "./functions/checkSubmitProfile";
import {AlertBox} from "./functions/notifications";
import {select} from "./functions/select";
import {browserHistory} from "react-router";

document.body.addEventListener('unauthorized401', function () {
    dispatch(logout());
    dispatch(asyncRemoveLocalStorageAction());
    navigate('/v1/login');
});

document.body.addEventListener('bad-request400', function () {
});

document.body.addEventListener('accessDenied403', function () {
    AlertBox("warning", "شما دسترسی به این صفحه را ندارید", true);
    navigate('/v1/' + select('userType'));
});

document.body.addEventListener('error500', function () {
    let button = document.querySelector('button');
    if (button !== null) {
        let loadingProgress = Ladda.create(document.querySelector('button'));
        loadingProgress.stop();
    }
    browserHistory.goBack();
    AlertBox("error", "اختلالی در سرور به وجود آمده است لطفا دوباره تلاش کنید", true);
});

document.body.addEventListener('server-down', function () {
    $('#server-condition').css('display', 'inline-block');
    dispatch(addNotificationAction({
        type: 'server-down', message: 'server is down', time: new Date()
    }));
    navigate('/v1/' + select('userType'));
});

document.body.addEventListener('server-ok200', function () {
    $('#server-condition').css('display', 'none');
});

browserHistory.listen(function () {
    getVersion();
    checkSubmitProfile();
});