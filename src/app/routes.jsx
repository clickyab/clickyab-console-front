import React from "react";
import {browserHistory, IndexRoute, Route, Router} from "react-router";
import App from "./app";
import Login from "./components/login/LoginCTR";
import onLogin from "./middlewares/routes/onLoginEnterMiddleware";
import onUserEnterMiddleware from "./middlewares/routes/onUserEnterMiddleware";
import onProfileEnterMiddleware from "./middlewares/routes/onProfileEnterMiddleware";
import Register from "./components/register/RegisterCTR";
import ForgotPassword from "./components/PaswordRecovery/PasswordRecoveryCTR";
import AdvertiserDashboardPage from "./components/advertiser/Dashboard/IndexCTR";
import Advertiser from "./components/advertiser/Advertiser";
import PublisherDashboardPage from "./components/publisher/Dashboard/IndexCTR";
import Publisher from "./components/publisher/Publisher";
import UserProfile from "./components/UserProfile/UserProfileCTR";
import UsersListCTR from "./components/publisher/Users/UsersListCTR";
import ChannelListCTR from "./components/publisher/channel/ChannelListCTR";
import ChannelReportListCTR from "./components/publisher/channel/report/ChannelReportListCTR";
import ServerDown from "./components/ServerDown/ServerDown";
import onChannelEnterMiddleware from "./middlewares/routes/onChannelEnterMiddleware";
import onCampaignEnterMiddleware from "./middlewares/routes/onCampaignEnterMiddleware";
import onSlashEnterMiddleware from "./middlewares/routes/onSlashEnterMiddleware";
import onCreateCampaignStepOneOnEnterMiddleware from "./middlewares/routes/onCreateCampaignStepOneOnEnterMiddleware";
import onUpdateCampaignStepOneOnEnterMiddleware from "./middlewares/routes/onUpdateCampaignStepOneOnEnterMiddleware";
import onCreateCampaignStepTwoOnEnterMiddleware from "./middlewares/routes/onCreateCampaignStepTwoOnEnterMiddleware";
import onCreateCampaignStepThreeOnEnterMiddleware from "./middlewares/routes/onCreateCampaignStepThreeOnEnterMiddleware";
import onPlanListEnterMiddleware from "./middlewares/routes/onPlanListEnterMiddleware";
import onPublisherEnterMiddleware from "./middlewares/routes/onPublisherEnterMiddleware";
import onAdvertiserEnterMiddleware from "./middlewares/routes/onAdvertiserEnterMiddleware";
import onTelegramEnterMiddleware from "./middlewares/routes/onTelegramEnterMiddleware";
import onRoleEnterMiddleware from "./middlewares/routes/onRoleEnterMiddleware";
import LanguagesMiddleware from "./middlewares/LanguagesMiddleware";
import CampaignListCTR from "./components/advertiser/campaign/CampaignListCTR";
import CampaignCreateCTR from "./components/advertiser/campaign/step-name/CreateCTR";
import UploadFileCTR from "./components/advertiser/campaign/step-upload/UploadFileCTR";
import CaptionCTR from "./components/advertiser/campaign/step-editor/CaptionCTR";
import SelectPlanCTR from "./components/advertiser/campaign/step-plan/SelectPlanCTR";
import SelectTypeCTR from "./components/advertiser/campaign/step-type/SelectTypeCTR";
import SelectContentByChannelCTR from "./components/advertiser/campaign/step-promote/SelectContentByChannelCTR";
import PageNotFound from "./components/404/PageNotFound";
import TelegramListCTR from "./components/publisher/telegram/TelegramListCTR";
import RolesListCTR from "./components/publisher/roles/RolesListCTR";
import onUploadEnterMiddleware from "./middlewares/routes/onUploadEnterMiddleware";
import onEditorEnterMiddleware from "./middlewares/routes/onEditorEnterMiddleware";
import {navigate} from "./functions/navigate";
import StepPreviewCTR from "./components/advertiser/campaign/step-preview/StepPreviewCTR";
import onPreviewCampaignMiddleware from "./middlewares/routes/onPreviewCampaignMiddleware";
import onChannelReportEnterMiddleware from "./middlewares/routes/onChannelReportEnterMiddleware";
import {store} from "./redux/store";
import verifyPage from "./components/advertiser/campaign/verifyPage";
import onVerifyEnterMiddleware from "./middlewares/routes/onVerifyEnterMiddleware";
import BillingListCTR from "./components/advertiser/billing/BillingListCTR";
import onBillingEnterMiddleware from "./middlewares/routes/onBillingEnterMiddleware";
import onTranslationListEnterMiddleware from "./middlewares/routes/onTranslationListEnterMiddleware";
import TranslationListCTR from "./components/translation/TranslationListCTR";
require('./events');

