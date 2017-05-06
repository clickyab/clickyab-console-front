import React, {Component, PropTypes} from "react";
import moment from "moment-jalali";
import {translate} from "./../../functions/translate";

function SessionListItem(props) {
    let {browser, ip, date, version, os, sessionKey, current, deleteSession} = props;
    return (
        <div className="session-item left">
            <div className="session-item-body">
                <div className="session-item-info">
                    <span className="session-user-agent">{browser} {version}-{os}</span>
                    <span className="created_at">{moment(date).format('dddd، jD jMMMM jYYYY')}</span>
                </div>
                <div className="session-ip">{ip}</div>
                <div className="session-details">
                    <div className="session-item-actions">
                        <div className="btn-group">
                            {current ? '' : <button onClick={deleteSession} type="button" id="delete-session"
                                                    className="btn btn-outline red btn-sm" data-key={sessionKey}>
                                {translate('Delete session')}
                            </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function createSessionList(sessionList, deleteSession) {
    let result = [];

    for (let i = 0; i < sessionList.sessions.length; i++) {
        result.push(
            <SessionListItem key={'session-' + i}
                             browser={sessionList.sessions[i].browser}
                             ip={sessionList.sessions[i].ip}
                             date={sessionList.sessions[i].created_at}
                             sessionKey={sessionList.sessions[i].key}
                             version={sessionList.sessions[i].version}
                             os={sessionList.sessions[i].os}
                             current={sessionList.sessions[i].current}
                             deleteSession={deleteSession}/>
        )
    }
    return result;
}

export default function SessionListPTR(props) {
    let {sessionList, deleteSession} = props;

    return (
        <div className="session-list">
            <div className="note note-success">
                <h3>لیست سشن های فعال شما</h3>
                <p> لیستی از سشن های فعال شما که در مرورگر های مختلف و یا رایانه های مختلف که سایت را باز کرده اید
                    برای شما نمایش داده شده است می توانید همه سشن ها جز سشن فعلی خود را پاک نمایید لیستی از سشن های
                    فعال شما که در مرورگر های مختلف و یا رایانه های مختلف که سایت را باز کرده اید برای شما نمایش
                    داده شده است می توانید همه سشن ها جز سشن فعلی خود را پاک نمایید
                </p>
            </div>
            {createSessionList(sessionList, deleteSession)}
        </div>
    )
}
