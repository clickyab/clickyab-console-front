import React, {Component} from "react";
import {dispatch} from "../../../functions/dispatch";
import {channelQueryAction, updateLocalStorageAction} from "../../../redux/actions/index";
import {select} from "../../../functions/select";
import {translate} from "../../../functions/translate";

let i = -1;

export class ConsoleHeaderCell extends Component {
	sort(event, order, query_name) {

		this.props.sort(order, query_name);
	}

	toggleSort(currentSort) {
		return currentSort.indexOf("ASC") >= 0 ? "DESC" : "ASC";
	}

	sortOnChange(event) {
		let {list, query_name, loader} = this.props;

		let order = this.toggleSort(select('queries.' + list + '.sort', 'ASC'));

		dispatch(channelQueryAction(list, 'p', 1));
		dispatch(channelQueryAction(list, 'sort', query_name + ":" + order));
		dispatch(updateLocalStorageAction());

		loader(true);
		this.sort(event, order, query_name);
		loader(false);
	}

	render() {
		let {sortable, children} = this.props;
		i = i + 1;
		return (
			<th id={"row-" + i}>
                <span className="head-title-datatable">
                    {sortable ? <a href="#" onClick={(event) => {
						event.preventDefault();
						event.stopPropagation();
						this.sortOnChange(Object.assign({}, event));
					}}>{translate(children)}</a> : translate(children)}
                </span>
			</th>
		);
	}
}