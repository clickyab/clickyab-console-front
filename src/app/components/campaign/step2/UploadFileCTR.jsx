import React, {Component} from "react";
import $ from "jquery";
import {Field, reduxForm} from "redux-form";
let Flow = require("@flowjs/flow.js/src/flow");

export default class UploadFileCTR extends Component {

    componentDidMount() {
        (function () {
            var r = new Flow({
                target: '/upload',
                chunkSize: 1024*1024,
                testChunks: false
            });
            // Flow.js isn't supported, fall back on a different method
            if (!r.support) {
                $('.flow-error').show();
                return ;
            }
            // Show a place for dropping/selecting files
            $('.flow-drop').show();
            r.assignDrop($('.flow-drop')[0]);
            r.assignBrowse($('.flow-browse')[0]);
            r.assignBrowse($('.flow-browse-folder')[0], true);
            r.assignBrowse($('.flow-browse-image')[0], false, false, {accept: 'image/*'});

            // Handle file add event
            r.on('fileAdded', function(file){
                // Show progress bar
                $('.flow-progress, .flow-list').show();
                // Add the file to the list
                $('.flow-list').append(
                    '<li class="flow-file flow-file-'+file.uniqueIdentifier+'">' +
                    'Uploading <span class="flow-file-name"></span> ' +
                    '<span class="flow-file-size"></span> ' +
                    '<span class="flow-file-progress"></span> ' +
                    '<a href="" class="flow-file-download" target="_blank">' +
                    'Download' +
                    '</a> ' +
                    '<span class="flow-file-pause">' +
                    ' <img src="pause.png" title="Pause upload" />' +
                    '</span>' +
                    '<span class="flow-file-resume">' +
                    ' <img src="resume.png" title="Resume upload" />' +
                    '</span>' +
                    '<span class="flow-file-cancel">' +
                    ' <img src="cancel.png" title="Cancel upload" />' +
                    '</span>'
                );
                var $self = $('.flow-file-'+file.uniqueIdentifier);
                $self.find('.flow-file-name').text(file.name);
                $self.find('.flow-file-size').text(readablizeBytes(file.size));
                $self.find('.flow-file-download').attr('href', '/download/' + file.uniqueIdentifier).hide();
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
                });
            });
            r.on('filesSubmitted', function(file) {
                r.upload();
            });
            r.on('complete', function(){
                // Hide pause/resume when the upload has completed
                $('.flow-progress .progress-resume-link, .flow-progress .progress-pause-link').hide();
            });
            r.on('fileSuccess', function(file,message){
                var $self = $('.flow-file-'+file.uniqueIdentifier);
                // Reflect that the file upload has completed
                $self.find('.flow-file-progress').text('(completed)');
                $self.find('.flow-file-pause, .flow-file-resume').remove();
                $self.find('.flow-file-download').attr('href', '/download/' + file.uniqueIdentifier).show();
            });
            r.on('fileError', function(file, message){
                // Reflect that the file upload has resulted in error
                $('.flow-file-'+file.uniqueIdentifier+' .flow-file-progress').html('(file could not be uploaded: '+message+')');
            });
            r.on('fileProgress', function(file){
                // Handle progress for both the file and the overall upload
                $('.flow-file-'+file.uniqueIdentifier+' .flow-file-progress')
                    .html(Math.floor(file.progress()*100) + '% '
                        + readablizeBytes(file.averageSpeed) + '/s '
                        + secondsToStr(file.timeRemaining()) + ' remaining') ;
                $('.progress-bar').css({width:Math.floor(r.progress()*100) + '%'});
            });
            r.on('uploadStart', function(){
                // Show pause, hide resume
                $('.flow-progress .progress-resume-link').hide();
                $('.flow-progress .progress-pause-link').show();
            });
            r.on('catchAll', function() {
                console.log.apply(console, arguments);
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
                cancel: function() {
                    r.cancel();
                    $('.flow-file').remove();
                },
                upload: function() {
                    $('.flow-file-pause').show();
                    $('.flow-file-resume').hide();
                    r.resume();
                },
                flow: r
            };
        })();

        $(document).on("click",".progress-resume-link" , function (e) {
            e.preventDefault();
            window.r.upload(); return(false);
        });
        $(document).on("click",".progress-pause-link" , function (e) {
            e.preventDefault();
            window.r.pause(); return(false);
        });
        $(document).on("click",".progress-cancel-link" , function (e) {
            e.preventDefault();
            window.r.cancel(); return(false);
        });

        let onDragEnter = function(event) {
                $(".flow-drop").addClass('flow-dragover');
            },
            onDragEnd = function(event) {
                $(".flow-drop").removeClass('flow-dragover');
            },

            onDrop = function(event) {
                $(".flow-drop").removeClass('flow-dragover');
            };

