export const UPDATE_LOCAL_STORAGE = 'UPDATE_LOCAL_STORAGE';
export const REMOVE_LOCAL_STORAGE = 'REMOVE_LOCAL_STORAGE';
export const CHANGE_QUERY = 'CHANGE_QUERY';

export const planListAction = (data) => ({type: PLAN_LIST, data});
export const PLAN_LIST = 'PLAN_LIST';

export const CAMPAIGN_LIST = 'CAMPAIGN_LIST';
export const CAMPAIGN_ITEMS_LIST = 'CAMPAIGN_ITEMS_LIST';
export const CREATE_CAMPAIGN = 'CREATE_CAMPAIGN';
export const CAMPAIGN_STEP_TYPE = 'CAMPAIGN_STEP_TYPE';
export const DELETE_CAMPAIGN_PROMOTE = 'DELETE_CAMPAIGN_PROMOTE';
export const campaignListAction = (data) => ({type: CAMPAIGN_LIST, data});
export const campaignItemsListAction = ({data}) => ({type: CAMPAIGN_ITEMS_LIST, data});
export const createCampaign = (data) => ({type: CREATE_CAMPAIGN, data});
export const campaignStepType = (data) => ({type: CAMPAIGN_STEP_TYPE, data});
export const deleteCampaignPromote = () => ({type: DELETE_CAMPAIGN_PROMOTE});

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
export const roleDataAction = (data) => ({type: ROLE_DATA, data});
export const roleQueryAction = (list, query_name, queries) => ({type: ROLE_QUERY, list, query_name, queries});
export const roleListAction = (data) => ({type: ROLE_LIST, data});
export const roleItemsListAction = ({data}) => ({type: ROLE_ITEMS_LIST, items: data});
export const updateARoleFromListAction = (data) => ({type: UPDATE_ROLE_FROM_LIST, data});

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

export const TELEGRAM_LIST = 'TELEGRAM_LIST';
export const TELEGRAM_ITEMS_LIST = 'TELEGRAM_ITEMS_LIST';
export const telegramListAction = (data) => ({type: TELEGRAM_LIST, data});
export const telegramItemsListAction = ({data}) => ({type: TELEGRAM_ITEMS_LIST, items: data});

export const updateLocalStorageAction = () => ({type: UPDATE_LOCAL_STORAGE});
export const asyncRemoveLocalStorageAction = () => ({type: REMOVE_LOCAL_STORAGE});

export const VERSION = "VERSION";
export const versionAction = (version) => ({type: VERSION, version});