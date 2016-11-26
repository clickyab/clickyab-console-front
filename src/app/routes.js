import Login from './presenters/Login/Login';
import {$} from 'jquery';
import Register from './presenters/Register/Register';
import ForgotPassword from './presenters/ForgotPassword/ForgotPassword';
import AdvertiserDashboardPage from './presenters/Advertiser/Dashboard/Index';
import PublisherDashboardPage from './presenters/Publisher/Dashboard/Index';
import SelectMode from './presenters/Advertiser/SelectMode';
import {Index} from './../layouts/Index';
// import PublisherHome from './../presenters/Publisher/Index';
// import AdvertiserHome from './../presenters/Advertiser/Index';
import {Campaigns} from './../layouts/Milad';
import {CampaignsId} from './../layouts/CampaignsId';
import React from 'react';
import {store} from './../app/redux/store';
// import {Provider} from 'react-redux';
import {Router, Route, browserHistory , IndexRoute} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
const history = syncHistoryWithStore(browserHistory, store);

history.listen(location => {
	let interval;
	clearInterval(interval);
	interval = setInterval(() => {
		if ($('.page-content-wrapper').length > 0) {
			clearInterval(interval);
			$('.page-sidebar')
				.attr('style', 'height:' + $('.page-content-wrapper').outerHeight() + 'px !important');
		}
	}, 500);
});

export default () => (
	<Router history={history}>
		<Route path='/' component={Index} name='Dashboard' getDisplayName={() => 'Dashboard'}
			onEnter={(nextState, replace, next) => {
				{/*store.dispatch({type: 'TITLE', title: 'new title'})*/}
				next()
			}}>
			<IndexRoute component={AdvertiserDashboardPage} name='Dashboard' getDisplayName={() => 'Dashboard'}/>
			<Route path='/publisher' component={PublisherDashboardPage} name='publisher' />
			<Route path='/advertiser' component={AdvertiserDashboardPage} name='advertiser'/>
			<Route path='/campaigns' component={Campaigns} name='Campaigns'>

				<Route path='/campaigns/:id' component={CampaignsId} name='Campaign'
					getDisplayName={() => store.getState().campain.title}/>
			</Route>
			<Route path='/mode' component={SelectMode} name='SelectMode'/>
		</Route>
		<Route path='/register' component={Register} title='Register' name='Register' />
		<Route path='/login' component={Login} name='Login'/>
		<Route path='/forgot' component={ForgotPassword} name='ForgotPassword'/>
		<Route path='/mode' component={SelectMode} name='mode'/>
	</Router>
);



