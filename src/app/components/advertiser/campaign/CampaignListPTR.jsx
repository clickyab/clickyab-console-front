import React from "react";
import {ConsoleTable} from "../../common/ConsoleTable/ConsoleTable";
import {navigate} from "../../../functions/navigate";
import {dispatch} from "../../../functions/dispatch";
import {createCampaign} from "../../../redux/actions/index";
import {securify} from "../../../functions/securify";
import {translate} from "./../../../functions/translate";

function showAddCampaign() {
    dispatch(createCampaign({}));
    navigate('/v1/advertiser/campaign/create/step/name');
}

export default function CampaignListPTR() {
    document.title = "مدیریت کمپین ها";

    return (
        <div className='page-content'>
            <div className='row'>
                <div className='col-lg-8 col-md-8 col-sm-8 col-xs-12'>
                    <h1 className='page-title'>{translate('Manage Campaigns')}</h1>
                </div>
            </div>
            <div className='portlet light bordered datatable-parent'>
                <div className='portlet-title'>
                    <div className='caption'>
                        <span className='caption-subject bold uppercase font-dark'>{translate('Campaign List')}</span>
                    </div>
                    {securify(
                        () => <div className="actions">
                            <div className="btn-group btn-group-devided" data-toggle="buttons">
                                <button className="btn btn-transparent blue btn-outline btn-circle btn-sm"
                                        onClick={showAddCampaign}>
                                    {translate('Create new Campaign')}
                                </button>
                            </div>
                        </div>,
                        ({user}, {canSeeCreateAd}, run) => run(canSeeCreateAd())
                    )}

                </div>
                <div className='portlet-body'>
                    <ConsoleTable {...this.props} list="campaign"/>
                </div>
            </div>
        </div>
    )
}

CampaignListPTR.propTypes = {
    items: React.PropTypes.array
};
