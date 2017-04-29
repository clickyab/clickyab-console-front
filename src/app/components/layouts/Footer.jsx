import React, {Component} from "react";
import {translate} from '../../functions/translate';

export default class Footer extends Component {
	render() {
		return (
			<div className="page-footer">
				<div className="page-footer-inner"> {translate('© CLICKYAB')} &nbsp;&nbsp; &nbsp;&nbsp;
				</div>
				<div className="scroll-to-top">
					<i className="icon-arrow-up"/>
				</div>
			</div>
		)
	}
}