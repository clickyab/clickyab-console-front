import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import swagger from "../../../../swagger/index";
import {select} from "../../../../functions/select";
import {translate} from "../../../../functions/translate";
import {channelItemsReportListAction} from "../../../../redux/actions/index";
import moment from "moment-jalali";
import {sync} from "../../../../functions/sync";
import ChannelReportListPTR from "./ChannelReportListPTR";
import EditChannelReportButton from "./EditChannelReportButton";

@connect(({channelReportList}) => ({channelReportList}))
export default class ChannelReportListCTR extends Component {
    callApi(query_name, value) {
        let {dispatch} = this.props;
        sync(function*() {
            let {data} = yield (new swagger.ChannelApi()).channelReportGet(select('user.token', 'no token'), {
                ...select('queries.channelReport', {}),
                [query_name]: value
            });

            dispatch(channelItemsReportListAction(data));
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

    updated_at(updated_at) {
        return moment(updated_at).format('jYYYY/jM/jD');
    }

    created_at(created_at) {
        return moment(created_at).format('jYYYY/jM/jD');
    }

    onPaginationChange(page) {
        this.callApi('p', page);
    }

    onPerPageChange(per_page) {
        this.callApi('c', per_page);
    }

    admin_status(admin_status) {
        if (admin_status == 'pending') {
            return <span className="label label-sm label-warning"> {translate(admin_status)} </span>;
        } else if (admin_status == 'accepted') {
            return <span className="label label-sm label-success"> {translate(admin_status)} </span>;
        } else if (admin_status == 'rejected') {
            return <span className="label label-sm label-danger"> {translate(admin_status)} </span>;
        }

        return admin_status;
    }

    archive_status(archive_status) {
        return translate(archive_status);
    }

    active(pay_status) {
        return translate(pay_status);
    }

    edit(id) {
        return <EditChannelReportButton key={Math.random()} id={id}/>;
    }

    render() {
        return (<ChannelReportListPTR {...this.props.channelReportList}
                                      sort={this.sort.bind(this)}
                                      edit={this.edit.bind(this)}
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
        />);
    }
}

ChannelReportListCTR.propTypes = {
    dispatch: PropTypes.func,
    channelReportList: PropTypes.array,
};