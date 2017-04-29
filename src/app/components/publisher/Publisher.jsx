import React, {Component, PropTypes} from "react";
import PublisherSidebar from "./Dashboard/SidebarPTR";

export default class Publisher extends Component {
	render() {
		let {children} = this.props;
		return (
			<div className="page-container">
				<PublisherSidebar/>
				<div className="page-content-wrapper">
					{children}
				</div>
			</div>
		);
	}
}

Publisher.propTypes = {
	children: PropTypes.element
};