export default function Provider() {
	return (
		<Router history={browserHistory}>
			<Route path='/v1' component={App} onEnter={LanguagesMiddleware}>
				<IndexRoute component={() => {
					if (store.getState().userType === 'advertiser') {
						navigate('/v1/advertiser');
					} else {
						navigate('/v1/publisher');
					}

					return <span/>;
				}}/>

				<Route path='profile' component={UserProfile} name='UserProfile' onEnter={onProfileEnterMiddleware}/>

				<Route path='publisher' component={Publisher}>
					<IndexRoute component={PublisherDashboardPage} name='PublisherDashboard'
								onEnter={onPublisherEnterMiddleware}/>
					<Route path='user' component={UsersListCTR} name='user' onEnter={onUserEnterMiddleware}/>
					<Route path='channel' component={ChannelListCTR} name='channelList'
						   onEnter={onChannelEnterMiddleware}/>
					<Route path='channel/:channel_id/report' component={ChannelReportListCTR} name='channelReportList'
						   onEnter={onChannelReportEnterMiddleware}/>
					<Route path='telegram' component={TelegramListCTR} name='telegramList'
						   onEnter={onTelegramEnterMiddleware}/>
					<Route path='role' component={RolesListCTR} name='roleList' onEnter={onRoleEnterMiddleware}/>
					<Route path='translation' component={TranslationListCTR} name='translationList'
						   onEnter={onTranslationListEnterMiddleware}/>

					<Route path='translation' component={TranslationListCTR} name='translationList'
						   onEnter={onTranslationListEnterMiddleware}/>

				</Route>

				<Route path='advertiser' component={Advertiser}>
					<IndexRoute component={AdvertiserDashboardPage} name='advertiser'
								onEnter={onAdvertiserEnterMiddleware}/>

					<Route path='campaign' component={CampaignListCTR} name='campaignList'
						   onEnter={onCampaignEnterMiddleware}/>

					<Route path='campaign/create/step/name' component={CampaignCreateCTR}
						   onEnter={onCreateCampaignStepOneOnEnterMiddleware} name='campaignList'/>
					<Route path='campaign/create/:campaign_id/step/name' component={CampaignCreateCTR}
						   onEnter={onUpdateCampaignStepOneOnEnterMiddleware} name='campaignList'/>

					<Route path='campaign/create/:campaign_id/step/type' component={SelectTypeCTR}
						   onEnter={onCreateCampaignStepTwoOnEnterMiddleware} name='campaignType'/>

					<Route path='campaign/create/:campaign_id/step/promote' component={SelectContentByChannelCTR}
						   onEnter={onCreateCampaignStepThreeOnEnterMiddleware} name='campaignPromote'/>
					<Route path='campaign/create/:campaign_id/step/upload' component={UploadFileCTR}
						   onEnter={onUploadEnterMiddleware} name='upload'/>
					<Route path='campaign/create/:campaign_id/step/editor' component={CaptionCTR} name='campaignEditor'
						   onEnter={onEditorEnterMiddleware}/>
					<Route path='campaign/create/:campaign_id/step/plan' component={SelectPlanCTR} name='campaignPlan'
						   onEnter={onPlanListEnterMiddleware}/>
					<Route path='campaign/create/:campaign_id/step/preview' component={StepPreviewCTR}
						   name='campaignPreview'
						   onEnter={onPreviewCampaignMiddleware}/>
					<Route path='telegram' component={TelegramListCTR} name='telegramList'
						   onEnter={onTelegramEnterMiddleware}/>
					<Route path='billing' component={BillingListCTR} name='billingList'
						   onEnter={onBillingEnterMiddleware}/>

					<Route path='translation' component={TranslationListCTR} name='translationList'
						   onEnter={onTranslationListEnterMiddleware}/>
				</Route>
			</Route>

			<Route path='/v1' onEnter={LanguagesMiddleware}>
				<Route path='profile' component={UserProfile} name='UserProfile' onEnter={onProfileEnterMiddleware}/>
				<Route path='register' component={Register} title='Register' name='Register' onEnter={onLogin}/>
				<Route path='login' component={Login} name='Login' onEnter={onLogin}/>
				<Route path='password-recovery' component={ForgotPassword} name=''/>
				<Route path='verify' component={verifyPage} onEnter={onVerifyEnterMiddleware} name='verify'/>
			</Route>

			<Route path='/' onEnter={onSlashEnterMiddleware}/>
			<Route path='/server-down' component={ServerDown}  onEnter={LanguagesMiddleware}/>
			<Route path='*' component={PageNotFound}  onEnter={LanguagesMiddleware}/>
		</Router>
	);
}