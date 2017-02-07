import React, {Component} from "react";
import {Field, reduxForm} from "redux-form";
import $ from "jquery";

class AddCategoryModalPTR extends Component {
    addCategoryForm;
    state = {
        validation: true
    };

    componentDidMount() {
        this.addCategoryForm = $("#addCategoryForm");
        this.addCategoryForm.validate({
            rules: {
                title: {
                    required: true,
                },
                description: {
                    required: true,
                },
            },
            messages: {
                title: {
                    required: 'لطفا عنوان را وارد نمایید',
                },
                description: {
                    required: 'لطفا توضیحات را وارد نمایید',
                },
            }
        });
    }

    render() {
        const {handleSubmit, SubmitAddCategory} = this.props;
        return (
            <div className="add-category-modal modal fade fullscreen" id="addCategoryModal" tabIndex="-1" role="dialog"
                 aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="padding-tb-15">
                                <img className="closebt" src="/img/closebtn.svg" data-dismiss="modal"
                                     aria-hidden="true"/>
                            </div>
                        </div>
                        <div className="modal-body text-center">
                            <div className="col-md-4 col-md-offset-4">
                                <div className="modal-title text-center">
                                    <h3/>
                                </div>
                                <form role="form" action="" className="add-category-form white" id="addCategoryForm"
                                      onSubmit={handleSubmit((values) => SubmitAddCategory(values, this.addCategoryForm))}>
                                    <div className="form-group">
                                        <label className="sr-only" htmlFor="title">عنوان</label>
                                        <Field component="input" type="text" name="title" placeholder='عنوان'
                                               className="form-control input-lg" id="title"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="sr-only" htmlFor="form-password">{'توضیحات'}</label>
                                        <Field component="input" type="text" name="description" placeholder={'توضیحات'}
                                               className="form-control input-lg" id="description"/>
                                    </div>
                                    <button type="submit"
                                            className="btn btn-primary btn-lg add-category-form btn-block">ذخیره
                                    </button>
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
    form: 'Addcategory'
})(AddCategoryModalPTR);