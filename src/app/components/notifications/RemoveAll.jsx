import React, {PropTypes} from "react";

export function RemoveAll({count, clearAllNotification}) {
    return (count > 0) ? <a onClick={clearAllNotification} style={{fontSize: '12px'}}>حذف همه</a> : <span/>;
}

RemoveAll.propTypes = {
    count: PropTypes.number,
    clearAllNotification: PropTypes.func,
};