import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import $ from 'jquery';

class EditCategoryPTR extends Component {
    form;
    componentDidMount() {
        $('#kasra').on('click', function() {
            $('.modal').modal('show');
        })
    }
    render() {
        const {handleSubmit, SubmitCall} = this.props;
        return (
            <div>
                <div>
                    <a id="kasra" className="btn btn-success" href="#">Modal Edit</a>
                </div>

                <div className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">Modal title</h4>
                            </div>
                            <form role="form" action="" method="post" className="login-form" onSubmit={handleSubmit((values) => SubmitCall(values, this.form))}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label className="sr-only" htmlFor="title">title</label>
                                        <Field component="input" type="text" name="title" placeholder='title' className="form-control" id="title"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="sr-only" htmlFor="form-password">{'description'}</label>
                                        <Field component="input" type="text" name="description" placeholder={'description'} className="form-control" id="description"/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default reduxForm({
    form: 'EditCategoryForm'
})(EditCategoryPTR);