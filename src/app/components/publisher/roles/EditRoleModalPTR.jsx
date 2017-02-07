import React, {Component} from "react";
import {Field, reduxForm, change} from "redux-form";
import $ from "jquery";
import {shallowEqual} from "./../../../3rd/shallowEqual";
import {dispatch} from "../../../functions/dispatch";
import SelectPermissionCTR from "./SelectPermissionCTR";

class EditRoleModalPTR extends Component {
    editRoleForm;
    state = {
        validation: true,

        multi: true,
        selfValue: [],
        parentValue: [],
        globalValue: [],
        selfCheckbox: false,
        parentCheckbox: false,
        globalCheckbox: false
    };

    setSelectPermission(key, value) {
        this.setState({[key]: value});
    }

    getOptions() {
        let options = [];
        for (let permission in this.props.permissions) {
            options.push({value: this.props.permissions[permission], label: this.props.permissions[permission]});
        }

        return options;
    }

    shouldComponentUpdate(nextProps) {
        if (!shallowEqual(this.props, nextProps)) {
            for (let key in nextProps.roleData.role) {
                dispatch(change(nextProps.form, key, nextProps.roleData.role[key]))
            }

            return true;
        }

        return false;
    }

    check() {
        let {selfCheckbox, parentCheckbox, globalCheckbox} = this.fillSelectBoxes();
        if (selfCheckbox)
            dispatch(change('EditRoleModalPTR', 'self', 'self'));
        if (parentCheckbox)
            dispatch(change('EditRoleModalPTR', 'parent', 'parent'));
        if (globalCheckbox)
            dispatch(change('EditRoleModalPTR', 'global', 'global'));
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

    fillSelectBoxes() {
        if (!this.props.roleData.perm)
            return {
                selfValue: [],
                parentValue: [],
                globalValue: [],
                selfCheckbox: false,
                parentCheckbox: false,
                globalCheckbox: false
            };

        let selfPermission = [];
        for (let key in this.props.roleData.perm.self) {
            selfPermission.push({value: key, label: key});
        }

        let parentPermission = [];
        for (let parentKey in this.props.roleData.perm.parent) {
            parentPermission.push({value: parentKey, label: parentKey});
        }

        let globalPermission = [];
        for (let globalKey in this.props.roleData.perm.global) {
            globalPermission.push({value: globalKey, label: globalKey});
        }

        return {
            selfValue: selfPermission,
            parentValue: parentPermission,
            globalValue: globalPermission,
            selfCheckbox: selfPermission.length > 0,
            parentCheckbox: parentPermission.length > 0,
            globalCheckbox: globalPermission.length > 0
        };
    }

    render() {
        const {handleSubmit, SubmitEditRole} = this.props;
        this.check();
        return (
            <div className="edit-role-modal modal fade fullscreen" id="editRoleModal" tabIndex="-1" role="dialog"
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


                                    <SelectPermissionCTR
                                        selectPermission={Object.assign({}, this.state, {options: this.getOptions()})}
                                        setSelectPermission={this.setSelectPermission.bind(this)}
                                        permissions={this.props.permissions}
                                        {...this.fillSelectBoxes()}
                                    />
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