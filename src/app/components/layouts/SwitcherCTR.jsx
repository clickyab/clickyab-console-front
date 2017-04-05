import React, {Component} from "react";
import {Link} from "react-router";
import {connect} from "react-redux";

@connect(({userType}) => ({userType}))
export default class SwitcherCTR extends Component {
	render() {
		let main, dropDown;
		if (this.props.userType == 'publisher') {
			main = (<Link to="/v1/publisher" className="dropdown-toggle " data-toggle="dropdown" data-hover="dropdown"
						  data-close-others="true" aria-expanded="true" style={{paddingRight: '7px'}}>
				<i className="fa fa-television"/>
				<span className="langname">ناشر</span>
				<i className="fa fa-angle-down"/>
			</Link>);
			dropDown = (<Link to="/v1/advertiser">
				<i className="fa fa-bullhorn"/>
				<span className="title">تبلیغ کننده</span>
			</Link>);
		} else {
			main = (<Link to="/v1/advertiser" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
						  data-close-others="true" aria-expanded="true" style={{paddingRight: '7px'}}>
				<i className="fa fa-bullhorn"/>
				<span className="langname">تبلیغ کننده</span>
				<i className="fa fa-angle-down"/>
			</Link>);

			dropDown = (<Link to="/v1/publisher">
				<i className="fa fa-television"/>
				ناشر
			</Link>);
		}
		return (
			<li className="dropdown dropdown-language">
				{main}
				<ul className="dropdown-menu dropdown-menu-default">
					<li>
						{dropDown}
					</li>
				</ul>
			</li>
		)
	}
}