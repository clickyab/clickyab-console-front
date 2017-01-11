import React, {Component} from "react";
import $ from "jquery";
import {Field, reduxForm} from "redux-form";


class CaptionPTR extends Component {
    captionCamapignForm;

    // handleInitialize() {
    //     const initData = select("user.personal", {}, true);
    //     initData.email = getEmail();
    //     this.props.initialize(initData);
    // }

    componentDidMount() {
        // this.handleInitialize();
        $("#emojieditor-plugin-container").emojioneArea({
            parentID: "emojieditor-plugin-parent",
            autoHideFilters: false,
            dir: "rtl",
            hasBia: true,
            length: 4000,
            forUpdate: true,
            standalone: true,
            autocomplete: false,
            template: "<filters/><tabs/><editor/>"
        });

        this.captionCamapignForm = $('.caption-campaign-form');
        this.captionCamapignForm.validate({
            rules: {
                campaign_name: {
                    required: true,
                },
            },
            messages: {
                campaign_name: {
                    required: 'لطفا نام کمپین را وارد نمایید',
                },
            }
        });
    }


    render() {
        const {handleSubmit, submitCampaignName} = this.props;
        return (
            <div className="page-content">

                <div className="portlet light margin-top-20">

                    <div className="portlet-title">
                        <div className="caption">
                            <i className="fa fa-bullseye"/> کپشن تبلیغ <span className="campaign-title">فلانی</span> </div>
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
                                <div className="col-md-3 bg-grey-steel mt-step-col active">
                                    <div className="mt-step-number">۳</div>
                                    <div className="mt-step-title uppercase font-grey-cascade">کپشن تبلیغ</div>
                                    <div className="mt-step-content font-grey-cascade">متن تبلیغ خود را تایپ کنید</div>
                                </div>
                                <div className="col-md-3 bg-grey-steel mt-step-col">
                                    <div className="mt-step-number">۴</div>
                                    <div className="mt-step-title uppercase font-grey-cascade">انتخاب پلن</div>
                                    <div className="mt-step-content font-grey-cascade">انتخاب پلن را بر اساس میزان بازدید مشخص کنید</div>
                                </div>
                            </div>
                            <br/>
                        </div>

                        <form className="margin-top-40">
                            <div className="form-group">



                                <span className="field-validation-valid error small" data-valmsg-for="ChannelId" data-valmsg-replace="true"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Text">متن پست</label>
                                <div className="emoji-editor" id="emojieditor-plugin-parent">
                                    <div className="top-button-container row">
                                        <button type="button" className="btn btn-icon-only default emojieditor-plugin-btnBold" data-keys="keys">
                                            <i className="fa fa-bold"/>
                                        </button>
                                        <button type="button" className="btn btn-icon-only default emojieditor-plugin-btnItalic" data-keys="keys">
                                            <i className="fa fa-italic"/>
                                        </button>
                                        <button type="button" className="btn btn-icon-only default emojieditor-plugin-btnLink" data-keys="keys">
                                            <i className="fa fa-chain"/>
                                        </button>
                                        <button type="button" className="btn btn-icon-only default emojieditor-plugin-btnUnLink" data-keys="keys">
                                            <i className="fa fa-chain-broken"/>
                                        </button>
                                        <span className="pull-left">
        <span>حروف باقیمانده:</span>
        <span className="emojieditor-plugin-remaining"/>
        <input className="emojieditor-plugin-hidden-remaining" type="hidden" name="emojieditor-plugin-hidden-remaining" />
    </span>
                                    </div>
                                    <div id="emojieditor-plugin-container" className="emojieditor-plugin-container"></div>
                                    <div className="emojieditor-plugin-result">
                            <textarea className="emojieditor-plugin-content emojieditor-plugin-textarea" cols="20" data-val="true" data-val-maxallowedlength="طول متن نباید از ۴۰۰۰ کاراکتر بیشتر باشد." data-val-maxallowedlength-maxallowedlength="4000" data-val-required="متن پست را وارد کنید" id="Text" name="Text" rows="2">
</textarea>
                                    </div>
                                </div>
                            </div>
                            <button className="submit btn dark btn-outline btn-lg margin-top-20" type="submit">مرحله بعد</button>
                        </form>
                    </div>
                </div>

                <div className="add-link-editor-modal modal fade fullscreen" id="addLinkEditorModal" tabIndex="-1" role="dialog"
                     aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="padding-tb-15">
                                    <img className="closebt" src="/img/closebtn.svg" data-dismiss="modal"
                                         aria-hidden="true"/>
                                </div>
                            </div>
                            <div className="modal-body text-center">
                                <div className="col-md-4 col-md-offset-4">
                                    <div className="modal-title text-center">
                                        <h3/>
                                    </div>
                                    <form role="form" action="" id="addLinkEditorForm" method="post"
                                          className="add-channel-form white">
                                        <div className="form-group">
                                            <label htmlFor="admin">آدرس لینک را وارد نمایید</label>
                                            <Field component="input" type="text" name="link" placeholder='آدرس با http و یا https'
                                                   className="form-control input-lg emojieditor-plugin-linkAdress" id="link"/>
                                        </div>
                                        <button type="submit"
                                                className="btn btn-primary btn-lg add-link-button btn-block emojieditor-plugin-changelink">درج لینک
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default reduxForm({
    form: 'CaptionPTRForm'
})(CaptionPTR);