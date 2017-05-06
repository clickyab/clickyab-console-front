import React, {PropTypes} from "react";
import {getGravatarFromEmail} from "../../functions/gravatar";
import {getEmail} from "./../../redux/helpers";
import {translate} from "./../../functions/translate";
import {getCorporationTitle, getFullName} from "../../redux/helpers";
import {select} from "../../functions/select";

function userAvatar() {
    return getGravatarFromEmail(getEmail(), 200);
}

export default function ProfileSidebarPTR(props) {
    let initData;
    if ((select('user.personal.first_name')) !== null) {
        initData = getFullName();
    } else {
        initData = getCorporationTitle();
    }

    return (
        <div className="profile-sidebar">
            <div className="portlet light profile-sidebar-portlet ">
                <div className="profile-userpic">
                    <img src={userAvatar()} className="img-responsive" alt=""/></div>
                <div className="profile-usertitle">
                    <div className="profile-usertitle-name"> {initData}  </div>
                </div>
                <div className="profile-userbuttons" style={{paddingBottom: '30px'}}>
                    <button type="button" className="btn btn-circle red btn-sm logout-btn" onClick={props.SubmitLogout}>
                        {translate('Logout')}
                    </button>
                </div>
            </div>
        </div>
    )
}

ProfileSidebarPTR.propTypes = {
    SubmitLogout: PropTypes.func
};