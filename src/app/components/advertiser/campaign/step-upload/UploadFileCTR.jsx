import React, {Component} from "react";
import $ from "jquery";
import {select} from "../../../../functions/select";
import {dispatch} from "../../../../functions/dispatch";
import {updateLocalStorageAction, createCampaign} from "../../../../redux/actions/index";
import {navigate} from "../../../../functions/navigate";
import {AlertBox} from "../../../../functions/notifications";
import {sync} from "../../../../functions/sync";
import swagger from "../../../../swagger/index";
let Flow = require("@flowjs/flow.js/src/flow");

export default class UploadFileCTR extends Component {
    constructor(props) {
        super(props);
        this.state = {
            FileUploaded: false
        }
    }

    setStateUploadFile() {
        this.setState({
            FileUploaded: false
        });
    }

    componentDidMount() {
        let that = this;
        if (select('createCampaignData.src') != null) {
            $(".flow-drop").addClass("col-md-8");
            $(".flow-drop").fadeIn();
            $(".preview-image img").attr("src", select('createCampaignData.src'));
            $(".preview-image").fadeIn();
        }
        (function () {
            var r = new Flow({
                target: 'http://rubik.clickyab.ae/api/file/upload',
                chunkSize: 1024 * 1024,
                testChunks: false,
                singleFile: true,
                headers: {token: select("user.token", "no token")}
            });
            // Flow.js isn't supported, fall back on a different method
            if (!r.support) {
                $('.flow-error').show();
                return;
            }
            // Show a place for dropping/selecting files
            $('.flow-drop').show();
            r.assignDrop($('.flow-drop')[0]);
            r.assignBrowse($('.flow-browse')[0]);
            r.assignBrowse($('.flow-browse-folder')[0], true);
            r.assignBrowse($('.flow-browse-image')[0], false, false, {accept: 'image/*'});

            // Handle file add event
            r.on('fileSuccess', function (file, message) {
                let resolve = JSON.parse(message);
                let fileReader = new FileReader();

                sync(function*() {
                    const {data, response} = yield (new swagger.AdApi())
                        .campaignUploadIdPut(select("createCampaignData.id", "no id"), select("user.token", "no token"),
                            {
                                'payloadData': {
                                    url: resolve.src
                                }
                            }
                        );
                    if (response.statusCode == '200') {
                        dispatch(createCampaign(Object.assign({}, select("createCampaignData"), {src: "http://rubik.clickyab.ae/statics/" + data.src})));
                        dispatch(updateLocalStorageAction());
                        that.setState({
                            FileUploaded: true
                        });
                        $(".flow-file-size").remove();
                        $(".progress-bar").css("width", "0");
                        $(".flow-drop").addClass("col-md-8");
                        $(".flow-drop").fadeIn();
                        fileReader.onload = function (event) {
                            let uri = event.target.result;
                            $(".preview-image img").attr("src", uri);
                            $(".preview-image").fadeIn();
                        };
                        fileReader.readAsDataURL(file.file);
                    } else if (response.statusCode == '400') {
                        AlertBox("error", "اختلالی در سرور به وجود آمده لطفا دوباره تلاش کنید");
                    }
                });
            }.bind(this));
            r.on('fileAdded', function (file) {
                that.setState({
                    FileUploaded: false
                });
                $(".flow-drop").fadeOut();
                $(".preview-image").fadeOut();
                $(".flow-file").remove();
                // Show progress bar
                $('.flow-progress, .flow-list').show();
                // Add the file to the list
                $(".progress-pause").append('<span class="flow-file-size"></span>');
                $('.flow-list').append(
                    '<li class="flow-file flow-file-' + file.uniqueIdentifier + '">' +
                    '<span class="flow-file-progress"></span> ' +
                    '<div class="note note-info"> ' +
                    '<span class="flow-file-pause cursor-pointer">' +
                    ' <i class="fa fa-pause" aria-hidden="true"></i>' +
                    '</span>' +
                    '<span class="flow-file-resume cursor-pointer">' +
                    ' <i class="fa fa-play" aria-hidden="true"></i>' +
                    '</span>' +
                    '<span class="flow-file-cancel cursor-pointer">' +
                    ' <i class="fa fa-stop" aria-hidden="true"></i>' +
                    '</span>' +
                    '</div>'
                );
                var $self = $('.flow-file-' + file.uniqueIdentifier);
                $self.find('.flow-file-pause').on('click', function () {
                    file.pause();
                    $self.find('.flow-file-pause').hide();
                    $self.find('.flow-file-resume').show();
                });
                $self.find('.flow-file-resume').on('click', function () {
                    file.resume();
                    $self.find('.flow-file-pause').show();
                    $self.find('.flow-file-resume').hide();
                });
                $self.find('.flow-file-cancel').on('click', function () {
                    file.cancel();
                    $self.remove();
                    $(".flow-file-size").remove();
                    $(".progress-bar").css("width", "0");
                    $(".flow-drop").fadeIn();
                    $(".flow-drop").removeClass("col-md-8");
                    $(".upload-status").text("");
                    that.setState({
                        FileUploaded: false
                    });

                });
            });
            r.on('filesSubmitted', function (file) {
                r.upload();
            });
            r.on('complete', function () {
                $('.flow-progress .progress-resume-link, .flow-progress .progress-pause-link').hide();
            });
            r.on('fileSuccess', function (file, message) {
                var $self = $('.flow-file-' + file.uniqueIdentifier);
                $(".upload-status").text("");
                $self.find('.flow-file-progress').text('(آپلود با موفقیت انجام شد)');
                $self.find('.flow-file-pause, .flow-file-resume , .flow-file-cancel , .note').remove();
            });
            r.on('fileError', function (file, message) {
                $(".flow-drop").fadeIn();
                $(".upload-status").text("");
                $('.flow-file-' + file.uniqueIdentifier + ' .flow-file-progress').html('اختلالی در سرور به وجود آمده است لطفا دوباره تلاش کنید ');
                $(".note-info").fadeOut();
                $(".progress-bar").css("width", "0");
                $(".flow-file-size").remove();
            });
            r.on('fileProgress', function (file) {
                $(".flow-file-size").text(Math.floor(file.progress() * 100) + '% ');
                $(".upload-status").text("در حال آپلود، لطفا منتظر بمانید...");
                $('.progress-bar').css({width: Math.floor(r.progress() * 100) + '%'});
            });
            r.on('uploadStart', function () {
                // Show pause, hide resume
                $('.flow-progress .progress-resume-link').hide();
                $('.flow-progress .progress-pause-link').show();
            });
            r.on('catchAll', function () {
                // silence is golden
            });
            window.r = {
                pause: function () {
                    r.pause();
                    // Show resume, hide pause
                    $('.flow-file-resume').show();
                    $('.flow-file-pause').hide();
                    $('.flow-progress .progress-resume-link').show();
                    $('.flow-progress .progress-pause-link').hide();
                },
                cancel: function () {
                    r.cancel();
                    $('.flow-file').remove();
                },
                upload: function () {
                    $('.flow-file-pause').show();
                    $('.flow-file-resume').hide();
                    r.resume();
                },
                flow: r
            };
        })();

        $(document).on("click", ".progress-resume-link", function (e) {
            e.preventDefault();
            window.r.upload();
            return (false);
        });
        $(document).on("click", ".progress-pause-link", function (e) {
            e.preventDefault();
            window.r.pause();
            return (false);
        });
        $(document).on("click", ".progress-cancel-link", function (e) {
            e.preventDefault();
            window.r.cancel();
            return (false);
        });

        let onDragEnter = function (event) {
                $(".flow-drop").addClass('flow-dragover');
            },
            onDragEnd = function (event) {
                $(".flow-drop").removeClass('flow-dragover');
            },

            onDrop = function (event) {
                $(".flow-drop").removeClass('flow-dragover');
            };

        function readablizeBytes(bytes) {
            var s = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];
            var e = Math.floor(Math.log(bytes) / Math.log(1024));
            return (bytes / Math.pow(1024, e)).toFixed(2) + " " + s[e];
        }

