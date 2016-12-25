import React from 'react';
import {store} from './../app/redux/store';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
const history = syncHistoryWithStore(browserHistory, store);
import App from './app';
import $ from 'jquery';
import Login from './components/login/LoginCTR';
import CategoryListCTR from './components/category/CategoryListCTR';
import onLogin from './middlewares/routes/onLoginEnterMiddleware';
import onUserEnterMiddleware from './middlewares/routes/onUserEnterMiddleware';
import onProfileEnterMiddleware from './middlewares/routes/onProfileEnterMiddleware';
import Register from './components/register/RegisterCTR';
import Transition from './components/common/Transition';
import ForgotPassword from './components/PaswordRecovery/PasswordRecoveryCTR';
import AdvertiserDashboardPage from './components/advertiser/Dashboard/IndexCTR';
import PublisherDashboardPage from './components/publisher/Dashboard/IndexCTR';
import UserProfile from './components/UserProfile/UserProfileCTR';
import UsersListCTR from "./components/Users/UsersListCTR";
import ChannelListCTR from "./components/channel/ChannelListCTR";
import onChannelEnterMiddleware from "./middlewares/routes/onChannelEnterMiddleware";


export default () => (
    <Router history={history}>
        <Route component={Transition}>
            <Route path='/register' component={Register} title='Register' name='Register'/>
            <Route path='/login' component={Login} name='Login' onEnter={onLogin}/>
            <Route path='/password-recovery' component={ForgotPassword} name='ForgotPassword'/>
        </Route>
        <Route path='/' component={App} name='Dashboard' getDisplayName={() => 'Dashboard'}
               onEnter={(nextState, replace, next) => {
                   next()
               }}>
            <IndexRoute component={AdvertiserDashboardPage} name='Dashboard' getDisplayName={() => 'Dashboard'}/>
            <Route path='/publisher' component={PublisherDashboardPage} name='publisher'/>
            <Route path='/advertiser' component={AdvertiserDashboardPage} name='advertiser'/>
            <Route path='/profile' component={UserProfile} name='UserProfile' onEnter={onProfileEnterMiddleware}/>
            <Route path='/category' component={CategoryListCTR} name='category'/>
            <Route path='/user' component={UsersListCTR} name='user' onEnter={onUserEnterMiddleware}/>
            <Route path='/channel' component={ChannelListCTR} name='channel' onEnter={onChannelEnterMiddleware}/>
        </Route>
    </Router>
);

history.listen(location => {
    $(document).ready(function() {
        function setHeight() {
            let windowHeight = $(window).innerHeight();
            $('.page-content').css({
                "min-height": windowHeight+"px"
            });
        };
        setHeight();
        $(window).resize(function() {
            setHeight();
        });
    });
});



