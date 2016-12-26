import React, {Component} from "react";
import {Cell} from 'fixed-data-table';

export const TextCell = ({rowIndex, column, rows, ...props}) => {
    return (<Cell {...props}>
        {rows[rowIndex][column]}
	</Cell>);
};