export const UPDATE_LOCAL_STORAGE = 'UPDATE_LOCAL_STORAGE';
export const REMOVE_LOCAL_STORAGE = 'REMOVE_LOCAL_STORAGE';
export const CHANGE_QUERY = 'CHANGE_QUERY';

export const FLUSH = "FLUSH";
export const flush = () => ({type: FLUSH});

export const planListAction = (data) => ({type: PLAN_LIST, data});
export const PLAN_LIST = 'PLAN_LIST';

export const BILLING_LIST = 'BILLING_LIST';
export const billingListAction = (data) => ({type: BILLING_LIST, data});

export const DEPOSIT_ITEM = 'DEPOSIT_ITEM';
export const DepositItemAction = (data) => ({type: DEPOSIT_ITEM, data});

export const UPDATE_DEPOSIT_DATA = 'UPDATE_DEPOSIT_DATA';
export const UpdateDepositData = (data) => ({type: UPDATE_DEPOSIT_DATA, data});

export const CAMPAIGN_LIST = 'CAMPAIGN_LIST';
export const CAMPAIGN_ITEMS_LIST = 'CAMPAIGN_ITEMS_LIST';
export const CREATE_CAMPAIGN = 'CREATE_CAMPAIGN';
export const CAMPAIGN_STEP_TYPE = 'CAMPAIGN_STEP_TYPE';
export const DELETE_CAMPAIGN_PROMOTE = 'DELETE_CAMPAIGN_PROMOTE';
export const CAMPAIGN_PAYMENT_DATA = 'CAMPAIGN_PAYMENT_DATA';
export const campaignListAction = (data) => ({type: CAMPAIGN_LIST, data});
export const campaignItemsListAction = ({data}) => ({type: CAMPAIGN_ITEMS_LIST, data});
export const createCampaign = (data) => ({type: CREATE_CAMPAIGN, data});
export const campaignStepType = (data) => ({type: CAMPAIGN_STEP_TYPE, data});
export const deleteCampaignPromote = () => ({type: DELETE_CAMPAIGN_PROMOTE});
export const campaignPaymentData = (data) => ({type: CAMPAIGN_PAYMENT_DATA, data});

export const ADVERTISER_CAMPAIGN_CHART = 'ADVERTISER_CAMPAIGN_CHART';
export const ADVERTISER_SPENT_PER_CHANNEL = 'ADVERTISER_SPENT_PER_CHANNEL';
export const advertiserCampaignChartAction = (data) => ({type: ADVERTISER_CAMPAIGN_CHART, data});
export const advertiserSpentPerChannel = (data) => ({type: ADVERTISER_SPENT_PER_CHANNEL, data});

export const PUBLISHER_TOTAL_VIEW_CHART = 'PUBLISHER_TOTAL_VIEW_CHART';
export const PUBLISHER_COUNT_ACTIVE_WAIT_CHANNEL = 'PUBLISHER_COUNT_ACTIVE_WAIT_CHANNEL';
export const PUBLISHER_CHANNEL_STATUS = 'PUBLISHER_CHANNEL_STATUS';
export const publisherTotalViewChart = (data) => ({type: PUBLISHER_TOTAL_VIEW_CHART, data});
export const publisherCountActiveWaitChannel = (data) => ({type: PUBLISHER_COUNT_ACTIVE_WAIT_CHANNEL, data});
export const publisherChannelStatus = (data) => ({type: PUBLISHER_CHANNEL_STATUS, data});

export const CAMPAIGN_REPORT_LIST = 'CAMPAIGN_REPORT_LIST';
export const CAMPAIGN_REPORT_ITEMS_LIST = 'CAMPAIGN_REPORT_ITEMS_LIST';
export const CREATE_REPORT_CAMPAIGN = 'CREATE_REPORT_CAMPAIGN';
export const CAMPAIGN_REPORT_STEP_TYPE = 'CAMPAIGN_REPORT_STEP_TYPE';
export const DELETE_CAMPAIGN_REPORT_PROMOTE = 'DELETE_CAMPAIGN_REPORT_PROMOTE';
export const campaignReportListAction = (data) => ({type: CAMPAIGN_REPORT_LIST, data});
export const campaignReportItemsListAction = ({data}) => ({type: CAMPAIGN_REPORT_ITEMS_LIST, data});

export const USER_LIST = 'USER_LIST';
export const USER_DATA = 'USER_DATA';
export const USER_ITEMS_LIST = 'USER_ITEMS_LIST';
export const SWITCH_TO_ADVERTISER = "SWITCH_TO_ADVERTISER";
export const SWITCH_TO_PUBLISHER = "SWITCH_TO_PUBLISHER";
export const switchToAdvertiser = () => ({type: SWITCH_TO_ADVERTISER});
export const switchToPublisher = () => ({type: SWITCH_TO_PUBLISHER});
export const userListAction = (data) => ({type: USER_LIST, data});
export const userDataAction = (data) => ({type: USER_DATA, data});
export const userItemsListAction = ({data}) => ({type: USER_ITEMS_LIST, data});

export const UPDATE_CHANNEL_FROM_LIST = 'UPDATE_CHANNEL_FROM_LIST';

