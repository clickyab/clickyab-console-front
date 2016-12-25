import React, {Component} from 'react';
import $ from 'jquery';
import Radio from './../common/form/Radio';
import {select} from '../../functions/select'

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

        if((select('user.personal.first_name')) != null) {
                $("#radio_personal").prop("checked",true);
                $(".personal-form").fadeIn();
        } else {
            $("#radio_corporation").prop("checked",true);
            $(".corporation-form").fadeIn();
        }
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
                                    <Radio label={'حقیقی'} name={"user-type"} value={'personal'} id={'radio_personal'}/>
                                    <Radio label={'حقوقی'} name={"user-type"} value={'corporation'} id={'radio_corporation'}/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}