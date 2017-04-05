import React, {Component} from "react";
import {Field, reduxForm} from "redux-form";
import $ from "jquery";

class WithdrawModalPTR extends Component {
	withDrawForm;
	state = {
		validation: true
	};

	componentDidMount() {
		this.withDrawForm = $("#WithDrawForm");
		this.withDrawForm.validate({
			rules: {
				amount: {
					required: true,
					digits: true,
					// range: [50000, 999999999999999999], //TODO: less than 50t error
				}
			},
			messages: {
				amount: {
					required: 'لطفا مبلغ را وارد نمایید',
					range: 'حداقل مبلغ برداشت 50 هزار تومان می‌باشد'
				}
			}
		});
	}

	closeModal(e) {
		$(e.target).parents('.modal').prop('id').modal('hide');
	}

	render() {
		const {handleSubmit, SubmitWithDraw} = this.props;
		return (
			<div className="with-draw-modal modal fade fullscreen" id="withDrawModal" tabIndex="-1" role="dialog"
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
								<form role="form" action="" id="WithDrawForm" method="post"
									  className="with-draw-form white"
									  onSubmit={handleSubmit((values) => SubmitWithDraw(values, this.withDrawForm))}>
									<div className="form-group">
										<label htmlFor="link">مبلغ مورد نظر</label>
										<div className="input-group input-group-lg form-group">
											<span className="input-group-addon" id="sizing-addon1">تومان</span>
											<Field type="number" component="input" name="amount" id="amount"
												   style={{direction: 'ltr', textAlign: 'left'}}
												   className="form-control input-lg" placeholder="مبلغ مورد نظر"
												   aria-describedby="sizing-addon1"/>
										</div>
									</div>

									<blockquote>
										<p style={{color: 'gray'}}>مبلغ مورد نظر برای برداشت از حساب‌کاربری‌تان را وارد
											نمایید.</p>
										<p style={{color: 'gray'}}>حداقل مبلغ قابل برداشت 50 هزار تومان است و پس از
											تایید نهایی فقط در روزهای 5 و 20 هر ماه برایتان واریز خواهد شد.</p>
									</blockquote>
									<button type="submit"
											className="btn btn-primary btn-lg add-channel-form btn-block">ذخیره
									</button>
								</form>

							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default reduxForm({
	form: 'WithdrawModalPTR'
})(WithdrawModalPTR);