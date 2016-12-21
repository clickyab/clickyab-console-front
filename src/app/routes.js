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
            <Route path='/user' component={CategoryListCTR} name='user' onEnter={onUserEnterMiddleware}/>
        </Route>
    </Router>
);

history.listen(location => {
            function getResponsiveBreakpoint(size) {
                // bootstrap responsive breakpoints
                let sizes = {
                    'xs' : 480,     // extra small
                    'sm' : 768,     // small
                    'md' : 992,     // medium
                    'lg' : 1200     // large
                };

                return sizes[size] ? sizes[size] : 0;
            }
            let resBreakpointMd = getResponsiveBreakpoint('md');
            function getViewPort() {
                let e = window,
                    a = 'inner';
                if (!('innerWidth' in window)) {
                    a = 'client';
                    e = document.documentElement || document.body;
                }

                return {
                    width: e[a + 'Width'],
                    height: e[a + 'Height']
                };
            }
            function _calculateFixedSidebarViewportHeight() {
                let sidebarHeight = getViewPort().height - $('.page-header').outerHeight(true);
                if ($('body').hasClass("page-footer-fixed")) {
                    sidebarHeight = sidebarHeight - $('.page-footer').outerHeight();
                }

                return sidebarHeight;
            };

            let content = $('.page-content');
            let sidebar = $('.page-sidebar');
            let body = $('body');
            let height;

            if (body.hasClass("page-footer-fixed") === true && body.hasClass("page-sidebar-fixed") === false) {
                let available_height = getViewPort().height - $('.page-footer').outerHeight() - $('.page-header').outerHeight();
                let sidebar_height = sidebar.outerHeight();
                if (sidebar_height > available_height) {
                    available_height = sidebar_height + $('.page-footer').outerHeight();
                }
                if (content.height() < available_height) {
                    content.css('min-height', available_height);
                }
            } else {
                if (body.hasClass('page-sidebar-fixed')) {
                    height = _calculateFixedSidebarViewportHeight();
                    if (body.hasClass('page-footer-fixed') === false) {
                        height = height - $('.page-footer').outerHeight();
                    }
                } else {
                    let headerHeight = $('.page-header').outerHeight();
                    let footerHeight = $('.page-footer').outerHeight();

                    if (getViewPort().width < resBreakpointMd) {
                        height = getViewPort().height - headerHeight - footerHeight;
                    } else {
                        height = sidebar.height() + 20;
                    }

                    if ((height + headerHeight + footerHeight) <= getViewPort().height) {
                        height = getViewPort().height - headerHeight - footerHeight;
                    }
                }
                content.css('min-height', height);
            }
});



