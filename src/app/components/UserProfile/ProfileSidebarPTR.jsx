import React, {Component, PropTypes} from "react";
import {getGravatarFromEmail} from "../../functions/gravatar";
import {getCorporationTitle, getEmail, getFullName} from "./../../redux/helpers";
import {select} from "./../../functions/select";
import {translate} from './../../functions/translate'

export default class ProfileSidebarPTR extends Component {
	userAvatar() {
		return getGravatarFromEmail(getEmail(), 200);
	}

	render() {
		let initData;
		if ((select('user.personal.first_name')) != null) {
			initData = getFullName();
		} else {
			initData = getCorporationTitle();
		}
		return (
			<div className="profile-sidebar">
				<div className="portlet light profile-sidebar-portlet ">
					<div className="profile-userpic">
						<img src={this.userAvatar()} className="img-responsive" alt=""/></div>
					<div className="profile-usertitle">
						<div className="profile-usertitle-name"> {initData}  </div>
					</div>
					<div className="profile-userbuttons" style={{paddingBottom: '30px'}}>
						<button type="button" className="btn btn-circle red btn-sm logout-btn"
								onClick={this.props.SubmitLogout.bind(this)}>{translate('Logout')}
						</button>
					</div>
				</div>
			</div>
		)
	}
}

ProfileSidebarPTR.propTypes = {
	SubmitLogout: PropTypes.func
};