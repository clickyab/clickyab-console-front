import React from "react";
import {render} from "react-dom";
import Routes from "./app/routes";
import {store} from "./app/redux/store";
import {Provider} from "react-redux";

render(
    <Provider store={store}><Routes /></Provider>,
    document.querySelector('#clickyab_app')
);