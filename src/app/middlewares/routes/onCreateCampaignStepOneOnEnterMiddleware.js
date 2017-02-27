import {sync} from "../../functions/sync";
import {loading} from "../../functions/loading";
import {isLoginMiddleware} from "../isLoginMiddleware";
import {handleError} from "../../functions/catchError";
import {dispatch} from "../../functions/dispatch";
import {createCampaign} from "../../redux/actions/index";
import {select} from "../../functions/select";
import {navigate} from "../../functions/navigate";
let swal = require('sweetalert');

function checkProfile() {
    if ((select('user.user_id') && (select('user.personal') || select('user.corporation')) == null) == true) {
        swal({
                title: "لطفا قبل از افزودن کمپین، اطلاعات حساب کاربری خود را تکمیل نمایید",
                text: "",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#337ab7",
                confirmButtonText: "باز کردن صفحه حساب کاربری",
                cancelButtonText: "انصراف!",
                closeOnConfirm: true,
                showLoaderOnConfirm: false,
                closeOnCancel: true,
                html: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    navigate('/v1/profile');
                } else {
                    navigate('/v1/advertiser');
                }
            });

    }
}

export default (nextState, replace, next) => sync(function*() {
    try {
        loading(true);
        // yield* isLoginMiddleware();
        checkProfile();
        dispatch(createCampaign({}));
        loading(false);
        next();

    } catch (error) {
        handleError(error);
    }
});
