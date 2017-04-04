import React, {Component} from "react";
import swagger from "../../../swagger/index";
import {select} from "../../../functions/select";
import {createCampaign, campaignReportListAction} from "../../../redux/actions/index";
import {sync} from "../../../functions/sync";
import {AlertBox} from "../../../functions/notifications";
import {dispatch} from "../../../functions/dispatch";
import {navigate} from "../../../functions/navigate";
import {shouldUpdateDefinition} from "../../../redux/helpers";

export default class EditCampaignButton extends Component {
    editElementBtn;

    edit(event) {
        $(event.target).parent().addClass("disabled");
        const {id} = this.props;
        sync(function*() {
            const {error, data, response} = yield (new swagger.AdApi())
                .campaignGetIdGet(id, select('user.token', 'no token'));
            if (response.statusCode == '200') {
                $(event.target).parent().removeClass("disabled");
                dispatch(createCampaign(data));
                navigate('/v1/advertiser/campaign/create/:campaign_id:/step/name', {
                    campaign_id: select('createCampaignData.id')
                });
            } else if (response.statusCode == '400') {
                $(event.target).parent().removeClass("disabled");
                AlertBox("error", "اختلالی به وجود امده است لطفا دوباره تلاش کنید")
            }
        });
    }

    detailCampaign(event) {
        const {id} = this.props;
        sync(function*() {
            const {error, data, response} = yield (new swagger.AdApi())
                .campaignDetailIdGet(id, select('user.token', 'no token'), {
                    ...select('queries.campaignReport', {}),
                    def: shouldUpdateDefinition('campaignReportList')
                });
            if (response.statusCode == '200') {
                dispatch(campaignReportListAction(data));

                navigate('/v1/advertiser/campaign/:campaign_id:/report', {
                    campaign_id: id
                });
            } else if (response.statusCode == '400') {
                AlertBox("error", "اختلالی به وجود امده است لطفا دوباره تلاش کنید")
            }
        });
    }

    render() {
        return <div className="btn-group ">
            <button className="btn btn-info btn-xs dropdown-toggle" data-toggle="dropdown" aria-expanded="false">عملیات
                <i className="fa fa-angle-down"/>
            </button>
            <ul className="dropdown-menu keep_open">
                <li>
                    <a href="javascript:;" key="edit" ref={(EditElement) => this.editElementBtn = EditElement}
                       className="edit-item mt-ladda-btn ladda-button" data-style="zoom-in"
                       onClick={(event) => this.edit(Object.assign({}, event))}> ویرایش کمپین </a>
                </li>
            </ul>
        </div>
    }
}