import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import UsersListPTR from "./UsersListPTR";
import swagger from "../../../swagger/index";
import {select} from "../../../functions/select";
import {translate} from "../../../functions/translate";
import {userItemsListAction} from "../../../redux/actions/index";
import EditUserButton from "./EditUserButton";
import moment from "moment-jalali";
import {sync} from "../../../functions/sync";

@connect(({userList}) => ({userList}))
export default class UsersListCTR extends Component {
	callApi(query_name, value) {
		let {dispatch} = this.props;
		sync(function*() {
			let {data} = yield (new swagger.UserApi)
				.userUsersGet(select('user.token', 'no token'), {
					sort: 'created_at:DESC',
					...select('queries.user', {}),
					[query_name]: value
				});

			dispatch(userItemsListAction(data));
		});
	}

	sort(flag, query_name) {
		this.callApi(query_name, flag);
	}

	updated_at(updated_at) {
		return moment(updated_at).format('jYYYY/jM/jD');
	}

	created_at(created_at) {
		return moment(created_at).format('jYYYY/jM/jD');
	}

	filter(event, query_name) {
		this.callApi(query_name, event.target.value);
	}

	search(event, query_name) {
		this.callApi(query_name, event.target.value);
	}

	edit(id) {
		return <EditUserButton key={Math.random()} id={id}/>
	}

	onPaginationChange(page) {
		this.callApi('p', page);
	}

	onPerPageChange(per_page) {
		this.callApi('c', per_page);
	}

	status(status) {
		if (status == 'registered') {
			return <span className="label label-sm label-warning"> {this.translator(status)} </span>;
		} else if (status == 'verified') {
			return <span className="label label-sm label-success"> {this.translator(status)} </span>;
		} else if (status == 'blocked') {
			return <span className="label label-sm label-danger"> {this.translator(status)} </span>;
		}

		return status;
	}

	user_type(user_type) {
		return translate(user_type);
	}

	render() {
		return (<UsersListPTR {...this.props.userList}
							  edit={this.edit.bind(this)}
							  sort={this.sort.bind(this)}
							  filter={this.filter.bind(this)}
							  onPaginationChange={this.onPaginationChange.bind(this)}
							  onPerPageChange={this.onPerPageChange.bind(this)}
							  mutators={{
								  updated_at: this.updated_at, created_at: this.created_at,
								  user_type: this.user_type.bind(this), status: this.status.bind(this)
							  }}
							  search={this.search.bind(this)}
		/>);
	}
}

UsersListCTR.propTypes = {
	dispatch: PropTypes.func,
	userList: PropTypes.array,
};