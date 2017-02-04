import React, {Component} from "react";
import {reduxForm} from "redux-form";
import PersonalUserCTR from "./PersonalUserCTR";
import CorporationUserCTR from "./CorporationUserCTR";
import ProfileSidebarCTR from "./ProfileSidebarCTR";
import SelectUserTypePTR from "./SelectUserTypePTR";
import ChangePasswordCTR from "./ChangePasswordCTR";
import SessionListCTR from "./SessionListCTR";
import Sidebar from './../layouts/Sidebar';
import moment from "moment";

class UserProfilePTR extends Component {


	componentDidMount() {
		document.title = "ویرایش پروفایل";
		Calendar.setup({
				onUpdate: function (value) {
					$("#birthday").val(moment(value.date).utcOffset(0, true).format());
				},
				inputField: 'birthday_front',
				button: 'date_btn',
				ifFormat: '%A، %d %b %Y',
				dateType: 'jalali',

			},
		);
	}

	render() {
		return (
		<div className="page-container">
			<Sidebar/>
			<div className="page-content-wrapper">
				<div className="page-content custom-color">
					<h1 className="page-title"> ویرایش پروفایل
					</h1>
					<div className="row">
						<div className="col-md-12">
							<ProfileSidebarCTR/>
							<div className="profile-content">
								<div className="row">
									<div data-classNaGroup data-chat data-optionsme="col-md-12">
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
														<SelectUserTypePTR />
														<PersonalUserCTR />
														<CorporationUserCTR />

													</div>
													<div className="tab-pane" id="tab_1_2">
														<SessionListCTR />
													</div>
													<div className="tab-pane" id="tab_1_3">
														<ChangePasswordCTR />
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
