import {sync} from "../../functions/sync";
import ping from "../../functions/ping";
import { browserHistory } from 'react-router';
import {AlertBox} from "../../functions/notifications";

export default (nextState, replace, next) => sync(function*() {

    let {error, user, response} = yield ping();
    console.log($(".preloader-page").length >=0 );
    window.setTimeout(function () {
        $(".preloader-page").fadeOut();
    },3000)

    // document.getElementsByClassName("preloader-page")[0].style.display="none";
    if(response.statusCode == 200) {
        next();
        browserHistory.push('/profile');
    } else {
        browserHistory.push('/login');
        AlertBox("error","لطفا در ابتدا وارد حساب کاربری شوید")
    }
});

