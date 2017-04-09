import React, {Component} from "react";
import {translatable} from "react-multilingual/dist";
import {Link, SidebarLinks} from "./../../../components/custom-link/CustomLink";
import {securify} from "../../../functions/securify";
import {translate} from './../../../functions/translate';


export class Sidebar extends Component {
	componentDidMount() {
		document.title = "داشبورد نمایش دهنده";
	}

	render() {
		return (
			<div className='page-sidebar-wrapper'>
				<div className='page-sidebar navbar-collapse collapse'>
					<SidebarLinks>
						<Link to='/v1/publisher'>
							<i className='fa fa-home'/>
							<span className='title'>{translate('Publisher Dashboard')}</span>
							<span className='selected'/>
							<span className="selected"/>
						</Link>

						{securify(
							() => <Link to="/v1/publisher/channel">
								<i className='fa fa-th-list'/>
								<span className='title'>{translate('Channels List')}</span>
								<span className="selected"/>
							</Link>,
							({user}, {canSeeSideBarChannelList}, run) => run(canSeeSideBarChannelList())
						)}


						{securify(
							() => <Link to="/v1/publisher/user">
								<i className='fa fa-users'/>
								<span className='title'>{translate('Manage User')}</span>
								<span className="selected"/>
							</Link>,
							({user}, {canSeeSidebarManageUser}, run) => run(canSeeSidebarManageUser())
						)}

						{securify(
							() => <Link to="/v1/publisher/role">
								<i className='fa fa-ban'/>
								<span className='title'>{translate('Role List')}</span>
								<span className="selected"/>
							</Link>,
							({user}, {canSeeSidebarRoleList}, run) => run(canSeeSidebarRoleList())
						)}

						{securify(
							() => <Link to="/v1/publisher/telegram">
								<i className='fa fa fa-object-group'/>
								<span className='title'>{translate('Manage Channel')}</span>
								<span className="selected"/>
							</Link>,
							({user}, {canSeeSideBarTelegramUserList}, run) => run(canSeeSideBarTelegramUserList())
						)}


						{securify(
							() => <Link to='/v1/publisher/translation' activeClassName='active'>
								<i className='fa fa-language'/>
								<span className='title'>{translate('Translation List')}</span>
								<span className='selected'/>
								<span className="selected"/>
							</Link>,
							({user}, {canSeeSideBarTranslateList}, run) => run(canSeeSideBarTranslateList())
						)}

					</SidebarLinks>
				</div>
			</div>
		);
	}
}


Sidebar.propTypes = {
	dashboard: React.PropTypes.string,
	operations: React.PropTypes.string,
	campaigns: React.PropTypes.string,
	websites: React.PropTypes.string,
	applications: React.PropTypes.string,
	withdrawal: React.PropTypes.string,
	potential: React.PropTypes.string,
	users: React.PropTypes.string,
	financial: React.PropTypes.string,
	access: React.PropTypes.string,
	slots: React.PropTypes.string
};

export default Sidebar;



