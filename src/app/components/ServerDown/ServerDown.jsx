import React, {Component} from 'react';
import ping from "../../functions/ping";

export default class ServerDown extends Component {
    componentDidMount() {
        let check = setInterval(() => {
            ping().then(
                response => {
                    console.log('ok');
                    clearInterval(check);
                },
                reject => {
                    console.log('failed');
                }
            )
        });
    }

    render() {
        return (<div>
            server is down bro :))
        </div>);
    }
}
