import React, {Component} from "react";
import SessionListPTR from "./SessionListPTR";
import swagger from "./../../swagger/index";
import {getToken} from "../../redux/helpers";
import {AlertBox} from "../../functions/notifications";
import {connect} from "react-redux";
import {dispatch} from "../../functions/dispatch";
import {sessionListAction} from "../../redux/actions/index";
import {sync} from "../../functions/sync";
let swal = require('sweetalert');

@connect(({sessionList}) => ({sessionList}))
export default class SessionListCTR extends Component {
    deleteSession(e) {
        let key = e.target.attributes['data-key'].value;
        swal({
                title: "از حذف این سشن اطمینان دارید؟",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#ed6b75",
                confirmButtonText: "بله سشن را پاک کن",
                cancelButtonText: "انصراف!",
                closeOnConfirm: true,
                showLoaderOnConfirm: true,
                closeOnCancel: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    sync(function *(){
                        let {data, response} = yield (new swagger.UserApi())
                            .userSessionTerminateIdGet(key, getToken());

                        if (response.statusCode == '200') {
                            console.log(data);
                            dispatch(sessionListAction(data));
                            AlertBox("success", "سشن با موفقیت حذف گردید");
                        } else if (response.statusCode == '400') {
                            AlertBox("error", "اختلالی در سرور به وجود آمده است لطفا دوباره تلاش کنید", true);
                        }
                    })
                }
            }
        );
    }
    render() {
        return (<SessionListPTR deleteSession={this.deleteSession} sessionList={this.props.sessionList}/>);
    }
}
