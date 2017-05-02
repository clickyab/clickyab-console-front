import React, {Component, PropTypes} from "react";

export function RemoveAll(count) {
    return (count > 0) ? <a onClick={this.clearAllNotification} style={{fontSize: '12px'}}>حذف همه</a> : <span/>;
}

RemoveAll.propTypes = {
    count: PropTypes.number
};