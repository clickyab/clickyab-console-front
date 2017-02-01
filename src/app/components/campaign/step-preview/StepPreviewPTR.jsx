import React, {Component} from 'react'
import {reduxForm} from "redux-form";
import {select} from "../../../functions/select";
import {navigate} from "../../../functions/navigate";

class StepPreviewPTR extends Component {
    render() {
        let {data, created_at} = this.props;
        let stepData;
        if (select('campaignStepData.type') == 'upload') {
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
                            <div className="mt-step-title uppercase font-grey-cascade">محتوای متنی </div>

                        </div>
                        <div className="col-md-2 mt-step-col done">
                            <div className="mt-step-number bg-white">
                                ۵
                            </div>
                            <div className="mt-step-title uppercase font-grey-cascade">انتخاب پلن </div>

                        </div>

                        <div className="col-md-2 mt-step-col last error">
                            <div className="mt-step-number bg-white">
                                ۶
                            </div>
                            <div className="mt-step-title uppercase font-grey-cascade">تایید نهایی و پرداخت </div>

                        </div>
                    </div>
                    <br/>
                    <br/>

                </div>
            )
        } else if (select('campaignStepData.type') == 'promote') {
            stepData = (
                <div className="mt-element-step  when-select-content" >
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
                            <div className="mt-step-title uppercase font-grey-cascade">انتخاب محتوای چنل </div>

                        </div>
                        <div className="col-lg-15 col-md-3 mt-step-col done">
                            <div className="mt-step-number bg-white">
                                ۴
                            </div>
                            <div className="mt-step-title uppercase font-grey-cascade">انتخاب پلن </div>

                        </div>

                        <div className="col-lg-15 col-md-3 mt-step-col last error">
                            <div className="mt-step-number bg-white">
                                ۵
                            </div>
                            <div className="mt-step-title uppercase font-grey-cascade">تایید نهایی و پرداخت </div>

                        </div>
                    </div>
                    <br/>
                    <br/>

                </div>
            )
        }
        return (
            <div className="page-content">

                <div className="portlet box blue margin-top-20">

                    <div className="portlet-title">
                        <div className="caption">
                            <i className="fa fa-bullseye"/> پیش نمایش کمپین  <span
                            className="campaign-title bold">{data.name}</span></div>
                    </div>
                    <div className="portlet-body form">
                        {stepData}
                        <form className="form-horizontal" role="form">
                            <div className="form-body">
                                <h2>۶- پیش نمایش و پرداخت</h2>
                                <div className="row">

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label col-md-3">نام کمپین :</label>
                                            <div className="col-md-9">
                                                <p className="form-control-static"> {data.name} </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label col-md-3">نام پلان :</label>
                                            <div className="col-md-9">
                                                <p className="form-control-static"> {data.plan_name} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label col-md-3">وضعیت تایید :</label>
                                            <div className="col-md-9">
                                                <p className="form-control-static"> {data.admin_status} </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label col-md-3">وضعیت پرداخت :</label>
                                            <div className="col-md-9">
                                                <p className="form-control-static"> {data.pay_status == 'no' ? 'پرداخت نشده' : 'پرداخت شده'} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label col-md-3">تاریخ ایجاد :</label>
                                            <div className="col-md-9">
                                                <p className="form-control-static"> {created_at(data.created_at)} </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label col-md-3">تاریخ آخرین به‌روز رسانی :</label>
                                            <div className="col-md-9">
                                                <p className="form-control-static"> {created_at(data.updated_at)} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="form-section">جزئيات کمپین</h3>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label col-md-3">نوع تبلیغ :</label>
                                            <div className="col-md-9">
                                                <p className="form-control-static">{select('campaignStepData.type') == 'upload' ? 'محتوای جدید' : 'انتخاب شده از کانال'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label col-md-3">متن :</label>
                                            <div className="col-md-9">
                                                <p className="form-control-static">{data.promotes != null ? data.promotesText : data.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-actions">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-offset-3 col-md-9">
                                                <button onClick={
                                                    () => {
                                                        navigate('/v1/campaign/create/:campaign_id:/step/plan', {
                                                            campaign_id: select('createCampaignData.id')
                                                        });
                                                    }
                                                } className="btn btn-default  button-next btn-arrow-text margin-top-40"
                                                        type="submit"><i className="fa fa-angle-right"/> مرحله قبل
                                                </button>
                                                <button onClick={
                                                    () => {
                                                        navigate('/v1/');
                                                    }
                                                } className="btn btn-primary  button-next btn-arrow-text margin-top-40"
                                                        type="submit">تایید و پرداخت <i className="fa fa-angle-left"/>
                                                </button>

                                            </div>
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