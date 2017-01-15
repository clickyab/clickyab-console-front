import React, {Component} from 'react';
import UploadFilePTR from './UploadFilePTR';
import swagger from '../../../swagger/index';
import {select} from './../../../functions/select';
import {sync} from "./../../../functions/sync";

export default class UploadFileCTR extends Component {
    headerToken() {
        return select('user.token', 'no token');
    }
    UploadFile(url) {
        sync(function* () {
            const {data, response} = yield (new swagger.AdApi())
                .adUploadIdPut(select('createCampaignData.id'), select('user.token'), {'payloadData': {'url': url}});

            console.log(data, response);
        })

    }
    render() {
        return(
            <UploadFilePTR UploadFile={this.UploadFile} headerToken={this.headerToken()}/>
        )
    }
}