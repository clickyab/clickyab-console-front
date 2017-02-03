import React, {Component} from "react";
import $ from "jquery";
import {reduxForm, change} from "redux-form";
import Radio from './../../common/form/Radio';
import {dispatch} from "../../../functions/dispatch";
import {navigate} from "../../../functions/navigate";
import {select} from "../../../functions/select";
import {campaignStepType, updateLocalStorageAction} from "../../../redux/actions/index";


class SelectTypePTR extends Component {
    selectTypeContentForm;

    constructor(props) {
        super(props);
        this.state = {
            next: '/v1/advertiser/campaign/create/:campaign_id:/step/upload',
            type: 'upload'
        }
    }

    handleInitialize() {
        if(select('campaignStepData.type') == 'promote') {
            dispatch(change("SelectTypePTRForm", 'step-type-content', 'select_content'));
            this.setState({
                next: "/v1/advertiser/campaign/create/:campaign_id:/step/promote",
                type: 'promote'
            });
        } else  {
            dispatch(change("SelectTypePTRForm", 'step-type-content', 'generate_content'));
            this.setState({
                next: "/v1/advertiser/campaign/create/:campaign_id:/step/upload",
                type: 'upload'
            });
        }

    }

    componentDidMount() {
        this.handleInitialize();

        this.selectTypeContentForm = $('.campaign-name-form');
        this.selectTypeContentForm.validate({
            rules: {
                name: {
                    required: true,
                },
            },
            messages: {
                name: {
                    required: 'لطفا نام کمپین را وارد نمایید',
                },
            }
        });
    }


