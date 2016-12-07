import Login from './components/login/Login';
import $ from 'jquery';
import Register from './components/register/Register';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import AdvertiserDashboardPage from './components/advertiser/Dashboard/IndexCTR';
import PublisherDashboardPage from './components/publisher/Dashboard/IndexCTR';
import App from './app';
import React from 'react';
import {store} from './../app/redux/store';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
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
        <Route path='/' component={App} name='Dashboard' getDisplayName={() => 'Dashboard'}
               onEnter={(nextState, replace, next) => {
                   next()
               }}>
            <IndexRoute component={AdvertiserDashboardPage} name='Dashboard' getDisplayName={() => 'Dashboard'}/>
            <Route path='/publisher' component={PublisherDashboardPage} name='publisher'/>
            <Route path='/advertiser' component={AdvertiserDashboardPage} name='advertiser'/>
        </Route>
        <Route path='/register' component={Register} title='Register' name='Register'/>
        <Route path='/login' component={Login} name='Login'/>
        <Route path='/password-recovery' component={ForgotPassword} name='ForgotPassword'/>
    </Router>
);



