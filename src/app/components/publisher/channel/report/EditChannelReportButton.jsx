import React, {Component} from "react";

export default class EditChannelReportButton extends Component {

	render() {
		return <button key="edit"
					   className="btn btn-info btn-xs blue edit-item mt-ladda-btn ladda-button" data-style="zoom-in"
					   onClick={e => console.log(e)}>ویرایش</button>;
	}
}