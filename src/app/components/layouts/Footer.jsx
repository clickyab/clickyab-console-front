import React, {Component} from "react";
import {translate} from '../../functions/translate';


export class Footer extends Component {
	render() {
		let {copyright, changeLocale} = this.props;
		return (
			<div className="page-footer">
				<div className="page-footer-inner"> {translate('© CLICKYAB')} &nbsp;&nbsp; &nbsp;&nbsp;
					{/*<a onClick={() => changeLocale('en')} className="white" type="button">زبان فارسی</a> &nbsp;|&nbsp;*/}
					{/*<a onClick={() => changeLocale('fa')} className="white" type="button">زبان انگلیسی</a>*/}
				</div>
				<div className="scroll-to-top">
					<i className="icon-arrow-up"/>
				</div>
			</div>
		)
	}
}

Footer.propTypes = {
	copyright: React.PropTypes.string,
	changeLocale: React.PropTypes.func,
};
export default Footer;