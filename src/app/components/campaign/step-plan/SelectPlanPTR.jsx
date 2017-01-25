import React, {Component} from "react";
import {select} from "../../../functions/select";
import {navigate} from "../../../functions/navigate";

export default class SelectPlanPTR extends Component {
    render() {
        let campaignTitle = select("createCampaignData.name","no title");
        let data;
        if(select('campaignStepData.type') == 'upload') {
            data = (<div className="mt-element-step margin-top-20">
                <div className="row step-background">
                    <div className="col-md-3 bg-grey-steel mt-step-col">
                        <div className="mt-step-number">۱</div>
                        <div className="mt-step-title uppercase font-grey-cascade">نام کمپین</div>
                        <div className="mt-step-content font-grey-cascade">یک نام به کمپین خود اختصاص دهید.</div>
                    </div>
                    <div className="col-md-3 bg-grey-steel mt-step-col">
                        <div className="mt-step-number">۲</div>
                        <div className="mt-step-title uppercase font-grey-cascade">آپلود فایل و مدیا</div>
                        <div className="mt-step-content font-grey-cascade">عکس، ویدیو و یا پی دی اف خود را آپلود کنید.</div>
                    </div>
                    <div className="col-md-3 bg-grey-steel mt-step-col">
                        <div className="mt-step-number">۳</div>
                        <div className="mt-step-title uppercase font-grey-cascade">کپشن تبلیغ</div>
                        <div className="mt-step-content font-grey-cascade">متن تبلیغ خود را تایپ کنید</div>
                    </div>
                    <div className="col-md-3 bg-grey-steel mt-step-col active">
                        <div className="mt-step-number">۴</div>
                        <div className="mt-step-title uppercase font-grey-cascade">انتخاب پلن</div>
                        <div className="mt-step-content font-grey-cascade">انتخاب پلن را بر اساس میزان بازدید مشخص کنید</div>
                    </div>
                </div>
                <br/>
            </div>)
        } else if (select('campaignStepData.type') == 'promote') {
            data = (<div className="mt-element-step margin-top-20 when-select-content " >
                <div className="row step-background">
                    <div className="col-md-3 bg-grey-steel mt-step-col">
                        <div className="mt-step-number">۱</div>
                        <div className="mt-step-title uppercase font-grey-cascade">نام کمپین</div>
                        <div className="mt-step-content font-grey-cascade">یک نام به کمپین خود اختصاص
                            دهید.
                        </div>
                    </div>
                    <div className="col-md-3 bg-grey-steel mt-step-col">
                        <div className="mt-step-number">۲</div>
                        <div className="mt-step-title uppercase font-grey-cascade">انتخاب نوع محتوا</div>
                        <div className="mt-step-content font-grey-cascade">انتخاب پلن را بر اساس میزان
                            بازدید مشخص کنید
                        </div>
                    </div>
                    <div className="col-md-3 bg-grey-steel mt-step-col ">
                        <div className="mt-step-number">۳</div>
                        <div className="mt-step-title uppercase font-grey-cascade">انتخاب محتوا</div>
                        <div className="mt-step-content font-grey-cascade">انتخاب محتوای کانال های دیگر
                        </div>
                    </div>
                    <div className="col-md-3 bg-grey-steel mt-step-col active">
                        <div className="mt-step-number">۴</div>
                        <div className="mt-step-title uppercase font-grey-cascade">انتخاب پلن</div>
                        <div className="mt-step-content font-grey-cascade">انتخاب پلن را بر اساس میزان
                            بازدید مشخص کنید
                        </div>
                    </div>

                </div>
                <br/>
            </div>)
        }
        return (
            <div className="page-content">

                <div className="portlet light margin-top-20">

                    <div className="portlet-title">
                        <div className="caption">
                            <i className="fa fa-bullseye"/> انتخاب پلن تبلیغاتی   <span className="campaign-title">{campaignTitle}</span> </div>
                    </div>
                    <div className="portlet-body form">
                        {data}
                        <div className="margin-top-40">
                            <div className="pricing-content-1">
                                <div className="row">
                                    <h2>۴- انتخاب پلن تبلیغاتی و پرداخت</h2>
                                    <div className="plan-list">

                                    </div>
                                </div>
                                <button onClick={
                                    () => {
                                        navigate('/v1/campaign/create/:campaign_id:/step/promote', {
                                            campaign_id: select('createCampaignData.id')
                                        });
                                    }
                                } className="btn btn-default  button-next btn-arrow-text margin-top-40" type="submit"> <i className="fa fa-angle-right"/> مرحله قبل </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