        function secondsToStr(temp) {
            function numberEnding(number) {
                return (number > 1) ? '' : '';
            }

            var years = Math.floor(temp / 31536000);
            if (years) {
                return years + ' سال' + numberEnding(years);
            }
            var days = Math.floor((temp %= 31536000) / 86400);
            if (days) {
                return days + ' روز' + numberEnding(days);
            }
            var hours = Math.floor((temp %= 86400) / 3600);
            if (hours) {
                return hours + ' ساعت' + numberEnding(hours);
            }
            var minutes = Math.floor((temp %= 3600) / 60);
            if (minutes) {
                return minutes + ' دقیقه' + numberEnding(minutes);
            }
            var seconds = temp % 60;
            return seconds + ' ثانیه' + numberEnding(seconds);
        }
    }


    render() {
        const {handleSubmit, submitCampaignName} = this.props;

        let campaignTitle = select("createCampaignData.name", "no title");
        return (
            <div className="page-content">

                <div className="portlet light margin-top-20">

                    <div className="portlet-title">
                        <div className="caption font-blue">
                            <i className="fa fa-bullseye font-blue"/> آپلود فایل و مدیا برای کمپین <span
                            className="title-campaign bold">{campaignTitle}</span></div>
                    </div>
                    <div className="portlet-body form">
                        <div className="mt-element-step margin-top-20 when-generate-content">
                            <div className="row step-line">
                                <div className="col-md-2 mt-step-col first done">
                                    <div className="mt-step-number bg-white">
                                        ۱
                                    </div>
                                    <div className="mt-step-title uppercase font-grey-cascade">نام کمپین</div>

                                </div>
                                <div className="col-md-2 mt-step-col done">
                                    <div className="mt-step-number bg-white">
                                        ۲
                                    </div>
                                    <div className="mt-step-title uppercase font-grey-cascade">انتخاب نوع محتوا</div>
                                </div>
                                <div className="col-md-2 mt-step-col error">
                                    <div className="mt-step-number bg-white">
                                        ۳
                                    </div>
                                    <div className="mt-step-title uppercase font-grey-cascade">آپلود فایل</div>

                                </div>
                                <div className="col-md-2 mt-step-col ">
                                    <div className="mt-step-number bg-white">
                                        ۴
                                    </div>
                                    <div className="mt-step-title uppercase font-grey-cascade">محتوای متنی</div>

                                </div>
                                <div className="col-md-2 mt-step-col ">
                                    <div className="mt-step-number bg-white">
                                        ۵
                                    </div>
                                    <div className="mt-step-title uppercase font-grey-cascade">انتخاب پلن</div>

                                </div>

                                <div className="col-md-2 mt-step-col last">
                                    <div className="mt-step-number bg-white">
                                        ۶
                                    </div>
                                    <div className="mt-step-title uppercase font-grey-cascade">تایید نهایی و پرداخت
                                    </div>

                                </div>
                            </div>
                            <br/>
                            <br/>

                        </div>
                        <div className="upload-file margin-bottom-40">
                            <h2>۳- انتخاب عکس یا ویدیو</h2>

                            <div className="row">
                                <div className="upload-holder">
                                    <div className="flow-drop" draggable='true'>
                                        <div className="upload-file-icon"><i className="fa fa-cloud-upload"/></div>
                                        <h2 className="text-center"> برای آپلود فایل خود را بکشید</h2>
                                        <p className="text-center">یا می توانید با فشردن دمه پایین فایل خود را انتخاب
                                            کنید</p>
                                        <a type="button" className="btn dark btn-outline sbold uppercase flow-browse">انتخاب
                                            فایل</a>
                                    </div>
                                </div>
                                <div className="preview-image col-md-4" style={{display: 'none'}}>
                                    <div className="preview-image-holder">
                                        <img src=""/>
                                    </div>
                                </div>
                            </div>

                            <div className="flow-progress">
                                <span className="upload-status"/>
                                <div className="progress progress-striped">
                                    <div className="progress-bar progress-bar-info active" role="progressbar"
                                         aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{width: "0"}}>
                                        <span className="sr-only progress-text"> 20% Complete </span>
                                        <div className="progress-pause">
                                        </div>
                                    </div>
                                    <div className="pull-left remain-time"></div>
                                </div>
                            </div>
                            <ul className="flow-list"/>

                            <div className="col-md-12 margin-top-20 space-btn">
                                <button onClick={
                                    () => {
                                        navigate('/v1/advertiser/campaign/create/:campaign_id:/step/type', {
                                            campaign_id: select('createCampaignData.id')
                                        });
                                    }
                                } className="btn btn-default  button-next btn-arrow-text" type="submit"><i
                                    className="fa fa-angle-right"/> مرحله قبل
                                </button>
                                <button onClick={
                                    () => {
                                        navigate('/v1/advertiser/campaign/create/:campaign_id:/step/editor', {
                                            campaign_id: select('createCampaignData.id')
                                        });
                                    }
                                }
                                        className="btn btn-info  button-next btn-arrow-text next-step-upload"
                                        type="submit" disabled={!this.state.FileUploaded}>مرحله بعد <i
                                    className="fa fa-angle-left"/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
