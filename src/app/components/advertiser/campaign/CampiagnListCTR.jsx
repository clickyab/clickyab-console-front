import React, {Component} from "react";
import {connect} from "react-redux";
import CampaignListPTR from "./CampaignListPTR";
import EditCampaignButton from "./EditCampaignButton";
import swagger from "../../../swagger/index";
import {select} from "../../../functions/select";
import moment from "moment-jalali";
import {sync} from "../../../functions/sync";
import {campaignItemsListAction} from "../../../redux/actions/index";
import {translatable} from "react-multilingual/dist";
import ChangeCampaignStatus from "./ChangeCampaignStatus";
import ChangeCampaignArchiveStatus from "./ChangeCampaignArchiveStatus";
import ChangeCampaignActiveStatus from "./ChangeCampaignActiveStatus";

@connect(({campaignList}) => ({campaignList}))
@translatable(({
    ID, Title, CreatedAt, UpdatedAt, Description, Email,
    UserID, Name, ArchiveStatus, _actions, AdArchiveStatus, AdActive, AdPayStatus,
    yes, no, accepted, pending, rejected, AdActiveStatus, AdAdminStatus, Src, PlanID

}) => ({
    translation: {
        ID, Title, CreatedAt, UpdatedAt, Description, Email,
        UserID, Name, ArchiveStatus, Action: _actions, AdArchiveStatus, AdActive, AdPayStatus,
        yes, no, accepted, pending, rejected, AdActiveStatus, AdAdminStatus, Src, PlanID
    }
}))
export default class CampaignListCTR extends Component {
    callApi(query_name, value) {
        let {dispatch} = this.props;
        sync(function*() {
            let {data} = yield (new swagger.AdApi()).campaignListGet(select('user.token', 'no token'), {
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
        return <EditCampaignButton key={Math.random()} id={id}/>
    }

    updated_at(updated_at) {
        return moment(updated_at).format('dddd، jD jMMMM jYYYY');
    }

    created_at(created_at) {
        return moment(created_at).format('dddd، jD jMMMM jYYYY');
    }

    description(description) {
        if (description != null) {
            return description.replace(/(<\?[a-z]*(\s[^>]*)?\?(>|$)|<!\[[a-z]*\[|\]\]>|<!DOCTYPE[^>]*?(>|$)|<!--[\s\S]*?(-->|$)|<[a-z?!\/]([a-z0-9_:.])*(\s[^>]*)?(>|$))/gi, '');
        }

    }

    onPaginationChange(page) {
        this.callApi('p', page);
    }

    onPerPageChange(per_page) {
        this.callApi('c', per_page);
    }

    translator(title) {
        return this.props.translation[title];
        // return  title ;//this.props.translation[title];
    }

    admin_status(admin_status, {id}) {
        if (admin_status == 'pending') {
            return <div>
                <ChangeCampaignStatus id={id} admin_status={admin_status} translator={this.translator.bind(this)}/>
                <span className="label label-sm label-warning"> {this.translator(admin_status)} </span>
            </div>
        } else if (admin_status == 'accepted') {
            return <div>
                <ChangeCampaignStatus id={id} admin_status={admin_status} translator={this.translator.bind(this)}/>
                <span className="label label-sm label-success"> {this.translator(admin_status)} </span>
            </div>
        } else if (admin_status == 'rejected') {
            return <div>
                <ChangeCampaignStatus id={id} admin_status={admin_status} translator={this.translator.bind(this)}/>
                <span className="label label-sm label-danger"> {this.translator(admin_status)} </span>
            </div>
        }

        return admin_status;
    }

    archive_status(archive_status, {id}) {
        return <div>
            {this.translator(archive_status)}
            <ChangeCampaignArchiveStatus id={id} archive_status={archive_status}
                                         translator={this.translator.bind(this)}/>
        </div>
    }

    pay_status(pay_status) {
        return this.translator(pay_status);
    }

    active_status(active_status, {id}) {
        return <div>
            {this.translator(active_status)}
            <ChangeCampaignActiveStatus id={id} active={active_status} translator={this.translator.bind(this)}/>
        </div>
    }

    render() {
        return (<CampaignListPTR {...this.props.campaignList}
                                 edit={this.edit.bind(this)}
                                 sort={this.sort.bind(this)}
                                 translator={this.translator.bind(this)}
                                 onPaginationChange={this.onPaginationChange.bind(this)}
                                 onPerPageChange={this.onPerPageChange.bind(this)}
                                 filter={this.filter.bind(this)}
                                 search={this.search.bind(this)}
                                 mutators={{
                                     description: this.description,
                                     updated_at: this.updated_at,
                                     created_at: this.created_at,
                                     admin_status: this.admin_status.bind(this),
                                     archive_status: this.archive_status.bind(this),
                                     pay_status: this.pay_status.bind(this),
                                     active_status: this.active_status.bind(this)
                                 }}
        />);
    }
}