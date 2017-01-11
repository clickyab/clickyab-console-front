import React, {Component} from "react";

export default class SelectPlanPTR extends Component {


    render() {
        return (
            <div className="page-content">

                <div className="portlet light margin-top-20">

                    <div className="portlet-title">
                        <div className="caption">
                            <i className="fa fa-bullseye"/> انتخاب پلن تبلیغاتی   <span className="campaign-title">فلانی</span> </div>
                    </div>
                    <div className="portlet-body form">
                        <div className="mt-element-step margin-top-20">
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
                        </div>

                        <div className="margin-top-40">
                            <div className="pricing-content-1">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="price-column-container border-active">
                                            <div className="price-table-head bg-blue">
                                                <h2 className="no-margin">پلن نقره ای</h2>
                                            </div>
                                            <div className="arrow-down border-top-blue"></div>
                                            <div className="price-table-pricing">
                                                <h3>
                                                    <sup className="price-sign">تومان</sup>۱۰۰,۰۰۰</h3>
                                                {/*<p>per month</p>*/}
                                            </div>
                                            <div className="price-table-content">
                                                <p className="mobile-padding">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع </p>
                                            </div>
                                            <div className="arrow-down arrow-grey"></div>
                                            <div className="price-table-footer">
                                                <button type="button" className="btn grey-salsa btn-outline sbold uppercase price-button">انتخاب و پرداخت</button>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-md-6">
                                        <div className="price-column-container border-active">
                                            <div className="price-table-head bg-purple">
                                                <h2 className="no-margin">پلن طلایی</h2>
                                            </div>
                                            <div className="arrow-down border-top-purple"></div>
                                            <div className="price-table-pricing">
                                                <h3>
                                                    <sup className="price-sign">تومان</sup>۲۰۰,۰۰۰</h3>
                                            </div>
                                            <div className="price-table-content">
                                                <p className=" mobile-padding">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع </p>
                                            </div>
                                            <div className="arrow-down arrow-grey"></div>
                                            <div className="price-table-footer">
                                                <button type="button" className="btn grey-salsa btn-outline price-button sbold uppercase">انتخاب و پرداخت</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
