import React, {Component} from "react";

export default class EditBillingButton extends Component {

	edit(event) {
		console.log(event);
	}

	render() {
		console.log(this.props);
		return <div className="btn-group ">
			<button className="btn btn-info btn-xs dropdown-toggle" data-toggle="dropdown" aria-expanded="false">عملیات
				<i className="fa fa-angle-down"/>
			</button>
			<ul className="dropdown-menu keep_open">
				<li>
					<a href="javascript:;" key="edit" ref={(EditElement) => this.editElementBtn = EditElement}
					   className="edit-item mt-ladda-btn ladda-button" data-style="zoom-in"
					   onClick={(event) => this.edit(Object.assign({}, event))}> ویرایش کمپین </a>
				</li>
				<li>
					<a href="javascript:;"
					   className="mt-ladda-btn ladda-button" data-style="zoom-in"
					   onClick={this.detailCampaign.bind(this)}> مشاهده ریز آمار </a>
				</li>
			</ul>
		</div>
	}
}