import React, {Component} from "react";
import ping from "../../functions/ping";

export default class ServerDown extends Component {
    componentDidMount() {
        let check = setInterval(() => {
            ping().then(
                () => {
                    clearInterval(check);
                },
                () => {
                }
            )
        }, 10000);
    }

    render() {
        return (<div>server is down bro :))</div>);
    }
}
