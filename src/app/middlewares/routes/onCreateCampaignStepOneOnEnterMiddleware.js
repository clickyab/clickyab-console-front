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

export default function (nextState, replace, next) {
	try {
		checkProfile();
		dispatch(createCampaign({}));

		next();
	} catch (error) {
		next();
		handleError(error);
	}
}
