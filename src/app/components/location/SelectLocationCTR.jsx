import React, {Component} from "react";
import SelectLocationPTR from "./SelectLocationPTR";
import swagger from "./../../swagger/index";
import {getCity, getProvince, getToken} from "../../redux/helpers";
import {ifInvalidToken} from "../../functions/helpers";
import {sync} from "../../functions/sync";

export default class SelectLocationCTR extends Component {
    state = {
        countries: [],
        provinces: [],
        cities: []
    };

    requestToGetCountry() {
        sync(function*() {
            let {data, response} = yield (new swagger.LocationApi())
                .locationCountryGet(getToken());

            if (response.statusCode === 200) {
                this.setState({countries: data})
            }

            ifInvalidToken(response);
        }.bind(this));

        this.getProvince();
    }

    getCities(event) {
        let id = event.target.value;
        sync(function*() {
            let {data, response} = yield (new swagger.LocationApi())
                .locationCityIdGet(id, getToken());
            if (response.statusCode === 200) {
                this.setState({cities: data});
            }

            ifInvalidToken(response);
        }.bind(this))
    }

    getProvince() {
        sync(function*() {
            let {data, response} = yield (new swagger.LocationApi())
                .locationProvinceGet(getToken());

            if (response.statusCode === 200) {
                this.setState({provinces: data});
            }

            ifInvalidToken(response);
        }.bind(this));
    }

    onCountryChanged() {
        this.getProvince();
    }

    onProvinceChanged(event) {
        this.getCities(event);
    }

    componentDidMount() {
        this.requestToGetCountry();
        if (getCity() !== 0) {
            this.getCities({target: {value: getProvince() || 1}});
        }
    }

    render() {
        return (
            <SelectLocationPTR onProvinceChanged={this.onProvinceChanged.bind(this)}
                               onCountryChanged={this.onCountryChanged.bind(this)} {...this.props} {...this.state}/>
        );
    }
}