    render() {
        const {handleSubmit, SubmitCreateCampaignName} = this.props;
        let campaignTitle = select("createCampaignData.name","no title");
        let toggleStyleUpload;
        let toggleStylePromote;
        if (this.state.type == 'upload' || this.state.type == '') {
            toggleStyleUpload = {
                display : 'block',
            };
        } else {
            toggleStyleUpload = {
                display : 'none',
            };
        }
        if (this.state.type == 'promote' || this.state.type == '') {
            toggleStylePromote = {
                display : 'block',
            };
        } else {
            toggleStylePromote = {
                display : 'none',
            };
        }
        return (
            <div className="page-content">

                <div className="portlet light margin-top-20">

                    <div className="portlet-title">
                        <div className="caption font-blue">
                            <i className="fa fa-bullseye font-blue"/> انتخاب نوع محتوای کمپین <span className="bold"> {campaignTitle}</span>
                        </div>
                    </div>
                    <div className="portlet-body form">

                        <div className="mt-element-step margin-top-20 when-select-content" style={toggleStylePromote} >
                            <div className="row step-line">
                                <div className="col-lg-15 col-md-3 mt-step-col first done">
                                    <div className="mt-step-number bg-white">
                                        ۱
                                    </div>
                                    <div className="mt-step-title uppercase font-grey-cascade">نام کمپین</div>

                                </div>
                                <div className="col-lg-15 col-md-3 mt-step-col error">
                                    <div className="mt-step-number bg-white">
                                        ۲
                                    </div>
                                    <div className="mt-step-title uppercase font-grey-cascade">انتخاب نوع محتوا</div>
                                </div>
                                <div className="col-lg-15 col-md-3 mt-step-col ">
                                    <div className="mt-step-number bg-white">
                                        ۳
                                    </div>
                                    <div className="mt-step-title uppercase font-grey-cascade">انتخاب محتوای چنل </div>

                                </div>
                                <div className="col-lg-15 col-md-3 mt-step-col ">
                                    <div className="mt-step-number bg-white">
                                        ۴
                                    </div>
                                    <div className="mt-step-title uppercase font-grey-cascade">انتخاب پلن </div>

                                </div>

                                <div className="col-lg-15 col-md-3 mt-step-col last">
                                    <div className="mt-step-number bg-white">
                                        ۵
                                    </div>
                                    <div className="mt-step-title uppercase font-grey-cascade">تایید نهایی و پرداخت </div>

                                </div>
                            </div>
                            <br/>
                            <br/>

                        </div>

                        <div className="mt-element-step margin-top-20 when-generate-content" style={toggleStyleUpload} >
                            <div className="row step-line">
                                <div className="col-md-2 mt-step-col first done">
                                    <div className="mt-step-number bg-white">
                                        ۱
                                    </div>
                                    <div className="mt-step-title uppercase font-grey-cascade">نام کمپین</div>

                                </div>
                                <div className="col-md-2 mt-step-col error">
                                    <div className="mt-step-number bg-white">
                                        ۲
                                    </div>
                                    <div className="mt-step-title uppercase font-grey-cascade">انتخاب نوع محتوا</div>
                                </div>
                                <div className="col-md-2 mt-step-col ">
                                    <div className="mt-step-number bg-white">
                                        ۳
                                    </div>
                                    <div className="mt-step-title uppercase font-grey-cascade">آپلود فایل</div>

                                </div>
                                <div className="col-md-2 mt-step-col ">
                                    <div className="mt-step-number bg-white">
                                        ۴
                                    </div>
                                    <div className="mt-step-title uppercase font-grey-cascade">محتوای متنی </div>

                                </div>
                                <div className="col-md-2 mt-step-col ">
                                    <div className="mt-step-number bg-white">
                                        ۵
                                    </div>
                                    <div className="mt-step-title uppercase font-grey-cascade">انتخاب پلن </div>

                                </div>

                                <div className="col-md-2 mt-step-col last">
                                    <div className="mt-step-number bg-white">
                                        ۶
                                    </div>
                                    <div className="mt-step-title uppercase font-grey-cascade">تایید نهایی و پرداخت </div>

                                </div>
                            </div>
                            <br/>
                            <br/>

                        </div>

                        <div className='row'>
                            <form>
                                <div className='col-md-12 col-xs-12'>
                                    <div className='mt-element-ribbon bg-grey-steel'>
                                        <div className='ribbon ribbon-color-primary uppercase'>نوع محتوای تبلیغ خود را
                                            مشخص کنید
                                        </div>
                                        <div className='ribbon-content'>
                                            شما می توانید برای کمپین خود هم محتوای جدید تولید کنید و یا همچنین می توانید
                                            محتوای کانال های دیگران را <b>پروموت</b> کنید ، در صورتی که پروموت را انتخاب
                                            نمایید می توانید یکی از پیام های کانل ها را انتخاب کرده و کمپین خود را نهایی
                                            کنید و یا اگر میخواهید محتوای جدید تولید کنید می تواند با انتخاب گزینه <b>محتوای
                                            جدید</b> متن و و مدیای خود را آپلود نمایید
                                            <br />
                                            <br />

                                            <div className='form-group form-md-radios'>
                                                <div className='md-radio-list'>
                                                    <Radio label={'محتوای جدید'} name={'step-type-content'}
                                                           onClick={(event) => {
                                                               this.setState({
                                                                   next: "/v1/advertiser/campaign/create/:campaign_id:/step/upload",
                                                                   type: 'upload'
                                                               });
                                                           }}
                                                           value={'generate_content'} id={'generate_content'}/>
                                                    <Radio label={'پروموت محتوای کانال های دیگر'}
                                                           onClick={(event) => {
                                                               this.setState({
                                                                   next: "/v1/advertiser/campaign/create/:campaign_id:/step/promote",
                                                                   type: 'promote'
                                                               });
                                                           }}
                                                           name={'step-type-content'} value={'select_content'}
                                                           id={'select_content'}/>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 margin-top-20 space-btn">
                                                    <button onClick={
                                                        () => {
                                                            navigate('/v1/advertiser/campaign/create/:campaign_id:/step/name', {
                                                                campaign_id: select('createCampaignData.id')
                                                            });
                                                        }
                                                    } className="btn btn-default  button-next btn-arrow-text" type="submit"> <i className="fa fa-angle-right"/> مرحله قبل </button>
                                                    <button onClick={
                                                        () => {
                                                            navigate(this.state.next, {
                                                                campaign_id: select('createCampaignData.id')
                                                    	    });
                                                            dispatch(campaignStepType(this.state.type));
                                                            dispatch(updateLocalStorageAction());
                                                        }
                                                    }
                                                          className="btn btn-info  button-next btn-arrow-text" type="submit">مرحله بعد <i className="fa fa-angle-left"/></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default reduxForm({
    form: 'SelectTypePTRForm'
})(SelectTypePTR);