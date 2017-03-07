import React, {Component} from "react";
import {connect} from "react-redux";
import CampaignReportListPTR from "./CampaignReportListPTR";
import swagger from "../../../../swagger/index";
import {select} from "../../../../functions/select";
import moment from "moment-jalali";
import {sync} from "../../../../functions/sync";
import {campaignReportItemsListAction} from "../../../../redux/actions/index";
import {translatable} from "react-multilingual/dist";

@connect(({campaignReportList}) => ({campaignReportList}))
@translatable(({
    Name, View, End, Price, Action

}) => ({
    translation: {
        Name, View, End, Price, Action
    }
}))
export default class CampaignReportListCTR extends Component {
    callApi(query_name, value) {
        let {dispatch} = this.props;
        sync(function*() {
            let {data} = yield (new swagger.AdApi()).campaignReportGet(select('user.token', 'no token'), {
                ...select('queries.campaignReport', {}),
                [query_name]: value
            });

            dispatch(campaignReportItemsListAction(data));
        })
    }

    sort(flag, query_name) {
        this.callApi('sort', query_name + ':' + flag);
    }

    filter(event, query_name) {
        this.callApi(query_name, event.target.value);
    }

    search(event, query_name) {
        this.callApi(query_name, event.target.value);
    }

    end_at(updated_at) {
        return moment(updated_at).format('jYYYY/jM/jD');
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


    render() {
        return (<CampaignReportListPTR {...this.props.campaignReportList}
                                       sort={this.sort.bind(this)}
                                       translator={this.translator.bind(this)}
                                       onPaginationChange={this.onPaginationChange.bind(this)}
                                       onPerPageChange={this.onPerPageChange.bind(this)}
                                       filter={this.filter.bind(this)}
                                       search={this.search.bind(this)}
                                       mutators={{
                                           end: this.end_at,
                                       }}
        />);
    }
}