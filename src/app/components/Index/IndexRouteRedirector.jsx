import React from 'react';
import {store} from "./../../redux/store";
import {navigate} from "../../functions/navigate";

export function IndexRouteRedirector() {
    if (store.getState().userType === 'advertiser') {
        navigate('/v1/advertiser');
    } else {
        navigate('/v1/publisher');
    }

    return <span/>;
}