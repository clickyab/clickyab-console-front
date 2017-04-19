import React, {Component} from "react";
import {Field, reduxForm} from "redux-form";
import {Link} from "react-router";
import $ from "jquery";

class AddChannelModalPTR extends Component {
	addChannelForm;
	state = {
		validation: true
	};

	componentDidMount() {
		this.addChannelForm = $("#addChannelForm");
		this.addChannelForm.validate({
			rules: {
				link: {
					required: true,
				},
				name: {
					required: true,
				},
			},
			messages: {
				link: {
					required: 'لطفا یوزرنیم کانال را وارد نمایید',
				},
				name: {
					required: 'لطفا نام کانال را وارد نمایید',
				},

			}
		});
	}

	render() {
		const {handleSubmit, SubmitAddChannel} = this.props;
		return (
			<div className="add-channel-modal modal fade fullscreen" id="addChannelModal" tabIndex="-1" role="dialog"
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
								<form role="form" action="" id="addChannelForm" method="post"
									  className="add-channel-form white"
									  onSubmit={handleSubmit((values) => SubmitAddChannel(values, this.addChannelForm))}>
									<div className="form-group">
										<label htmlFor="link">لینک کانال</label>
										<div className="input-group input-group-lg form-group">
											<span className="input-group-addon" id="sizing-addon1">http://t.me/</span>
											<Field type="text" component="input" name="link" id="link"
												   style={{direction: 'ltr', textAlign: 'left'}}
												   className="form-control input-lg" placeholder="لینک کانال"
												   aria-describedby="sizing-addon1"/>
										</div>
									</div>

									<div className="form-group">
										<label htmlFor="name">نام کانال</label>
										<Field component="input" type="text" name="name" placeholder="نام کانال"
											   className="form-control input-lg" id="name"/>
										<small className="text-muted">* نام کانال براساس لینک کانال به روز می‌شود.
										</small>
									</div>
									<button type="submit"
											className="btn btn-primary btn-lg add-channel-form btn-block">ذخیره
									</button>
								</form>
								<br />
								<blockquote>
									<p>برای انکه بتوانید تبلیغ در کانال خود نمایش دهید باید حداقل یک کاربر تلگرام تایید
										شده داشته باشید.</p>
									<Link to="/v1/publisher/telegram" onClick={()=> {
											$('.closebt').click();
										}}
										  style={{fontSize: '20px'}}>
										<footer> برای اضافه کردن کاربر تلگرام به این
											صفحه مراجعه کنید.
										</footer>
									</Link>
								</blockquote>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default reduxForm({
	form: 'AddChannelModalPTR'
})(AddChannelModalPTR);