import React, {Component} from 'react';
import {Field, reduxForm, change} from 'redux-form';
import $ from 'jquery';
import {shallowEqual} from './../../3rd/shallowEqual';
import {dispatch} from "../../functions/dispatch";
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class EditRoleModalPTR extends Component {
    editRoleForm;
    state = {
        validation: true,

        multi: true,
        multiValue: [],
        options: [],
        value: undefined
    };


    shouldComponentUpdate(nextProps) {
        if(!shallowEqual(this.props, nextProps)) {
            for (let key in nextProps.roleData.role) {
                dispatch(change(nextProps.form, key, nextProps.roleData.role[key]))
            }

            return true;
        }

        return false;
    }

    componentDidMount() {

        this.editRoleForm = $("#editRoleForm");
        this.editRoleForm.validate({
            rules: {
                link: {
                    required: true,
                    url: true
                },
                name: {
                    required: true,
                },

            },
            messages: {
                link: {
                    required: 'لطفا لینک کانال را وارد نمایید',
                    url: 'لطفا یک آدرس اینترنتی معتبر با http و یا https وارد نمایید'
                },
                name: {
                    required: 'لطفا نام کانال را وارد نمایید',
                },

            }
        });
    }

    render() {
        const {handleSubmit, SubmitEditRole} = this.props;
        const {multi, multiValue, value, options} = this.state;
        return (
            <div className="edit-role-modal modal fade fullscreen" id="editRoleModal" tabIndex="-1" role="dialog"
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
                                <form role="form" action="" id="editRoleForm" method="post"
                                      className="add-role-form white"
                                      onSubmit={handleSubmit((values) => SubmitEditRole(values, this.editRoleForm))}>
                                    <div className="form-group">
                                        <label htmlFor="link">نام رول</label>
                                        <Field component="input" type="text" name="name" placeholder="نام رول"
                                               className="form-control input-lg" id="name"/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="description">توضیحات رول</label>
                                        <Field component="textarea" name="description"
                                               placeholder="توضیحات رول"
                                               className="form-control input-lg" id="description"/>
                                    </div>

                                    <div className="form-group">
                                        <div className="mt-checkbox-inline">
                                            <label className="mt-checkbox">
                                                <Field component="input" id="self" value="self"
                                                       name="self"
                                                       type="checkbox"/> خودم
                                                <span/>
                                            </label>
                                            <label className="mt-checkbox">
                                                <Field component="input" id="parent" value="parent"
                                                       onClick={
                                                           () => {
                                                               if ($('#parent').prop('checked')) {
                                                                   $('#self').prop({
                                                                       checked: true,
                                                                       disabled: true
                                                                   });
                                                               } else {
                                                                   $('#self').prop({
                                                                       disabled: false
                                                                   });
                                                               }
                                                           }
                                                       }
                                                       name="parent"
                                                       type="checkbox"/> مشاور
                                                <span/>
                                            </label>
                                            <label className="mt-checkbox">
                                                <Field component="input" id="global" value="global"
                                                       onClick={
                                                           () => {
                                                               if ($('#global').prop('checked')) {
                                                                   $('#self, #parent').prop({
                                                                       checked: true,
                                                                       disabled: true
                                                                   });
                                                               } else {
                                                                   $('#self, #parent').prop({
                                                                       disabled: false
                                                                   });
                                                               }
                                                           }
                                                       }
                                                       name="global"
                                                       type="checkbox"/> مدیر کل
                                                <span/>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <Select
                                            multi={multi}
                                            options={options}
                                            //onChange={this.handleOnChange.bind(this)}
                                            value={multi ? multiValue : value}
                                            placeholder='انتخاب دسترسی...'
                                        />
                                    </div>
                                    <button type="submit"
                                            className="btn btn-primary btn-lg edit-role-form btn-block">ذخیره
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
    form: 'EditRoleModalPTR'
})(EditRoleModalPTR);