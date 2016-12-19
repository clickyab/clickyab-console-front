import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import { Link } from 'react-router'
import PersonalUserCTR from './PersonalUserCTR'
import CorporationUserCTR from './CorporationUserCTR'
import ProfileSidebarPTR from './ProfileSidebarPTR'
import SelectUserTypePTR from './SelectUserTypePTR'
import ChangePasswordPTR from './ChangePasswordPTR'

class UserProfilePTR extends Component {


    render() {
        return (
            <div className="page-content">
                <h1 className="page-title"> ویرایش پروفایل
                </h1>

                <div className="row">
                    <div className="col-md-12">
                        <ProfileSidebarPTR/>
                        <div className="profile-content">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="portlet light ">
                                        <div className="portlet-title tabbable-line">
                                            <div className="caption caption-md">
                                                <i className="icon-globe theme-font hide"/>
                                                <span className="caption-subject font-blue-madison bold uppercase">اطلاعات پروفایل</span>
                                            </div>
                                            <ul className="nav nav-tabs">
                                                <li className="active">
                                                    <a href="#tab_1_1" data-toggle="tab">ویرایش و تکمیل اطلاعات</a>
                                                </li>
                                                <li>
                                                    <a href="#tab_1_2" data-toggle="tab">Sesstion های فعال</a>
                                                </li>
                                                <li>
                                                    <a href="#tab_1_3" data-toggle="tab">تغییر کلمه عبور</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="portlet-body">
                                            <div className="tab-content">
                                                <div className="tab-pane active" id="tab_1_1">
                                                    <SelectUserTypePTR/>
                                                    <PersonalUserCTR/>
                                                    <CorporationUserCTR/>

                                                </div>
                                                <div className="tab-pane" id="tab_1_2">

                                                </div>
                                                <div className="tab-pane" id="tab_1_3">
                                                    <ChangePasswordPTR/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UserProfilePTR.propTypes = {
    email: React.PropTypes.string,
    repeat_password: React.PropTypes.string,
    register: React.PropTypes.string,
    password: React.PropTypes.string,
};

export default reduxForm({
    form: 'register'
})(UserProfilePTR);
