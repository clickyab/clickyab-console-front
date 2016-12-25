import React, {Component} from "react";
import {Cell} from 'fixed-data-table';

export const TextCell = ({rowIndex, children, ...props}) => (
	<Cell {...props}>
		{children}
	</Cell>
);