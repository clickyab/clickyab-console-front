import React, {Component} from "react";
import $ from "jquery";
import {Field, reduxForm} from "redux-form";


export default class CampaignInformationPTR extends Component {

    componentDidMount() {
        
    }


    render() {
        const {handleSubmit, submitCampaignName} = this.props;
        return (
            <div className="upload-file">
                <div className="flow-error">
                    Your browser, unfortunately, is not supported by Flow.js. The library requires support for <a href="http://www.w3.org/TR/FileAPI/">the HTML5 File API</a> along with <a href="http://www.w3.org/TR/FileAPI/#normalization-of-params">file slicing</a>.
                </div>
                <div className="flow-drop" ondragenter="jQuery(this).addClass('flow-dragover');" ondragend="jQuery(this).removeClass('flow-dragover');" ondrop="jQuery(this).removeClass('flow-dragover');">
                    Drop files here to upload or <a className="flow-browse-folder"><u>select folder</u></a> or <a className="flow-browse"><u>select from your computer</u></a> or <a className="flow-browse-image"><u>select images</u></a>
                </div>
                <div className="flow-progress">
                    <table>
                        <tr>
                            <td width="100%"><div className="progress-container"><div className="progress-bar"></div></div></td>
                            <td className="progress-text" nowrap="nowrap"/>
                            <td className="progress-pause" nowrap="nowrap">
                                <a href="#" onclick="r.upload(); return(false);" className="progress-resume-link"><img src="resume.png" title="Resume upload" /></a>
                                <a href="#" onclick="r.pause(); return(false);" className="progress-pause-link"><img src="pause.png" title="Pause upload" /></a>
                                <a href="#" onclick="r.cancel(); return(false);" className="progress-cancel-link"><img src="cancel.png" title="Cancel upload" /></a>
                            </td>
                        </tr>
                    </table>
                </div>
            <ul className="flow-list"/>
                </div>
        )
    }

}
