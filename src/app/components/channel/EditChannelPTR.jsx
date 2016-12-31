import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {fullWidthModal} from './../../functions/animtedModal';
import $ from 'jquery';



class EditChannelPTR extends Component {
    editChannelForm;
    state = {
        validation: true
    };



    componentDidMount() {
        let {GetChannelInfo} = this.props;
        $(".edit-item").attr("href","#edit-channel-binder-modal");
        $(".edit-item").addClass("edit-channel-binder");


        this.editChannelForm = $("#editChannelForm");
        this.editChannelForm.validate({
            rules: {
                admin: {
                    required: false,
                },
                link: {
                    required: false,
                },
                name: {
                    required: false,
                },

            },
            messages: {
                admin: {
                    required: 'لطفا نام ادمین را وارد نمایید',
                },
                link: {
                    required: 'لطفا لینک کانال را وارد نمایید',
                },
                name: {
                    required: 'لطفا نام کانال را وارد نمایید',
                },

            }
        });
    }
    render() {
        const {handleSubmit, SubmitEditChannel} = this.props;
        return(

            <div className="modal fade fullscreen" id="menuModal"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" >
                        <div className="modal-header">
                            <div className="close-edit-channel-binder-modal padding-tb-15">
                                <img className="closebt" src="../img/closebtn.svg" data-dismiss="modal" aria-hidden="true" />
                            </div>
                        </div>
                        <div className="modal-body text-center">
                            <div className="col-md-4 col-md-offset-4">
                                <div className="modal-title text-center">
                                    <h3/>
                                </div>
                                <form role="form" action="" id="editChannelForm" method="post" className="add-channel-form white" onSubmit={handleSubmit((values) => SubmitEditChannel(values, this.editChannelForm))}>
                                    <div className="form-group">
                                        <label htmlFor="admin">نام ادمین</label>
                                        <Field component="input" type="text" name="admin" placeholder='نام ادمین' className="form-control input-lg" id="admin"/>
                                    </div>
                                    <div className="form-group">
                                        <label  htmlFor="link">لینک کانال</label>
                                        <Field component="input" type="text" name="link" placeholder="لینک چنل" className="form-control input-lg" id="link"/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="name">نام کانال</label>
                                        <Field component="input" type="text" name="name" placeholder="نام کانال" className="form-control input-lg" id="name"/>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-lg edit-channel-form btn-block">ذخیره</button>
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
    form: 'EditChannelForm'
})(EditChannelPTR);