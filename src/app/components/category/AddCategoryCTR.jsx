import React, {Component} from 'react';
import AddCategoryPTR from './AddCategoryPTR';
import swagger from './../../swagger/index';
import {connect} from 'react-redux';

@connect()
class AddCategoryCTR extends Component {
    SubmitCall = (values, form)=> {

        (new swagger.CategoryApi())
            .categoryCreatePost('1:db8773a02a76c9f5908e691ae0c1a6630e5d702d', {
                'payloadData': {
                    "description": values.title,
                    "scope": "channel",
                    "title": values.description
                }
            }, function(error, data, response) {
                console.log(error, data, response)
            })

    };

    render() {
        return (<AddCategoryPTR SubmitCall={this.SubmitCall}/>);
    }
}

export default AddCategoryCTR;