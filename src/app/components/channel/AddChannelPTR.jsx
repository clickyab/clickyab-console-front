import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import $ from 'jquery';

class AddChannelPTR extends Component {
    addChannelForm;
    state = {
        validation: true
    };
    componentDidMount() {
        $('#kasra').animatedModal();


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

                <div id="animatedModal">
                    <div className="close-animatedModal">
                        CLOSE MODALs
                    </div>

                        <form role="form" action="" id="addChannelForm" method="post" className="login-form" onSubmit={handleSubmit((values) => SubmitAddChannel(values, this.addChannelForm, reset))}>
                            <div className="form-group">
                                <label className="sr-only" htmlFor="admin">نام ادمین</label>
                                <Field component="input" type="text" name="admin" placeholder='admin' className="form-control" id="admin"/>
                            </div>
                            <div className="form-group">
                                <label className="sr-only" htmlFor="link">لینک کانال</label>
                                <Field component="input" type="text" name="link" placeholder={'link'} className="form-control" id="link"/>
                            </div>

                            <div className="form-group">
                                <label className="sr-only" htmlFor="name">نام کانال</label>
                                <Field component="input" type="text" name="name" placeholder={'name'} className="form-control" id="name"/>
                            </div>
                            <button type="submit" className="btn btn-primary add-channel-form">ذخیره</button>
                        </form>
                </div>
            </div>
        )
    }
}

export default reduxForm({
    form: 'AddChannelForm'
})(AddChannelPTR);