import React, {Component} from "react";
import {connect} from "react-redux";
import ChannelListPTR from "./ChannelListPTR";
import EditChannelButton from "./EditChannelButton";
import swagger from "../../../swagger/index";
import {select} from "../../../functions/select";
import {channelItemsListAction} from "../../../redux/actions/index";
import moment from "moment-jalali";
import {sync} from "../../../functions/sync";
import {translatable} from "react-multilingual/dist";
import ChangeChannelStatus from "./ChangeChannelStatus";
import ChangeChannelArchiveStatus from "./ChangeChannelArchiveStatus";
import ChangeChannelActiveStatus from "./ChangeChannelActiveStatus";

@connect(({channelList}) => ({channelList}))
@translatable(({
	Email, Type, Status, CreatedAt, UpdatedAt, Action,
	UserID, Name, Link, AdminStatus, ArchiveStatus, Active,
	accepted, pending, rejected, yes, no, ID
}) => ({
	translation: {
		Email, Type, Status, CreatedAt, UpdatedAt, Action,
		UserID, Name, Link, AdminStatus, ArchiveStatus, Active,
		accepted, pending, rejected, yes, no, ID
	}
}))
export default class ChannelListCTR extends Component {
	callApi(query_name, value) {
		let {dispatch} = this.props;
		sync(function*() {
			let {data} = yield (new swagger.ChannelApi).channelListGet(select('user.token', 'no token'), {
				...select('queries.channel', {}),
				[query_name]: value
			});

			dispatch(channelItemsListAction(data));
		})
	}

	sort(flag, query_name) {
		this.callApi('sort', query_name + ':' + flag)
	}

	filter(event, query_name) {
		this.callApi(query_name, event.target.value);
	}

	search(event, query_name) {
		this.callApi(query_name, event.target.value);
	}

	edit(id) {
		return <EditChannelButton key={Math.random()} id={id}/>;
	}

	updated_at(updated_at) {
		return moment(updated_at).format('dddd، jD jMMMM jYYYY');
	}

	created_at(created_at) {
		return moment(created_at).format('dddd، jD jMMMM jYYYY');
	}

	onPaginationChange(page) {
		this.callApi('p', page);
	}

	onPerPageChange(per_page) {
		this.callApi('c', per_page);
	}

	translator(title) {
		return this.props.translation[title];
	}

	admin_status(admin_status, {id}) {
		if (admin_status == 'pending') {
			return <div>
				<span className="label label-sm label-warning"> {this.translator(admin_status)} </span>
				<ChangeChannelStatus id={id} admin_status={admin_status} translator={this.translator.bind(this)}/>
			</div>
		} else if (admin_status == 'accepted') {
			return <div>
				<span className="label label-sm label-success"> {this.translator(admin_status)} </span>
				<ChangeChannelStatus id={id} admin_status={admin_status} translator={this.translator.bind(this)}/>
			</div>
		} else if (admin_status == 'rejected') {
			return <div>
				<span className="label label-sm label-danger"> {this.translator(admin_status)} </span>
				<ChangeChannelStatus id={id} admin_status={admin_status} translator={this.translator.bind(this)}/>
			</div>
		}

		return admin_status;
	}

	archive_status(archive_status, {id}) {
		return <div>
			{this.translator(archive_status)}
			<ChangeChannelArchiveStatus id={id} archive_status={archive_status} translator={this.translator.bind(this)}/>
		</div>
	}

	active(active, {id}) {
		return <div>
			{this.translator(active)}
			<ChangeChannelActiveStatus id={id} active={active} translator={this.translator.bind(this)}/>
		</div>
	}

	render() {
		return (<ChannelListPTR {...this.props.channelList}
								sort={this.sort.bind(this)}
								translator={this.translator.bind(this)}
								filter={this.filter.bind(this)}
								search={this.search.bind(this)}
								onPerPageChange={this.onPerPageChange.bind(this)}
								onPaginationChange={this.onPaginationChange.bind(this)}
								mutators={{
									updated_at: this.updated_at,
									created_at: this.created_at,
									admin_status: this.admin_status.bind(this),
									archive_status: this.archive_status.bind(this),
									active: this.active.bind(this)
								}}
								edit={this.edit.bind(this)}
		/>);
	}
}