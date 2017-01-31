import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import $ from 'jquery';
import SelectPermissionCTR from './SelectPermissionCTR';


class AddRoleModalPTR extends Component {
    addRoleForm;
    selectPermission = {
        multi: true,
        selfValue: [],
        parentValue: [],
        globalValue: [],
        options: [],
        self: true,
        parent: true,
        global: true
    };
    state = {
        validation: true,
    };

    setSelectPermission(key, value) {
        this.selectPermission[key] = value;
    }

    componentDidMount() {
        this.addRoleForm = $("#addRoleForm");
        this.addRoleForm.validate({
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
        const {handleSubmit, SubmitAddRole} = this.props;
        
        return (
            <div className="add-role-modal modal fade fullscreen" id="addRoleModal" tabIndex="-1" role="dialog"
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
                                <form role="form" action="" id="addRoleForm" method="post"
                                      className="add-role-form white"
                                      onSubmit={handleSubmit((values) => SubmitAddRole(values, this.addRoleForm, this.state.multiValue))}>
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
                                            <SelectPermissionCTR selectPermission={this.selectPermission}
                                                                 setSelectPermission={this.setSelectPermission.bind(this)}
                                                                 permissions={this.props.permissions}/>
                                        </div>
                                    </div>
                                    <button type="submit"
                                            className="btn btn-primary btn-lg add-role-form btn-block">ذخیره
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
    form: 'AddRoleModalPTR'
})(AddRoleModalPTR);
