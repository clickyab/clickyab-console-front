import React, {Component} from "react";
import {reduxForm} from "redux-form";
import {select} from "../../../../functions/select";
import {navigate} from "../../../../functions/navigate";

class StepPreviewPTR extends Component {
    render() {
        console.log(select('createCampaignData'));
        let {data, created_at} = this.props;
        let stepData, buttons;
        if (select('campaignStepData.type') == 'upload') {
            let payStatus = select('createCampaignData.pay_status') == 'yes' ? 'col-md-2 mt-step-col last done' : 'col-md-2 mt-step-col last error';
            stepData = (
                <div className="mt-element-step  when-generate-content">
                    <div className="row step-line">
                        <div className="col-md-2 mt-step-col first done">
                            <div className="mt-step-number bg-white">
                                ۱
                            </div>
                            <div className="mt-step-title uppercase font-grey-cascade">نام کمپین</div>

                        </div>
                        <div className="col-md-2 mt-step-col done">
                            <div className="mt-step-number bg-white">
                                ۲
                            </div>
                            <div className="mt-step-title uppercase font-grey-cascade">انتخاب نوع محتوا</div>
                        </div>
                        <div className="col-md-2 mt-step-col done">
                            <div className="mt-step-number bg-white">
                                ۳
                            </div>
                            <div className="mt-step-title uppercase font-grey-cascade">آپلود فایل</div>

                        </div>
                        <div className="col-md-2 mt-step-col done">
                            <div className="mt-step-number bg-white">
                                ۴
                            </div>
                            <div className="mt-step-title uppercase font-grey-cascade">محتوای متنی</div>

                        </div>
                        <div className="col-md-2 mt-step-col done">
                            <div className="mt-step-number bg-white">
                                ۵
                            </div>
                            <div className="mt-step-title uppercase font-grey-cascade">انتخاب پلن</div>

                        </div>

                        <div className={payStatus}>
                            <div className="mt-step-number bg-white">
                                ۶
                            </div>
                            <div className="mt-step-title uppercase font-grey-cascade">تایید نهایی و پرداخت</div>

                        </div>
                    </div>
                    <br/>
                    <br/>

                </div>
            )
        } else if (select('campaignStepData.type') == 'promote') {
            let payStatus = select('createCampaignData.pay_status') == 'yes' ? 'col-lg-15 col-md-3 mt-step-col last done' : 'col-lg-15 col-md-3 mt-step-col last error';

            stepData = (
                <div className="mt-element-step  when-select-content">
                    <div className="row step-line">
                        <div className="col-lg-15 col-md-3 mt-step-col first done">
                            <div className="mt-step-number bg-white">
                                ۱
                            </div>
                            <div className="mt-step-title uppercase font-grey-cascade">نام کمپین</div>

                        </div>
                        <div className="col-lg-15 col-md-3 mt-step-col done">
                            <div className="mt-step-number bg-white">
                                ۲
                            </div>
                            <div className="mt-step-title uppercase font-grey-cascade">انتخاب نوع محتوا</div>
                        </div>
                        <div className="col-lg-15 col-md-3 mt-step-col done">
                            <div className="mt-step-number bg-white">
                                ۳
                            </div>
                            <div className="mt-step-title uppercase font-grey-cascade">انتخاب محتوای چنل</div>

                        </div>
                        <div className="col-lg-15 col-md-3 mt-step-col done">
                            <div className="mt-step-number bg-white">
                                ۴
                            </div>
                            <div className="mt-step-title uppercase font-grey-cascade">انتخاب پلن</div>

                        </div>
                        <div className={payStatus}>
                            <div className="mt-step-number bg-white">
                                ۵
                            </div>
                            <div className="mt-step-title uppercase font-grey-cascade">تایید نهایی و پرداخت</div>

                        </div>
                    </div>
                    <br/>
                    <br/>

                </div>
            )
        }

        if (select('createCampaignData.pay_status') == 'yes') {
            buttons = (
                <div className="col-md-offset-3 col-md-9">
                    <button onClick={
                        () => {
                            navigate('/v1/advertiser');
                        }

                    }
                            className="btn btn-primary pay-button button-next btn-arrow-text margin-top-40"
                            type="submit">تایید <i className="fa fa-angle-left"/>
                    </button>

                </div>
            )
        } else {
            buttons = (
                <div className="col-md-offset-3 col-md-9">
                    <button onClick={
                        () => {
                            navigate('/v1/advertiser/campaign/create/:campaign_id:/step/plan', {
                                campaign_id: select('createCampaignData.id')
                            });
                        }
                    } className="btn btn-default  button-next btn-arrow-text margin-top-40"
                            type="submit"><i className="fa fa-angle-right"/> مرحله قبل
                    </button>
                    <button onClick={
                        (e) => {
                            e.preventDefault();
                            this.props.requestToBank();
                        }

                    }
                            className="btn btn-primary pay-button button-next btn-arrow-text margin-top-40"
                            type="submit">تایید و پرداخت <i className="fa fa-angle-left"/>
                    </button>

                </div>
            )
        }

        return (
            <div className="page-content">

                <div className="portlet box blue margin-top-20">

                    <div className="portlet-title">
                        <div className="caption">
                            <i className="fa fa-bullseye"/> پیش نمایش کمپین <span
                            className="campaign-title bold">{data.name}</span></div>
                    </div>
                    <div className="portlet-body form">
                        {stepData}
                        <form className="form-horizontal" role="form">
                            <div className="form-body">
                                <h2>۶- پیش نمایش و پرداخت</h2>
                                <div className="row">

                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="control-label col-md-3">نام کمپین :</label>
                                            <div className="col-md-9">
                                                <p className="form-control-static"> {data.name} </p>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-md-3">نام پلان :</label>
                                            <div className="col-md-9">
                                                <p className="form-control-static"> {data.plan_name} </p>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-md-3">وضعیت تایید :</label>
                                            <div className="col-md-9">
                                                <p className="form-control-static"> {data.admin_status} </p>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-md-3">وضعیت پرداخت :</label>
                                            <div className="col-md-9">
                                                <p className="form-control-static"> {data.pay_status == 'no' ?
                                                    <span className="label label-danger">پرداخت نشده</span> :
                                                    <span className="label label-success">پرداخت شده</span>} </p>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-md-3">تاریخ ایجاد :</label>
                                            <div className="col-md-9">
                                                <p className="form-control-static"> {created_at(data.created_at)} </p>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-md-3">تاریخ آخرین به‌روز رسانی :</label>
                                            <div className="col-md-9">
                                                <p className="form-control-static"> {created_at(data.updated_at)} </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div id="portraitMode1">
                                            <div className="device-container" style={{maxWidth: '300px'}}
                                                 data-size-port="300px" data-size-land="600px">
                                                <div className="device-mockup" data-device="iphone6_plus"
                                                     data-orientation="portrait" data-color="black">
                                                    <div className="device">
                                                        <img className="bottom-iphone" src="/img/bottom-iphone.png"/>
                                                        <img className="top-iphone" src="/img/top-iphone.png"/>
                                                        <div className="screen">
                                                            <div className="container-telegram-view">
                                                                <div className="bubble bubble-alt yellow">
                                                                    <p className="font-blue">توییتر فارسی</p>
                                                                    <img src={data.src}/>
                                                                    <p className="content">{data.promotes != null ? data.promotesText : data.description}</p>
                                                                    <div className="footage">
                                                                        <span className="time">20:56</span>
                                                                        <span className="view"><img src="/img/view.png"
                                                                                                    width="16"
                                                                                                    height="16"/> 3315</span>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div className="button">

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-actions">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="row">
                                            {buttons}
                                        </div>
                                    </div>
                                    <div className="col-md-6"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default reduxForm({
    form: 'StepPreviewPTR'
})(StepPreviewPTR);