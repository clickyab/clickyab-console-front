import {secure} from "react-redux-secure";
import React, {Component} from "react";

export function securify(InSecuredComponent, secureCallback) {
	@secure(secureCallback)
	class SecuredComponent extends Component {
		render() {
			return <InSecuredComponent/>
		}
	}

	return <SecuredComponent/>;
}