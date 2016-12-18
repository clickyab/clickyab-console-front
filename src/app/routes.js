import React from 'react';
import {store} from './../app/redux/store';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
const history = syncHistoryWithStore(browserHistory, store);
import App from './app';
import $ from 'jquery';
import Login from './components/login/LoginCTR';
import DataTable from './../../tmp/table/DataTable';
import Register from './components/register/RegisterCTR';
import Transition from './components/common/Transition';
import ForgotPassword from './components/PaswordRecovery/PasswordRecoveryCTR';
import AdvertiserDashboardPage from './components/advertiser/Dashboard/IndexCTR';
import PublisherDashboardPage from './components/publisher/Dashboard/IndexCTR';
import UserProfile from './components/UserProfile/UserProfileCTR';


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
        <Route component={Transition}>
            <Route path='/register' component={Register} title='Register' name='Register'/>
            <Route path='/login' component={Login} name='Login'/>
            <Route path='/password-recovery' component={ForgotPassword} name='ForgotPassword'/>
        </Route>
        <Route path='/' component={App} name='Dashboard' getDisplayName={() => 'Dashboard'}
               onEnter={(nextState, replace, next) => {
                   next()
               }}>
            <IndexRoute component={AdvertiserDashboardPage} name='Dashboard' getDisplayName={() => 'Dashboard'}/>
            <Route path='/publisher' component={PublisherDashboardPage} name='publisher'/>
            <Route path='/advertiser' component={AdvertiserDashboardPage} name='advertiser'/>
            <Route path='/profile' component={UserProfile} name='UserProfile'/>
        </Route>
        <Route path='/data' component={DataTable} name='data-table'/>
    </Router>
);



