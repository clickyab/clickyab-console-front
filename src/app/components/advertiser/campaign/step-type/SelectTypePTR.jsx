import React, {Component} from "react";
import {change, reduxForm} from "redux-form";
import Radio from "./../../../common/form/Radio";
import {dispatch} from "../../../../functions/dispatch";
import {navigate} from "../../../../functions/navigate";
import {select} from "../../../../functions/select";
import {campaignStepType, updateLocalStorageAction} from "../../../../redux/actions/index";
import {securify} from "./../../../../functions/securify";
import CampaignStepPTR from './../CampaignStepPTR';

class SelectTypePTR extends Component {
	typeStep = select('campaignStepData.type') ? 'done' : 'error';
	stepRowIndi = [{
		stepCondition: 'first done',
		stepNumber: '۱',
		stepName: 'Campaign Name'
	}, {
		stepCondition: this.typeStep,
		stepNumber: '۲',
		stepName: 'Content Type'
	}, {
		stepCondition: '',
		stepNumber: '۳',
		stepName: 'File Upload'
	}, {
		stepCondition: '',
		stepNumber: '۴',
		stepName: 'Text Content'
	}, {
		stepCondition: '',
		stepNumber: '۵',
		stepName: 'Campaign Type'
	}, {
		stepCondition: 'last',
		stepNumber: '۶',
		stepName: 'Finish and Payment'
	}];

	stepRowPromote = [{
		stepCondition: 'first done',
		stepNumber: '۱',
		stepName: 'Campaign Name'
	}, {
		stepCondition: this.typeStep,
		stepNumber: '۲',
		stepName: 'Content Type'
	}, {
		stepCondition: '',
		stepNumber: '۳',
		stepName: 'Channel Content'
	}, {
		stepCondition: '',
		stepNumber: '۴',
		stepName: 'Campaign Type'
	}, {
		stepCondition: 'last',
		stepNumber: '۵',
		stepName: 'Finish and Payment'
	}];

	constructor(props) {
		super(props);
		this.state = {
			next: '/v1/advertiser/campaign/create/:campaign_id:/step/upload',
			type: 'upload'
		}
	}

	handleInitialize() {
		if (select('campaignStepData.type') == 'promote') {
			dispatch(change("SelectTypePTRForm", 'step-type-content', 'select_content'));
			this.setState({
				next: "/v1/advertiser/campaign/create/:campaign_id:/step/promote",
				type: 'promote'
			});
		} else {
			dispatch(change("SelectTypePTRForm", 'step-type-content', 'generate_content'));
			this.setState({
				next: "/v1/advertiser/campaign/create/:campaign_id:/step/upload",
				type: 'upload'
			});
		}
	}

	componentDidMount() {
		document.title = "ساختن کمپین جدید | انتخاب نوع محتوای کمپین";
		this.handleInitialize();
	}

	stepRowCreatorPromote() {
		let result = [];
		for (let i = 0; i < this.stepRowPromote.length; i++) {
			result.push(<CampaignStepPTR key={'column-' + i} stepCondition={this.stepRowPromote[i].stepCondition}
										 stepNumber={this.stepRowPromote[i].stepNumber}
										 stepName={this.stepRowPromote[i].stepName}/>)
		}
		return result;
	}

	stepRowCreatorIndi() {
		let result = [];
		for (let i = 0; i < this.stepRowIndi.length; i++) {
			result.push(<CampaignStepPTR key={'column-' + i} stepCondition={this.stepRowIndi[i].stepCondition}
										 stepNumber={this.stepRowIndi[i].stepNumber}
										 stepName={this.stepRowIndi[i].stepName}/>)
		}
		return result;
	}

	render() {
		let campaignTitle = select("createCampaignData.name", "no title");
		let toggle;
		if (this.state.type == 'upload' || this.state.type == '') {
			toggle = this.stepRowCreatorIndi()
		} else if (this.state.type == 'promote' || this.state.type == '') {
			toggle = this.stepRowCreatorPromote()
		}
		return (
			<div className="page-content">

				<div className="portlet light margin-top-20">

					<div className="portlet-title">
						<div className="caption font-blue">
							<i className="fa fa-bullseye font-blue"/> انتخاب نوع محتوای کمپین <span
							className="bold"> {campaignTitle}</span>
						</div>
					</div>
					<div className="portlet-body form">
						<div className="mt-element-step">
							<div className="row step-line">
								{toggle}
							</div>
						</div>
						<div className='row'>
							<form >
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
														   onClick={() => {
															   this.setState({
																   next: "/v1/advertiser/campaign/create/:campaign_id:/step/upload",
																   type: 'upload'
															   });
														   }}
														   value={'generate_content'} id={'generate_content'}/>
													{securify(
														() => <Radio label={'پروموت محتوای کانال های دیگر'}
																	 onClick={() => {
																		 this.setState({
																			 next: "/v1/advertiser/campaign/create/:campaign_id:/step/promote",
																			 type: 'promote'
																		 });
																	 }}
																	 name={'step-type-content'} value={'select_content'}
																	 id={'select_content'}/>,
														({user}, {canSeePromoteAd}, run) => run(canSeePromoteAd())
													)}

												</div>
											</div>
											<div className="row">
												<div className="col-md-12 margin-top-20 space-btn">
													<button onClick={
														(event) => {
															event.preventDefault();
															navigate('/v1/advertiser/campaign/create/:campaign_id:/step/name', {
																campaign_id: select('createCampaignData.id')
															});
														}
													} className="btn btn-default  button-next btn-arrow-text"
													><i className="fa fa-angle-right"/> مرحله قبل
													</button>
													<button onClick={
														(event) => {
															event.preventDefault();
															navigate(this.state.next, {
																campaign_id: select('createCampaignData.id')
															});
															dispatch(campaignStepType(this.state.type));
															dispatch(updateLocalStorageAction());
														}
													}
															className="btn btn-info  button-next btn-arrow-text"
													>مرحله بعد <i className="fa fa-angle-left"/>
													</button>

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