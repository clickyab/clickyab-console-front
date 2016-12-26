import React, {Component} from "react";
import {Cell} from 'fixed-data-table';

export const TextCell = ({rowIndex, column, items, ...props}) => {
    return (<Cell {...props}>
        {items[rowIndex][column]}
	</Cell>);
};