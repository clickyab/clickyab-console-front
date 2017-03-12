import React, {Component} from "react";
import CreatePTR from "./CreatePTR";
import swagger from "../../../../swagger/index";
import {SuccessBoxAlert, FailedBoxAlert} from "../../../../functions/notifications";
import {ifInvalidToken} from "../../../../functions/helpers";
import {sync} from "./../../../../functions/sync";
import {createCampaign, updateLocalStorageAction} from "../../../../redux/actions/index";
import {dispatch} from "./../../../../functions/dispatch";
import {navigate} from "../../../../functions/navigate";
import {select} from "../../../../functions/select";
let Ladda = require('ladda/js/ladda');
let loadingProgress;

export default class CreateCTR extends Component {
    createCampaignNameSubmit(formValues) {
        sync(function*() {
            loadingProgress = Ladda.create(document.querySelector('button.btn-campaign-name'));
            loadingProgress.start();

            const {data, response} = yield (new swagger.AdApi())
                .campaignPost(select("user.token", "no token"), {'payloadData': formValues});

            if (response.statusCode == '200') {
                dispatch(createCampaign(data));
                dispatch(updateLocalStorageAction());

                loadingProgress.stop();
                SuccessBoxAlert({
                    error: 'اطلاعات شما صحیح نمی‌باشد.',
                    text: 'اطلاعات شما با موفقیت ثبت شد.'
                });

                navigate('/v1/advertiser/campaign/create/:campaign_id:/step/type', {
                    campaign_id: select('createCampaignData.id')
                });
            } else if (response.statusCode == '400') {
                loadingProgress.stop();
                FailedBoxAlert(response);
            }

            ifInvalidToken(response);
        });
    }

    updateCampaignNameSubmit(formValues, id) {
        sync(function*() {
            loadingProgress = Ladda.create(document.querySelector('button.btn-campaign-name'));
            loadingProgress.start();

            // const {data, response} = yield (new swagger.AdApi())
            //     .campaignIdPut(id, select("user.token", "no token"), {'payloadData': formValues});

            const {data, response} = yield (new swagger.MiscApi())
                .miscPanicGet();

            if (response.statusCode == '200') {
                dispatch(createCampaign(data));
                dispatch(updateLocalStorageAction());

                loadingProgress.stop();
                SuccessBoxAlert({
                    error: 'اطلاعات شما صحیح نمی‌باشد.',
                    text: 'اطلاعات شما با موفقیت ثبت شد.'
                });

                navigate('/v1/advertiser/campaign/create/:campaign_id:/step/type', {
                    campaign_id: select('createCampaignData.id')
                });
            } else if (response.statusCode == '400') {
                loadingProgress.stop();
                FailedBoxAlert(response);
            }

            ifInvalidToken(response);
        });
    }

    SubmitCreateCampaignName = (formValues, form) => {
        if (!form.valid())
            return;
        if (select('createCampaignData.id') != null) {
            this.updateCampaignNameSubmit(formValues, select('createCampaignData.id'));
        } else {
            this.createCampaignNameSubmit(formValues)
        }
    };


    render() {
        return (<CreatePTR SubmitCreateCampaignName={this.SubmitCreateCampaignName}/>);
    }

}