import React, {Component} from 'react';
import {Field, reduxForm, change} from 'redux-form';
import $ from 'jquery';
import {shallowEqual} from './../../3rd/shallowEqual';
import {dispatch} from "../../functions/dispatch";

class EditCategoryModalPTR extends Component {
    editCategoryForm;
    state = {
        validation: true
    };

    shouldComponentUpdate(nextProps) {
        if(!shallowEqual(this.props, nextProps)) {
            for (let key in nextProps.categoryData) {
                dispatch(change(nextProps.form, key, nextProps.categoryData[key]))
            }

            return true;
        }

        return false;
    }

    componentDidMount() {
        this.editCategoryForm = $('#editCategoryForm');
        this.editCategoryForm.validate({
            rules: {
                title: {
                    required: true
                },
                description: {
                    required: true
                }
            },
            messages: {
                title: {
                    required: 'لطفا عنوان را وارد نمایید'
                },
                description: {
                    required: 'لطفا توضیحات را وارد نمایید'
                }
            }
        });
    }
    render() {
        const {handleSubmit, SubmitEditCategory} = this.props;
        return (
            <div className="edit-category-modal modal fade fullscreen" id="editCategoryModal" tabIndex="-1" role="dialog"
                 aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="padding-tb-15">
                                <img className="closebt" src="../img/closebtn.svg" data-dismiss="modal"
                                     aria-hidden="true"/>
                            </div>
                        </div>
                        <div className="modal-body text-center">
                            <div className="col-md-4 col-md-offset-4">
                                <div className="modal-title text-center">
                                    <h3/>
                                </div>
                                <form role="form" action="" method="post" id="editCategoryForm"
                                      className="add-category-form white" onSubmit={handleSubmit((values) => SubmitEditCategory(values, this.editCategoryForm))}>
                                    <div className="form-group">
                                        <label className="sr-only" htmlFor="title">title</label>
                                        <Field component="input" type="text" name="title" placeholder='عنوان' className="form-control input-lg" id="title"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="sr-only" htmlFor="form-password">{'description'}</label>
                                        <Field component="input" type="text" name="description" placeholder={'توضیحات'} className="form-control input-lg" id="description"/>
                                    </div>
                                    <button type="submit" className="edit-category-form btn btn-primary btn-lg btn-block">Save changes</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default reduxForm({
    form: 'EditCategoryForm'
})(EditCategoryModalPTR);