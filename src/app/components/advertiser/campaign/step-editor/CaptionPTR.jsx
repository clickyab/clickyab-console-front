import React, {Component} from "react";
import $ from "jquery";
import {Field, reduxForm} from "redux-form";
import {select} from "../../../../functions/select";
import {navigate} from "../../../../functions/navigate";


class CaptionPTR extends Component {
	captionCampaignForm;

	componentDidMount() {
		if (select('createCampaignData.description') != null) {
			$(".emojieditor-plugin-content").val(select('createCampaignData.description'))
		}
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

		this.captionCampaignForm = $('.text-editor-form');
	}

	render() {
		const {handleSubmit, submitTextEditor} = this.props;
		let campaignTitle = select("createCampaignData.name", "no title");
		return (
			<div className="page-content">

				<div className="portlet light margin-top-20">

					<div className="portlet-title">
						<div className="caption font-blue">
							<i className="fa fa-bullseye font-blue"/> کپشن تبلیغ <span
							className="campaign-title bold">{campaignTitle}</span></div>
					</div>
					<div className="portlet-body form">
						<div className="mt-element-step margin-top-20 when-generate-content">
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
								<div className="col-md-2 mt-step-col error">
									<div className="mt-step-number bg-white">
										۴
									</div>
									<div className="mt-step-title uppercase font-grey-cascade">محتوای متنی</div>

								</div>
								<div className="col-md-2 mt-step-col ">
									<div className="mt-step-number bg-white">
										۵
									</div>
									<div className="mt-step-title uppercase font-grey-cascade">انتخاب پلن</div>

								</div>

								<div className="col-md-2 mt-step-col last">
									<div className="mt-step-number bg-white">
										۶
									</div>
									<div className="mt-step-title uppercase font-grey-cascade">تایید نهایی و پرداخت
									</div>

								</div>
							</div>
							<br/>
							<br/>

						</div>

						<form className="margin-top-40 text-editor-form">
							<div className="form-group">


								<span className="field-validation-valid error small" data-valmsg-for="ChannelId"
									  data-valmsg-replace="true"/>
							</div>
							<div className="form-group">
								<h2>۴- متن مورد نظر تبلیغ را وارد نمایید</h2>
								<div className="emoji-editor" id="emojieditor-plugin-parent">
									<div className="top-button-container row">
										<button type="button"
												className="btn btn-icon-only default emojieditor-plugin-btnBold"
												data-keys="keys">
											<i className="fa fa-bold"/>
										</button>
										<button type="button"
												className="btn btn-icon-only default emojieditor-plugin-btnItalic"
												data-keys="keys">
											<i className="fa fa-italic"/>
										</button>
										<button type="button"
												className="btn btn-icon-only default emojieditor-plugin-btnLink"
												data-keys="keys">
											<i className="fa fa-chain"/>
										</button>
										<button type="button"
												className="btn btn-icon-only default emojieditor-plugin-btnUnLink"
												data-keys="keys">
											<i className="fa fa-chain-broken"/>
										</button>
										<span className="pull-left">
        <span>حروف باقیمانده:</span>
        <span className="emojieditor-plugin-remaining"/>
        <input className="emojieditor-plugin-hidden-remaining" type="hidden"
			   name="emojieditor-plugin-hidden-remaining"/>
    </span>
									</div>
									<div id="emojieditor-plugin-container"
										 className="emojieditor-plugin-container"></div>
									<div className="emojieditor-plugin-result">
										<Field className="emojieditor-plugin-content emojieditor-plugin-textarea"
											   cols="20" data-val="true"
											   data-val-maxallowedlength="طول متن نباید از ۴۰۰۰ کاراکتر بیشتر باشد."
											   data-val-maxallowedlength-maxallowedlength="4000"
											   data-val-required="متن پست را وارد کنید" id="Text" name="Text" rows="2"
											   component="textarea"/>

									</div>
								</div>
							</div>
							<div className="margin-top-20 space-btn">
								<button onClick={
									() => {
										navigate('/v1/advertiser/campaign/create/:campaign_id:/step/type', {
											campaign_id: select('createCampaignData.id')
										});
									}
								} className="btn btn-default  button-next btn-arrow-text" type="submit"><i
									className="fa fa-angle-right"/> مرحله قبل
								</button>
								<button className="submit caption-text-form-btn btn btn-info" type="submit">مرحله بعد
								</button>
							</div>
						</form>
					</div>
				</div>

				<div className="add-link-editor-modal modal fade fullscreen" id="addLinkEditorModal" tabIndex="-1"
					 role="dialog"
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
											<Field component="input" type="text" name="link"
												   placeholder='آدرس با http و یا https'
												   className="form-control input-lg emojieditor-plugin-linkAdress"
												   id="link"/>
										</div>
										<button type="submit"
												className="btn btn-primary btn-lg add-link-button btn-block emojieditor-plugin-changelink">
											درج لینک
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