export const ADD_CHANNEL = 'ADD_CHANNEL';
export const CHANNEL_LIST = 'CHANNEL_LIST';
export const CHANNEL_DATA = 'CHANNEL_DATA';
export const CHANNEL_QUERY = 'CHANNEL_QUERY';
export const CHANNEL_ITEMS_LIST = 'CHANNEL_ITEMS_LIST';
export const channelDataAction = (data) => ({type: CHANNEL_DATA, data});
export const channelQueryAction = (list, query_name, queries) => ({type: CHANNEL_QUERY, list, query_name, queries});
export const channelListAction = (data) => ({type: CHANNEL_LIST, data});
export const channelItemsListAction = ({data}) => ({type: CHANNEL_ITEMS_LIST, items: data});
export const updateAChannelFromListAction = (data) => ({type: UPDATE_CHANNEL_FROM_LIST, data});

export const CHANNEL_REPORT_LIST = 'CHANNEL_REPORT_LIST';
export const CHANNEL_REPORT_DATA = 'CHANNEL_REPORT_DATA';
export const CHANNEL_REPORT_QUERY = 'CHANNEL_REPORT_QUERY';
export const CHANNEL_ITEMS_REPORT_LIST = 'CHANNEL_ITEMS_REPORT_LIST';
export const channelReportDataAction = (data) => ({type: CHANNEL_REPORT_DATA, data});
export const channelReportQueryAction = (list, query_name, queries) => ({
	type: CHANNEL_REPORT_QUERY,
	list,
	query_name,
	queries
});
export const channelReportListAction = (data) => ({type: CHANNEL_REPORT_LIST, data});
export const channelItemsReportListAction = ({data}) => ({type: CHANNEL_ITEMS_REPORT_LIST, items: data});

export const UPDATE_ROLE_FROM_LIST = 'UPDATE_ROLE_FROM_LIST';
export const ADD_ROLE = 'ADD_ROLE';
export const ROLE_LIST = 'ROLE_LIST';
export const ROLE_DATA = 'ROLE_DATA';
export const ROLE_QUERY = 'ROLE_QUERY';
export const ROLE_ITEMS_LIST = 'ROLE_ITEMS_LIST';
export const ASSIGN_ROLE_USER_LIST = 'ASSIGN_ROLE_USER_LIST';
export const ASSIGN_ROLE_USER_DATA = 'ASSIGN_ROLE_USER_DATA';
export const roleDataAction = (data) => ({type: ROLE_DATA, data});
export const roleQueryAction = (list, query_name, queries) => ({type: ROLE_QUERY, list, query_name, queries});
export const roleListAction = (data) => ({type: ROLE_LIST, data});
export const roleItemsListAction = ({data}) => ({type: ROLE_ITEMS_LIST, items: data});
export const updateARoleFromListAction = (data) => ({type: UPDATE_ROLE_FROM_LIST, data});
export const assignRoleToUserList = (data) => ({type: ASSIGN_ROLE_USER_LIST, data});
export const assignRoleUserData = (data) => ({type: ASSIGN_ROLE_USER_DATA, data});

export const PERMISSION_LIST = 'PERMISSION_LIST';
export const permissionListAction = (data) => ({type: PERMISSION_LIST, data});

export const CATEGORY_LIST = 'CATEGORY_LIST';
export const CATEGORY_ITEMS_LIST = 'CATEGORY_ITEMS_LIST';
export const CATEGORY_DATA = 'CATEGORY_DATA';
export const UPDATE_CATEGORY_FROM_LIST = 'UPDATE_CATEGORY_FROM_LIST';
export const categoryListAction = (data) => ({type: CATEGORY_LIST, data});
export const categoryItemsListAction = ({data}) => ({type: CATEGORY_ITEMS_LIST, data});
export const categoryDataAction = (data) => ({type: CATEGORY_DATA, data});
export const updateACategoryFromListAction = (data) => ({type: UPDATE_CATEGORY_FROM_LIST, data});

export const TRANSLATION_LIST = 'TRANSLATION_LIST';
export const translationListAction = (data) => ({type: TRANSLATION_LIST, data});

export const TELEGRAM_LIST = 'TELEGRAM_LIST';
export const TELEGRAM_ITEMS_LIST = 'TELEGRAM_ITEMS_LIST';
export const telegramListAction = (data) => ({type: TELEGRAM_LIST, data});
export const telegramItemsListAction = ({data}) => ({type: TELEGRAM_ITEMS_LIST, items: data});

export const updateLocalStorageAction = () => ({type: UPDATE_LOCAL_STORAGE});
export const asyncRemoveLocalStorageAction = () => ({type: REMOVE_LOCAL_STORAGE});

export const VERSION = "VERSION";
export const versionAction = (version) => ({type: VERSION, version});

export const NOTIFICATIONS = "NOTIFICATIONS";
export const EMPTY_NOTIFICATIONS = "EMPTY_NOTIFICATIONS";
export const MARK_NOTIFICATIONS_AS_SHOWN = "MARK_NOTIFICATIONS_AS_SHOWN";
export const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";
export const addNotificationAction = (notification) => ({
	type: NOTIFICATIONS,
	notification: Object.assign(notification, {shown: false, id: Math.random()})
});
export const emptyNotificationAction = () => ({type: EMPTY_NOTIFICATIONS});
export const markAllNotificationAsShown = () => ({type: MARK_NOTIFICATIONS_AS_SHOWN});
export const removeNotification = (id) => ({type: REMOVE_NOTIFICATION, id});

export const TRANSLATION = "TRANSLATION";
export const LOCALE = "LOCALE";
export const GET_TRANSLATION = "GET_TRANSLATION";
export const getTranslation = (translations) => ({type: GET_TRANSLATION, translations});
export const setLocale = (locale) => ({type: LOCALE, locale});