        function readablizeBytes(bytes) {
            var s = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];
            var e = Math.floor(Math.log(bytes) / Math.log(1024));
            return (bytes / Math.pow(1024, e)).toFixed(2) + " " + s[e];
        }
        function secondsToStr (temp) {
            function numberEnding (number) {
                return (number > 1) ? 's' : '';
            }
            var years = Math.floor(temp / 31536000);
            if (years) {
                return years + ' year' + numberEnding(years);
            }
            var days = Math.floor((temp %= 31536000) / 86400);
            if (days) {
                return days + ' day' + numberEnding(days);
            }
            var hours = Math.floor((temp %= 86400) / 3600);
            if (hours) {
                return hours + ' hour' + numberEnding(hours);
            }
            var minutes = Math.floor((temp %= 3600) / 60);
            if (minutes) {
                return minutes + ' minute' + numberEnding(minutes);
            }
            var seconds = temp % 60;
            return seconds + ' second' + numberEnding(seconds);
        }
    }


    render() {
        const {handleSubmit, submitCampaignName} = this.props;
        return (
        <div className="page-content">

            <div className="portlet light margin-top-20">

                <div className="portlet-title">
                    <div className="caption">
                        <i className="fa fa-bullseye"/> آپلود فایل و مدیا برای کمپین <span className="title-campaign">فلانی</span> </div>
                </div>
                <div className="portlet-body form">
                    <div className="mt-element-step margin-top-40">
                        <div className="row step-background">
                            <div className="col-md-3 bg-grey-steel mt-step-col">
                                <div className="mt-step-number">۱</div>
                                <div className="mt-step-title uppercase font-grey-cascade">نام کمپین</div>
                                <div className="mt-step-content font-grey-cascade">یک نام به کمپین خود اختصاص دهید.</div>
                            </div>
                            <div className="col-md-3 bg-grey-steel mt-step-col active">
                                <div className="mt-step-number">۲</div>
                                <div className="mt-step-title uppercase font-grey-cascade">آپلود فایل و مدیا</div>
                                <div className="mt-step-content font-grey-cascade">عکس، ویدیو و یا پی دی اف خود را آپلود کنید.</div>
                            </div>
                            <div className="col-md-3 bg-grey-steel mt-step-col">
                                <div className="mt-step-number">۳</div>
                                <div className="mt-step-title uppercase font-grey-cascade">کپشن تبلیغ</div>
                                <div className="mt-step-content font-grey-cascade">متن تبلیغ خود را تایپ کنید</div>
                            </div>
                            <div className="col-md-3 bg-grey-steel mt-step-col">
                                <div className="mt-step-number">۴</div>
                                <div className="mt-step-title uppercase font-grey-cascade">انتخاب پلن</div>
                                <div className="mt-step-content font-grey-cascade">انتخاب پلن را بر اساس میزان بازدید مشخص کنید</div>
                            </div>
                        </div>
                        <br/>
                    </div>
                    <div className="upload-file margin-bottom-40">
                        <h2>۲- انتخاب عکس یا ویدیو</h2>
                        {/*<div className="note note-success">*/}
                            {/*<h3>لیست سشن های فعال شما</h3>*/}
                            {/*<p> لیستی از سشن های فعال شما که در مرورگر های مختلف و یا رایانه های مختلف که سایت را باز کرده اید برای شما نمایش داده شده است می توانید همه سشن ها جز سشن فعلی خود را پاک نمایید لیستی از سشن های فعال شما که در مرورگر های مختلف و یا رایانه های مختلف که سایت را باز کرده اید برای شما نمایش داده شده است می توانید همه سشن ها جز سشن فعلی خود را پاک نمایید*/}
                            {/*</p>*/}
                        {/*</div>*/}
                        <div className="flow-drop" draggable='true'>
                            <div className="upload-file-icon"><i className="fa fa-cloud-upload"/> </div>
                            <h2 className="text-center"> برای آپلود فایل خود را بکشید</h2>
                            <p className="text-center">یا می توانید با فشردن دمه پایین فایل خود را انتخاب کنید</p>
                            <a type="button" className="btn dark btn-outline sbold uppercase flow-browse">انتخاب فایل</a>
                        </div>
                        {/*<div className="flow-error">*/}
                        {/*Your browser, unfortunately, is not supported by Flow.js. The library requires support for <a href="http://www.w3.org/TR/FileAPI/">the HTML5 File API</a> along with <a href="http://www.w3.org/TR/FileAPI/#normalization-of-params">file slicing</a>.*/}
                        {/*</div>*/}

                        <div className="flow-progress">
                            <div className="progress progress-striped">
                                <div className="progress-bar progress-bar-info" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{width: "0"}}>
                                    <span className="sr-only progress-text"> 20% Complete </span>
                                    <div className="progress-pause">
                                        <a href="#"  className="progress-resume-link"><img src="resume.png" title="Resume upload" /></a>
                                        <a href="#"  className="progress-pause-link"><img src="pause.png" title="Pause upload" /></a>
                                        <a href="#"  className="progress-cancel-link"><img src="cancel.png" title="Cancel upload" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ul className="flow-list"/>
                    </div>
                </div>
            </div>
        </div>

        )
    }

}
