import React, {Component} from "react";
import {Field, reduxForm} from "redux-form";
import $ from "jquery";
import CopyToClipboard from 'react-copy-to-clipboard';

class AddTelegramCodeModalPTR extends Component {

    constructor(props) {
        super(props);
        this.state = {
            copied: false,
            value : ''
        }
    }


	render() {
		const {handleSubmit, SubmitTelegramGetCode} = this.props;
		return (
			<div className="showGetTelegramCodeModal modal fade fullscreen" id="showGetTelegramCodeModal" tabIndex="-1" role="dialog"
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
									  onSubmit={handleSubmit((values) => SubmitTelegramGetCode(values))}>
									<div className="form-group generate-input-code" >
										<input  type="text" name="generated_code"  value={this.state.value}
											   onChange={({target: {value}}) => this.setState({value, copied: false})}
											   className="form-control input-lg text-center font-green bold input-generated-code" id="name"/>
									</div>
									<div>
										<CopyToClipboard text={this.state.value}
														 onCopy={() => this.setState({copied: true})}>
											<button type="submit"
													className="btn btn-primary btn-lg add-channel-form">دریافت کد تلگرام
											</button>
										</CopyToClipboard>
									</div>
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
	form: 'AddTelegramCodeModalPTR'
})(AddTelegramCodeModalPTR);