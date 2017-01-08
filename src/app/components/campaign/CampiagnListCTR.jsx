import React, {Component} from "react";
import {connect} from "react-redux";
import CampaignListPTR from './CampaignListPTR';
import swagger from '../../swagger/index';
import Edit from './../channel/EditChannelButton';
import {select} from "../../functions/select";
import moment from "moment-jalali";
import {sync} from "../../functions/sync";
import {campaignItemsListAction} from "../../redux/actions/index";

@connect(({campaignList}) => ({campaignList}))
export default class CampaignListCTR extends Component {
    callApi(query_name, value) {
        let {dispatch} = this.props;
        sync(function* () {
            let {data} = yield (new swagger.AdApi()).adListGet(select('user.token', 'no token'), {
                ...select('queries.campaign', {}),
                [query_name]: value
            });

            dispatch(campaignItemsListAction(data));
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

    edit(id) {
        console.log(id);
    }

    updated_at(updated_at) {
        return moment(updated_at).format('dddd، jD jMMMM jYYYY');
    }

    created_at(created_at) {
        return moment(created_at).format('dddd، jD jMMMM jYYYY');
    }

    render() {
        const {items, definitions} = this.props.campaignList;

        return (<CampaignListPTR items={items} definitions={definitions}
                                 edit={this.edit.bind(this)}
                                 sort={this.sort.bind(this)}
                                 filter={this.filter.bind(this)}
                                 search={this.search.bind(this)}
                                 mutators={{updated_at: this.updated_at, created_at: this.created_at}}
        />);
    }
}