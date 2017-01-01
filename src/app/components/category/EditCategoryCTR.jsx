import React, {Component} from 'react';
import EditCategoryPTR from './EditCategoryPTR';
import swagger from './../../swagger/index';
import {FailedBoxAlert} from "./../../functions/notifications";
import {ifInvalidToken} from "./../../functions/helpers";
import {sync} from "./../../functions/sync";
import {select} from "./../../functions/select";
import {connect} from 'react-redux';
let Ladda = require('ladda/js/ladda');
let loadingProgress;

@connect()
export default class EditCategoryCTR extends Component {

    EditSubmit(formValues) {
        const id = '11'; //TODO: replace with props
        formValues.scope = 'channel';
        sync(function *() {
            loadingProgress = Ladda.create(document.querySelector('.edit-category-form'));
            loadingProgress.start();
            const {error, data, response} = yield (new swagger.CategoryApi())
                .categoryEditIdPut(id, select('user.token', 'no token'), {'payloadData': formValues});

            if (response.statusCode == '200') {
                $('#editCategoryModal').modal('hide');
                loadingProgress.stop();
                //TODO: dispatch(data)
            } else if (response.statusCode == '400') {
                FailedBoxAlert(response)
            }
            ifInvalidToken(response);
        })
    }

    SubmitEditCategory = (formValues, form)=> {
       if(!form.valid)
           return;

        this.EditSubmit(formValues);
    };

    render() {
        const {form} = this.props; //TODO: category data must be add
        return (<EditCategoryPTR form={form} SubmitEditCategory={this.SubmitEditCategory}/>);
    }
}
