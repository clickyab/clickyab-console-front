import React, {Component} from "react";
import {Link, SidebarLinks} from "./../../../components/custom-link/CustomLink";
import {securify} from "../../../functions/securify";
import {translate} from './../../../functions/translate';

export class Sidebar extends Component {
	componentDidMount() {
		document.title = "داشبورد تبلیغ دهنده";
	}


	render() {
		console.log(translate('Advertiser Dashboard'))
		return (
			<div className='page-sidebar-wrapper'>
				<div className='page-sidebar navbar-collapse collapse'>
					<SidebarLinks>
						<Link to='/v1/advertiser' activeClassName='active'>
							<i className='fa fa-home'/>
							<span className='title'>{translate('Advertiser Dashboard')}</span>
							<span className='selected'/>
							<span className="selected"/>
						</Link>

						{securify(
							() => <Link to="/v1/advertiser/telegram" activeClassName='active'>
								<i className='fa fa-user'/>
								<span className='title'>{translate('Telegram User')}</span>
								<span className="selected"/>
							</Link>,
							({user}, {canSeeSideBarTelegramUserList}, run) => run(canSeeSideBarTelegramUserList())
						)}


						{securify(
							() => <Link to='/v1/advertiser/billing' activeClassName='active'>
								<i className='fa fa-list'/>
								<span className='title'>{translate('Billing List')}</span>
								<span className='selected'/>
								<span className="selected"/>
							</Link>,
							({user}, {canSeeSideBarBillingList}, run) => run(canSeeSideBarBillingList())
						)}

						{securify(
							() => <Link to='/v1/advertiser/translation' activeClassName='active'>
								<i className='fa fa-list'/>
								<span className='title'>{translate('Translation List')}</span>
								<span className='selected'/>
								<span className="selected"/>
							</Link>,
							({user}, {canSeeSideBarTranslateList}, run) => run(canSeeSideBarTranslateList())
						)}


						<li className="heading">
							<h3>{translate('Campaigns')}</h3>
						</li>

						{securify(
							() => <Link to='/v1/advertiser/campaign/create/step/name' activeClassName='active'>
								<i className='fa fa-plus-circle'/>
								<span className='title'>{translate('Add Campaign')}</span>
								<span className='selected'/>
								<span className="selected"/>
							</Link>,
							({user}, {canSeeCreateAd}, run) => run(canSeeCreateAd())
						)}

						{securify(
							() => <Link to='/v1/advertiser/campaign' activeClassName='active'>
								<i className='fa fa-list'/>
								<span className='title'>{translate('Campaign List')}</span>
								<span className='selected'/>
								<span className="selected"/>
							</Link>,
							({user}, {canSeeAdList}, run) => run(canSeeAdList())
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



