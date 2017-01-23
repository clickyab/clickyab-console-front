import React, {Component} from "react";
import $ from "jquery";
import {reduxForm, change} from "redux-form";
import Radio from './../../common/form/Radio';
import {dispatch} from "../../../functions/dispatch";
import {navigate} from "../../../functions/navigate";


class SelectTypePTR extends Component {
    selectTypeContentForm;

    constructor(props) {
        super(props);
        this.state = {
            next: '/v1/campaign/create/step/upload'
        }
    }

    handleInitialize() {
        dispatch(change("SelectTypePTRForm", 'step-type-content', 'generate_content'))
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
        return (
            <div className="page-content">

                <div className="portlet light margin-top-20">

                    <div className="portlet-title">
                        <div className="caption">
                            <i className="fa fa-bullseye"/> ثبت کمپین جدید
                        </div>
                    </div>
                    <div className="portlet-body form">

                        <div className="mt-element-step margin-top-20 when-select-content ">
                            <div className="row step-background">
                                <div className="col-md-3 bg-grey-steel mt-step-col">
                                    <div className="mt-step-number">۱</div>
                                    <div className="mt-step-title uppercase font-grey-cascade">نام کمپین</div>
                                    <div className="mt-step-content font-grey-cascade">یک نام به کمپین خود اختصاص
                                        دهید.
                                    </div>
                                </div>
                                <div className="col-md-3 bg-grey-steel mt-step-col active">
                                    <div className="mt-step-number">۲</div>
                                    <div className="mt-step-title uppercase font-grey-cascade">انتخاب نوع محتوا</div>
                                    <div className="mt-step-content font-grey-cascade">انتخاب پلن را بر اساس میزان
                                        بازدید مشخص کنید
                                    </div>
                                </div>
                                <div className="col-md-3 bg-grey-steel mt-step-col">
                                    <div className="mt-step-number">۳</div>
                                    <div className="mt-step-title uppercase font-grey-cascade">انتخاب محتوا</div>
                                    <div className="mt-step-content font-grey-cascade">انتخاب محتوای کانال های دیگر
                                    </div>
                                </div>
                                <div className="col-md-3 bg-grey-steel mt-step-col">
                                    <div className="mt-step-number">۴</div>
                                    <div className="mt-step-title uppercase font-grey-cascade">انتخاب پلن</div>
                                    <div className="mt-step-content font-grey-cascade">انتخاب پلن را بر اساس میزان
                                        بازدید مشخص کنید
                                    </div>
                                </div>

                            </div>
                            <br/>
                        </div>

                        <div className="mt-element-step margin-top-20 when-generate-content" style={{display: 'none'}}>
                            <div className="row step-background">
                                <div className="col-lg-15 col-md-3 bg-grey-steel mt-step-col">
                                    <div className="mt-step-number">۱</div>
                                    <div className="mt-step-title uppercase font-grey-cascade">نام کمپین</div>
                                    <div className="mt-step-content font-grey-cascade">یک نام به کمپین خود اختصاص
                                        دهید.
                                    </div>
                                </div>
                                <div className="col-lg-15 col-md-3 bg-grey-steel mt-step-col active">
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
                                <div className="col-lg-15 col-md-3 bg-grey-steel mt-step-col">
                                    <div className="mt-step-number">۵</div>
                                    <div className="mt-step-title uppercase font-grey-cascade">انتخاب پلن</div>
                                    <div className="mt-step-content font-grey-cascade">انتخاب پلن را بر اساس میزان
                                        بازدید مشخص کنید
                                    </div>
                                </div>

                            </div>
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
                                                               $(".when-select-content").fadeIn();
                                                               $(".when-generate-content").hide();
                                                               this.setState({
                                                                   next: "/v1/campaign/create/step/upload"
                                                               });
                                                           }}
                                                           value={'generate_content'} id={'generate_content'}/>
                                                    <Radio label={'پروموت محتوای کانال های دیگر'}
                                                           onClick={(event) => {
                                                               $(".when-generate-content").fadeIn();
                                                               $(".when-select-content").hide();
                                                               this.setState({
                                                                   next: "/v1/campaign/create/step/promote"
                                                               });
                                                           }}
                                                           name={'step-type-content'} value={'select_content'}
                                                           id={'select_content'}/>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 margin-top-20">
                                                    <span onClick={() => navigate(this.state.next)}
                                                          className="btn btn-info btn-lg" type="submit">مرحله بعد</span>
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