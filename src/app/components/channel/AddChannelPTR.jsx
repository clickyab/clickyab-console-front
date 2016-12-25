import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {fullWidthModal} from './../../functions/animtedModal';
import $ from 'jquery';

class AddChannelPTR extends Component {
    addChannelForm;
    state = {
        validation: true
    };
    componentDidMount() {
        fullWidthModal('kasra', 'افزودن چنل جدید');

        this.addChannelForm = $("#addChannelForm");
        this.addChannelForm.validate({
            rules: {
                admin: {
                    required: true,
                },
                link: {
                    required: true,
                },
                name: {
                    required: true,
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
        const {handleSubmit, SubmitAddChannel, reset} = this.props;
        return(
            <div className='page-content'>
                <div>
                    <a id="kasra" className="btn btn-success" href="#animatedModal">Add Channel</a>
                </div>
                <div id="animatedModal" className="animated animatedModal-off">

                    <div className="close-animatedModal padding-tb-15">
                        <img className="closebt" src="img/closebtn.svg" />
                    </div>
                    <div className="col-md-4 col-md-offset-4">
                        <div className="modal-title text-center">
                            <h3/>
                        </div>
                        <form role="form" action="" id="addChannelForm" method="post" className="add-channel-form white" onSubmit={handleSubmit((values) => SubmitAddChannel(values, this.addChannelForm, reset))}>
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
                            <button type="submit" className="btn btn-primary btn-lg add-channel-form btn-block">ذخیره</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default reduxForm({
    form: 'AddChannelForm'
})(AddChannelPTR);