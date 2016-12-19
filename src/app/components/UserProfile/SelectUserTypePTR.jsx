import React, {Component} from 'react';
import $ from 'jquery';
import {Field, reduxForm} from 'redux-form';

export default class SelectUserType extends Component {

    componentDidMount() {
        $("input[name=user-type]").change(function(event) {
            if (($(this).not(":checked"))) {
                $(".user-form").css("display","none");
            }
            if ( $(this).is(":checked") && ($(this).val() == "personal")) {
                $(".user-form").hide();
                $(".personal-form").fadeIn();
                $('html, body').animate({scrollTop:$("."+$(this).val()+"-form").position().top}, 'slow');
            }
            else if( $(this).is(":checked") && ($(this).val() == "corporation")) {
                $(".user-form").hide();
                $(".corporation-form").fadeIn();
                $('html, body').animate({scrollTop:$("."+$(this).val()+"-form").position().top}, 'slow');
            }
        }).trigger('change');
    }


    render() {
        return(
            <div className="row">
                <div className="col-md-12 col-xs-12">
                    <div className="mt-element-ribbon bg-grey-steel">
                        <div className="ribbon ribbon-color-primary uppercase">انتخاب نوع شخص</div>
                        <div className="ribbon-content">حقیقی
                            یا حقوقی بودن کاربری خود را در ابتدا مشخص کنید و سپس فرم را تکمیل نمایید
                            <br/>
                            <br/>
                            <div className="form-group form-md-radios">
                                <div className="md-radio-list">
                                    <div className="md-radio">
                                        <input type="radio" id="radio_personal" name="user-type" value="personal" className="md-radiobtn"/>
                                        <label htmlFor="radio_personal">
                                            <span className="inc"/>
                                            <span className="check"/>
                                            <span className="box"/> حقیقی </label>
                                    </div>
                                    <div className="md-radio">
                                        <input type="radio" id="radio_corporation" name="user-type" value="corporation" className="md-radiobtn"/>
                                        <label htmlFor="radio_corporation">
                                            <span className="inc"/>
                                            <span className="check"/>
                                            <span className="box"/> حقوقی </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}