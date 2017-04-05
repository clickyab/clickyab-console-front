import React, {Component} from "react";

export class UserProfile extends Component {
	render() {
		return (
			<li className="dropdown dropdown-user dropdown-dark">
				<a href="javascript:;" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
				   data-close-others="true">
					<img alt="" className="img-circle" src="img/avatar9.jpg"/>
					<span className="username username-hide-mobile">سلام میلاد حیدری، خوش آمدید</span>
				</a>
				<ul className="dropdown-menu dropdown-menu-default">
					<li>
						<a href="page_user_profile_1.html">
							<i className="icon-user"/> پروفایل من </a>
					</li>
					<li>
						<a href="app_calendar.html">
							<i className="icon-calendar"/> حسابداری </a>
					</li>
					<li>
						<a href="app_inbox.html">
							<i className="icon-envelope-open"/> تماس ها
							<span className="badge badge-danger"> 3 </span>
						</a>
					</li>
					<li>
						<a href="app_todo_2.html">
							<i className="icon-rocket"/> پیغام ها
							<span className="badge badge-success"> 7 </span>
						</a>
					</li>
					<li className="divider"/>
					<li>
						<a href="page_user_login_1.html">
							<i className="icon-key"/> خروج</a>
					</li>
				</ul>
			</li>
		);
	}
}

export default UserProfile;



