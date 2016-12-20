import React, {Component} from 'react';
import EditCategoryPTR from './EditCategoryPTR';
import swagger from './../../swagger/index';
import {connect} from 'react-redux';

@connect()
class EditCategoryCTR extends Component {
    SubmitCall = (values, form)=> {
        values.scope = 'channel';
        (new swagger.CategoryApi())
            .categoryEditIdPut('11','1:7c47910224365dd5f48e6a48d1348836f8c1550c', {
                'payloadData': values
            }, function(error, data, response) {
                console.log(error, data, response)
            })

    };

    render() {
        return (<EditCategoryPTR SubmitCall={this.SubmitCall}/>);
    }
}

export default EditCategoryCTR;