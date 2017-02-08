import React, {Component} from "react";
import SelectContentByChannelPTR from "./SelectContentByChannelPTR";
import swagger from "../../../../swagger/index";
import {AlertBox} from "../../../../functions/notifications";
import {sync} from "./../../../../functions/sync";
import {select} from "../../../../functions/select";
let Ladda = require('ladda/js/ladda');
let loadingProgress;

export default class SelectContentByChannelCTR extends Component {
    clearTimeoutVariable;

    constructor(props) {
        super(props);
        this.state = {data: []}
    }

    jobIsCompleted(data, response) {
        if (response.statusCode == '200') {  // if second request is ok
            if(data.Status != "failed") {
            clearTimeout(this.clearTimeoutVariable);
            loadingProgress.stop();
            this.setState({data});
            }
        } else if (response.statusCode == '400') {
            clearTimeout(this.clearTimeoutVariable);
            AlertBox("error", "کانالی با این یوزر نیم وجود ندارد");
            loadingProgress.stop();
        }
    }

    CallSubmitGetPostsByChannel(formValues) {
        try {
            sync(function*() {
                loadingProgress = Ladda.create(document.querySelector('button.submit-get-posts-channel'));
                loadingProgress.start();
                const {data, response} = yield (new swagger.ChannelApi()) //first request to add job
                    .channelLastNameCountGet(formValues.name, formValues.count || 5, select("user.token", "no token"));

                if (response.statusCode == '200') { // if first request is ok

                    this.clearTimeoutVariable = setInterval(() => {
                        new swagger.ChannelApi()  //second request too get list
                            .channelLastNameCountGet(formValues.name, formValues.count || 5, select("user.token", "no token"))
                            .then(({data, response}) => this.jobIsCompleted(data, response));
                    }, 1000);
                } else if (response.statusCode == '400') {
                    loadingProgress.stop();
                    AlertBox("error", "اختلالی در سرور پیش آمده است لطفا دوباره تلاش کنید");
                }
            }.bind(this));

        } catch (error) {
            console.log(error)
        }
    }

    SubmitGetPostsByChannel = (formValues, form) => {
        if (!form.valid())
            return;
        this.CallSubmitGetPostsByChannel(formValues)
    };

    render() {
        return (<SelectContentByChannelPTR Postlist={this.state.data}
                                           SubmitGetPostsByChannel={this.SubmitGetPostsByChannel}/>);
    }
}