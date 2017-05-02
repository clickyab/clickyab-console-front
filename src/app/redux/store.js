import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {reducer as formReducer} from "redux-form";
import {cssLazyLoader, localeReducer} from "react-multilingual";
import {impersonateReducer, loginReducer, userReducer} from "./reducers";
import createLogger from "redux-logger";
import {asyncPullIntoLocalStorage} from "../middlewares/asyncPullIntoLocalStorage";
import localStorage from "store";
import {asyncRemoveLocalStorage} from "../middlewares/asyncRemoveLocalStorage";
import {userListReducer} from "./reducers/userList";
import {channelListReducer} from "./reducers/channelList";
import {campaignListReducer} from "./reducers/campaignList";
import {categoryListReducer} from "./reducers/categoryList";
import {channelDataReducer} from "./reducers/channelDataReducer";
import {userDataReducer} from "./reducers/userDataReducer";
import {categoryDataReducer} from "./reducers/CategoryDataReducer";
import {planListReducer} from "./reducers/planList";
import {createCampaignReducer} from "./reducers/createCampaignDataReducer";
import queryReducer from "./reducers/queryReducer";
import userTypeReducer from "./reducers/userTypeReducer";
import {telegramListReducer} from "./reducers/telegramListReducer";
import {campaignStepReducer} from "./reducers/campaignStepReducer";
import {roleListReducer} from "./reducers/roleList";
import {roleDataReducer} from "./reducers/roleDataReducer";
import {permissionListReducer} from "./reducers/permissionListReducer";
import {secureReducer} from "react-redux-secure";
import {campaignReportListReducer} from "./reducers/campaignReportList";
import {channelReportListReducer} from "./reducers/channelReportList";
import {versionReducer} from "./reducers/versionReducer";
import versionChanged from "./../middlewares/versionChanged";
import {userAssignRoleListReducer} from "./reducers/userAssignRoleListReducer";
import {userAssignRoleDataReducer} from "./reducers/userAssignRoleDataReducer";
import {advertiserCampaignChartReducer} from "./reducers/advertiserCampaignChartReducer";
import {billingListReducer} from "./reducers/billingListReducer";
import {depositItemReducer} from "./reducers/depositItemReducer";
import {notificationsReducer} from "./reducers/notificationsReducer";
import {publisherTotalViewChartReducer} from "./reducers/publisherTotalViewChartReducer";
import {advertiserSpentPerChannelReducer} from "./reducers/advertiserSpentPerChannelReducer";
import {publisherCountChannelReducer} from "./reducers/publisherCountChannelReducer";
import {translationListReducer} from "./reducers/translationListReducer";
import {languageReducer} from "./reducers/languageReducer";
import {translationReducer} from "./reducers/translationReducer";
import {FLUSH} from "./actions/index";
import {sessionDataReducer} from "./reducers/sessionDataReducer";


const enhancer = compose;
const logger = createLogger(); // eslint-disable-line

const rootReducer = (state, action) => {
	if (action.type === FLUSH) {
		state = undefined
	}

	return combineReducers({
		login: loginReducer,

		impersonate: impersonateReducer,
		user: userReducer,
		userList: userListReducer,
		userData: userDataReducer,
		userType: userTypeReducer,
		userAssignRoleList: userAssignRoleListReducer,
		userAssignRoleData: userAssignRoleDataReducer,

		channelList: channelListReducer,
		channelReportList: channelReportListReducer,
		channelData: channelDataReducer,

		billingList: billingListReducer,

		depositData: depositItemReducer,

		permissionList: permissionListReducer,
		roleList: roleListReducer,
		roleData: roleDataReducer,

		campaignList: campaignListReducer,
		createCampaignData: createCampaignReducer,
		campaignStepData: campaignStepReducer,
		campaignReportList: campaignReportListReducer,

		advertiserCampaignChart: advertiserCampaignChartReducer,
		advertiserSpentPerChannel: advertiserSpentPerChannelReducer,
		publisherTotalViewChart: publisherTotalViewChartReducer,
		publisherCountChannel: publisherCountChannelReducer,

		categoryList: categoryListReducer,
		categoryData: categoryDataReducer,

		telegramList: telegramListReducer,

		planList: planListReducer,

		queries: queryReducer,

		form: formReducer,

		locale: localeReducer('fa_IR', require('../../locales/index').default),
		secure: secureReducer(require("../secure/rules").default),

		version: versionReducer,

		notifications: notificationsReducer,

		translationList: translationListReducer,

		sessionList: sessionDataReducer,

		language: languageReducer,
		translations: translationReducer,

	})(state, action)
};

export const store = createStore(
	rootReducer,
	localStorage.get('initialState'),
	enhancer(applyMiddleware(
		cssLazyLoader(['LOCALE_CHANGED'], {
			'en': {
				address: 'css/style-ltr.css',
				direction: 'ltr'
			},
			'fa': {
				address: 'css/style-rtl.css',
				direction: 'rtl'
			}
		}),
		asyncPullIntoLocalStorage,
		asyncRemoveLocalStorage,
		versionChanged,
		// logger
		)
	)
);