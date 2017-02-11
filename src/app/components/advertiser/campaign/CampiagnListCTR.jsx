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
let BigPicture = require('./../../common/ThumbnailGallery');

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
    componentDidMount() {


        function setClickHandler(objectClassName, fn) {
            document.querySelector("."+objectClassName).onclick = fn;
        }
        setClickHandler('table-advance', function(e) {
            e.target.tagName === 'IMG' && BigPicture({
                el: e.target,
                imgSrc: e.target.src
            });
        });
        // BigPicture({
        //     el: this,
        //     ytSrc: src
        // });
    }


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

    description(description , {cli_message_id}) {
        if (description != null && cli_message_id == null) {
            return description.substring(0, 10) + "...";
        }
        if (cli_message_id != null) {
            return "پروموت";
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

    admin_status(admin_status, {id, _actions}) {
        if (_actions.split(',').includes("admin_status")) {
            return  <ChangeCampaignStatus id={id} admin_status={admin_status} translator={this.translator.bind(this)}/>;
        }
        let span;
        if (admin_status == 'pending') {
            span = <span className="label label-sm label-warning"> {this.translator(admin_status)} </span>;
        } else if (admin_status == 'accepted') {
            span = <span className="label label-sm label-success"> {this.translator(admin_status)} </span>;
        } else if (admin_status == 'rejected') {
            span = <span className="label label-sm label-danger"> {this.translator(admin_status)} </span>;
        }

        return span;
    }

    archive_status(archive_status, {id, _actions}) {
        if (_actions.split(',').includes("archive_status")) {
            return <ChangeCampaignArchiveStatus id={id} archive_status={archive_status}
                                                translator={this.translator.bind(this)}/>
        } else {
            return this.translator(archive_status)
        }
    }


    pay_status(pay_status) {
        if(pay_status == "no") {
            return <span className="label label-sm label-warning"> {this.translator(pay_status)} </span>
        } else if (pay_status == "yes") {
            return <span className="label label-sm label-success"> {this.translator(pay_status)} </span>
        }
    }


    active_status(active_status, {id, _actions}) {
        if (_actions.split(',').includes("active_status")) {
            return <ChangeCampaignActiveStatus id={id} active={active_status} translator={this.translator.bind(this)}/>
        }
        else {
                return this.translator(active_status)
        }
    }

    src(src , {description}) {
        if(src != null) {
            return  <img className={ "thumbnail-image" + " " + "image-thumbnail-" + Math.random()} src={"http://rubik.clickyab.ae" +src} data-caption={description}/>
        } else {
            return  <img className={ "thumbnail-image" + " " + "image-thumbnail-" + Math.random()} src="/img/thumbnail.jpg" data-caption={description} />
        }

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
                                     description: this.description.bind(this),
                                     updated_at: this.updated_at,
                                     created_at: this.created_at,
                                     admin_status: this.admin_status.bind(this),
                                     archive_status: this.archive_status.bind(this),
                                     pay_status: this.pay_status.bind(this),
                                     src: this.src.bind(this),
                                     active_status: this.active_status.bind(this)
                                 }}
        />);
    }
}