import React, {Component} from "react";

export default ({rowIndex, children, ...props}) => (
	<Cell {...props}>
		{children}
	</Cell>
);