import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import App from './app';
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
import UsersListCTR from './components/Users/UsersListCTR';
import ChannelListCTR from './components/channel/ChannelListCTR';
import onChannelEnterMiddleware from './middlewares/routes/onChannelEnterMiddleware';
import onCampaignEnterMiddleware from './middlewares/routes/onCampaignEnterMiddleware';
import onCategoryEnterMiddleware from './middlewares/routes/onCategoryEnterMiddleware';
import onSlashEnterMiddleware from './middlewares/routes/onSlashEnterMiddleware';
import onDashboardEnterMiddleware from './middlewares/routes/onDashboardEnterMiddleware';
import onCreateCampaignStepOneOnEnterMiddleware from "./middlewares/routes/onCreateCampaignStepOneOnEnterMiddleware";
import onCreateCampaignStepTwoOnEnterMiddleware from "./middlewares/routes/onCreateCampaignStepTwoOnEnterMiddleware";
import onCreateCampaignStepThreeOnEnterMiddleware from "./middlewares/routes/onCreateCampaignStepThreeOnEnterMiddleware";
import onPlanListEnterMiddleware from "./middlewares/routes/onPlanListEnterMiddleware";
import onPublisherEnterMiddleware from "./middlewares/routes/onPublisherEnterMiddleware";
import onAdvertiserEnterMiddleware from "./middlewares/routes/onAdvertiserEnterMiddleware";
import onTelegramEnterMiddleware from './middlewares/routes/onTelegramEnterMiddleware';
import CampaignListCTR from './components/campaign/CampiagnListCTR';
import CampaignCreateCTR from './components/campaign/step-name/CreateCTR';
import UploadFileCTR from './components/campaign/step-upload/UploadFileCTR';
import CaptionCTR from './components/campaign/step-editor/CaptionCTR';
import SelectPlanCTR from './components/campaign/step-plan/SelectPlanCTR';
import SelectTypeCTR from './components/campaign/step-type/SelectTypeCTR';
import SelectContentByChannelCTR from './components/campaign/step-promote/SelectContentByChannelCTR';
import PageNotFound from './components/404/PageNotFound';
import TelegramListCTR from './components/telegram/TelegramListCTR';
import onUploadEnterMiddleware from "./middlewares/routes/onUploadEnterMiddleware";
import onEditorEnterMiddleware from "./middlewares/routes/onEditorEnterMiddleware";


export default () => (
    <Router history={browserHistory}>
        <Route path='/v1' component={App}>
            <IndexRoute component={AdvertiserDashboardPage} name='Dashboard'
                        onEnter={onDashboardEnterMiddleware}
                        getDisplayName={() => 'Dashboard'}/>
            <Route path='publisher' component={PublisherDashboardPage} name='publisher'
                   onEnter={onPublisherEnterMiddleware}/>
            <Route path='advertiser' component={AdvertiserDashboardPage} name='advertiser'
                   onEnter={onAdvertiserEnterMiddleware}/>
            <Route path='profile' component={UserProfile} name='UserProfile' onEnter={onProfileEnterMiddleware}/>
            <Route path='category' component={CategoryListCTR} name='category' onEnter={onCategoryEnterMiddleware}/>
            <Route path='user' component={UsersListCTR} name='user' onEnter={onUserEnterMiddleware}/>
            <Route path='channel' component={ChannelListCTR} name='channelList' onEnter={onChannelEnterMiddleware}/>
            <Route path='campaign' component={CampaignListCTR} name='campaignList' onEnter={onCampaignEnterMiddleware}/>
            <Route path="telegram" component={TelegramListCTR} name="telegramList" onEnter={onTelegramEnterMiddleware}/>

            <Route path='campaign/create/step/name' component={CampaignCreateCTR}
                   onEnter={onCreateCampaignStepOneOnEnterMiddleware} name='campaignList'/>
            <Route path='campaign/create/:campaign_id/step/type' component={SelectTypeCTR}
                   onEnter={onCreateCampaignStepTwoOnEnterMiddleware} name='campaignList'/>

            <Route path='campaign/create/:campaign_id/step/promote' component={SelectContentByChannelCTR}
                   onEnter={onCreateCampaignStepThreeOnEnterMiddleware} name='campaignList'/>
            <Route path='campaign/create/:campaign_id:/step/upload' component={UploadFileCTR}
                   onEnter={onUploadEnterMiddleware} name='upload'/>
            <Route path='campaign/create/:campaign_id:/step/editor' component={CaptionCTR} name='campaignList'
                   onEnter={onEditorEnterMiddleware} />
            <Route path='campaign/create/:campaign_id:/step/plan' component={SelectPlanCTR} name='campaignList'
                   onEnter={onPlanListEnterMiddleware}/>
        </Route>

        <Route path='/v1' component={Transition}>
            <Route path='register' component={Register} title='Register' name='Register' onEnter={onLogin}/>
            <Route path='login' component={Login} name='Login' onEnter={onLogin}/>
            <Route path='password-recovery' component={ForgotPassword} name=''/>
        </Route>

        <Route path="/" onEnter={onSlashEnterMiddleware}/>

        <Route path="*" component={PageNotFound}/>
    </Router>
);



