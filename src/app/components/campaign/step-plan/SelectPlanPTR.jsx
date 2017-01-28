import React, {Component} from "react";
import {select} from "../../../functions/select";
import {navigate} from "../../../functions/navigate";
import { PersianNumber } from 'react-persian';
export default class SelectPlanPTR extends Component {

    PlanList() {
        let items = [];
        let {PlanList} = this.props;
        for (let key in PlanList.items) {
            items.push(
                <div className="col-md-3" key={key}>
                    <div className="price-column-container border-active">
                        <div className="price-table-head bg-blue">
                            <h2 className="no-margin"> {PlanList.items[key].name}</h2>
                        </div>
                        <div className="arrow-down border-top-blue"/>
                        <div className="price-table-pricing">
                            <h3 className="persian-number">
                                <sup className="price-sign">تومان</sup> <PersianNumber>{PlanList.items[key].price} </PersianNumber> </h3>
                        </div>
                        <div className="price-table-content">
                            <p className="mobile-padding"> {PlanList.items[key].description}</p>
                        </div>
                        <div className="arrow-down arrow-grey"></div>
                        <div className="price-table-footer">
                            <button type="button" className="btn grey-salsa btn-outline sbold uppercase price-button">انتخاب و پرداخت</button>
                        </div>
                    </div>
                </div>
            );
        }
        return items;

    };
    render() {
        let campaignTitle = select("createCampaignData.name","no title");
        let data;

        if(select('campaignStepData.type') == 'upload') {
            data = (
                <div className="mt-element-step margin-top-20 when-generate-content">
                    <div className="row step-background">
                        <div className="col-lg-15 col-md-3 bg-grey-steel mt-step-col">
                            <div className="mt-step-number">۱</div>
                            <div className="mt-step-title uppercase font-grey-cascade">نام کمپین</div>
                            <div className="mt-step-content font-grey-cascade">یک نام به کمپین خود اختصاص
                                دهید.
                            </div>
                        </div>
                        <div className="col-lg-15 col-md-3 bg-grey-steel mt-step-col">
                            <div className="mt-step-number">۲</div>
                            <div className="mt-step-title uppercase font-grey-cascade">انتخاب نوع محتوا</div>
                            <div className="mt-step-content font-grey-cascade">انتخاب پلن را بر اساس میزان
                                بازدید مشخص کنید
                            </div>
                        </div>
                        <div className=" col-lg-15 col-md-3 bg-grey-steel mt-step-col">
                            <div className="mt-step-number">۳</div>
                            <div className="mt-step-title uppercase font-grey-cascade">آپلود فایل و مدیا</div>
                            <div className="mt-step-content font-grey-cascade">عکس، ویدیو و یا پی دی اف خود را
                                آپلود کنید.
                            </div>
                        </div>
                        <div className="col-lg-15 col-md-3 bg-grey-steel mt-step-col">
                            <div className="mt-step-number">۴</div>
                            <div className="mt-step-title uppercase font-grey-cascade">کپشن تبلیغ</div>
                            <div className="mt-step-content font-grey-cascade">متن تبلیغ خود را تایپ کنید</div>
                        </div>
                        <div className="col-lg-15 col-md-3 bg-grey-steel mt-step-col active">
                            <div className="mt-step-number">۵</div>
                            <div className="mt-step-title uppercase font-grey-cascade">انتخاب پلن</div>
                            <div className="mt-step-content font-grey-cascade">انتخاب پلن را بر اساس میزان
                                بازدید مشخص کنید
                            </div>
                        </div>

                    </div>
                    <br/>
                </div>
            )
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
                                        {this.PlanList()}
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
